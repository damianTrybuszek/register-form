package com.example.registration.user;

import org.apache.commons.lang3.StringUtils;
import com.example.registration.user.dto.UserRegisterDTO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;




@CrossOrigin(origins = "*")
@RestController
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }



    @PostMapping(value="/register")
    public ResponseEntity create(@RequestBody UserRegisterDTO user) {;
        if (service.getByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("This username is already registered on our site.");
        } else if (!checkUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("resp: The login does not meet the criteria.");
        } else if (!checkPassword(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Password does not meet the criteria.");
        } else {
            addUserToDatabase(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User with username: " + user.getUsername() + "created successfully");
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
