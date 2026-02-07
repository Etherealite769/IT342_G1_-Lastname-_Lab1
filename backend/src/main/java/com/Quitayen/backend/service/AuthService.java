package com.Quitayen.backend.service;

import com.Quitayen.backend.dto.LoginRequest;
import com.Quitayen.backend.dto.LoginResponse;
import com.Quitayen.backend.dto.RegisterRequest;
import com.Quitayen.backend.dto.UserResponse;
import com.Quitayen.backend.entity.User;
import com.Quitayen.backend.repository.UserRepository;
import com.Quitayen.backend.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    public UserResponse register(RegisterRequest registerRequest) {
        // Check if email already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = User.builder()
                .email(registerRequest.getEmail())
                .fullName(registerRequest.getFullName())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .role("USER")
                .build();

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        User user = userOptional.get();

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate JWT token
        String token = jwtProvider.generateToken(user.getEmail());

        return LoginResponse.builder()
                .token(token)
                .message("Login successful")
                .build();
    }

    public UserResponse getUserByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return mapToUserResponse(userOptional.get());
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
