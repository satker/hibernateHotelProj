package org.training.example.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.ConfirmedRequestDTO;
import org.training.example.mappers.ConfirmedRequestMapper;
import org.training.example.mappers.RequestMapper;
import org.training.example.model.Request;
import org.training.example.repository.ConfirmedRequestRepository;
import org.training.example.repository.RequestRepository;

@Service
@AllArgsConstructor
@Slf4j
public class ConfirmedRequestService {
    private final ConfirmedRequestMapper confirmedRequestMapper;
    private final ConfirmedRequestRepository confirmedRequestRepository;
    private final RequestService requestService;
    private final RequestMapper requestMapper;
    private final RequestRepository requestRepository;

    public List<ConfirmedRequestDTO> findByAccountUsername(long id) {
        log.debug("room confims have been found by user id {}", id);
        return confirmedRequestRepository.
                findByUserId(id).
                stream().
                map(confirmedRequestMapper::confirmToConfirmDTO).collect(Collectors.toList());
    }

    public void save(ConfirmedRequestDTO confirmDTO) {
        log.debug("room confims has been saved {}", confirmDTO);
        Request request = requestMapper.requestDTOToRequest(requestService.findOne(confirmDTO.getRequest().getId()));
        requestMapper.requestToRequestDTO(requestRepository.save(request));
        confirmedRequestRepository.save(confirmedRequestMapper.confirmDTOToConfirm(confirmDTO));
    }

    public ConfirmedRequestDTO findOne(long id) {
        log.debug("room confirm has been found by id {}", id);
        return confirmedRequestMapper.confirmToConfirmDTO(confirmedRequestRepository.getOne(id));
    }

    public void deleteConfirmById(long id) {
        log.debug("confirm has been deleted by id {}", id);
        confirmedRequestRepository.delete(confirmedRequestRepository.getOne(id));
    }
}
