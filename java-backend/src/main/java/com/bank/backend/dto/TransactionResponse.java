package com.bank.backend.dto;

import com.bank.backend.entity.Transaction;
import java.math.BigDecimal;

public class TransactionResponse {
    private boolean success;
    private String message;
    private Transaction transaction;

    public TransactionResponse() {
    }

    public TransactionResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }
}
