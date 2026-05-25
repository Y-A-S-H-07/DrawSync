package com.drawsync.backend.model;

import jakarta.persistence.Embeddable;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserInfo {

    private String email;
    private String name;
    private String socketId;
}