package com.ssafy.common.exception;

public class UserDuplicateException extends Throwable {
    public UserDuplicateException(String msg) {
        super(msg);
    }
}
