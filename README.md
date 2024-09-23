# Backend-practice1
backend 시스템 기초 개발 연습
프로젝트 아이디어 영어 공부용 백준 느낌으로 하나?


CREATE TABLE userTable (
  id int(12) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY(id)
) charset=utf8;