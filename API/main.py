import mysql.connector
import math
from typing import List, Dict, Union
from pydantic import BaseModel
from datetime import date
import random
from time import sleep

from config import user, password

class Item(BaseModel):
    data: list


# Thực hiện kết nối đến cơ sở dữ liệu MySQL với chỉ định schema
mydb = mysql.connector.connect(
    host="localhost",
    user=user,
    password= password,
    database="digital_twin",
    # auth_plugin='mysql_native_password'
)

# Tạo đối tượng cursor để thực hiện các truy vấn SQL
mycursor = mydb.cursor()

from fastapi import FastAPI
#  python -m uvicorn main:app --reload

import logging
import json
from uuid import uuid4
import mysql.connector
import datetime

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Có thể thay thế "*" bằng danh sách các nguồn cho phép cụ thể
    allow_credentials=True,
    allow_methods=["*"],  # Có thể thay thế "*" bằng danh sách các phương thức HTTP được cho phép
    allow_headers=["*"],  # Có thể thay thế "*" bằng danh sách các tiêu đề HTTP được cho phép
)

# Thực hiện kết nối đến cơ sở dữ liệu MySQL với chỉ định schema
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ilm01665585538",
    database="digital_twin",
    # auth_plugin='mysql_native_password'
)

# Tạo đối tượng cursor để thực hiện các truy vấn SQL
mycursor = mydb.cursor(dictionary=True)

# def get_truck_state(storeroom_id):
#     credential = DefaultAzureCredential()
#     service_client = DigitalTwinsClient(url, credential)
#     query_expression = "select * from digitaltwins where IS_OF_MODEL('dtmi:com:contoso:truckshipment;1')"
#     query_result = service_client.query_twins(query_expression)
#     twins = []
#     for twin in query_result:
#         twins.append(twin)
#     return twins


@app.get('/')
def root_function():
    return {
        "Hello" : "Hello World!"
    }

# Liên quan đến Good:
@app.get('/create-goods')
def create_goods_info(goods: str):
    digital_twin_id = str(uuid4())
    sql = "INSERT INTO goods (GoodsID, GoodsName) VALUES (%s, %s)"
    val = (digital_twin_id, goods)
    mycursor.execute(sql, val)

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()
    return {"id":digital_twin_id, "GoodsName": goods }


# Liên quan đến StoreRoom:
@app.get('/create-storeroom')
def store_room_info(stock_level: int, location: str, humidity: int, temperature: int ):
    store_room_id = str(uuid4())

    sql = "INSERT INTO storeroom (StoreRoomID, Location, StockLevel, Humidity, Temperature) VALUES (%s, %s, %s, %s, %s)"
    val = (store_room_id, location, stock_level, humidity, temperature)
    mycursor.execute(sql, val)

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()

    # Trả về thông tin về phòng kho đã tạo
    return {
        "StoreRoomID": store_room_id,
        "Location": location,
        "StockLevel": stock_level,
        "Humidity": humidity,
        "Temperature": temperature
    }

@app.get('/get-storeroom-by-location')
def get_storeroom_by_location(storeroom_locaton: str):
    sql = "SELECT * FROM storeroom WHERE Location = %s"
    val = (storeroom_locaton,)
    mycursor.execute(sql, val)
    mydb.commit()

    # Lấy kết quả của truy vấn
    storerooms = mycursor.fetchall()

    # Trả về danh sách các phòng kho thỏa mãn điều kiện
    return {"id": storerooms[0]['StoreRoomID'],
            'humidity': storerooms[0]["Humidity"],
            "stock_level": storerooms[0]["StockLevel"], 
            "temperature": storerooms[0]["Temperature"]}



