package org.training.example.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.RoomConfirmDTO;
import org.training.example.mappers.RoomConfirmMapper;
import org.training.example.mappers.RoomRequestMapper;
import org.training.example.model.RoomRequest;
import org.training.example.repository.RoomConfirmRepository;
import org.training.example.repository.RoomRequestRepository;

@Service
@AllArgsConstructor
@Slf4j
public class RoomConfirmService {
    private final RoomConfirmMapper roomConfirmMapper;
    private final RoomConfirmRepository roomConfirmRepository;
    private final RoomRequestService roomRequestService;
    private final RoomRequestMapper roomRequestMapper;
    private final RoomRequestRepository roomRequestRepository;

    public List<RoomConfirmDTO> findByAccountUsername(long id) {
        log.debug("room confims have been found by user id {}", id);
        return roomConfirmRepository.
                findByUserId(id).
                stream().
                map(roomConfirmMapper::confirmToConfirmDTO).collect(Collectors.toList());
    }

    public void save(RoomConfirmDTO confirmDTO) {
        log.debug("room confims has been saved {}", confirmDTO);
        RoomRequest request = roomRequestMapper.requestDTOToRequest(roomRequestService.findOne(confirmDTO.getRequest().getId()));
        request.setDone(true);
        roomRequestMapper.requestToRequestDTO(roomRequestRepository.save(request));
        roomConfirmRepository.save(roomConfirmMapper.confirmDTOToConfirm(confirmDTO));
    }

    public RoomConfirmDTO findOne(long id) {
        log.debug("room confirm has been found by id {}", id);
        return roomConfirmMapper.confirmToConfirmDTO(roomConfirmRepository.getOne(id));
    }

    public void deleteConfirmById(long id) {
        log.debug("confirm has been deleted by id {}", id);
        roomConfirmRepository.delete(roomConfirmRepository.getOne(id));
    }
}
