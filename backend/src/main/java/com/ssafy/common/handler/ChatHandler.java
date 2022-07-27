package com.ssafy.common.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component // bean configuration 파일에 bean을 등록하지 않아도 사용할 수 있게
public class ChatHandler extends TextWebSocketHandler {

    private static final List<WebSocketSession> list = new ArrayList<>();

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String payload = message.getPayload(); // http의 body 부분의 payload를 말하는 것
        // payload는 전송되는 데이터를 말한다.
        System.out.println(payload);

        for(WebSocketSession ses : list){
            ses.sendMessage(message);
        }
    }

    // client session 추가
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        list.add(session);
        System.out.println("hello");
        // 여기에서 다른 서버와의 회원인지 체크 진행

        // 모든 세션에 채팅 전달
        for(WebSocketSession ses : list){
            ses.sendMessage(new TextMessage(session.getId()+"님이 입장 했습니다."));
        }
    }

    // client가 접속 해제시
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {
        list.remove(session);

        for(WebSocketSession ses : list){
            ses.sendMessage(new TextMessage(session.getId()+"님이 퇴장 했습니다."));
        }
    }
}