# Nhập hàng hóa vào trong storeroom:
@app.get('/add-goods-to-storeroom')
def add_goods_to_storeroom(storeroom_id: str, goods_id:str,  Count:int, Price: int, billDetailID: str ):

    new_is_shiped_value = 1

    # Update the record
    update_query = "UPDATE billdetail SET IsShiped = %s WHERE BillDetailID = %s"
    val_update = (new_is_shiped_value, billDetailID,)
    mycursor.execute(update_query, val_update)

    sql_check_exist = "SELECT * FROM goods_storeroom WHERE GoodsID = %s AND StoreRoomID = %s"
    val_check_exist = (goods_id, storeroom_id)
    mycursor.execute(sql_check_exist, val_check_exist)
    existing_record = mycursor.fetchone()

    if existing_record:
        # Nếu mặt hàng đã tồn tại trong kho, cập nhật số lượng và giá
        print(existing_record)
        updated_count = existing_record["Count"] + Count
        sql_update = "UPDATE goods_storeroom SET Count = %s, Price = %s WHERE GoodsID = %s AND StoreRoomID = %s"
        val_update = (updated_count, Price, goods_id, storeroom_id)
        mycursor.execute(sql_update, val_update)
    else:
        # Nếu mặt hàng chưa tồn tại trong kho, thêm vào kho
        goods_storeroom_id = str(uuid4())
        sql_insert = "INSERT INTO goods_storeroom (GoodsStoreroomID, GoodsID, StoreRoomID, Count, Price) VALUES (%s, %s, %s, %s, %s)"
        val_insert = (goods_storeroom_id, goods_id, storeroom_id, Count, Price)
        mycursor.execute(sql_insert, val_insert)

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()

    # Trả về thông tin của mặt hàng vừa thêm vào
    sql_select = "SELECT * FROM goods_storeroom WHERE GoodsID = %s AND StoreRoomID = %s"
    val_select = (goods_id, storeroom_id)
    mycursor.execute(sql_select, val_select)
    new_record = mycursor.fetchone()
    mydb.commit()
    return new_record
    

# Lấy Thông tin về hàng hóa trong storeroom hiện tại:
@app.get('/relationship-storeroom-good')
def get_relationship_storeroom_good(storeroom_id: str ):

    inventory = []
    print(storeroom_id)

    # Truy vấn SQL để lấy thông tin về mối quan hệ giữa phòng kho và hàng hóa

    sql = """Select * from goods_storeroom st join goods g on st.GoodsID = g.GoodsID where st.StoreroomID = %s"""

    # Thực hiện truy vấn SQL với StoreRoomID được truyền vào
    mycursor.execute(sql, (storeroom_id,))
    l1_results = mycursor.fetchall()

    sql = """Select * from goods"""

    # Thực hiện truy vấn SQL với StoreRoomID được truyền vào
    mycursor.execute(sql)
    l2_results = mycursor.fetchall()
    for item in l1_results:
        id = item['GoodsStoreroomID']
        inventory.append({
            'dtId': id,
            'GoodsID': item['GoodsID'],
            'goodsname': item['GoodsName'],
            'Count': item['Count'],
            'Price': item['Price']
        })
    for item1 in l2_results:
        flag = 0
        for item2 in l1_results:
            if item1["GoodsID"] == item2["GoodsID"]:
                flag = 1
                break
        if flag == 0:
            inventory.append({
                'dtId': "",
                'GoodsID': item1['GoodsID'],
                'goodsname': item1['GoodsName'],
                'Count': 0,
                'Price': 0
            })

    # Duyệt qua kết quả và thêm thông tin hàng hóa vào danh sách inventory
    # for item in results:
    #     id = item['GoodsStoreroomID']
    #     if(item['GoodsStoreroomID'] == "N/A"):
    #         id = ""
    #     inventory.append({
    #         'dtId': id,
    #         'GoodsID': item['GoodsID'],
    #         'goodsname': item['GoodsName'],
    #         'Count': item['Count'],
    #         'Price': item['Price']
    #     })
    # print(inventory)
    print(inventory)
    mydb.commit()
    return inventory


@app.get('/get-store-room')
def get_store_room_digital_twin():
    sql_select = "SELECT * FROM storeroom"
    mycursor.execute(sql_select)
    new_record = mycursor.fetchall()

    records = []

    for item in new_record:
        item["$dtId"] = item["StoreRoomID"]
        records.append(item)
    mydb.commit()
    return records
    

