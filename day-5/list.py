import os
import csv
 
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
 
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))
 
def main():
        f = open('flights.csv')
        reader = csv.reader(f) 
        for origin, destination, duration in reader:
                db.execute("INSERT INTO flights (origin, destination, duration) VALUES (:origin, :destination, :duration)",
                {"origin":origin,"destination":destination,"duration":duration})
        db.commit()
        flights = db.execute("SELECT origin, destination, duration FROM flights").fetchall()
        for flight in flights:
                print(f"{flight.origin} to {flight.destination}, {flight.duration} minutes.")
 
if __name__ == "__main__":
    main()
