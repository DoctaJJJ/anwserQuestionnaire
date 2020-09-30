package com.aim.questionnaire.dao;

import com.aim.questionnaire.dao.entity.UserEntity;
import org.springframework.stereotype.Repository;


@Repository
public interface UserEntityMapper {
    /**
     * 根据用户名查找用户信息
     * @param username
     * @return
     */
    UserEntity selectAllByName(String username);

}