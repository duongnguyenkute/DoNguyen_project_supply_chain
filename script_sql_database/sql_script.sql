-- create database digital_twin;

use digital_twin;


# Xây dựng cơ sở dữ liệu:
CREATE TABLE goods (
    GoodsID VARCHAR(45) NOT NULL,
    GoodsName VARCHAR(45),
    PRIMARY KEY (GoodsID)
);

CREATE TABLE storeroom (
    StoreRoomID VARCHAR(45) NOT NULL,
    Location VARCHAR(45),
    StockLevel INT,
    Humidity INT,
    Temperature INT,
    PRIMARY KEY (StoreRoomID)
);

CREATE TABLE goods_storeroom (
    GoodsStoreroomID VARCHAR(45) NOT NULL,
    GoodsID VARCHAR(45) NOT NULL,
    StoreRoomID VARCHAR(45) NOT NULL,
    Count INT,
    Price INT,
    PRIMARY KEY (GoodsStoreroomID),
    FOREIGN KEY (GoodsID) REFERENCES goods(GoodsID),
    FOREIGN KEY (StoreRoomID) REFERENCES storeroom(StoreRoomID)
);

CREATE TABLE warehouse (
    WarehouseID VARCHAR(45) NOT NULL,
    Location VARCHAR(45),
    StockLevel INT,
    Humidity INT,
    Temperature INT,
    PRIMARY KEY (WarehouseID)
);

CREATE TABLE goods_warehouse(
    GoodsWarehouseID VARCHAR(45) NOT NULL,
    GoodsID VARCHAR(45) NOT NULL,
    WarehouseID VARCHAR(45) NOT NULL,
    Count INT,
    Price INT,
    PRIMARY KEY (GoodsWarehouseID),
    FOREIGN KEY (GoodsID) REFERENCES goods(GoodsID),
    FOREIGN KEY (WarehouseID) REFERENCES warehouse(WarehouseID)
);

CREATE TABLE truckshipment (
    TruckShipmentID VARCHAR(45) NOT NULL,
    Location VARCHAR(45),
    StockLevel VARCHAR(45),
    Temperature INT,
    Humidity INT,
    WarehouseID VARCHAR(45),
    PRIMARY KEY (TruckShipmentID),
    FOREIGN KEY (WarehouseID) REFERENCES warehouse(WarehouseID)
);

CREATE TABLE bill (
    BillID VARCHAR(45) NOT NULL,
    CreateAt VARCHAR(45),
    StoreRoomID VARCHAR(45),
    WarehouseID VARCHAR(45),
    PRIMARY KEY (BillID),
    FOREIGN KEY (StoreRoomID) REFERENCES storeroom(StoreRoomID),
    FOREIGN KEY (WarehouseID) REFERENCES warehouse(WarehouseID)
);

CREATE TABLE billdetail (
    BillDetailID VARCHAR(45) NOT NULL,
    Count INT,
    Price INT,
    ShipmentTime VARCHAR(45),
    BillID VARCHAR(45),
    GoodsID VARCHAR(45),
    TruckShipmentID VARCHAR(45),
	IsShiped bool,
    PRIMARY KEY (BillDetailID),
    FOREIGN KEY (BillID) REFERENCES bill(BillID),
    FOREIGN KEY (GoodsID) REFERENCES goods(GoodsID),
    FOREIGN KEY (TruckShipmentID) REFERENCES truckshipment(TruckShipmentID)
);
drop table billdetail;




# Chèn dữ liệu:
# Hàng hóa:
INSERT INTO goods (GoodsID, GoodsName) VALUES
 ('3a25b4ea-e107-4164-a564-10288299aac3', 'Shoes'),
  ('2038dedd-fb34-4707-ab9b-1973470d78fb', 'Hat'),
   ('b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d', 'Coca-Cola'),
    ('7b7211bb-4df4-47a4-9d93-5dd0bd4b051e', 'Dress'),
     ('5c3b8e10-2c6d-411d-9d62-0fd26bccfff1', 'T-Shirt');
 select * from goods;

# Chèn dữ liệu warehouse:

INSERT INTO warehouse (WarehouseID, Location, StockLevel, Humidity, Temperature) VALUES 
('bb244a26-79e8-4530-813c-bc68f5d92af9', '10.82309890 106.62966380', 100, 28, 30),
('4dbba466-bf5d-4759-b9bd-cd6ef8066f57', '16.463713 107.590866', 100, 28, 30),
('8646cc1c-e7e3-4513-b5c2-fee8889aa5eb', '21.02450 105.84117', 100, 28, 30);

select * from warehouse;

# Chèn dữ liệu storeRoom:
INSERT INTO storeroom (StoreRoomID, Location, StockLevel, Humidity, Temperature)
VALUES ('00407ab7-7ecc-4daf-9483-d99fd4bd758d', '22.00000000 98.00000000', 100, 28, 30),
('f735a1c9-3bf2-4a10-a3ab-223f891c802b', '12.565679 104.990963', 100, 28, 30),
('f06d25fe-73b5-4397-9ba8-800c20e966c4', '16.047079 108.206230', 100, 28, 30),
('3ab13ca3-4586-49b7-b6b5-f1164eb84c10', '20.84491150 106.68808410', 100, 28, 30);

# Chèn dữ liệu cho bảng goods_storeroom:
INSERT INTO goods_storeroom (GoodsStoreroomID, GoodsID, StoreRoomID, Count, Price) 
VALUES ('GS1', '5c3b8e10-2c6d-411d-9d62-0fd26bccfff1', 'f06d25fe-73b5-4397-9ba8-800c20e966c4', 50, 100);

delete from goods_storeroom;

# Chèn dữ liệu bảng truckshipment:
INSERT INTO truckshipment (TruckShipmentID, Location, StockLevel, Temperature, Humidity, WarehouseID)
VALUES ('9d7e6012-8d78-43b0-bef0-bf3cdd0268b7', '20.00000 105.84117', 100, 30, 28, '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb'),
('68a34f5c-0584-41c0-8448-d06eb28cc746', '11.32309890 105.00000', 100, 30, 28, 'bb244a26-79e8-4530-813c-bc68f5d92af9'),
('9394ea99-2697-4bab-81ab-ab6d57ded77a', '17.000000 107.590866', 100, 30, 28, '4dbba466-bf5d-4759-b9bd-cd6ef8066f57');

select * from truckshipment;

# Chèn dữ liệu cho bảng goods_warehouse:
INSERT INTO goods_warehouse (GoodsWarehouseID, GoodsID, WarehouseID, Count, Price)
VALUES ('GW122', '2038dedd-fb34-4707-ab9b-1973470d78fb', '4dbba466-bf5d-4759-b9bd-cd6ef8066f57', 100, 100),
('GW123', '3a25b4ea-e107-4164-a564-10288299aac3', '4dbba466-bf5d-4759-b9bd-cd6ef8066f57', 100, 100),
('GW124', '5c3b8e10-2c6d-411d-9d62-0fd26bccfff1', '4dbba466-bf5d-4759-b9bd-cd6ef8066f57', 100, 100),
('GW125', '7b7211bb-4df4-47a4-9d93-5dd0bd4b051e', '4dbba466-bf5d-4759-b9bd-cd6ef8066f57', 100, 100),
 ('GW126', 'b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d', '4dbba466-bf5d-4759-b9bd-cd6ef8066f57', 100, 100),

('GW127', '2038dedd-fb34-4707-ab9b-1973470d78fb', '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb', 100, 100),
('GW128', '3a25b4ea-e107-4164-a564-10288299aac3', '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb', 100, 100),
('GW129', '5c3b8e10-2c6d-411d-9d62-0fd26bccfff1', '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb', 100, 100),
('GW1211', '7b7211bb-4df4-47a4-9d93-5dd0bd4b051e', '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb', 100, 100),
('GW1222', 'b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d', '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb', 100, 100),