@app.get('/order-goods')
def get_order_goods_on_store_room(goods_storeroom_id: str, remaining: int, price: int):
    sql_update = "UPDATE goods_storeroom SET Count = %s, Price = %s WHERE GoodsStoreroomID = %s"
    val_update = (remaining, price, goods_storeroom_id)
    mycursor.execute(sql_update, val_update)

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()
    sql_select = "SELECT * FROM goods_storeroom WHERE GoodsStoreroomID = %s"
    val_select = (goods_storeroom_id,)
    mycursor.execute(sql_select, val_select)
    new_record = mycursor.fetchone()
    mydb.commit()
    return new_record

# Liên quan đến TruckShipment

@app.get('/create-truckshipment')
def truckshipment_info_create(stock_level: int, location: str, humidity: float, temperature: float ):
    truckshipment_id = str(uuid4())

    sql = "INSERT INTO truckshipment (TruckShipmentID, Location, StockLevel, Humidity, Temperature) VALUES (%s, %s, %s, %s, %s)"
    val = (truckshipment_id, location, stock_level, humidity, temperature)
    mycursor.execute(sql, val)

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()

    # Trả về thông tin về phòng kho đã tạo
    return {
        "StoreRoomID": truckshipment_id,
        "Location": location,
        "StockLevel": stock_level,
        "Humidity": humidity,
        "Temperature": temperature
    }

# Lấy thông tin xe tải đang chở hàng cho kho hàng:

@app.get('/get-shipment-by-warehouse')
def get_shipment_by_warehouse(warehouse_id: str):
    query = "SELECT * FROM truckshipment WHERE WarehouseID = %s"
    mycursor.execute(query, (warehouse_id,))
    shipment_data = mycursor.fetchone()
    mydb.commit()
    return {
        "id": shipment_data["TruckShipmentID"],
        "location": shipment_data["Location"],
        "temperature": shipment_data["Temperature"],
        "humidity": shipment_data["Humidity"],
        "warehouseid": shipment_data["WarehouseID"],
    }
    # return {"id": item['ST']['$dtId'],"location" : item['ST']['Location'], "temperature": item["ST"]["Temperature"],"humidity" : item["ST"]["Humidity"]}


# Lên lịch trình giao hàng goods_id đến cửa hàng storeroom_id thông qua xe tải truckshipment_id

### Lấy thông tin của 3 digital model để xây dựng map:

@app.get('/select-all-twin')
def selecl_all_twin_data():
    sql = '''SELECT w.WarehouseID as wid,
        w.StockLevel as wStockLevel,
        w.Location as wLocation,
        w.Temperature as wTemperature,
        w.Humidity as wHumitidy,
        t.truckshipmentID as tid,
        t.Location as tLocation,
        t.StockLevel as tStockLevel,
        t.Temperature as tTemperature,
        t.Humidity as tHumitidy  FROM warehouse w join truckshipment t on w.WarehouseID = t.WarehouseID'''
    mycursor.execute(sql)

    # Lấy kết quả của truy vấn
    warehousesql = mycursor.fetchall()
    warehousetruck  = []
    for item in warehousesql:
        wLatiture = float(item["wLocation"].split()[0])
        wLongtiture  = float(item["wLocation"].split()[1])
        tLatiture = float(item["tLocation"].split()[0])
        tLongtiture  = float(item["tLocation"].split()[1])
        item["wLatiture"] = wLatiture
        item["wLongtiture"] = wLongtiture
        item["tLatiture"] = tLatiture
        item["tLongtiture"] = tLongtiture
        warehousetruck.append(item)
    # Trả về danh sách các phòng kho thỏa mãn điều kiện
    sql = '''select * from storeroom'''
    mycursor.execute(sql)

    storeroomsql = mycursor.fetchall()

    storerooms  = []
    for item in storeroomsql:
        Latiture = float(item["Location"].split()[0])
        Longtiture  = float(item["Location"].split()[1])
        item['id'] = item["StoreRoomID"]
        item["Latiture"] = Latiture
        item["Longtiture"] = Longtiture
        storerooms.append(item)
    mydb.commit()
    return {
        "waretruck":warehousetruck,
        'storerooms': storerooms,
    }

