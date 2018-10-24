package org.training.example.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.PropertiesForOrderPrice;
import org.training.example.dto.RequestDTO;
import org.training.example.dto.RoomDTO;
import org.training.example.exceptions.AccessDeniedException;
import org.training.example.exceptions.RoomRequestNotFoundException;
import org.training.example.mappers.RequestMapper;
import org.training.example.mappers.RoomMapper;
import org.training.example.model.OrderStatus;
import org.training.example.model.Request;
import org.training.example.model.Room;
import org.training.example.model.RoomRequest;
import org.training.example.repository.RequestRepository;
import org.training.example.repository.RoomRequestRepository;
import org.training.example.repository.UserRepository;

@Service
@AllArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final UserService userService;
    private final RoomMapper roomMapper;
    private final RoomRequestRepository roomRequestRepository;
    private final UserRepository userRepository;

    public List<RequestDTO> findByAccountUsername(long id) {
        log.debug("all room requests have been found by user id {}", id);
        return requestRepository.
                findByUserId(id).
                stream().
                //filter(item -> confirmedRequestRepository.findConfirmedRequestByRequest(item) == null).
                        map(requestMapper::requestToRequestDTO).
                        collect(Collectors.toList());
    }

    public List<RequestDTO> findAllRequestsByUser(long id) {
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
        if (findedRequest != null) {
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

    public void rejectRoomRequestById(long id) {
        log.debug("room request has been deleted by id {}", id);
        Request requestForReject = requestRepository.getOne(id);
        requestForReject.setOrderStatus(OrderStatus.REJECTED);
        requestRepository.save(requestForReject);
    }

    public RequestDTO createOrder(long userId, RequestDTO order) {
        Request request = requestMapper.requestDtoToRequest(order);
        request.setUser(userRepository.findOne(userId));
        Request savedRequest = requestRepository.save(request);
        Map<Room, Request> roomRequestMap = order.getRooms().stream()
                .map(roomMapper::roomDTOToRoom)
                .collect(Collectors.toMap(Function.identity(), i -> savedRequest));
        roomRequestMap.entrySet().stream()
                .map(elem -> new RoomRequest(elem.getKey(), elem.getValue()))
                .forEach(roomRequestRepository::save);
        return requestMapper.requestToRequestDTO(savedRequest);
    }

    public double getPriceOfOrder(PropertiesForOrderPrice propertiesForOrderPrice) {
        long diffTime = propertiesForOrderPrice.getDepartureDate().getTime() - propertiesForOrderPrice.getArrivalDate().getTime();
        long days = TimeUnit.DAYS.convert(diffTime, TimeUnit.MILLISECONDS) + 1;
        Double sumPriceOfRooms = propertiesForOrderPrice.getRooms().stream()
                .map(RoomDTO::getCostNight)
                .reduce((firstPrice, secondPrice) -> firstPrice + secondPrice).get();
        return sumPriceOfRooms * days;
    }
}
