package com.bank.backend.controller;

import com.bank.backend.dto.TransactionRequest;
import com.bank.backend.dto.TransactionResponse;
import com.bank.backend.entity.Transaction;
import com.bank.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/transactions/{accountNumber}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccountNumber(@PathVariable String accountNumber) {
        List<Transaction> transactions = transactionService.getTransactionsByAccountNumber(accountNumber);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/process-transaction")
    public ResponseEntity<?> processTransaction(@RequestBody TransactionRequest request) {
        try {
            Transaction transaction = transactionService.processTransaction(
                request.getAccountNumber(),
                request.getType(),
                request.getAmount()
            );
            
            TransactionResponse response = new TransactionResponse();
            response.setSuccess(true);
            response.setMessage("Transaction processed successfully");
            response.setTransaction(transaction);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            TransactionResponse response = new TransactionResponse();
            response.setSuccess(false);
            response.setMessage(e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
}

