package org.training.example.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.RequestDTO;
import org.training.example.exceptions.AccessDeniedException;
import org.training.example.exceptions.RoomRequestNotFoundException;
import org.training.example.mappers.RequestMapper;
import org.training.example.model.Request;
import org.training.example.repository.RequestRepository;
import org.training.example.repository.RoomTypeRepository;

@Service
@AllArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final UserService userService;
    private final RoomTypeRepository roomTypeRepository;


    public List<RequestDTO> findByAccountUsername(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return requestRepository.
                findByUserId(id).
                stream().
                //filter(item -> confirmedRequestRepository.findConfirmedRequestByRequest(item) == null).
                map(requestMapper::requestToRequestDTO).
                collect(Collectors.toList());
    }

    public List<RequestDTO> findRequestsByAccountUsername(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return requestRepository.
                findByUserId(id).
                stream().
                map(requestMapper::requestToRequestDTO).
                collect(Collectors.toList());
    }

    public RequestDTO findValidateRoom(long id, String login) {
        log.debug("room request has been found for validate user by id {}", id);
        long userId = userService.findUserByLogin(login).getId();
        Request findedRequest = requestRepository.getOne(id);
        if (findedRequest != null){
            throw new RoomRequestNotFoundException(id);
        }
        RequestDTO parsedToDto = requestMapper.requestToRequestDTO(findedRequest);
        if (findByAccountUsername(userId).contains(parsedToDto)) {
            return parsedToDto;
        } else {
            throw new AccessDeniedException(userId);
        }
    }

    public RequestDTO findOne(long id) {
        log.debug("room request has been found by id {}", id);
        return requestMapper.requestToRequestDTO(requestRepository.getOne(id));
    }

    public void deleteRoomRequestById(long id) {
        log.debug("room request has been deleted by id {}", id);
        requestRepository.delete(requestRepository.getOne(id));
    }
}
