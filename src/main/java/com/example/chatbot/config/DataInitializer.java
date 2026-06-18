package com.example.chatbot.config;

import com.example.chatbot.model.User;
import com.example.chatbot.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            // Create a demo user if none exist
            if (userRepository.count() == 0) {
                User demo = new User("Demo User", "demo@chatbot.com", "9876543210", "Other",
                    encoder.encode("demo123"));
                userRepository.save(demo);
                System.out.println("✅ Demo user created: demo@chatbot.com / demo123");
            }
        };
    }
}
