package com.drawsync.backend.model;

import lombok.Data;

@Data
public class DrawMessage {
    private String roomId;
    private double x;
    private double y;
    private String color;
}