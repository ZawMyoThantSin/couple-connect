package com.coupleconnect.dto.response;

import lombok.Data;

@Data
public class  HttpResponse<T> {
    private boolean status;
    private String message;
    private T data;

    public HttpResponse() {}

    public HttpResponse(boolean status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> HttpResponse<T> success(String message, T data) {
        return new HttpResponse<>(true, message, data);
    }

    public static HttpResponse<String> error(String message) {
        return new HttpResponse<>(false, message, null);
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
