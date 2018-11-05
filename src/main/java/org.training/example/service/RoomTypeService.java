package org.training.example.service;

import java.util.Set;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.training.example.dto.RoomTypeDTO;
import org.training.example.exceptions.RoomTypeNotFoundException;
import org.training.example.mappers.RoomTypeMapper;
import org.training.example.model.RoomType;
import org.training.example.repository.RoomTypeRepository;

@Service
@AllArgsConstructor
@Slf4j
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;
    private final RoomTypeMapper roomTypeMapper;

    public Set<RoomTypeDTO> findAllTypes() {
        log.debug("all room types have been found {}");
        return roomTypeRepository.
                findAll().
                stream().
                map(roomTypeMapper::typeToTypeDTO).collect(Collectors.toSet());
    }

    public void deleteRoomTypeById(long id) {
        log.debug("room type by id has been deleted {}", id);
        roomTypeRepository.delete(roomTypeRepository.getOne(id));
    }

    public RoomTypeDTO findOne(long id) {
        log.debug("room type by id has been found {}", id);

        RoomType findedRoomType = roomTypeRepository.getOne(id);
        if (findedRoomType == null){
            throw new RoomTypeNotFoundException(id);
        }
        return roomTypeMapper.typeToTypeDTO(findedRoomType);
    }

    public void save(RoomTypeDTO request) {
        log.debug("room type has been saved {}", request);
        roomTypeRepository.save(roomTypeMapper.typeDTOToType(request));
    }
}
