package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.training.example.dto.RoomDTO;
import org.training.example.model.Room;
import org.training.example.repository.PhotoRepository;
import org.training.example.repository.RoomParameterRepository;

@Mapper(componentModel = "spring")
@Component
public abstract class RoomMapper {
    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoMapper photoMapper;

    @Autowired
    RoomTypeMapper roomTypeMapper;

    @Autowired
    CapacityMapper capacityMapper;

    @Autowired
    RoomParameterRepository roomParameterRepository;

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeToTypeDTO(room.getRoomType()))"),
            @Mapping(target = "photos",
                    expression = "java(photoRepository.findAllByRoomTypeId(room.getRoomType().getId()).stream()" +
                            ".map(photoMapper::photoToPhotoDTO).collect(java.util.stream.Collectors.toSet()))"),
    })
    public abstract RoomDTO roomToRoomDTO(Room room);

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(roomTypeMapper.typeDTOToType(roomDTO.getRoomType()))")
    })
    public abstract Room roomDTOToRoom(RoomDTO roomDTO);
}
