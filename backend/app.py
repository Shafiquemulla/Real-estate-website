from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from database import init_db, get_db, format_inr

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Force reseed with Mumbai INR properties and rich specifications/galleries
init_db(force_reseed=True)

def parse_property_json_fields(prop):
    for key in ['amenities', 'gallery', 'specifications', 'nearby']:
        default_val = {} if key == 'specifications' else []
        try:
            prop[key] = json.loads(prop[key]) if prop.get(key) else default_val
        except Exception:
            prop[key] = default_val
    return prop

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "currency": "INR",
        "symbol": "₹",
        "location": "Mumbai, Maharashtra, India",
        "message": "DreamHomes Mumbai Real Estate Backend API is running smoothly",
        "notice": "Sample listings are for demonstration purposes and are not real verified offers."
    })

@app.route('/api/properties', methods=['GET'])
def get_properties():
    conn = get_db()
    cursor = conn.cursor()

    location = request.args.get('location', '').strip()
    property_type = request.args.get('type', '').strip()
    purpose = request.args.get('purpose', '').strip()
    bedrooms_param = request.args.get('bedrooms', '').strip()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    min_area = request.args.get('min_area', type=float)
    max_area = request.args.get('max_area', type=float)
    featured = request.args.get('featured', '').strip().lower()
    sort_by = request.args.get('sort', '').strip().lower()

    query = "SELECT * FROM properties WHERE 1=1"
    params = []

    if location:
        query += " AND (location LIKE ? OR city LIKE ? OR locality LIKE ? OR title LIKE ?)"
        term = f"%{location}%"
        params.extend([term, term, term, term])

    if property_type and property_type.lower() != 'all' and property_type.lower() != 'any':
        types_list = [t.strip() for t in property_type.split(',') if t.strip()]
        if types_list:
            placeholders = ','.join(['?' for _ in types_list])
            query += f" AND LOWER(property_type) IN ({placeholders})"
            params.extend([t.lower() for t in types_list])

    if purpose and purpose.lower() != 'all':
        query += " AND LOWER(purpose) = LOWER(?)"
        params.append(purpose)

    if bedrooms_param:
        beds_list = [int(b.strip()) for b in bedrooms_param.split(',') if b.strip().isdigit()]
        if beds_list:
            if 5 in beds_list:
                other_beds = [b for b in beds_list if b != 5]
                if other_beds:
                    sub_placeholders = ','.join(['?' for _ in other_beds])
                    query += f" AND (bedrooms >= 5 OR bedrooms IN ({sub_placeholders}))"
                    params.extend(other_beds)
                else:
                    query += " AND bedrooms >= 5"
            else:
                placeholders = ','.join(['?' for _ in beds_list])
                query += f" AND bedrooms IN ({placeholders})"
                params.extend(beds_list)

    if featured in ['true', '1', 'yes']:
        query += " AND is_featured = 1"

    if min_price is not None and min_price > 0:
        query += " AND price >= ?"
        params.append(min_price)

    if max_price is not None and max_price > 0:
        query += " AND price <= ?"
        params.append(max_price)

    if min_area is not None and min_area > 0:
        query += " AND area_sqft >= ?"
        params.append(min_area)

    if max_area is not None and max_area > 0:
        query += " AND area_sqft <= ?"
        params.append(max_area)

    if sort_by == 'price_asc':
        query += " ORDER BY price ASC"
    elif sort_by == 'price_desc':
        query += " ORDER BY price DESC"
    elif sort_by == 'area_desc':
        query += " ORDER BY area_sqft DESC"
    elif sort_by == 'newest':
        query += " ORDER BY id DESC"
    else:
        query += " ORDER BY is_featured DESC, id ASC"

    cursor.execute(query, params)
    rows = cursor.fetchall()

    properties_list = [parse_property_json_fields(dict(row)) for row in rows]
    conn.close()

    return jsonify({
        "status": "success",
        "count": len(properties_list),
        "data": properties_list
    })

