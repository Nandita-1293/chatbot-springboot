package com.example.chatbot.service;

import com.example.chatbot.model.RegisterRequest;
import com.example.chatbot.model.User;
import com.example.chatbot.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest request) {
        User user = new User(
            request.getName(),
            request.getEmail(),
            request.getMobile(),
            request.getGender(),
            passwordEncoder.encode(request.getPassword())
        );
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean mobileExists(String mobile) {
        return userRepository.existsByMobile(mobile);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