#Lấy thông tin về danh sách các kho hàng:
@app.get('/get-ware-house')
def get_ware_house_digital_twin():
    
    sql = '''SELECT Location, Temperature, StockLevel, Humidity, WarehouseID as $dtId from warehouse'''
    mycursor.execute(sql)

    # Lấy kết quả của truy vấn
    warehousesql = mycursor.fetchall()
    mydb.commit()

    return warehousesql

# Liên quan đến WareHouse

@app.get('/create-warehouse')
def store_room_info(stock_level: int, location: str, humidity: int, temperature: int ):
    digital_twin_id = str(uuid4())
    sql = "INSERT INTO warehouse (WarehouseID, StockLevel, Location, Humidity, Temperature) VALUES (%s, %s, %s, %s, %s)"
    val = (digital_twin_id, stock_level, location, humidity, temperature)
    mycursor.execute(sql, val)

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()
    return {"complete": "commit Completed"}


# Nhập hàng hóa vào trong Ware-house:
@app.get('/add-goods-to-warehouse')
def add_goods_to_warehouse(warehouse_id: str, goods_id:str, goods_warehouse_id: str,  count:int, price: int, remaining: int   ):
    if(goods_warehouse_id != ""):
        mycursor.execute("UPDATE goods_warehouse SET Count = %s, Price = %s WHERE GoodsWarehouseID = %s",
                        (count, price, goods_warehouse_id))
        mydb.commit()
    else:
        goods_warehouse_dtID = str(uuid4())
        mycursor.execute("INSERT INTO goods_warehouse (GoodsWarehouseID, GoodsID, WarehouseID, Count, Price) VALUES (%s, %s, %s, %s, %s)",
                     (goods_warehouse_dtID, goods_id, warehouse_id, count, price))
        mydb.commit()
    return 1
# Xuất hàng hóa khỏi warehouse đến storeroom:
@app.get('/ship-goods-to-storeroom')
def get_order_goods_on_store_room(goods_storeroom_id: str, remaining: int, price: int):
    mycursor.execute("UPDATE goods_storeroom SET Count = %s, Price = %s WHERE GoodsStoreroomID = %s",
                    (remaining, price, goods_storeroom_id))
    mydb.commit()

    return {
        "goods_warehouse_id": goods_storeroom_id,
        'remaining': remaining,
        'price': price
    }
@app.get('/ship-goods-to-warehouse')
def get_order_goods_on_store_room(goods_warehouse_id: str, remaining: int, price: int):
    mycursor.execute("UPDATE goods_warehouse SET Count = %s, Price = %s WHERE GoodsWarehouseID = %s",
                    (remaining, price, goods_warehouse_id))
    mydb.commit()

    return {
        "goods_warehouse_id": goods_warehouse_id,
        'remaining': remaining,
        'price': price
    }


# Lấy Thông tin về hàng hóa trong relationship-warehouse-good? hiện tại:
@app.get('/relationship-warehouse-good')
def get_relationship_warehouse_good(warehouse_id: str ):


    inventory = []
    print(warehouse_id)

    # Truy vấn SQL để lấy thông tin về mối quan hệ giữa phòng kho và hàng hóa

    sql = """Select * from goods_warehouse st join goods g on st.GoodsID = g.GoodsID where st.WarehouseID = %s"""

    # Thực hiện truy vấn SQL với StoreRoomID được truyền vào
    mycursor.execute(sql, (warehouse_id,))
    l1_results = mycursor.fetchall()

    # return l1_results
    sql = """Select * from goods"""

    # Thực hiện truy vấn SQL với StoreRoomID được truyền vào
    mycursor.execute(sql)
    l2_results = mycursor.fetchall()
    for item in l1_results:
        id = item['GoodsWarehouseID']
        inventory.append({
            'id': id,

            'dtId': item['GoodsID'],
            'goodsname': item['GoodsName'],
            'Count': item['Count'],
            'Price': item['Price']
        })
    for item1 in l2_results:
        flag = 0
        for item2 in l1_results:
            if item1["GoodsID"] == item2["GoodsID"]:
                print(item1["GoodsName"])
                print(item2["GoodsName"])
                flag = 1
                break
        if flag == 0:
            inventory.append({
                'id': "",
                'dtId': item1['GoodsID'],
                'goodsname': item1['GoodsName'],
                'Count': 0,
                'Price': 0
            })

    print(inventory)
    mydb.commit()
    return inventory
