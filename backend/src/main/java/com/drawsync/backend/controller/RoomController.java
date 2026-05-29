package com.drawsync.backend.controller;
import com.drawsync.backend.repository.RoomRepository;

import com.drawsync.backend.model.Room;
import com.drawsync.backend.service.RoomService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;
    @Autowired
    private RoomRepository roomRepository;

    @PostMapping("/create")
    public Room createRoom(@RequestParam String roomName,
                           HttpServletRequest request) {

        String email = (String) request.getAttribute("userEmail");

        return roomService.createRoom(roomName, email);
    }

    @GetMapping("/join/{roomId}")
    public Room joinRoom(@PathVariable String roomId,
                         HttpServletRequest request) {

        return roomService.joinRoom(roomId, request);
    }


    @GetMapping("/board/{roomId}")
    public String getBoard(@PathVariable String roomId) {
        return roomService.getBoard(roomId);
    }

    @GetMapping("/check/{roomId}")
    public org.springframework.http.ResponseEntity<?> checkRoomExists(@PathVariable String roomId) {
        boolean exists = roomRepository.findByRoomId(roomId).isPresent();
        if (!exists) {
            return org.springframework.http.ResponseEntity
                    .status(404)
                    .body(java.util.Map.of("valid", false, "message", "Invalid Room ID"));
        }
        return org.springframework.http.ResponseEntity.ok(java.util.Map.of("valid", true));
    }
}