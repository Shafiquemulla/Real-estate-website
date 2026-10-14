import sqlite3
import os
import json

DB_FILE = os.path.join(os.path.dirname(__file__), 'real_estate.db')

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def format_inr(price, purpose='Buy'):
    if purpose == 'Rent':
        if price >= 100000:
            lakhs = price / 100000
            return f"₹{lakhs:.2f} Lakh/month".replace(".00", "")
        return f"₹{int(price):,}/month"
    
    if price >= 10000000:
        cr = price / 10000000
        return f"₹{cr:.2f} Cr".replace(".00", "")
    elif price >= 100000:
        lakh = price / 100000
        return f"₹{lakh:.2f} Lakh".replace(".00", "")
    else:
        return f"₹{int(price):,}"

def init_db(force_reseed=False):
    conn = get_db()
    cursor = conn.cursor()

    if force_reseed:
        cursor.execute("DROP TABLE IF EXISTS properties")
        cursor.execute("DROP TABLE IF EXISTS enquiries")
        cursor.execute("DROP TABLE IF EXISTS submitted_properties")

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            location TEXT NOT NULL,
            locality TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL DEFAULT 'Maharashtra',
            country TEXT NOT NULL DEFAULT 'India',
            pincode TEXT,
            price REAL NOT NULL,
            formatted_price TEXT NOT NULL,
            property_type TEXT NOT NULL, -- Apartment, Flat, Villa, Independent House, Plot, Commercial
            purpose TEXT NOT NULL, -- Buy, Rent, Sell
            bedrooms INTEGER NOT NULL,
            bathrooms INTEGER NOT NULL,
            area_sqft INTEGER NOT NULL,
            parking TEXT,
            image_url TEXT NOT NULL,
            gallery TEXT,
            is_featured INTEGER DEFAULT 0,
            badge TEXT DEFAULT '',
            description TEXT,
            amenities TEXT,
            specifications TEXT,
            nearby TEXT,
            address TEXT,
            agent_name TEXT,
            agent_phone TEXT,
            agent_email TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id INTEGER,
            property_title TEXT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            message TEXT NOT NULL,
            tour_date TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS submitted_properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            property_type TEXT NOT NULL,
            purpose TEXT NOT NULL,
            location TEXT NOT NULL,
            locality TEXT,
            city TEXT,
            state TEXT,
            pincode TEXT,
            price REAL NOT NULL,
            bedrooms INTEGER NOT NULL,
            bathrooms INTEGER NOT NULL,
            area_sqft INTEGER NOT NULL,
            parking TEXT,
            amenities TEXT,
            description TEXT,
            contact_name TEXT NOT NULL,
            contact_email TEXT NOT NULL,
            contact_phone TEXT NOT NULL,
            image_url TEXT,
            status TEXT DEFAULT 'Under Review',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Seed data if empty or forced
    cursor.execute("SELECT COUNT(*) as count FROM properties")
    row = cursor.fetchone()
    if row['count'] == 0 or force_reseed:
        cursor.execute("DELETE FROM properties")
        seed_properties(cursor)

    conn.commit()
    conn.close()

