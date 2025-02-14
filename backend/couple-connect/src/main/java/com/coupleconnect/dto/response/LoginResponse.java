package com.coupleconnect.dto.response;

public class LoginResponse {
    Long id;
    String token;
    String message;

    public LoginResponse() {
    }

    public LoginResponse(Long id,String token, String message) {
        this.id = id;
        this.token = token;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
