package com.drawsync.backend.controller;

import com.drawsync.backend.model.DrawMessage;
import com.drawsync.backend.model.Room;
import com.drawsync.backend.repository.RoomRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RoomRepository roomRepository;

    @MessageMapping("/draw")
    public void draw(DrawMessage message) {

        messagingTemplate.convertAndSend(
                "/topic/room/" + message.getRoomId(),
                message
        );

        Room room = roomRepository.findByRoomId(message.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        String existingData = room.getBoardData();

        String newPoint = message.getX() + "," + message.getY() + "," + message.getColor();

        if (existingData == null || existingData.isEmpty()) {
            room.setBoardData(newPoint);
        } else {
            room.setBoardData(existingData + "|" + newPoint);
        }

        roomRepository.save(room);
    }
}