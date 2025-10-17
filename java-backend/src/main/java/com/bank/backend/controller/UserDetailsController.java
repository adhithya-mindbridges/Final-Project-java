package com.bank.backend.controller;

import com.bank.backend.dto.PinVerificationRequest;
import com.bank.backend.dto.PinVerificationResponse;
import com.bank.backend.entity.UserDetails;
import com.bank.backend.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDetails>> getAllUsers() {
        List<UserDetails> users = userDetailsService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user-details/{accountNumber}")
    public ResponseEntity<?> getUserByAccountNumber(@PathVariable String accountNumber) {
        Optional<UserDetails> user = userDetailsService.getUserByAccountNumber(accountNumber);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<UserDetails> createUser(@RequestBody UserDetails userDetails) {
        UserDetails createdUser = userDetailsService.createUser(userDetails);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/users/{accountNumber}")
    public ResponseEntity<?> updateUser(@PathVariable String accountNumber, @RequestBody UserDetails userDetails) {
        UserDetails updatedUser = userDetailsService.updateUser(accountNumber, userDetails);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{accountNumber}")
    public ResponseEntity<?> deleteUser(@PathVariable String accountNumber) {
        boolean deleted = userDetailsService.deleteUser(accountNumber);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/verify-pin")
    public ResponseEntity<?> verifyPin(@RequestBody PinVerificationRequest request) {
        try {
            Optional<UserDetails> userOpt = userDetailsService.getUserByAccountNumber(request.getAccountNumber());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(new PinVerificationResponse(false, "Account not found"));
            }

            UserDetails user = userOpt.get();
            if (user.getPin().equals(request.getPin())) {
                return ResponseEntity.ok(new PinVerificationResponse(true, "PIN verified successfully"));
            } else {
                return ResponseEntity.status(401).body(new PinVerificationResponse(false, "Invalid PIN"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new PinVerificationResponse(false, "Error verifying PIN: " + e.getMessage()));
        }
    }
}
