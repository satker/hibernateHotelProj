package org.training.example.controller;

import java.security.Principal;
import java.util.Base64;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.training.example.model.User;

@RestController
@CrossOrigin
public class UserController {

  @GetMapping("/login")
  public boolean login(@RequestBody User user) {
    return user.getUserName()
               .equals("user") && user.getPassword()
                                      .equals("password");
  }

  @GetMapping("/user")
  public Principal user(HttpServletRequest request) {
    String authToken = request.getHeader("Authorization")
                              .substring("Basic".length())
                              .trim();
    return () -> new String(Base64.getDecoder()
                                  .decode(authToken)).split(":")[0];
  }

    @PostMapping(value = "/perform_login", params = {"username", "password"})
    public boolean checkLogin(@RequestParam String username,
                              @RequestParam String password) {
        return true;
    }
}