def seed_properties(cursor):
    sample_properties = [
        (
            "Luxury Sea-Facing 4 BHK Apartment",
            "Carter Road, Bandra West, Mumbai",
            "Bandra West",
            "Mumbai",
            "Maharashtra",
            "India",
            45000000,
            "₹4.50 Cr",
            "Apartment",
            "Buy",
            4,
            4,
            2800,
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
            ]),
            1,
            "For Sale",
            "Spectacular sea-facing 4 BHK luxury residence situated on prestigious Carter Road promenade in Bandra West. Boasting unhindered panoramic Arabian Sea sunset views, expansive private sundeck, Italian Bottochino marble flooring, custom modular Poggenpohl kitchen, VRV central air-conditioning, high-speed private elevators, and multi-tier biometric security.",
            json.dumps([
                "Arabian Sea View", "Private Sundeck", "Italian Marble", "Infinity Swimming Pool",
                "Gymnasium & Yoga Studio", "Clubhouse", "2 Reserved Covered Car Parks",
                "24/7 Security & CCTV", "100% Power Backup", "High-Speed Elevators",
                "Piped Gas Connection", "Rainwater Harvesting"
            ]),
            json.dumps({
                "Project Name": "Carter Crest Residences",
                "RERA Registration": "P51800028912",
                "Possession Status": "Ready to Move",
                "Floor Number": "14th of 22 Floors",
                "Facing Direction": "West (Direct Sea Facing)",
                "Furnishing": "Semi-Furnished (Modular Kitchen & Wardrobes)",
                "Parking": "2 Covered Reserved Bays",
                "Water Supply": "24/7 Municipal & Borewell Supply",
                "Age of Property": "Under 2 Years",
                "Maintenance Charges": "₹12,500 / month"
            }),
            json.dumps([
                {"title": "Bandra Railway Station", "distance": "1.8 km", "type": "Transit"},
                {"title": "Bandra-Worli Sea Link", "distance": "2.5 km", "type": "Highway"},
                {"title": "Lilavati Hospital & Research Centre", "distance": "2.1 km", "type": "Hospital"},
                {"title": "St. Stanislaus High School", "distance": "1.2 km", "type": "School"},
                {"title": "Pali Hill & Linking Road Shopping", "distance": "900 m", "type": "Shopping"},
                {"title": "Bandra Kurla Complex (BKC)", "distance": "6.2 km", "type": "Business Hub"},
                {"title": "Mumbai International Airport (BOM)", "distance": "8.5 km", "type": "Airport"}
            ]),
            "Carter Road Promenade, Bandra West, Mumbai, Maharashtra 400050",
            "Aarav Mehta",
            "+91 98201 54321",
            "aarav.mehta@dreamhomes.in"
        ),
        (
            "Contemporary Skyline Penthouse",
            "Worli Sea Face, Mumbai",
            "Worli",
            "Mumbai",
            "Maharashtra",
            "India",
            52500000,
            "₹5.25 Cr",
            "Apartment",
            "Buy",
            3,
            3,
            2400,
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
            ]),
            1,
            "For Sale",
            "Ultra-luxury 3 BHK penthouse perched high above Worli Sea Face with soaring 12-foot ceilings, wrap-around viewing terrace, private plunge pool, and iconic vistas of the Bandra-Worli Sea Link and Mumbai skyline. Designed for high-net-worth connoisseurs seeking supreme privacy.",
            json.dumps([
                "Sea Link View", "Private Plunge Pool", "Wrap-around Deck", "24/7 Concierge",
                "Valet Parking", "Spa & Sauna", "Home Automation", "Private Elevator Access",
                "Infinity Pool", "Clubhouse", "EV Charging Point"
            ]),
            json.dumps({
                "Project Name": "Worli Bayview Towers",
                "RERA Registration": "P51900031024",
                "Possession Status": "Ready to Move",
                "Floor Number": "38th of 44 Floors",
                "Facing Direction": "North-West (Sea Link & Ocean)",
                "Furnishing": "Fully Furnished Designer Decor",
                "Parking": "3 Covered Stilt Bays",
                "Water Supply": "24/7 Treated Corporation Water",
                "Age of Property": "1 Year",
                "Maintenance Charges": "₹16,000 / month"
            }),
            json.dumps([
                {"title": "Bandra-Worli Sea Link Entrance", "distance": "800 m", "type": "Highway"},
                {"title": "Lower Parel Commercial Hub", "distance": "3.1 km", "type": "Business Hub"},
                {"title": "Podar International School", "distance": "2.4 km", "type": "School"},
                {"title": "Jaslok Hospital", "distance": "4.2 km", "type": "Hospital"},
                {"title": "Palladium Mall & High Street Phoenix", "distance": "2.8 km", "type": "Shopping"}
            ]),
            "Worli Sea Face Promenade, Worli, Mumbai 400018",
            "Pooja Singhania",
            "+91 98190 87654",
            "pooja.s@dreamhomes.in"
        ),
        (
            "Royal Palms Private Estate Villa",
            "Gulmohar Road, Juhu Beach, Mumbai",
            "Juhu",
            "Mumbai",
            "Maharashtra",
            "India",
            78000000,
            "₹7.80 Cr",
            "Villa",
            "Buy",
            5,
            5,
            4200,
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
            ]),
            1,
            "For Sale",
            "Exquisite standalone luxury villa situated in an exclusive gated compound in Juhu Scheme, moments away from Juhu Beach. Features manicured private lawn, open-air cabana, temperature-controlled private pool, solar power generation, dedicated servant quarters, and four-car driveway.",
            json.dumps([
                "Private Swimming Pool", "Landscaped Private Lawn", "Servant Quarters", "Gated Security",
                "Solar Rooftop Array", "Modular Chef's Kitchen", "Terrace Lounge", "Private Home Theater"
            ]),
            json.dumps({
                "Project Name": "Juhu Royale Enclave",
                "RERA Registration": "P51800019283",
                "Possession Status": "Ready to Move",
                "Floor Number": "Ground + 2 Floors (Private Bungalow)",
                "Facing Direction": "East (Vastu Compliant)",
                "Furnishing": "Designer Semi-Furnished",
                "Parking": "4 Private Car Parks",
                "Water Supply": "24/7 Dedicated Connection",
                "Age of Property": "Brand New Construction",
                "Maintenance Charges": "₹18,000 / month"
            }),
            json.dumps([
                {"title": "Juhu Beach Promenade", "distance": "600 m", "type": "Beach"},
                {"title": "JW Marriott Juhu", "distance": "900 m", "type": "Hotel"},
                {"title": "Nanavati Super Speciality Hospital", "distance": "2.2 km", "type": "Hospital"},
                {"title": "Mithibai & NM College", "distance": "1.5 km", "type": "Education"},
                {"title": "Chhatrapati Shivaji International Airport", "distance": "6.8 km", "type": "Airport"}
            ]),
            "Gulmohar Road, Juhu Scheme, Mumbai 400049",
            "Vikramaditya Roy",
            "+91 98210 11223",
            "vikram.roy@dreamhomes.in"
        ),
        (
            "Modern Garden Family Residence",
            "Central Avenue, Hiranandani Gardens, Powai",
            "Powai",
            "Mumbai",
            "Maharashtra",
            "India",
            19500000,
            "₹1.95 Cr",
            "Apartment",
            "Buy",
            2,
            2,
            1150,
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
            ]),
            1,
            "For Sale",
            "Elegantly crafted 2 BHK apartment in the world-renowned Hiranandani township overlooking serene Powai Lake and green hills. Neo-classical European architecture, wooden flooring in master suite, clubhouse with Olympic-sized pool, high-street shopping, and international schools at walking distance.",
            json.dumps([
                "Lake View", "Clubhouse & Sports Complex", "Olympic Size Pool", "Badminton & Squash Courts",
                "Piped Gas", "Children's Play Park", "Shopping Galleria", "24/7 Security"
            ]),
            json.dumps({
                "Project Name": "Hiranandani Heritage Powai",
                "RERA Registration": "P51800024410",
                "Possession Status": "Ready to Move",
                "Floor Number": "18th of 28 Floors",
                "Facing Direction": "North-East (Lake Facing)",
                "Furnishing": "Semi-Furnished",
                "Parking": "1 Reserved Covered Park",
                "Water Supply": "24/7 Municipal Supply",
                "Age of Property": "3 Years",
                "Maintenance Charges": "₹6,800 / month"
            }),
            json.dumps([
                {"title": "Powai Lake Promenade", "distance": "400 m", "type": "Lake"},
                {"title": "IIT Bombay Campus", "distance": "1.4 km", "type": "Education"},
                {"title": "Hiranandani Hospital", "distance": "800 m", "type": "Hospital"},
                {"title": "Eastern Express Highway / JVLR", "distance": "2.2 km", "type": "Highway"},
                {"title": "SEEPZ & Andheri East Metro", "distance": "4.5 km", "type": "Metro"}
            ]),
            "Central Avenue, Hiranandani Gardens, Powai, Mumbai 400076",
            "Neha Sharma",
            "+91 98330 44556",
            "neha.s@dreamhomes.in"
        ),
        (
            "Independent Heritage Bungalow",
            "Zig Zag Road, Pali Hill, Bandra West",
            "Bandra West",
            "Mumbai",
            "Maharashtra",
            "India",
            89000000,
            "₹8.90 Cr",
            "Independent House",
            "Buy",
            4,
            4,
            3500,
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ]),
            0,
            "For Sale",
            "Rare standalone independent bungalow in elite Pali Hill, Bandra West. Boasts double-height living room, internal Japanese pebble garden, Burmese teakwood woodwork, home theater room, and private garage.",
            json.dumps(["Private Driveway", "Internal Courtyard", "Teak Wood Interiors", "Home Theater", "Servant Room", "Rooftop Terrace", "CCTV Security"]),
            json.dumps({
                "Project Name": "Pali Hill Private Haven",
                "RERA Registration": "P51800018890",
                "Possession Status": "Ready to Move",
                "Floor Number": "Ground + 1 Floor",
                "Facing Direction": "East Facing",
                "Furnishing": "Semi-Furnished",
                "Parking": "3 Private Cars",
                "Water Supply": "24/7 Dedicated",
                "Age of Property": "5 Years",
                "Maintenance Charges": "₹15,000 / month"
            }),
            json.dumps([
                {"title": "Pali Naka & Cafe Promenade", "distance": "400 m", "type": "Dining"},
                {"title": "Carter Road Promenade", "distance": "900 m", "type": "Sea Face"},
                {"title": "Lilavati Hospital", "distance": "2.0 km", "type": "Hospital"}
            ]),
            "Zig Zag Road, Pali Hill, Bandra West, Mumbai 400050",
            "Aarav Mehta",
            "+91 98201 54321",
            "aarav.mehta@dreamhomes.in"
        ),
        (
            "Executive Skyline Residence",
            "Senapati Bapat Marg, Lower Parel",
            "Lower Parel",
            "Mumbai",
            "Maharashtra",
            "India",
            34000000,
            "₹3.40 Cr",
            "Apartment",
            "Buy",
            3,
            3,
            1800,
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ]),
            0,
            "For Sale",
            "Designer 3 BHK high-rise residence in premier Lower Parel skyscraper, directly adjacent to Palladium Mall and Kamala Mills. Features sky lounge, indoor heated pool, squash court, automated parking, and high-speed lifts.",
            json.dumps(["Sky Lounge", "Indoor Heated Pool", "Automated Parking", "Tennis Court", "Mini Cinema", "Pet Park", "24/7 Concierge"]),
            json.dumps({
                "Project Name": "The Imperial Heights",
                "RERA Registration": "P51900028819",
                "Possession Status": "Ready to Move",
                "Floor Number": "26th of 50 Floors",
                "Facing Direction": "North-West",
                "Furnishing": "Semi-Furnished",
                "Parking": "2 Automated Bays",
                "Water Supply": "24/7 Municipal",
                "Age of Property": "Under 3 Years",
                "Maintenance Charges": "₹11,000 / month"
            }),
            json.dumps([
                {"title": "High Street Phoenix & Palladium", "distance": "300 m", "type": "Mall"},
                {"title": "Lower Parel Monorail & Railway", "distance": "600 m", "type": "Transit"},
                {"title": "One World Center Business Park", "distance": "800 m", "type": "Office"}
            ]),
            "Senapati Bapat Marg, Lower Parel, Mumbai 400013",
            "Aarav Mehta",
            "+91 98201 54321",
            "aarav.mehta@dreamhomes.in"
        ),
        (
            "Sunlit Sea-Breeze Rental Flat",
            "Lokhandwala Complex, Andheri West",
            "Andheri West",
            "Mumbai",
            "Maharashtra",
            "India",
            65000,
            "₹65,000/month",
            "Apartment",
            "Rent",
            2,
            2,
            950,
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ]),
            0,
            "For Rent",
            "Fully furnished designer 2 BHK apartment for lease in vibrant Lokhandwala Complex, Andheri West. High floor with cross ventilation, modular kitchen, branded appliances, gym membership, and 24/7 security.",
            json.dumps(["Fully Furnished", "Air Conditioned", "Modular Kitchen", "Gym Access", "Gated Security", "Near Metro Station"]),
            json.dumps({
                "Project Name": "Lokhandwala Heights",
                "RERA Registration": "P51800014299",
                "Possession Status": "Ready to Move",
                "Floor Number": "11th of 16 Floors",
                "Facing Direction": "West Facing",
                "Furnishing": "Fully Furnished",
                "Parking": "1 Reserved Covered Park",
                "Water Supply": "24/7 Municipal",
                "Age of Property": "4 Years",
                "Maintenance Charges": "Included in Rent"
            }),
            json.dumps([
                {"title": "Lokhandwala Market Promenade", "distance": "200 m", "type": "Shopping"},
                {"title": "DN Nagar Metro Station", "distance": "1.4 km", "type": "Metro"},
                {"title": "Kokilaben Dhirubhai Ambani Hospital", "distance": "1.1 km", "type": "Hospital"},
                {"title": "Versova Beach", "distance": "2.2 km", "type": "Beach"}
            ]),
            "Lokhandwala Complex, Andheri West, Mumbai 400053",
            "Neha Sharma",
            "+91 98330 44556",
            "neha.s@dreamhomes.in"
        ),
        (
            "Serene Greenview Apartment",
            "Ghodbunder Road, Thane West",
            "Thane, Maharashtra",
            "Thane",
            "Maharashtra",
            "India",
            8500000,
            "₹85 Lakh",
            "Apartment",
            "Buy",
            2,
            2,
            920,
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ]),
            0,
            "For Sale",
            "Spacious 2 BHK home adjoining Yeoor Hills in Thane West. Enjoy cool mountain breeze, clean air, jogging tracks, multi-tier security, and clubhouse.",
            json.dumps(["Yeoor Hills View", "Jogging Track", "Clubhouse", "24/7 Power Backup", "Covered Parking", "Intercom"]),
            json.dumps({
                "Project Name": "Yeoor Green Park",
                "RERA Registration": "P51700021980",
                "Possession Status": "Ready to Move",
                "Floor Number": "9th of 24 Floors",
                "Facing Direction": "East Facing",
                "Furnishing": "Semi-Furnished",
                "Parking": "1 Open Park",
                "Water Supply": "24/7 Supply",
                "Age of Property": "2 Years",
                "Maintenance Charges": "₹3,500 / month"
            }),
            json.dumps([
                {"title": "Viviana Mall", "distance": "3.5 km", "type": "Mall"},
                {"title": "Thane Railway Station", "distance": "6.2 km", "type": "Transit"},
                {"title": "Jupiter Hospital", "distance": "3.8 km", "type": "Hospital"}
            ]),
            "Ghodbunder Road, Thane West, Mumbai MMR 400615",
            "Rohan Kulkarni",
            "+91 97690 33441",
            "rohan.k@dreamhomes.in"
        ),
        (
            "Bandra Promenade Luxury Sea-View Flat",
            "Perry Cross Road, Bandra West",
            "Bandra West",
            "Mumbai",
            "Maharashtra",
            "India",
            175000,
            "₹1.75 Lakh/month",
            "Apartment",
            "Rent",
            3,
            3,
            1850,
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ]),
            1,
            "For Rent",
            "Spacious 3 BHK premium sea-facing apartment on Perry Cross Road in Bandra West. Fully furnished with Italian marble flooring, modular kitchen, balcony with panoramic sea breeze, 2 reserved parking slots.",
            json.dumps(["Sea Facing", "Fully Furnished", "Italian Marble", "2 Reserved Parkings", "Clubhouse", "24/7 Security", "Power Backup"]),
            json.dumps({
                "Project Name": "Perry Crest Haven",
                "RERA Registration": "P51800021401",
                "Possession Status": "Ready to Move",
                "Floor Number": "12th of 18 Floors",
                "Facing Direction": "West (Sea Facing)",
                "Furnishing": "Fully Furnished Designer Decor",
                "Parking": "2 Covered Reserved Bays",
                "Water Supply": "24/7 Dedicated Connection",
                "Age of Property": "2 Years",
                "Maintenance Charges": "Included in Rent"
            }),
            json.dumps([
                {"title": "Carter Road Promenade", "distance": "500 m", "type": "Promenade"},
                {"title": "Pali Hill Cafes & Dining", "distance": "700 m", "type": "Dining"},
                {"title": "Bandra Railway Station", "distance": "2.0 km", "type": "Transit"}
            ]),
            "Perry Cross Road, Bandra West, Mumbai 400050",
            "Aarav Mehta",
            "+91 98201 54321",
            "aarav.mehta@dreamhomes.in"
        ),
        (
            "BKC Executive Serviced Residence",
            "G Block, Bandra Kurla Complex (BKC)",
            "BKC",
            "Mumbai",
            "Maharashtra",
            "India",
            120000,
            "₹1.20 Lakh/month",
            "Apartment",
            "Rent",
            2,
            2,
            1200,
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ]),
            0,
            "For Rent",
            "Corporate executive 2 BHK apartment in prime Bandra Kurla Complex. Ideal for CXOs and financial district professionals. Includes smart home automation, rooftop infinity pool, gym, and 24/7 concierge.",
            json.dumps(["Near Corporate Hub", "Smart Home Automation", "Rooftop Pool", "Gym", "Concierge Service", "100% Power Backup"]),
            json.dumps({
                "Project Name": "BKC Apex Suites",
                "RERA Registration": "P51800029810",
                "Possession Status": "Ready to Move",
                "Floor Number": "15th of 26 Floors",
                "Facing Direction": "North-East",
                "Furnishing": "Fully Furnished",
                "Parking": "1 Reserved Covered Park",
                "Water Supply": "24/7 Municipal",
                "Age of Property": "1 Year",
                "Maintenance Charges": "Included in Rent"
            }),
            json.dumps([
                {"title": "Jio World Drive & Convention Centre", "distance": "600 m", "type": "Mall"},
                {"title": "Bandra-Kurla Complex Financial Hub", "distance": "300 m", "type": "Business Hub"},
                {"title": "BKC Metro Station", "distance": "500 m", "type": "Metro"}
            ]),
            "G Block, Bandra Kurla Complex, Mumbai 400051",
            "Pooja Singhania",
            "+91 98190 87654",
            "pooja.s@dreamhomes.in"
        ),
        (
            "Powai Lakefront High-Rise Apartment",
            "Clifford Avenue, Hiranandani Gardens, Powai",
            "Powai",
            "Mumbai",
            "Maharashtra",
            "India",
            95000,
            "₹95,000/month",
            "Apartment",
            "Rent",
            3,
            3,
            1500,
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            json.dumps([
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            ]),
            0,
            "For Rent",
            "Scenic 3 BHK lake-facing residence in Hiranandani Gardens Powai. Features open balconies overlooking Powai Lake, access to clubhouse, tennis courts, and walking distance to international schools and high-street cafes.",
            json.dumps(["Powai Lake View", "Clubhouse Membership", "Olympic Pool", "Tennis Court", "Gated Security", "Piped Gas"]),
            json.dumps({
                "Project Name": "Hiranandani Lake Boulevard",
                "RERA Registration": "P51800025112",
                "Possession Status": "Ready to Move",
                "Floor Number": "20th of 30 Floors",
                "Facing Direction": "North-East (Lake Facing)",
                "Furnishing": "Semi-Furnished",
                "Parking": "1 Reserved Covered Park",
                "Water Supply": "24/7 Corporation",
                "Age of Property": "3 Years",
                "Maintenance Charges": "Included in Rent"
            }),
            json.dumps([
                {"title": "Powai Lake Promenade", "distance": "350 m", "type": "Lake"},
                {"title": "Hiranandani Foundation School", "distance": "500 m", "type": "School"},
                {"title": "Galleria Shopping Arcade", "distance": "600 m", "type": "Shopping"}
            ]),
            "Clifford Avenue, Hiranandani Gardens, Powai, Mumbai 400076",
            "Neha Sharma",
            "+91 98330 44556",
            "neha.s@dreamhomes.in"
        )
    ]

    cursor.executemany('''
        INSERT INTO properties (
            title, location, locality, city, state, country, price, formatted_price, property_type, purpose,
            bedrooms, bathrooms, area_sqft, image_url, gallery, is_featured, badge,
            description, amenities, specifications, nearby, address, agent_name, agent_phone, agent_email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', sample_properties)
