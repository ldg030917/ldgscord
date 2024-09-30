# Backend-practice1
backend 시스템 기초 개발 연습
프로젝트 아이디어 영어 공부용 백준 느낌으로 하나?
들어오면 매칭~ 8명 정도로 영어 문제를 빠르게 푸는 순서대로 점수 할당
하는 간단한 사이트?

CREATE TABLE userTable (
  id int(12) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY(id)
) charset=utf8;

CREATE TABLE friendships (
    -> username varchar(50) NOT NULL,
    -> friend varchar(50) NOT NULL
    -> );
