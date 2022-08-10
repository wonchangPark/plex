package com.ssafy.common.exception;

public class JwtTokenException extends Exception{
    public JwtTokenException(String message){
        super(message);
    }
}
