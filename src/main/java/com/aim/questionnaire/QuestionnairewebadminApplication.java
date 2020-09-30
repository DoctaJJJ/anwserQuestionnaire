package com.aim.questionnaire;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
@EnableCaching
@EnableAsync
@MapperScan("com.aim.questionnaire.dao")
public class QuestionnairewebadminApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuestionnairewebadminApplication.class, args);
	}
}
