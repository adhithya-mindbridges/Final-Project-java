package com.bank.backend.dto;

public class PinVerificationRequest {
    private String accountNumber;
    private String pin;

    public PinVerificationRequest() {
    }

    public PinVerificationRequest(String accountNumber, String pin) {
        this.accountNumber = accountNumber;
        this.pin = pin;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}

