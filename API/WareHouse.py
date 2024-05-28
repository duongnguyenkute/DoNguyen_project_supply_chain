from uuid import uuid4
class WareHouse:
    def __init__(self, location, capacity, temperature, humidity):
        self.ware_house_id  = uuid4()
        self.location = location
        self.capacity = capacity
        self.temperature = temperature
        self.humidity = humidity
        self.inventory = {}
    
    def add_inventory(self, item, quantity, price):
        sum_capacity = 0
        for item in self.inventory:
            sum_capacity += self.inventory[item][0]
        if sum_capacity + quantity <= self.capacity:
            if item in self.inventory:
                self.inventory[item][0]+= quantity
                self.inventory[item][1] = price
            else:
                self.inventory[item] = [quantity, price]
            return 1
        return -1

    def remove_inventory(self, item, quantity):
        if item in self.inventory and self.inventory[item][0] >= quantity:
            self.inventory[item][0] -= quantity
            return {item: (quantity, self.inventory[item][1])}
        else:
            return None
        