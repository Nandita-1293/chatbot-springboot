package com.example.chatbot.controller;

import com.example.chatbot.model.RegisterRequest;
import com.example.chatbot.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Root redirect
    @GetMapping("/")
    public String root(Authentication auth) {
        return auth != null ? "redirect:/home" : "redirect:/login";
    }

    // Login page
    @GetMapping("/login")
    public String loginPage(Authentication auth,
                            @RequestParam(required = false) String error,
                            @RequestParam(required = false) String logout,
                            @RequestParam(required = false) String expired,
                            Model model) {
        if (auth != null) return "redirect:/home";
        if (error != null) model.addAttribute("error", "Invalid email or password. Please try again.");
        if (logout != null) model.addAttribute("message", "You have been logged out successfully.");
        if (expired != null) model.addAttribute("error", "Your session has expired. Please log in again.");
        return "login";
    }

    // Register page (GET)
    @GetMapping("/register")
    public String registerPage(Authentication auth, Model model) {
        if (auth != null) return "redirect:/home";
        model.addAttribute("registerRequest", new RegisterRequest());
        return "register";
    }

    // Register (POST)
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("registerRequest") RegisterRequest request,
                           BindingResult result,
                           RedirectAttributes redirectAttributes,
                           Model model) {
        // Validation errors
        if (result.hasErrors()) {
            return "register";
        }

        // Password match check
        if (!request.passwordsMatch()) {
            model.addAttribute("error", "Passwords do not match.");
            return "register";
        }

        // Email uniqueness
        if (userService.emailExists(request.getEmail())) {
            model.addAttribute("error", "An account with this email already exists.");
            return "register";
        }

        // Mobile uniqueness
        if (userService.mobileExists(request.getMobile())) {
            model.addAttribute("error", "This mobile number is already registered.");
            return "register";
        }

        // Save user
        userService.registerUser(request);
        redirectAttributes.addFlashAttribute("success",
            "Registration successful! Please login with your credentials.");
        return "redirect:/login";
    }
}
