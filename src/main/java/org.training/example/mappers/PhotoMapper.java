package org.training.example.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.training.example.dto.PhotoDto;
import org.training.example.model.Photo;
import org.training.example.repository.PhotoRepository;

@Mapper(componentModel = "spring")
@Component
public abstract class PhotoMapper {
    @Autowired
    PhotoRepository photoRepository;
    @Mappings({
            @Mapping(target = "photoUrl",
                    expression = "java(photo.getPhotoUrl())")
    })
    public abstract PhotoDto photoToPhotoDTO(Photo photo);

    @Mappings({
            @Mapping(target = "id",
                    expression = "java( photoRepository.findByPhotoUrl(photoDto.getPhotoUrl()).getId() )"),
            @Mapping(target = "photoUrl",
                    expression = "java( java.util.Optional.ofNullable( photoRepository.findByPhotoUrl(photoDto.getPhotoUrl()).getPhotoUrl() )" +
                            "                .orElse( photoRepository.save(Photo.builder().photoUrl(photoDto.getPhotoUrl()).build()).getPhotoUrl() ) )")
    })
    public abstract Photo photoDTOToPhoto(PhotoDto photoDto);
}
