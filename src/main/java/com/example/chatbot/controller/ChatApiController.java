package com.example.chatbot.controller;

import com.example.chatbot.model.ChatMessage;
import com.example.chatbot.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatApiController {

    private final ChatbotService chatbotService;

    public ChatApiController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatMessage> chat(@RequestBody Map<String, String> body,
                                             Authentication auth) {
        String userMessage = body.getOrDefault("message", "").trim();

        if (userMessage.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String botResponse = chatbotService.getResponse(userMessage);
        String timestamp = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm"));

        ChatMessage response = new ChatMessage(userMessage, botResponse, timestamp, "bot");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "ChatBot API"));
    }
}
