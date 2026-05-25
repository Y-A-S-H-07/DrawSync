package com.drawsync.backend.service;

import com.drawsync.backend.model.Room;
import com.drawsync.backend.model.User;
import com.drawsync.backend.model.UserInfo;
import com.drawsync.backend.repository.RoomRepository;
import com.drawsync.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    public Room createRoom(String roomName, String hostEmail) {

        Room room = new Room();
        room.setRoomName(roomName);
        room.setHostEmail(hostEmail);

        // generate random roomId
        room.setRoomId(UUID.randomUUID().toString().substring(0, 6));

        return roomRepository.save(room);
    }

    public Room joinRoom(String roomId, HttpServletRequest request) {

        String email = (String) request.getAttribute("userEmail");

        if (email == null) {
            throw new RuntimeException("Unauthorized");
        }

        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        boolean exists = room.getUsers().stream()
                .anyMatch(u -> u.getEmail().equals(email));

        if (!exists) {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserInfo userInfo = new UserInfo();
            userInfo.setEmail(email);
            userInfo.setName(user.getFullName());
            userInfo.setSocketId("");

            room.getUsers().add(userInfo);
        }

        return roomRepository.save(room);

    }


    @Transactional
    public String getBoard(String roomId) {
        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        return room.getBoardData();
    }
}