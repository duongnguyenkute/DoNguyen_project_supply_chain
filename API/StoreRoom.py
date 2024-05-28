from uuid import uuid4

class StoreRoom:
    def __init__(self, location, capacity, inventory, temperature, humidity):
        self.store_room_id = uuid4()
        self.location = location
        self.capacity = capacity
        self.inventory = inventory
        self.temperature = temperature
        self.humidity = humidity

    def place_order(self, item, quantity):
        if item in self.inventory and self.inventory[item][0] >= quantity:
            self.inventory[item][0] -= quantity
            return {item : [quantity, self.inventory[item][1]]}
        else:
            return None
    def add__inventory(self,goods, count, price, ware_house_id, shipment_id):
        sum_capacity = 0
        for item in self.inventory:
            sum_capacity+= self.inventory[item][0]
        if(sum_capacity + count <= self.capacity):
            if goods in self.inventory:
                print(goods)
                self.inventory[goods][0] += count
                self.inventory[goods][1] = price
            else:
                self.inventory[goods] = [count, price]
            return 1
        return 0
    

# a = StoreRoom((10.95421, 3.123415), 60, {"computer": [10, 400], "Mouse": [20, 300], 'keyboard': [10, 200]}, 28)

# print(a.place_order("computer", 10))

# print("after order: ")

# print(a.inventory)

# a.add__inventory('headphone', 4, 350, '412x683', '412x021f')

# print("after add inventory: ")

# print(a.inventory)