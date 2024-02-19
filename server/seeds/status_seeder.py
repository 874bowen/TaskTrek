from flask_seeder import Seeder
from src.models.status import Status
from app import db

class StatusSeeder(Seeder):
    def run(self):
        with open('src/data/status.txt', 'r') as file:
            for line in file:
                status_name, hex_color = line.strip().split(',') 
                print("Seeding status with name: ", status_name, " and hex_color: ", hex_color)
                status = Status(status=status_name, hex_color=hex_color)
                db.session.add(status)
                db.session.commit()