# Chỉnh sửa đoạn code này,


# @app.get('/ship-goods-to-store-by-truck')
# def add_goods_to_storeroom_by_truck(storeroom_id: str, goods_id:str, truckshipment_id: str,  count:int, price: float   ):
#     credential = DefaultAzureCredential()
#     service_client = DigitalTwinsClient(url, credential)
#     digital_twin_id = uuid4()
    
#     now = datetime.datetime.now()
    
#     temp_twin = {
#     "$metadata": {
#         "$model": "dtmi:com:contoso:truckshipmentgoodsstoreroom;1" 
#     },
#     "$dtId": digital_twin_id,
#     "Count": count,
#     "Price": price,
#     "TimeCreated": str(now),
#     "TimeCompleted": ""
#     }

# # Chỉnh sửa đoạn code này,
# @app.get('/delete-shipment-info')
# def delete_shipment_info(shipment_id):
#     credential = DefaultAzureCredential()
#     service_client = DigitalTwinsClient(url, credential)
#     digital_twin_id = shipment_id
#     relationships = service_client.list_incoming_relationships(digital_twin_id) # list the twins relationships
#     for relationship in relationships:
#         relationship_id = relationship.relationship_id
#         service_client.delete_relationship(relationship.source_id, relationship_id)
#     service_client.delete_digital_twin(digital_twin_id)
#     return 1

# @app.get('/get-truck-shipment')
# def get_truck_shipment_digital_twin():
    
#     credential = DefaultAzureCredential()
#     service_client = DigitalTwinsClient(url, credential)
#     query_expression = "select * from digitaltwins where IS_OF_MODEL('dtmi:com:contoso:truckshipment;1')"
#     query_result = service_client.query_twins(query_expression)
#     twins = []
#     for twin in query_result:

#         truck_shipment_info = {"$dtId": twin['$dtId'],
#                                "StockLevel":  twin['StockLevel'],
#                                "Location": twin["Location"],
#                                "Humidity": twin["Humidity"],
#                                "Temperature": twin["Temperature"]}
#         # twins.append()
#         rl1 = service_client.list_incoming_relationships(twin['$dtId'])
#         for r in rl1:
#             source_id = r.source_id
#             query_expression = f"select * from digitaltwins dt where dt.$dtId='{source_id}'"
#             query_result = service_client.query_twins(query_expression)
#             for item_quer in query_result:
#                 # print(item_quer)
#                 truck_shipment_info["WareHouseLocation"] = item_quer["Location"]
        
#         rl2= service_client.list_relationships(twin['$dtId'])
#         truck_shipment_info["is_free"] = True
#         for item in rl2:
#             truck_shipment_info["is_free"] = False
#             # print(item)
#             # print("\n\n")
#             rl3 = service_client.list_incoming_relationships(item["$targetId"])
#             target_id = item["$targetId"]
#             for item1 in rl3:
                
#                 if item1.relationship_name == "containertruckgoods":
#                     storeroom_id = item1.source_id
#                 elif item1.relationship_name == "containertruckstoreroom":
#                     good_id = item1.source_id
#             query_expression1 = f"select * from digitaltwins dt where dt.$dtId='{storeroom_id}'"
#             query_expression2 = f"select * from digitaltwins dt where dt.$dtId='{good_id}'"
#             query_expression3 =  f"select * from digitaltwins dt where dt.$dtId='{target_id}'"

#             query_result1 = service_client.query_twins(query_expression1)
#             query_result2 = service_client.query_twins(query_expression2)
#             query_result3 = service_client.query_twins(query_expression3)


