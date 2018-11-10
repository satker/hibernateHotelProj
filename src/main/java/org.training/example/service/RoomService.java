package org.training.example.service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.RoomDTO;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.exceptions.RoomNotFoundException;
import org.training.example.mappers.RoomMapper;
import org.training.example.mappers.RoomTypeMapper;
import org.training.example.model.Room;
import org.training.example.repository.RoomRepository;

@Service
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;
    private final RoomTypeMapper roomTypeMapper;

    private Set<Room> roomsForCurrentOrder;

    public RoomService(RoomRepository roomRepository,
                       RoomMapper roomMapper,
                       RoomTypeMapper roomTypeMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
        this.roomTypeMapper = roomTypeMapper;
    }

    public Set<Room> getRoomsForCurrentOrder() {
        return roomsForCurrentOrder;
    }

    public void setRoomsForCurrentOrder(Set<Room> roomsForCurrentOrder) {
        this.roomsForCurrentOrder = roomsForCurrentOrder;
    }

    public Set<RoomDTO> findRoomsByHotelId(long hotelId) {
        return roomRepository.
                findByHotelId(hotelId).
                stream().
                map(roomMapper::roomToRoomDTO).collect(Collectors.toSet());
    }

    public void deleteRoomById(long id) {
        log.debug("room has been deleted by id {}", id);
        roomRepository.delete(roomRepository.getOne(id));
    }

    public RoomDTO findOne(long id) {
        log.debug("room has been found by id {}", id);
        Room findedRoom = roomRepository.getOne(id);
        if (findedRoom == null) {
            throw new RoomNotFoundException(id);
        }
        return roomMapper.roomToRoomDTO(findedRoom);
    }

    public void save(RoomDTO request) {
        log.debug("room has been saved {}", request);
        roomRepository.save(roomMapper.roomDTOToRoom(request));
    }

    public Set<RoomTypeDTO> findAvailableRooms(AddRoomRequestDTO input, long hotelId) {
        Set<Room> foundRooms;
        if (input.getDepartureDate() != null && input.getDepartureDate() != null
                && input.getChildren().equals("0") && input.getChildren().equals("0") && input.getNumbersOfRooms().equals("0")) {
            foundRooms = roomRepository.findAllRoomsByDate(input.getDepartureDate(), input.getDepartureDate(), hotelId);
        } else {
            foundRooms = roomRepository.findRoomsByParams(input.getArrivalDate(), input.getDepartureDate(),
                    Byte.valueOf(input.getAdults()), Byte.valueOf(input.getChildren()),
                    Byte.valueOf(input.getNumbersOfRooms()), hotelId);
        }
        Map<RoomTypeDTO, Set<Room>> roomsByRoomTypes = foundRooms.stream().collect(Collectors.toMap(
                room -> roomTypeMapper.typeToTypeDTO(room.getRoomType()),
                room -> {
                    Set<Room> rooms = new HashSet<>();
                    rooms.add(room);
                    return rooms;
                },
                (room1, room2) -> {
                    room1.addAll(room2);
                    return room1;
                }
        ));

        return roomsByRoomTypes.keySet().stream()
                .peek(roomTypeDTO -> roomTypeDTO.setNumberAvailableRooms
                        ((long) roomsByRoomTypes.get(roomTypeDTO).size())).collect(Collectors.toSet());
    }

    public void snoozeRooms(List<RoomTypeDTO> roomTypeDTOS) {
        roomsForCurrentOrder = roomTypeDTOS.stream().flatMap(roomTypeDTO ->
                roomRepository.findByRoomTypeId(roomTypeDTO.getId()).stream()
                        .limit(roomTypeDTO.getNumberAvailableRooms()))
                .collect(Collectors.toSet());
        snoozedAction(roomsForCurrentOrder, true);
        unsnoozeRooms(roomsForCurrentOrder);
    }

    private void unsnoozeRooms(Set<Room> rooms) {
        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
        Runnable runnable = () -> {
            snoozedAction(rooms, false);
        };
        executorService.schedule(runnable, 15, TimeUnit.MINUTES);
    }

    private void snoozedAction(Set<Room> rooms, boolean action) {
        rooms.stream()
                .peek(room -> room.setIsSnoozed(action))
                .forEach(roomRepository::save);
    }

    public void unsnoozeRoomsWhenGoBack() {
        if (roomsForCurrentOrder != null) {
            snoozedAction(roomsForCurrentOrder, false);
            roomsForCurrentOrder = null;
        }
    }
}
