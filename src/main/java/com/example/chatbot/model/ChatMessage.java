package com.example.chatbot.model;

public class ChatMessage {
    private String message;
    private String response;
    private String timestamp;
    private String sender; // "user" or "bot"

    public ChatMessage() {}

    public ChatMessage(String message, String response, String timestamp, String sender) {
        this.message = message;
        this.response = response;
        this.timestamp = timestamp;
        this.sender = sender;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }
}
