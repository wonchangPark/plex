package com.ssafy.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

@Data
@AllArgsConstructor
public class UserSetVo {
    String nick;
    String img;

    @Override
    public int hashCode(){
        return new HashCodeBuilder().append(nick).append(img).toHashCode();
    }

    @Override
    public boolean equals(Object obj){
        UserSetVo userSetVo = (UserSetVo) obj;
        if(obj instanceof UserSetVo){
            return new EqualsBuilder().append(nick, userSetVo.getNick()).append(img, userSetVo.getImg()).isEquals();
        }
        return false;
    }
}
