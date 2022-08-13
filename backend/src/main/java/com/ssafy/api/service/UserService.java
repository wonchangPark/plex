package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserExerciseRes;
import com.ssafy.api.response.UserInfoRes;
import com.ssafy.api.response.UserTotalGameCntRes;
import com.ssafy.common.exception.UserDuplicateException;
import com.ssafy.db.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	void createUser(UserRegisterPostReq userRegisterInfo) throws UserDuplicateException;

	void validateDuplicateUser(UserRegisterPostReq userRegisterInfo) throws UserDuplicateException;

	User getUserByUserId(String userId);

	User getUserByNick(String nick);

	void setMyImage(User user, String image);

	List<UserExerciseRes> getMyTotalExercise(User user);

	UserTotalGameCntRes getMyTotalGameCnt(User user);

	UserInfoRes getUserByUserNick(String nick);
}
