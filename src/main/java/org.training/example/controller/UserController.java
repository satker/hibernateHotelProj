package org.training.example.controller;

import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.dto.AddUserDTO;
import org.training.example.dto.UserDTO;
import org.training.example.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
class UserController {
    private final UserService userService;

    @PostMapping
    ResponseEntity add(@RequestBody AddUserDTO input) {
        userService.saveUser(input);
        return new ResponseEntity(null, HttpStatus.CREATED);
    }

    @GetMapping
    public UserDTO getValidateUser(Principal principal) {
        return userService.findUserByLogin(principal.getName());
    }

    @PostMapping("/username/check")
    public boolean checkIsGoodUsername(@RequestBody String username) {
        return userService.checkIsPresentedUsername(username);
    }

    @PostMapping("/mail/check")
    public boolean checkIsGoodMail(@RequestBody String mail) {
        return userService.checkIsPresentedMail(mail);
    }

    @GetMapping(value = "/{id}")
    public UserDTO getValidateUser(@PathVariable("id") long id, Principal principal) {
        return userService.getValidateUser(id, principal.getName());
    }

    @GetMapping(value = "/{id}/mail/check/{mail}")
    public boolean checkIsGoodMailForUpdate(@PathVariable("id") long id,
                                            @PathVariable("mail") String mail) {
        return userService.checkIsGoodMailForUpdate(id, mail);
    }

    @PutMapping(value = "/{id}")
    public void updateValidateUser(@PathVariable("id") long id, @RequestBody UserDTO user, Principal principal) {
        userService.updateUserValidateUser(id, principal, user);
    }
}
