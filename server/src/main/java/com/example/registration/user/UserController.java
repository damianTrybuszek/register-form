package com.example.registration.user;

import org.apache.commons.lang3.StringUtils;
import com.example.registration.user.dto.UserRegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.http.HttpResponse;
import java.time.LocalDateTime;
@CrossOrigin(origins = "*")
@RestController
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public void create(@RequestBody UserRegisterDTO user) {
        if (service.getByUsername(user.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This username is already registered on our site.");
        } else if (!checkUsername(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "The login does not meet the criteria.");
        } else if (!checkPassword(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Password does not meet the criteria.");
        } else {
            addUserToDatabase(user);
        }
    }

    public boolean checkUsername(String username) {
        return (StringUtils.isAlphanumeric(username) && username.length() >= 5);
    }

    public boolean checkPassword(String password) {
        int upperCaseNumbers = 0;
        int lowerCaseNumbers = 0;
        int numberNumbers = 0;
        for (int i = 0; i < password.length(); i++) {
            if (Character.isDigit(password.charAt(i))) {
                numberNumbers++;
            }
            if (Character.isUpperCase(password.charAt(i))) {
                upperCaseNumbers++;
            }
            if (Character.isLowerCase(password.charAt(i))) {
                lowerCaseNumbers++;
            }
        }
        return (upperCaseNumbers > 0 && lowerCaseNumbers > 0 && numberNumbers > 0 && password.length() >= 8);
    }



    private void addUserToDatabase(UserRegisterDTO user) {
        user.setRegisteredTime(LocalDateTime.now());
        service.create(user);
    }
}