#             for item1, item2, item3 in zip(query_result1, query_result2, query_result3):
#                 # inventory[item1['GoodsName']] = {"Count": item2["Count"],"Price": item2["Price"]}
#                 truck_shipment_info["StoreLocation"] = item1['Location']
#                 truck_shipment_info["Count"] = item3["Count"]
#                 truck_shipment_info["Price"] = item3["Price"]
#                 truck_shipment_info["GoodsName"] = item2["GoodsName"]
#                 truck_shipment_info["GoodsTruckStoreroomId"] = item["$targetId"]
#                 truck_shipment_info["GoodsId"] = good_id
#                 truck_shipment_info["storeroom_id"] = storeroom_id
#         twins.append(truck_shipment_info)
        
#     return twins
# @app.get("/set-truckshipment-for-warehouse")
# def set_truckshipment_for_warehouse(warehouse_id: str, truckshipment_id: str):
#     credential = DefaultAzureCredential()
#     service_client = DigitalTwinsClient(url, credential)
#     digital_twin_id = uuid4()
#     relationship1 = {
#         	# give the relationship some unique id
#         	"$relationshipId": uuid4(), 
#         	# give the id of the source twin
#         	"$sourceId": warehouse_id, 
#         	# give the relationship name as defined in the model
# 		#  Định nghĩa tên của RelationShip như tên đã đề cập trong model
#         	"$relationshipName": "containershipment", 
#         	# give the id of the target twin
#         	"$targetId": truckshipment_id ,
#     	}

#     # make the call to create the relationship
#     rel1 = service_client.upsert_relationship(
#         relationship1["$sourceId"],
#         relationship1["$relationshipId"],
#         relationship1
#     )
#     return rel1




def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Bán kính trái đất (đơn vị: km)

    # Chuyển đổi độ sang radian
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Tính khoảng cách giữa hai điểm
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c

    return distance
@app.get("/test-order-from-warehouse")
def order_from_warehouse(StoreRoomID: str,
                        GoodsID: str,
                        Count: int):
    sql = "SELECT Location FROM storeroom WHERE StoreroomID = %s"
    val = (StoreRoomID,)
    mycursor.execute(sql, val)

    # Lấy kết quả của truy vấn
    storeroom_result = mycursor.fetchone()
    # return storeroom_result
    Latiture = float(storeroom_result["Location"].split()[0])
    Longtiture  = float(storeroom_result["Location"].split()[1])
    storeroom_result["Latiture"] = Latiture
    storeroom_result['Longtiture'] = Longtiture

    sql = "SELECT * FROM goods_warehouse gw join warehouse w on gw.WarehouseID = w.WarehouseID where gw.GoodsID = %s "
    val = (GoodsID,)
    mycursor.execute(sql, val)

    goods_warehouse_result = mycursor.fetchall()
    # return goods_warehouse_result
    list_gw_result = []

    for item in goods_warehouse_result:
        Latiture = float(item["Location"].split()[0])
        Longtiture  = float(item["Location"].split()[1])
        distance  = haversine(lat1= storeroom_result["Latiture"], lon1= storeroom_result["Longtiture"], lat2=Latiture, lon2= Longtiture)
        
        shipment_ot = 0

        if(distance < 100): pass
        elif (distance < 200): shipment_ot = 1
        elif distance < 450: shipment_ot = 2
        else: shipment_ot =3

        shipment_time = date.today() + datetime.timedelta(days=shipment_ot)
        
        list_gw_result.append({ "distance": distance, "ShipmentDate": shipment_time ,"GoodsID": item["GoodsID"], "Count": item["Count"], "Price": item['Price'], "WarehouseID":item['WarehouseID'], "WLocation": item["Location"] })
    
    sorted_data = sorted(list_gw_result, key=lambda x: x["distance"])

    remaining_quantity = Count

    list_order_goods = []

    for item in sorted_data:
        if(remaining_quantity == 0):
            break
        if(item["Count"]!= 0):
            order_quantity = min(remaining_quantity, item["Count"])
            remaining_quantity = remaining_quantity - order_quantity
            item["order_quantity"] = order_quantity
            item["StoreRoomID"]  = StoreRoomID
            list_order_goods.append(item)
    mydb.commit()
    return {
        "list_order" : list_order_goods,
        "remaining": remaining_quantity
    }


