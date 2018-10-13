package org.training.example.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
@Slf4j
public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException(long id) {
        super("could not accessed to user" + id + "'.");
        log.error("Access denied to id {}", id);
    }
}
