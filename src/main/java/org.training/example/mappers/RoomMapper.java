package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.RoomDTO;
import org.training.example.model.Room;
import org.training.example.repository.RoomParameterRepository;

@Mapper(componentModel = "spring")
public abstract class RoomMapper {
    @Autowired
    RoomTypeMapper roomTypeMapper;

    @Autowired
    CapacityMapper capacityMapper;

    @Autowired
    RoomParameterRepository roomParameterRepository;

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeToTypeDTO(room.getRoomType()))"),
            @Mapping(target = "roomSize",
                    expression = "java(room.getRoomSize())"),
            @Mapping(target = "parameters",
                    expression = "java(roomParameterRepository." +
                            "findAllByRoomId(room.getId()).stream()" +
                            ".map(org.training.example.model.RoomParameter::getParameter)" +
                            ".map(org.training.example.model.Parameter::getParameter)" +
                            ".collect(java.util.stream.Collectors.toList()) )"),
            @Mapping(target = "capacity",
                    expression = "java(capacityMapper.capacityToCapacityDto(room.getCapacity()))")
    })
    public abstract RoomDTO roomToRoomDTO(Room room);

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeDTOToType(roomDTO.getRoomType()))"),
            @Mapping(target = "roomSize",
                    expression = "java(roomDTO.getRoomSize())"),
            @Mapping(target = "capacity",
                    expression = "java(capacityMapper.capacityDtoToCapacity(roomDTO.getCapacity()))")
    })
    public abstract Room roomDTOToRoom(RoomDTO roomDTO);
}
