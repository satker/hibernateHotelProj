package org.training.example.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.AddRoomRequestDTO;
import org.training.example.dto.RoomRequestDTO;
import org.training.example.exceptions.AccessDeniedException;
import org.training.example.exceptions.RoomRequestNotFoundException;
import org.training.example.mappers.RoomRequestMapper;
import org.training.example.repository.RoomRequestRepository;
import org.training.example.repository.RoomTypeRepository;

@Service
@AllArgsConstructor
@Slf4j
public class RoomRequestService {
    private final RoomRequestRepository roomRequestRepository;
    private final RoomRequestMapper roomRequestMapper;
    private final UserService userService;
    private final RoomTypeRepository roomTypeRepository;


    public List<RoomRequestDTO> findByAccountUsername(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return roomRequestRepository.
                findByUserId(id).
                stream().
                filter(item -> !item.isDone()).
                map(roomRequestMapper::requestToRequestDTO).
                collect(Collectors.toList());
    }

    public List<RoomRequestDTO> findRequestsByAccountUsername(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return roomRequestRepository.
                findByUserId(id).
                stream().
                map(roomRequestMapper::requestToRequestDTO).
                collect(Collectors.toList());
    }

    public RoomRequestDTO findValidateRoom(long id, String login) {
        log.debug("room request has been found for validate user by id {}", id);
        long userId = userService.findUserByLogin(login).getId();
        if (findByAccountUsername(userId).
                contains(roomRequestMapper.
                        requestToRequestDTO(roomRequestRepository.
                                findById(id).
                                get()))) {
            return roomRequestMapper.requestToRequestDTO(roomRequestRepository.findById(id).orElseThrow(() -> new RoomRequestNotFoundException(id)));
        } else {
            throw new AccessDeniedException(userId);
        }
    }

    public void save(AddRoomRequestDTO request) {
        log.debug("room request has been saved {}", request);
        System.out.println(roomTypeRepository.findIdByName(request.getRoomType().getName()));
        roomRequestRepository.save(roomRequestMapper.requestDTOToRequest(request));
    }

    public RoomRequestDTO findOne(long id) {
        log.debug("room request has been found by id {}", id);
        return roomRequestMapper.requestToRequestDTO(roomRequestRepository.getOne(id));
    }

    public void deleteRoomRequestById(long id) {
        log.debug("room request has been deleted by id {}", id);
        roomRequestRepository.delete(roomRequestRepository.getOne(id));
    }
}
