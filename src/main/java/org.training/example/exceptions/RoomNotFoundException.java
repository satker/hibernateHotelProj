package org.training.example.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Slf4j
public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException(long roomId) {
        super("could not find room '" + roomId + "'.");
        log.error("room not found by id {}", roomId);
    }
}
