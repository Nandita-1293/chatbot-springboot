package com.example.chatbot.controller;

import com.example.chatbot.model.User;
import com.example.chatbot.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class HomeController {

    private final UserService userService;

    public HomeController(UserService userService) {
        this.userService = userService;
    }

    private User getUser(Authentication auth) {
        if (auth == null) return null;
        Optional<User> user = userService.findByEmail(auth.getName());
        return user.orElse(null);
    }

    @GetMapping("/home")
    public String homePage(Authentication auth, Model model) {
        User user = getUser(auth);
        if (user != null) {
            model.addAttribute("user", user);
            model.addAttribute("greeting", "Hello, " + user.getName() + "!");
        }
        return "home";
    }

    @GetMapping("/chat")
    public String chatPage(Authentication auth, Model model) {
        User user = getUser(auth);
        if (user != null) {
            model.addAttribute("user", user);
            model.addAttribute("userName", user.getName());
        }
        return "chat";
    }

    @GetMapping("/profile")
    public String profilePage(Authentication auth, Model model) {
        User user = getUser(auth);
        if (user != null) {
            model.addAttribute("user", user);
        }
        return "profile";
    }
}
