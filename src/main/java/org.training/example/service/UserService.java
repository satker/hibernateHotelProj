package org.training.example.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.training.example.dto.AddUserDTO;
import org.training.example.dto.UserDTO;
import org.training.example.exceptions.AccessDeniedException;
import org.training.example.exceptions.UserNotFoundException;
import org.training.example.mappers.UserMapper;
import org.training.example.model.User;
import org.training.example.repository.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    public void deleteUserById(long id) {
        userRepository.delete(id);
    }

    public UserDTO updateUser(UserDTO modifiedUser, long id) {
        log.debug("user updated {}", modifiedUser);

        User user = userRepository.getOne(id);
        user.setFirstName(modifiedUser.getFirstName());
        user.setLastName(modifiedUser.getLastName());
        user.setLogin(modifiedUser.getLogin());
        user.setPassword(modifiedUser.getPassword());
        return userMapper.userToUserDto(userRepository.save(user));
    }

    public UserDTO findUserByLogin(String login) throws UserNotFoundException {
        log.debug("user found by login {}", login);
        return userMapper.userToUserDto(userRepository.findUserByLogin(login));
    }

    public Optional<User> findUserById(long id) {
        log.debug("user found by id{}", id);
        return Optional.ofNullable(userRepository.getOne(id));
    }

    public UserDTO findOne(Long id) {
        log.debug("user found by id {}", id);
        User findedUser = userRepository.getOne(id);
        if (findedUser == null){
            throw new UserNotFoundException(id);
        }
        return userMapper.userToUserDto(findedUser);
    }

    public List<UserDTO> findAllUsers() {
        log.debug("all users found {}");
        return userMapper.usersToUsersDto(userRepository.findAll().
                stream().filter(item -> item.getRole().equals("ROLE_USER")).collect(Collectors.toList()));
    }

    public UserDTO saveUser(AddUserDTO user) {
        log.debug("user saved {}", user);
        User newUser = userMapper.addUserDtoToUser(user);
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userMapper.userToUserDto(userRepository.save(newUser));
    }

    public UserDTO getUserValidateUser(long id, String login) {
        log.debug("validated user got {}", id);
        if (findUserByLogin(login).getId() == id) {
            return findOne(id);
        } else {
            throw new AccessDeniedException(id);
        }
    }

    public void updateUserValidateUser(long id, String login, UserDTO upUser) {
        log.debug("validated user updated {}", id);
        if (findUserByLogin(login).getId() == id) {
            updateUser(upUser, id);
        } else {
            throw new AccessDeniedException(id);
        }
    }
}