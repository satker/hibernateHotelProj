package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.training.example.dto.CapacityDto;
import org.training.example.model.Capacity;

@Mapper(componentModel = "spring")
public abstract class CapacityMapper {
    public abstract CapacityDto capacityToCapacityDto(Capacity capacity);

    public abstract Capacity capacityDtoToCapacity(CapacityDto capacityDto);

    public abstract List<Capacity> capacityDtosToCapacities(List<CapacityDto> capacityDtos);

    public abstract List<CapacityDto> CapacitiesToCapacityDTOs(List<Capacity> capacities);
}
