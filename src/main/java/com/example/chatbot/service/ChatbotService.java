package com.example.chatbot.service;

import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    private final GroqService groqService;

    public ChatbotService(GroqService groqService) {
        this.groqService = groqService;
    }

    public String getResponse(String userMessage) {

        // Empty message check
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return "Please type a message.";
        }

        // Send everything to Groq AI
        return groqService.getAIResponse(userMessage);
    }
}

