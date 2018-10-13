package org.training.example.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.training.example.dto.AddUserDTO;
import org.training.example.dto.UserDTO;
import org.training.example.model.User;

@Mapper(componentModel = "spring")
public abstract class UserMapper {
    public abstract UserDTO userToUserDto(User user);

    public abstract List<UserDTO> usersToUsersDto(List<User> users);

    public abstract User userDtoToUser(UserDTO user);

    public abstract User addUserDtoToUser(AddUserDTO user);
}
