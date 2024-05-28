from uuid import uuid4
class Shipment:
    def __init__(self, location, capacity, cargo = [], shipment_type= "truck"):
        self.shipentID = uuid4()
        self.shipment_type = shipment_type
        self.localtion = location
        self.capacity  = capacity
        self.cargo = cargo
    def load_cargo(self, goods, quantity, price, store_room_id):
        sum_capacity = 0
        for item in self.cargo:
            sum_capacity+= item[0]
        if sum_capacity + quantity <= self.capacity:
            for index, item in enumerate(self.cargo):
                if(item[0] == goods & item[3] == store_room_id ):
                    self.cargo[index][1] = quantity
                    self.cargo[index][2] = price
                    return self.cargo[index]
            self.cargo.append([goods, quantity, price, store_room_id])
            return [goods, quantity, price, store_room_id]
        return None
    def unload_cargo(self, store_room_id):
        store_inventory = {}
        for index, item in enumerate(self.cargo):
            if(item[3] == store_room_id):
                store_inventory[item[0]]  =  item
                self.cargo.remove(self.cargo[index])
        return store_inventory
    def move_to(self, location):
        print(f"Truck moved from {self.localtion} to {location}")
        self.localtion = location

# a = Shipment((10.02131, 8.41245), 50)
# print("load cargo")
# a.load_cargo('Computer', 12, 900, '412213124x' )
# print(a.cargo)
# print('unload cargo')
# a.unload_cargo('412213124x')
# print(a.cargo)
# print('moved')
# a.move_to((4.9017, 7.798312))