@app.get("/test-order-from-warehouse-v2")
def order_from_warehouse(items: List[Dict[str, Union[str, int]]]):
    
    try:
        # Process the list of items
        for item in items:
            StoreRoomID = item.get('StoreRoomID')
            GoodsID = item.get('GoodsID')
            Count = item.get('Count')
            # Your logic for ordering goods goes here
            # ...

        # Return a success message
        return {"message": "Order placed successfully"}
    except Exception as e:
        # Handle any errors (e.g., invalid input, database connection issues, etc.)
        return {"error": str(e)}
    

@app.post("/process_item")
def process_item(orderDetail: Item):
    list_order_data = {}
    for item in orderDetail:
        for item2 in item[1]:
            item_order_data = item2["data"]["list_order"]
            for item3 in item_order_data:
                if(item3["WarehouseID"] not in list_order_data):
                        list_order_data[item3["WarehouseID"]] = [{"GoodsID": item3["GoodsID"],
                                                           "order_quantity": item3["order_quantity"],
                                                           "Price": item3["Price"],
                                                           "StoreRoomID": item3["StoreRoomID"],
                                                           "ShipmentDate": item3["ShipmentDate"]
                                                        }]
                else:
                    list_order_data[item3["WarehouseID"]].append({"GoodsID": item3["GoodsID"],
                                                           "order_quantity": item3["order_quantity"],
                                                           "Price": item3["Price"],
                                                           "StoreRoomID": item3["StoreRoomID"],
                                                           "ShipmentDate": item3["ShipmentDate"]
                                                        })
    
    for key, value in list_order_data.items():
        print("waerhoseid: ", key)

        print(value[0]["StoreRoomID"])

        warehouse_id = key
        store_room_id = value[0]['StoreRoomID']
        create_at = str(date.today())
        
        
        bill_id = str(uuid4())
        sql = "INSERT INTO bill (BillID, CreateAt, StoreRoomID, WarehouseID) VALUES (%s, %s, %s, %s)"
        val = (bill_id, create_at, store_room_id, warehouse_id)

        # Tạo con trỏ để thực thi câu lệnh SQL
        mycursor = mydb.cursor()
        mycursor.execute(sql, val)

        sql1 = "select Location from storeroom where StoreRoomID = %s"
        val1 = (store_room_id,)

        # Tạo con trỏ để thực thi câu lệnh SQL
        mycursor1 = mydb.cursor()
        mycursor1.execute(sql1, val1)
        storeroom_location = mycursor1.fetchone()[0]
        print("storeroom location", storeroom_location)

        SLatiture = float(storeroom_location.split()[0])
        SLongtiture  = float(storeroom_location.split()[1])
        # # Chọn danh sách các xe tải ship hàng đến cho cửa hàng, chọn xe tải ở
        sql1 = "select TruckshipmentID from truckshipment where WarehouseID = %s"
        val1 = (warehouse_id,)

        # Tạo con trỏ để thực thi câu lệnh SQL
        mycursor1 = mydb.cursor()
        mycursor1.execute(sql1, val1)
        truckshipement_id = mycursor1.fetchone()[0]

        print("truckshipment id: ", truckshipement_id)

        for item in value:
            print(item)
            bill_detail_id  = str(uuid4())
            count = item["order_quantity"]
            price = item["Price"]
            # shipment_time = '30/06/2024'
            shipment_time= item["ShipmentDate"]
            goods_id = item["GoodsID"]

            sql2 = "INSERT INTO billdetail (BillDetailID, Count, Price, ShipmentTime, BillID, GoodsID, TruckShipmentID, IsShiped) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            val2 = (bill_detail_id, count, price, shipment_time, bill_id, goods_id, truckshipement_id, False,)
            mycursor2 = mydb.cursor()
            mycursor2.execute(sql2, val2)
            

    mydb.commit()
    return {"StoreroomID": store_room_id}


