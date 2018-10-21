package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.ConfirmedRequestDTO;
import org.training.example.model.ConfirmedRequest;

@Mapper(componentModel = "spring")
public abstract class ConfirmedRequestMapper {
    @Autowired
    UserMapper userMapper;

    @Autowired
    RequestMapper requestMapper;

    @Autowired
    RoomMapper roomMapper;

    @Mappings({
            @Mapping(target = "user",
                    expression = "java(userMapper.userDtoToUser(confirmDTO.getUser()))"),
            @Mapping(target = "request",
                    expression = "java(requestMapper.requestDTOToRequest(confirmDTO.getRequest()))"),
            @Mapping(target = "room",
                    expression = "java(roomMapper.roomDTOToRoom(confirmDTO.getRoom()))")
    })
    public abstract ConfirmedRequest confirmDTOToConfirm(ConfirmedRequestDTO confirmDTO);

    @Mappings({
            @Mapping(target = "user", expression = "java( userMapper.userToUserDto(confirm.getUser()) )"),
            @Mapping(target = "request", expression = "java( requestMapper.requestToRequestDTO(confirm.getRequest()) )"),
            @Mapping(target = "room", expression = "java( roomMapper.roomToRoomDTO(confirm.getRoom()) )")
    })
    public abstract ConfirmedRequestDTO confirmToConfirmDTO(ConfirmedRequest confirm);

    public abstract List<ConfirmedRequestDTO> confirmsToConfirmDTOs(List<ConfirmedRequest> confirms);

    public abstract List<ConfirmedRequest> confirmDTOsToConfirm(List<ConfirmedRequestDTO> confirmDTO);
}
