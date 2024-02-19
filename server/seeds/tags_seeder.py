from flask_seeder import Seeder

from src.models.tag import Tag
from app import db, app

class TagsSeeder(Seeder):
    def run(self):
        with open('src/data/tags.txt', 'r') as file:
            for line in file:
                tag_name, tag_hex_color = line.strip().split(',') 
                print("Seeding tag with name: ", tag_name, " and hex_color: ", tag_hex_color)
                status = Tag(tag=tag_name, hex_color=tag_hex_color)
                db.session.add(status)
                db.session.commit()