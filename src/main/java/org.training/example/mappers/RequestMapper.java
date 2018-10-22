package org.training.example.mappers;

import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.RequestDTO;
import org.training.example.dto.RoomDTO;
import org.training.example.model.Request;
import org.training.example.model.Room;
import org.training.example.repository.RequestRepository;

@Mapper(componentModel = "spring")
public abstract class RequestMapper {
    @Autowired
    RequestRepository requestRepository;

    @Autowired
    RoomMapper roomMapper;

    @Mappings({
            @Mapping(target = "rooms",
                    expression = "java(roomsToRoomDtos(requestRepository.findRoomsByRequestId(request.getId())) )")
    })
    public abstract RequestDTO requestToRequestDTO(Request request);

    public Set<RoomDTO> roomsToRoomDtos(Set<Room> rooms){
        return rooms.stream().map(roomMapper::roomToRoomDTO).collect(Collectors.toSet());
    }
}