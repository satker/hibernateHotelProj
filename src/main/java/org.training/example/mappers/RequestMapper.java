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
import org.training.example.repository.RoomRequestRepository;

@Mapper(componentModel = "spring")
public abstract class RequestMapper {
    @Autowired
    RequestRepository requestRepository;

    @Autowired
    RoomRequestRepository roomRequestRepository;

    @Autowired
    RoomMapper roomMapper;

    @Autowired
    UserMapper userMapper;

    @Mappings({
            @Mapping(target = "payedType",
                    expression = "java( request.getPayedType() )"),
            @Mapping(target = "orderStatus",
                    expression = "java( request.getOrderStatus() )"),
            @Mapping(target = "user",
                    expression = "java( userMapper.userToUserDto(request.getUser()) )"),
            @Mapping(target = "rooms",
                    expression = "java(roomsToRoomDtos(roomRequestRepository." +
                            "findAllByRequestId(request.getId()).stream()" +
                            ".map(org.training.example.model.RoomRequest::getRoom)" +
                            ".collect(java.util.stream.Collectors.toSet())) )")
    })
    public abstract RequestDTO requestToRequestDTO(Request request);

    public Set<RoomDTO> roomsToRoomDtos(Set<Room> rooms){
        return rooms.stream().map(roomMapper::roomToRoomDTO).collect(Collectors.toSet());
    }

    @Mappings({
            @Mapping(target = "payedType",
                    expression = "java( requestDTO.getPayedType() )"),
            @Mapping(target = "orderStatus",
                    expression = "java( request.getOrderStatus() )"),
            @Mapping(target = "user",
                    expression = "java( userMapper.userDtoToUser(requestDTO.getUser()) )"),
    })
    public abstract Request requestDtoToRequest(RequestDTO requestDTO);
}