package com.ssafy.api.service;

import com.ssafy.common.exception.UserDuplicateException;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	@Transactional
	public void createUser(UserRegisterPostReq userRegisterInfo) throws UserDuplicateException {
		validateDuplicateUser(userRegisterInfo);
		User user = User.createUser(userRegisterInfo.getId(), passwordEncoder.encode(userRegisterInfo.getPassword()), userRegisterInfo.getNick(), userRegisterInfo.getEmail());
		userRepository.save(user);
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
	}

	@Override
	public void validateDuplicateUser(UserRegisterPostReq userRegisterInfo) throws UserDuplicateException {
		User user = userRepository.validationCheck(userRegisterInfo.getId(), userRegisterInfo.getNick());
		if(user != null){
			throw new UserDuplicateException("이미 존재하는 회원입니다.");
		}
	}


	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		return userRepository.findByUserId(userId); // 없다면 null이 들어감
	}

	@Override
	public List<User> getRankingList(){
		return userRepository.getRankingList();
	}

	@Override
	@Transactional
	public void setMyImage(String image){
		userRepository.setMyImage(image);
	}

}
