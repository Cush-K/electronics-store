from models import db, Item
from app import app

with app.app_context():
    
    print("Clearing DB...")
    Item.query.delete()
    
    print("Seeding Item Data..")
    items = [
        {
            "title": "Apple iPhone 14 Pro Max Smartphone - 6GB RAM, 128GB ROM, 6.7 inches Display",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/AppleiPhone14ProMaxSmartphone-i1_500x.jpg?v=1666765332",
            "price": 19500.00,  
            "quantity": 5
        },
        {
            "title": "Lenovo V15 G2 Laptop (82KB001UUE) - 15.6 Inch Display, 11th Generation Core i5, 4GB RAM/1TB Hard Disk Drive",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/LenovoV15G2Laptop-1_500x.jpg?v=1653633202",
            "price": 65000.00,
            "quantity": 7
        },
        {
            "title": "Lenovo IdeaPad Gaming 3 Laptop - 11th Gen Intel Core i7-11370H, 16GB RAM, 1TB HDD + 256GB SSD, NVIDIA GTX 1650 4GB GDDR6 Graphics, 15.6 Inch FHD 1920x1080 IPS 120Hz, 4-Zone RGB Backlit Keyboard, Black - 82K10051UE",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/da_500x.jpg?v=1660812138",
            "price": 157999.00,
            "quantity": 10
        },
        {
            "title": "Logitech K380 Multi-Device Bluetooth Keyboard - 920-007558, 920-009599, 920-009600",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/k380-i-1_500x.jpg?v=1622885697",
            "price": 7000.00,
            "quantity": 3
        },
        {
            "title": "Logitech M221 Silent Wireless Mouse",
            "image": "https://www.digitalstore.co.ke/cdn/shop/files/LogitechM221SilentWirelessMouse-i1_500x.jpg?v=1698405779",
            "price": 4899.00,
            "quantity": 11
        },
        {
            "title": "TP-Link Home Security Wi-Fi Camera - Tapo C200 Pan/Tilt - TL-TAPO C200",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/Tapo-C200_EU_1.0_1908_English_01_normal_1568705560286e_500x.png?v=1595432253",
            "price": 6000.00,
            "quantity": 2
        },
        {
            "title": "Foscam C2M Wireless Indoor Security Camera - 1080HD, 2MP CCTV",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/Foscam_500x.jpg?v=1599133540",
            "price": 8350.00,
            "quantity": 22
        },
        {
            "title": "Xiaomi Redmi Note 11 Smart Phone 4GB 128GB 6.43 Display",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/Redmi-note-11-2_a0dd5163-7a56-48a9-9f2d-07df739941a3_225x.jpg?v=1647590362",
            "price": 23000.00,
            "quantity": 9
        },
        {
            "title": "Tecno Spark 7 Pro Smartphone 4GB RAM, 128 GB Storage",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/tecno-spark-7-pro-i1_350x.jpg?v=1635594638",
            "price": 14499.00,
            "quantity": 1
        },
        {
            "title": "Samsung Galaxy F62 Smartphone, 6GB RAM 128GB ROM, 7000mAh Battery",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/Samsung-Galaxy-F62_500x.jpg?v=1649493586",
            "price": 40000.00,
            "quantity": 8
        },
        {
            "title": "Sony BDV-N9200WL AC1200w 3D Blu-ray Home Theater Systems Bluetooth with Wireless Speakers",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/Sony_BDV-N9200WL_1200w_3D_Blu-ray_Home_Theater_Systems_Bluetooth_with_Wireless_Speakers_-image-1_264x.jpg?v=1557583644",
            "price": 99000.00,
            "quantity": 3
        },
        {
            "title": "HP Smart Tank 500 All-in-One Printer",
            "image": "https://www.digitalstore.co.ke/cdn/shop/products/hp-smart-tank-500-i1_500x.png?v=1644999093",
            "price": 28999.00,
            "quantity": 3
        }
    ]

    for item in items:
        new_item = Item(
            title=item['title'],
            image=item['image'],
            price=float(item['price']),
            quantity=item['quantity']
        )
        db.session.add(new_item)
        db.session.commit()
    print("Database seeded successfully!")

