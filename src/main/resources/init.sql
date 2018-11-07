insert into countries (country_code, name)
values ('USA', 'United States of America');

insert into cities (name, country_id)
values ('Fafa Island', 1);

insert into hotels (address, hotel_name, description, latitude, longitude, stars, url, city_id)
values ('Elisabethstr. 87, Schwabing West, 80797 Munich, Germany', 'NukuAlofa', '<div id="summary" class="" data-et-mouseenter="customGoal:BUeeZaTaTaBEKMPXLae:1 customGoal:BUeeHNSPdMPISWXGBbLPYO:1" data-et-click="customGoal:BUeeZaTaTaBEKMPXLae:2 customGoal:BUeeHNSPdMPISWXGBbLPYO:2">
<div class="chain-content ">
</div>
<p>This hostel in the popular Schwabing district of Munich offers free Wi-Fi, a restaurant with beer garden, and easy transport connections to sights including the Marienplatz square.</p>
<p>Hostel Haus international offers neat and clean rooms of variable sizes with simple furnishings and either a private or shared bathroom. The accommodations is a center for school trips and study visits and a vibrant meeting place for people from all over the world.</p>
<p>Varied breakfast buffets and international cuisine are on offer at the restaurant every day. Guests can enjoy drinks at the bar or outside on the terrace.</p>
<p>Leisure activities at the Hostel Haus International include billiards and table tennis. Guests can join guided city tours, rent a bike, or dance in the Discovery nightclub.</p>
<p>Barbarastraße bus and tram stop is opposite Hostel haus international, and Hohenzollernplatz Underground Station is also just a 10-minute walk away. Direct trains travel to Munich Central Station in 5 minutes. Other Munich attractions such as the Allianz Arena, English Garden, Olympic Park, Marienplatz and the Theresienwiese (Oktoberfest venue) are easily reached from here.
<br></p>
</div>', 222.3, 3322.3, 4, 'http://www.datelinehotel.com/', 1);

insert into capacities (adults, children)
values (2, 4);
insert into capacities (adults, children)
values (2, 0);
insert into capacities (adults, children)
values (1, 0);
insert into capacities (adults, children)
values (0, 1);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Twin Room', '2 twin beds', 2, 1);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Six-Bed Room', '2 twin beds  and  4 bunk beds ', 1, 1);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Single Room', '1 twin bed', 3, 1);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Bed in 4-Bed Dormitory Room', '1 bunk bed', 4, 1);
insert into rooms (cost_night, number, room_size, room_type_id)
VALUES (12.2, 1, 19, 1);
insert into rooms (cost_night, number, room_size, room_type_id)
VALUES (14.2, 2, 14, 1);
insert into rooms (cost_night, number, room_size, room_type_id)
VALUES (10.2, 3, 10, 2);
insert into rooms (cost_night, number, room_size, room_type_id)
VALUES (1.2, 4, 13, 3);
insert into rooms (cost_night, number, room_size, room_type_id)
VALUES (2.2, 5, 14, 3);
insert into rooms (cost_night, number, room_size, room_type_id)
VALUES (9.2, 6, 16, 4);
insert into parameters (parameter)
values ('Shower');
insert into parameters (parameter)
values ('TV');
insert into parameters (parameter)
values ('Hairdryer');
insert into parameters (parameter)
values ('Free toiletries');
insert into parameters (parameter)
values ('Toilet');
insert into parameters (parameter)
values ('Private Bathroom');
insert into parameters (parameter)
values ('Heating');
insert into room_parameter (parameter_id, room_id)
VALUES (1, 1);
insert into room_parameter (parameter_id, room_id)
VALUES (2, 1);
insert into room_parameter (parameter_id, room_id)
VALUES (3, 1);
insert into room_parameter (parameter_id, room_id)
VALUES (5, 1);
insert into room_parameter (parameter_id, room_id)
VALUES (7, 1);
insert into room_parameter (parameter_id, room_id)
VALUES (2, 2);
insert into room_parameter (parameter_id, room_id)
VALUES (4, 2);
insert into room_parameter (parameter_id, room_id)
VALUES (5, 2);
insert into room_parameter (parameter_id, room_id)
VALUES (6, 2);
insert into room_parameter (parameter_id, room_id)
VALUES (7, 2);
insert into room_parameter (parameter_id, room_id)
VALUES (1, 3);
insert into room_parameter (parameter_id, room_id)
VALUES (3, 3);
insert into room_parameter (parameter_id, room_id)
VALUES (4, 3);
insert into room_parameter (parameter_id, room_id)
VALUES (5, 3);
insert into room_parameter (parameter_id, room_id)
VALUES (7, 3);
insert into room_parameter (parameter_id, room_id)
VALUES (2, 4);
insert into room_parameter (parameter_id, room_id)
VALUES (3, 4);
insert into room_parameter (parameter_id, room_id)
VALUES (4, 4);
insert into room_parameter (parameter_id, room_id)
VALUES (6, 4);
insert into room_parameter (parameter_id, room_id)
VALUES (7, 4);
insert into room_parameter (parameter_id, room_id)
VALUES (1, 5);
insert into room_parameter (parameter_id, room_id)
VALUES (2, 5);
insert into room_parameter (parameter_id, room_id)
VALUES (4, 5);
insert into room_parameter (parameter_id, room_id)
VALUES (6, 5);
insert into room_parameter (parameter_id, room_id)
VALUES (7, 5);
insert into room_parameter (parameter_id, room_id)
VALUES (1, 6);
insert into room_parameter (parameter_id, room_id)
VALUES (3, 6);
insert into room_parameter (parameter_id, room_id)
VALUES (4, 6);
insert into room_parameter (parameter_id, room_id)
VALUES (6, 6);
insert into room_parameter (parameter_id, room_id)
VALUES (7, 6);

insert into photos (photo_url, hotel_id)
values ('https://s-ec.bstatic.com/images/hotel/max1024x768/440/44051317.jpg', 1);
insert into photos (photo_url, hotel_id)
values ('https://t-ec.bstatic.com/images/hotel/max1024x768/440/44051160.jpg', 1);
insert into photos (photo_url, hotel_id)
values ('https://t-ec.bstatic.com/images/hotel/max1024x768/440/44051554.jpg', 1);
insert into photos (is_main, photo_url, hotel_id)
VALUES (true,
        'https://s-ec.bstatic.com/xdata/images/hotel/square200/46511537.jpg?k=051881b36a7a6c29a8b4b2cf731e97af35a5956af63d2994454c333d336d99f6&o=',
        1);


insert into room_type_photo (photo_id, room_type_id)
values (1, 1);

insert into room_type_photo (photo_id, room_type_id)
values (2, 2);

insert into room_type_photo (photo_id, room_type_id)
values (3, 3);