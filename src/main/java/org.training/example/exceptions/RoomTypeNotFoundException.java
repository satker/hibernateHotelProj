package org.training.example.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Slf4j
public class RoomTypeNotFoundException extends RuntimeException {
    public RoomTypeNotFoundException(long roomTypeId) {
        super("could not find roomType '" + roomTypeId + "'.");
        log.error("room type not found by id {}", roomTypeId);

    }
}
