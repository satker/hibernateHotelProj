package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.model.RoomType;
import org.training.example.repository.RoomTypeRepository;

@Mapper(componentModel = "spring")
public abstract class RoomTypeMapper {
    @Autowired
    RoomTypeRepository roomTypeRepository;

    public abstract RoomTypeDTO typeToTypeDTO(RoomType type);

    @Mappings({
            @Mapping(target = "id",
                    expression = "java(roomTypeRepository.findIdByName(type.getName()))")
    })
    public abstract RoomType typeDTOToType(RoomTypeDTO type);
}
