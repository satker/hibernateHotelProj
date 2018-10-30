package org.training.example.service;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.RoomDTO;
import org.training.example.exceptions.RoomNotFoundException;
import org.training.example.mappers.RoomMapper;
import org.training.example.model.Room;
import org.training.example.repository.RoomRepository;

@Service
@AllArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public List<RoomDTO> findRoomsByType(long id) {
        log.debug("all rooms have been found by room type id{}", id);
        return roomRepository.
                findByRoomTypeId(id).
                stream().
                map(roomMapper::roomToRoomDTO).collect(Collectors.toList());
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

    public List<RoomDTO> findAvailableRooms(AddRoomRequestDTO input) {
        List<Room> findedRooms = null;
        if (input.getDepartureDate() != null && input.getDepartureDate() != null
                && input.getChildren().equals("0") && input.getChildren().equals("0") && input.getNumbersOfRooms().equals("0")) {
            findedRooms = roomRepository.findAllRoomsByDate(input.getDepartureDate(), input.getDepartureDate());
        } else {
            findedRooms = roomRepository.findRoomsByParams(input.getArrivalDate(), input.getDepartureDate(),
                    Byte.valueOf(input.getAdults()), Byte.valueOf(input.getChildren()),
                    Byte.valueOf(input.getNumbersOfRooms()));
        }
        return findedRooms.stream().map(roomMapper::roomToRoomDTO).collect(Collectors.toList());
    }

    public void snoozeRooms(List<RoomDTO> rooms) {
        snoozedAction(rooms, true);
        unsnoozeRooms(rooms);
    }

    private void unsnoozeRooms(List<RoomDTO> rooms) {
        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
        Runnable runnable = () -> {
            snoozedAction(rooms, false);
        };
        executorService.schedule(runnable, 15, TimeUnit.MINUTES);
    }

    private void snoozedAction(List<RoomDTO> rooms, boolean action) {
        rooms.stream()
                .map(roomMapper::roomDTOToRoom)
                .peek(room -> room.setIsSnoozed(action))
                .forEach(roomRepository::save);
    }
}
