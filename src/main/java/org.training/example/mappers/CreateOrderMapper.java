package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import org.training.example.dto.CreateOrder;
import org.training.example.dto.OrderDTO;

@Mapper(componentModel = "spring")
@Component
public abstract class CreateOrderMapper {

    public abstract OrderDTO createOrderToOrder(CreateOrder createOrder);
}
