package com.example.registration.user.dto;

import com.example.registration.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserGetDTO {

    private long id;
    private String username;
    private String email;
    private LocalDateTime registeredTime;

    public User toAppUser() {
        return User.builder()
                .id(this.id)
                .username(this.username)
                .registeredTime(this.registeredTime)
                .build();

    }

    public static UserGetDTO of(User user) {
        return com.example.registration.user.dto.UserGetDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .registeredTime(user.getRegisteredTime())
                .build();
    }
}






