package com.aim.questionnaire.common;

import lombok.Data;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by 马钰喆 on 2017-07-31
 */
@Data
public class Pub {
    public static Pub pub;

    private Lock delPicLock = new ReentrantLock();
    private Lock projectLock = new ReentrantLock();
    private Lock adProjectLock = new ReentrantLock();

    // 获得单例
    public static Pub getSingletonInstance() {
        if(pub == null) {
            pub = new Pub();
        }
        return pub;
    }
}
