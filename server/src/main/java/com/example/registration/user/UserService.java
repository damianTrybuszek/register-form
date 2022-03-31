package com.example.registration.user;

import com.example.registration.user.dto.UserRegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getByUsername(String username) {
        return this.repository.findByUsername(username);
    }

    public void create(UserRegisterDTO user) {
        user.setUsername(user.getUsername().toLowerCase());
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        User dbUser = user.toAppUser();
        this.repository.save(dbUser);
    }
}
