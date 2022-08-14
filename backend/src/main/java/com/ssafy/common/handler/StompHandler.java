package com.ssafy.common.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT) {
            System.out.println("full message:" + message);
            System.out.println("auth1:" + accessor.getNativeHeader("Authorization"));
            System.out.println("auth2:" + accessor.getNativeHeader("Authorization2"));
            System.out.println(accessor.getHeader("nativeHeaders").getClass());
        }
        return message;
    }
}
