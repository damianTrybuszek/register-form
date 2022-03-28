package com.example.registration.user.dto;

import com.example.registration.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserRegisterDTO {
    private String username;
    private String password;
    private LocalDateTime registeredTime;

    public User toAppUser() {
        return User.builder()
                .username(this.username)
                .password(this.password)
                .registeredTime(this.registeredTime)
                .build();
    }

    public static UserRegisterDTO of(User user) {
        return UserRegisterDTO.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .registeredTime(user.getRegisteredTime())
                .build();
    }

}
