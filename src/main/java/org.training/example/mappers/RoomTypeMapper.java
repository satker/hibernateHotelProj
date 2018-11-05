package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.model.RoomType;
import org.training.example.repository.PhotoRepository;
import org.training.example.repository.RoomTypeRepository;

@Mapper(componentModel = "spring")
public abstract class RoomTypeMapper {
    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoMapper photoMapper;

    @Autowired
    CapacityMapper capacityMapper;

    @Mappings({
            @Mapping(target = "capacity",
                    expression = "java(capacityMapper.capacityToCapacityDto(type.getCapacity()))"),
            @Mapping(target = "photos",
                    expression = "java( photoRepository.findAllByRoomTypeId(type.getId()).stream()" +
                            "                .map(photoMapper::photoToPhotoDTO).collect(java.util.stream.Collectors.toSet()) )")
    })
    public abstract RoomTypeDTO typeToTypeDTO(RoomType type);

    @Mappings({
            @Mapping(target = "id",
                    expression = "java(roomTypeRepository.findIdByName(type.getName()))"),
            @Mapping(target = "capacity",
                    expression = "java(capacityMapper.capacityDtoToCapacity(type.getCapacity()))")
    })
    public abstract RoomType typeDTOToType(RoomTypeDTO type);
}