@app.get('/get-truckshipment')
def get_truck_shipment_digital_twin():
    sql_select = "SELECT t.*, w.Location as WLocation  FROM truckshipment t join warehouse w on w.WarehouseID = t.WarehouseID"
    mydb.cursor(dictionary=True)
    mycursor.execute(sql_select)
    new_record = mycursor.fetchall()

    records = []

    for item in new_record:
        item["$dtId"] = item["TruckShipmentID"]
        records.append(item)
    mydb.commit()
    return records

@app.get("/get-shipment-info")
def get_shipment_info(truckshipment_id: str):
    

    sql= "SELECT * from billdetail where TruckShipmentID = %s"
    val= (truckshipment_id,)
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute(sql, val)
    truckshipment_info = mycursor.fetchall()

    mydb.commit()
    return truckshipment_info

@app.get("/get-shipment-storeroom-info")
def get_shipment_storeroom_info(truckshipment_id: str, storeroom_location: str):


    if len(storeroom_location) == 0:
        sql= "SELECT bd.*, g.GoodsName, st.Location as SLocation, st.StoreroomID as StoreroomID from billdetail bd join bill b on bd.BillID = b.BillID join storeroom st on st.StoreroomID = b.StoreroomID join goods g on bd.GoodsID = g.GoodsID where bd.IsShiped = 0 and bd.TruckShipmentID = %s" 
        val= (truckshipment_id,)
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute(sql, val)
        truckshipment_info = mycursor.fetchall()

        for item in truckshipment_info:
            print("item: ", item)
        mydb.commit()
        return truckshipment_info
    else:
        sql= "SELECT bd.*, g.GoodsName, st.Location as SLocation, st.StoreroomID as StoreroomID from billdetail bd join bill b on bd.BillID = b.BillID join storeroom st on st.StoreroomID = b.StoreroomID join goods g on bd.GoodsID = g.GoodsID where bd.TruckShipmentID = %s and st.Location = %s and bd.IsShiped = 0" 
        val= (truckshipment_id, storeroom_location,)
        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute(sql, val)
        truckshipment_info = mycursor.fetchall()
        mydb.commit()
    return truckshipment_info

@app.post("/confirm-cargo-list")
def process_confirm_cargo_list(cargo_list_item: Item):

    for item2 in cargo_list_item:
        for item1 in item2[1]:
            # print("item1: ", item1)
            new_is_shiped_value = 1
            billDetailID = item1["BillDetailID"]
            goods_id = item1["GoodsID"]
            storeroom_id = item1["StoreroomID"]
            Count = item1["Count"]
            Price = item1["Price"]

            # Update the record
            update_query = "UPDATE billdetail SET IsShiped = %s WHERE BillDetailID = %s"
            val_update = (new_is_shiped_value, billDetailID,)
            mycursor.execute(update_query, val_update)

            sql_check_exist = "SELECT * FROM goods_storeroom WHERE GoodsID = %s AND StoreRoomID = %s"
            val_check_exist = (goods_id, storeroom_id)
            mycursor.execute(sql_check_exist, val_check_exist)
            existing_record = mycursor.fetchone()

            if existing_record:
                # Nếu mặt hàng đã tồn tại trong kho, cập nhật số lượng và giá
                print(existing_record)
                updated_count = existing_record["Count"] + Count
                sql_update = "UPDATE goods_storeroom SET Count = %s, Price = %s WHERE GoodsID = %s AND StoreRoomID = %s"
                val_update = (updated_count, Price, goods_id, storeroom_id)
                mycursor.execute(sql_update, val_update)
            else:
                # Nếu mặt hàng chưa tồn tại trong kho, thêm vào kho
                goods_storeroom_id = str(uuid4())
                sql_insert = "INSERT INTO goods_storeroom (GoodsStoreroomID, GoodsID, StoreRoomID, Count, Price) VALUES (%s, %s, %s, %s, %s)"
                val_insert = (goods_storeroom_id, goods_id, storeroom_id, Count, Price)
                mycursor.execute(sql_insert, val_insert)

            # Lưu thay đổi vào cơ sở dữ liệu

            # Trả về thông tin của mặt hàng vừa thêm vào
    # mydb.commit()

    return 1