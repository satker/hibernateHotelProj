package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.RoomConfirmDTO;
import org.training.example.model.RoomConfirm;

@Mapper(componentModel = "spring")
public abstract class RoomConfirmMapper {
    @Autowired
    UserMapper userMapper;

    @Autowired
    RoomRequestMapper roomRequestMapper;

    @Autowired
    RoomMapper roomMapper;

    @Mappings({
            @Mapping(target = "user",
                    expression = "java(userMapper.userDtoToUser(confirmDTO.getUser()))"),
            @Mapping(target = "request",
                    expression = "java(roomRequestMapper.requestDTOToRequest(confirmDTO.getRequest()))"),
            @Mapping(target = "room",
                    expression = "java(roomMapper.roomDTOToRoom(confirmDTO.getRoom()))")
    })
    public abstract RoomConfirm confirmDTOToConfirm(RoomConfirmDTO confirmDTO);

    @Mappings({
            @Mapping(target = "user", expression = "java( userMapper.userToUserDto(confirm.getUser()) )"),
            @Mapping(target = "request", expression = "java( roomRequestMapper.requestToRequestDTO(confirm.getRequest()) )"),
            @Mapping(target = "room", expression = "java( roomMapper.roomToRoomDTO(confirm.getRoom()) )")
    })
    public abstract RoomConfirmDTO confirmToConfirmDTO(RoomConfirm confirm);

    public abstract List<RoomConfirmDTO> confirmsToConfirmDTOs(List<RoomConfirm> confirms);

    public abstract List<RoomConfirm> confirmDTOsToConfirm(List<RoomConfirmDTO> confirmDTO);
}
