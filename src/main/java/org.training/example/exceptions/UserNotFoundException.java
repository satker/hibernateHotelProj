package org.training.example.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Slf4j
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(long userId) {
        super("could not find user '" + userId + "'.");
        log.error("user not found by id {}", userId);

    }
}