('GW1233', '2038dedd-fb34-4707-ab9b-1973470d78fb', 'bb244a26-79e8-4530-813c-bc68f5d92af9', 100, 100),
('GW1244', '3a25b4ea-e107-4164-a564-10288299aac3', 'bb244a26-79e8-4530-813c-bc68f5d92af9', 100, 100),
('GW1255', '5c3b8e10-2c6d-411d-9d62-0fd26bccfff1', 'bb244a26-79e8-4530-813c-bc68f5d92af9', 100, 100),
('GW1266', '7b7211bb-4df4-47a4-9d93-5dd0bd4b051e', 'bb244a26-79e8-4530-813c-bc68f5d92af9', 100, 100),
('GW1277', 'b135f545-7c9b-4cf5-8e9c-f9a4f26eb89d', 'bb244a26-79e8-4530-813c-bc68f5d92af9', 100, 100);


# Kiểm tra dữ liệu của các bảng:
select * from storeroom;
select * from warehouse;
select * from goods;
select * from goods_warehouse;
select * from goods_storeroom;
select * from bill;
select * from billdetail;


delete from billdetail;
delete from bill;


# Nhập dữ liệu cho các bảng:


# Liệt kê danh sách hàng hóa trong kho hàng:
SELECT 
    IFNULL(gs.GoodsStoreRoomID, 'N/A') AS GoodsStoreoomID, 
    IFNULL(gs.GoodsID, 'N/A') AS GoodsID, 
    IFNULL(gs.Count, 0) AS Count, 
    IFNULL(gs.Price, 0) AS Price, 
    IFNULL(g.GoodsName, 'N/A') AS GoodsName
FROM 
    goods_storeroom gs
RIGHT JOIN 
    goods g ON gs.GoodsID = g.GoodsID
WHERE 
    gs.StoreroomID = 'f06d25fe-73b5-4397-9ba8-800c20e966c4'

UNION ALL

SELECT 
    'N/A' AS GoodsStoreroomID,
    g.GoodsID AS GoodsID,
    0 AS Count,
    0 AS Price,
    g.GoodsName AS GoodsName
FROM 
    goods g
LEFT JOIN 
    goods_storeroom gs ON g.GoodsID = gs.GoodsID;


select * from truckshipment t join warehouse w on t.WarehouseID = w.WarehouseID;

SELECT * FROM truckshipment t join warehouse w on t.WarehouseID = w.WarehouseID;

-- select * from goods_warehouse where GoodsID = '7b7211bb-4df4-47a4-9d93-5dd0bd4b051e' ;

-- delete from goods_warehouse where GoodsID = '7b7211bb-4df4-47a4-9d93-5dd0bd4b051e' ;


SELECT m.GoodsID, COALESCE(k.Count, 0) AS so_luong
FROM goods m
JOIN goods_warehouse k ON m.GoodsID = k.GoodsID
WHERE k.WarehouseID = '8646cc1c-e7e3-4513-b5c2-fee8889aa5eb';

Select * from goods_storeroom st join goods g on st.GoodsID = g.GoodsID;

SELECT * FROM goods_warehouse gw join warehouse w on gw.WarehouseID = w.WarehouseID where gw.GoodsID = "3a25b4ea-e107-4164-a564-10288299aac3";

SELECT t.*, w.Location as WLocation  FROM truckshipment t join warehouse w on w.WarehouseID = t.WarehouseID;


SELECT * from billdetail where TruckShipmentID = '9d7e6012-8d78-43b0-bef0-bf3cdd0268b7';

SELECT bd.*, g.GoodsName from billdetail bd join bill b on bd.BillID = b.BillID join storeroom st on st.StoreroomID = b.StoreroomID join goods g on bd.GoodsID = g.GoodsID;

SELECT bd.*, g.GoodsName from billdetail bd join bill b on bd.BillID = b.BillID join storeroom st on st.StoreroomID = b.StoreroomID join goods g on bd.GoodsID = g.GoodsID;

SELECT * from billdetail bd join bill b on bd.BillID = b.BillID join storeroom st on st.StoreroomID = b.StoreroomID join goods g on bd.GoodsID = g.GoodsID;

SELECT bd.*, g.GoodsName, st.Location as SLocation from billdetail bd join bill b on bd.BillID = b.BillID join storeroom st on st.StoreroomID = b.StoreroomID join goods g on bd.GoodsID = g.GoodsID where bd.IsShiped = 0;

select * from storeroom;
delete from storeroom;
select * from goods_warehouse;


delete from goods_warehouse;

