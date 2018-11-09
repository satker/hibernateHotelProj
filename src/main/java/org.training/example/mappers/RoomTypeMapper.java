package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.model.RoomType;
import org.training.example.repository.PhotoRepository;
import org.training.example.repository.RoomParameterRepository;
import org.training.example.repository.RoomTypeRepository;

@Mapper(componentModel = "spring")
@Component
public abstract class RoomTypeMapper {
    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    PhotoRepository photoRepository;

    @Autowired
    PhotoMapper photoMapper;

    @Autowired
    CapacityMapper capacityMapper;

    @Autowired
    RoomParameterRepository roomParameterRepository;

    @Mappings({
            @Mapping(target = "roomSize",
                    expression = "java(type.getRoomSize())"),
            @Mapping(target = "parameters",
                    expression = "java( roomParameterRepository.findAllByRoomTypeId(type.getId()).stream()" +
                            "                .map(org.training.example.model.RoomTypeParameter::getParameter)" +
                            "                .map(org.training.example.model.Parameter::getParameter)" +
                            "                .collect(java.util.stream.Collectors.toSet()) )"),
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
                    expression = "java(capacityMapper.capacityDtoToCapacity(type.getCapacity()))"),
            @Mapping(target = "roomSize",
                    expression = "java(type.getRoomSize())")
    })
    public abstract RoomType typeDTOToType(RoomTypeDTO type);
}
