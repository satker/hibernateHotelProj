insert into capacities (adults, children)
values (2, 4);
insert into capacities (adults, children)
values (2, 0);
insert into capacities (adults, children)
values (1, 0);
insert into capacities (adults, children)
values (0, 1);
insert into room_types (description, name, capacity_id,  hotel_id)
values ('Twin Room', '2 twin beds', 2, null);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Six-Bed Room', '2 twin beds  and  4 bunk beds ', 1, null);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Single Room', '1 twin bed', 3, null);
insert into room_types (description, name, capacity_id, hotel_id)
values ('Bed in 4-Bed Dormitory Room', '1 bunk bed', 4, null);
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
insert into parameters(parameter) values ('Shower');
insert into parameters(parameter) values ('TV');
insert into parameters(parameter) values ('Hairdryer');
insert into parameters(parameter) values ('Free toiletries');
insert into parameters(parameter) values ('Toilet');
insert into parameters(parameter) values ('Private Bathroom');
insert into parameters(parameter) values ('Heating');
insert into room_parameter(parameter_id, room_id) VALUES (1, 1);
insert into room_parameter(parameter_id, room_id) VALUES (2, 1);
insert into room_parameter(parameter_id, room_id) VALUES (3, 1);
insert into room_parameter(parameter_id, room_id) VALUES (5, 1);
insert into room_parameter(parameter_id, room_id) VALUES (7, 1);
insert into room_parameter(parameter_id, room_id) VALUES (2, 2);
insert into room_parameter(parameter_id, room_id) VALUES (4, 2);
insert into room_parameter(parameter_id, room_id) VALUES (5, 2);
insert into room_parameter(parameter_id, room_id) VALUES (6, 2);
insert into room_parameter(parameter_id, room_id) VALUES (7, 2);
insert into room_parameter(parameter_id, room_id) VALUES (1, 3);
insert into room_parameter(parameter_id, room_id) VALUES (3, 3);
insert into room_parameter(parameter_id, room_id) VALUES (4, 3);
insert into room_parameter(parameter_id, room_id) VALUES (5, 3);
insert into room_parameter(parameter_id, room_id) VALUES (7, 3);
insert into room_parameter(parameter_id, room_id) VALUES (2, 4);
insert into room_parameter(parameter_id, room_id) VALUES (3, 4);
insert into room_parameter(parameter_id, room_id) VALUES (4, 4);
insert into room_parameter(parameter_id, room_id) VALUES (6, 4);
insert into room_parameter(parameter_id, room_id) VALUES (7, 4);
insert into room_parameter(parameter_id, room_id) VALUES (1, 5);
insert into room_parameter(parameter_id, room_id) VALUES (2, 5);
insert into room_parameter(parameter_id, room_id) VALUES (4, 5);
insert into room_parameter(parameter_id, room_id) VALUES (6, 5);
insert into room_parameter(parameter_id, room_id) VALUES (7, 5);
insert into room_parameter(parameter_id, room_id) VALUES (1, 6);
insert into room_parameter(parameter_id, room_id) VALUES (3, 6);
insert into room_parameter(parameter_id, room_id) VALUES (4, 6);
insert into room_parameter(parameter_id, room_id) VALUES (6, 6);
insert into room_parameter(parameter_id, room_id) VALUES (7, 6);
