### Xây dựng mô hình digital twin cho chuỗi cung ứng sản phẩm

## Cài đặt, thiết lập môi trường:

1. Clone respository:

```
git clone https://github.com/SpiderMan-XiaoDo/DoNguyen_project_supply_chain.git
```
2. Thiết lập môi trường phía BE:

```
cd DoNguyen_project_supply_chain
```
```
cd API
```
```
pip install -r requirements.txt
```
2. 1: Thay đổi các thiết lập user, pasword trong file DoNguyen_project_supply_chain/API/config.py

```
password = 'your password'

user = 'your user name'

```
2. 2: Cài đặt cơ sở dữ liệu mySQL trong thư mục: digital_twin_database

2. 3: Khởi động localhost BE:

```
python -m uvicorn main:app --reload
```

3. Thiết lập môi trường phía FE:

Di chuyển về thư mục gốc DoNguyen_project_supply_chain
3. 1 Cài đặt các thư viện:

```
cd supply_chain_app
```

```
npm install
```
3. 2 Khởi động localhosst FE: 
```
npm start
```



