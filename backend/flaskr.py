from flask import Flask
from flask_restful import Resource, Api
import json, csv, random
import utm

app = Flask(__name__)
api = Api(app)

POINTS = []
MAX_DATA_POINTS = 10000

class Heatmap(Resource):
    def __init__(self):
        """points is a list of 2-element lists containing lat and long"""

    def parse(self, file):
        """parse the file object and save into internal datastore"""
        # csv_reader = csv.reader(file, delimiter=',')

        lines = file.readlines()
        index = 0

        for rowLine in lines:
            row = rowLine.strip().split("\t")
            print(row)


            # filter out to only >= 2013
            if int(row[0]) < 2013:
                continue

            latitude = row[1]
            longitude = row[2]
            point = {"latitude" : latitude, "longitude" : longitude}

            # randomly add the same data point multiple times
            choice = random.randint(0,100)

            if (choice < 65):
                num = 0;
            elif choice < 70:
                num = 1
            elif choice < 80:
                num = 3
            elif choice < 90:
                num = 6
            else:
                num = 12

            for i in range(num):
                movedPoint = dict(point)
                movedPoint['latitude'] += random.uniform(-0.00001, 0.00001)
                movedPoint['longitude'] += random.uniform(-0.00001, 0.00001)
                POINTS.append(point)

            if (index > MAX_DATA_POINTS):
                return
            else:
                index += 1

    def get(self):
        """GET request for data - return point list"""
        return POINTS


api.add_resource(Heatmap, '/')

if __name__ == '__main__':
    heatMap = Heatmap()

    with open('fake_data.tab', 'r') as file:
        heatMap.parse(file)

    print(heatMap.get())
    app.run(debug=True)