@app.route('/api/properties/<int:prop_id>', methods=['GET'])
def get_property(prop_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM properties WHERE id = ?", (prop_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({"status": "error", "message": "Property not found"}), 404

    prop = parse_property_json_fields(dict(row))
    return jsonify({"status": "success", "data": prop})

@app.route('/api/properties', methods=['POST'])
def create_property():
    data = request.get_json() or {}

    required = [
        'title', 'description', 'property_type', 'purpose',
        'address', 'city', 'state', 'pincode',
        'price', 'area_sqft', 'contact_name', 'contact_email', 'contact_phone'
    ]
    for field in required:
        val = data.get(field)
        if val is None or str(val).strip() == '':
            return jsonify({
                "status": "error",
                "message": f"'{field.replace('_', ' ').title()}' is required."
            }), 400

    # 1. Full name validation
    contact_name = str(data['contact_name']).strip()
    if len(contact_name) < 2:
        return jsonify({"status": "error", "message": "Please enter a valid full name."}), 400

    # 2. Indian Mobile Number validation (+91 and 10 digits starting 6-9)
    raw_phone = re.sub(r'[\s\-\(\)]', '', str(data['contact_phone']).strip())
    if raw_phone.startswith('+91'):
        phone_digits = raw_phone[3:]
    elif raw_phone.startswith('91') and len(raw_phone) == 12:
        phone_digits = raw_phone[2:]
    elif raw_phone.startswith('0') and len(raw_phone) == 11:
        phone_digits = raw_phone[1:]
    else:
        phone_digits = raw_phone

    if not (len(phone_digits) == 10 and phone_digits[0] in '6789' and phone_digits.isdigit()):
        return jsonify({
            "status": "error",
            "message": "Invalid Indian mobile number. Please enter a valid 10-digit mobile number (+91)."
        }), 400
    formatted_phone = f"+91 {phone_digits[:5]} {phone_digits[5:]}"

    # 3. Email validation
    contact_email = str(data['contact_email']).strip().lower()
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', contact_email):
        return jsonify({"status": "error", "message": "Please enter a valid email address."}), 400

    # 4. PIN Code validation (6 digits)
    pincode = str(data['pincode']).strip()
    if not (len(pincode) == 6 and pincode.isdigit()):
        return jsonify({"status": "error", "message": "PIN Code must be a valid 6-digit Indian postal code."}), 400

    # 5. Price validation
    try:
        price = float(data['price'])
        if price <= 0:
            raise ValueError()
    except (ValueError, TypeError):
        return jsonify({"status": "error", "message": "Expected price must be a valid positive amount in INR (₹)."}), 400

    # 6. Bedrooms, Bathrooms, Area validation
    try:
        bedrooms = int(data.get('bedrooms', 0))
        bathrooms = int(data.get('bathrooms', 0))
        area_sqft = float(data['area_sqft'])
        if area_sqft <= 0:
            raise ValueError()
    except (ValueError, TypeError):
        return jsonify({"status": "error", "message": "Property area must be a valid positive number in sq. ft."}), 400

    # 7. Image type and size validation
    image_url = str(data.get('image_url', '')).strip()
    if image_url.startswith('data:image/'):
        try:
            header, encoded = image_url.split(',', 1)
            mime = header.split(';')[0].replace('data:', '')
            if mime not in ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']:
                return jsonify({
                    "status": "error",
                    "message": "Unsupported image format. Allowed formats: PNG, JPG, JPEG, WEBP."
                }), 400
            padding = encoded.count('=')
            size_bytes = (len(encoded) * 3 / 4) - padding
            if size_bytes > 5 * 1024 * 1024:
                return jsonify({
                    "status": "error",
                    "message": "Uploaded image exceeds the 5 MB file size limit."
                }), 400
        except Exception:
            return jsonify({"status": "error", "message": "Invalid image upload data."}), 400
    elif image_url and not (image_url.startswith('http://') or image_url.startswith('https://')):
        return jsonify({"status": "error", "message": "Invalid property image URL."}), 400

    if not image_url:
        image_url = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"

    # Purpose normalization
    purpose = "Rent" if str(data['purpose']).lower() in ['rent', 'for rent'] else "Buy"
    formatted_price = format_inr(price, purpose)
    badge = f"For {purpose}"

    location_str = f"{data['address']}, {data['city']}, {data['state']} - {pincode}"
    locality = str(data.get('locality') or data['city']).strip()
    parking = str(data.get('parking', 'Covered Parking')).strip()

    amenities_list = data.get('amenities', [])
    if isinstance(amenities_list, str):
        try:
            amenities_list = json.loads(amenities_list)
        except Exception:
            amenities_list = [a.strip() for a in amenities_list.split(',') if a.strip()]
    if not amenities_list:
        amenities_list = ["24/7 Security", "Water Supply", "Power Backup"]

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO submitted_properties (
            title, property_type, purpose, location, locality, city, state, pincode,
            price, bedrooms, bathrooms, area_sqft, parking, amenities,
            description, contact_name, contact_email, contact_phone, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['title'], data['property_type'], purpose, location_str, locality,
        data['city'], data['state'], pincode, price, bedrooms, bathrooms, int(area_sqft),
        parking, json.dumps(amenities_list), data['description'],
        contact_name, contact_email, formatted_phone, image_url
    ))

    gallery_json = json.dumps([image_url])
    specs_json = json.dumps({
        "Project Name": data.get('project_name', f"{data['title']} Signature"),
        "Possession Status": data.get('possession_status', 'Ready to Move'),
        "Furnishing": data.get('furnishing', 'Semi-Furnished'),
        "Car Parking": parking,
        "Water Supply": "24/7 Corporation Supply"
    })
    nearby_json = json.dumps([
        {"title": f"Nearest Railway / Metro in {data['city']}", "distance": "1.5 km", "type": "Transit"},
        {"title": "Local Supermarket & High Street", "distance": "500 m", "type": "Shopping"}
    ])

    cursor.execute('''
        INSERT INTO properties (
            title, location, locality, city, state, country, pincode, price, formatted_price,
            property_type, purpose, bedrooms, bathrooms, area_sqft, parking, image_url, gallery,
            is_featured, badge, description, amenities, specifications, nearby, address,
            agent_name, agent_phone, agent_email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['title'],
        location_str,
        locality,
        data['city'],
        data['state'],
        "India",
        pincode,
        price,
        formatted_price,
        data['property_type'],
        purpose,
        bedrooms,
        bathrooms,
        int(area_sqft),
        parking,
        image_url,
        gallery_json,
        badge,
        data['description'],
        json.dumps(amenities_list),
        specs_json,
        nearby_json,
        location_str,
        contact_name,
        formatted_phone,
        contact_email
    ))

    new_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({
        "status": "success",
        "message": f"Property '{data['title']}' submitted successfully! Listed at {formatted_price}.",
        "property_id": new_id
    }), 201

@app.route('/api/enquiries', methods=['POST'])
def submit_enquiry():
    data = request.get_json() or {}

    required = ['name', 'email', 'phone', 'message']
    for field in required:
        if not data.get(field):
            return jsonify({
                "status": "error",
                "message": f"'{field.capitalize()}' is required."
            }), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO enquiries (property_id, property_title, name, email, phone, message, tour_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('property_id'),
        data.get('property_title', 'General Inquiry'),
        data['name'],
        data['email'],
        data['phone'],
        data['message'],
        data.get('tour_date')
    ))
    conn.commit()
    conn.close()

    return jsonify({
        "status": "success",
        "message": "Thank you! Our dedicated Mumbai property advisor will contact you within 24 hours to schedule your visit."
    }), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
