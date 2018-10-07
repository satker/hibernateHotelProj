CREATE TABLE hotels (
  id           SERIAL CONSTRAINT pk_hotels PRIMARY KEY,
  hotel_name   TEXT NOT NULL,
  stars        INTEGER,
  price        DOUBLE PRECISION,
  city_name    TEXT NOT NULL,
  country_code TEXT NOT NULL,
  country_name TEXT NOT NULL,
  address      TEXT NOT NULL,
  location     TEXT NOT NULL,
  url          TEXT NULL,
  latitude     DOUBLE PRECISION,
  longitude    DOUBLE PRECISION
);

COPY hotels(hotel_name, stars, price, city_name,
country_code, country_name, address, location,
url, latitude, longitude)
FROM 'D:\Redmi Note 4\DCIM\Aliexpress\hotelsNew.csv' DELIMITER ';' CSV;