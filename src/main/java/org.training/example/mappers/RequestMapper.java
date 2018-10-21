package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.RequestDTO;
import org.training.example.model.Request;
import org.training.example.repository.CapacityRepository;
import org.training.example.repository.RoomTypeRepository;

@Mapper(componentModel = "spring")
public abstract class RequestMapper {
    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    CapacityRepository capacityRepository;

    @Autowired
    UserMapper userMapper;

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java(request.getRoomType().getName() )"),
            @Mapping(target = "capacity",
                    expression = "java( request.getCapacity().getValue() )")
    })
    public abstract RequestDTO requestToRequestDTO(Request request);

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java( roomTypeRepository.findRoomTypeByName(requestDTO.getRoomType()) )"),
            @Mapping(target = "capacity",
                    expression = "java( capacityRepository.findCapacityByValue(requestDTO.getCapacity()) )")
    })
    public abstract Request requestDTOToRequest(RequestDTO requestDTO);

    @Mappings({
            @Mapping(target = "roomType",
                    expression = "java( roomTypeRepository.findRoomTypeByName(requestDTO.getRoomType()) )"),
            @Mapping(target = "user",
                    expression = "java(requestDTO.getUser())"),
            @Mapping(target = "capacity",
                    expression = "java( capacityRepository.findCapacityByValue(requestDTO.getCapacity()) )")
    })
    public abstract Request requestDTOToRequest(AddRoomRequestDTO requestDTO);
}