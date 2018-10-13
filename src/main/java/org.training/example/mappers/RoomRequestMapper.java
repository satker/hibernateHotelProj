package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.RoomRequestDTO;
import org.training.example.model.RoomRequest;

@Mapper(componentModel = "spring")
public abstract class RoomRequestMapper {
    @Autowired
    RoomTypeMapper roomTypeMapper;
    @Autowired
    UserMapper userMapper;

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeToTypeDTO(request.getRoomType()))")
    })
    public abstract RoomRequestDTO requestToRequestDTO(RoomRequest request);

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeDTOToType(requestDTO.getRoomType()))")
    })
    public abstract RoomRequest requestDTOToRequest(RoomRequestDTO requestDTO);

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeDTOToType(requestDTO.getRoomType()))"),
            @Mapping(target = "user",
                    expression = "java(requestDTO.getUser())")
    })
    public abstract RoomRequest requestDTOToRequest(AddRoomRequestDTO requestDTO);
}