SELECT * FROM tab;
/*-------------------------------------------------------------- Drop Tables --------------------------------------------------------------*/

DROP TABLE pic_comment CASCADE CONSTRAINTS;
DROP TABLE pic_lib CASCADE CONSTRAINTS;
DROP TABLE pic_like CASCADE CONSTRAINTS;
DROP TABLE pic_tag CASCADE CONSTRAINTS;
DROP TABLE picture CASCADE CONSTRAINTS;
DROP TABLE place_like CASCADE CONSTRAINTS;
DROP TABLE review CASCADE CONSTRAINTS;
DROP TABLE tour_location CASCADE CONSTRAINTS;
DROP TABLE place CASCADE CONSTRAINTS;
DROP TABLE tour_tag CASCADE CONSTRAINTS;
DROP TABLE tag CASCADE CONSTRAINTS;
DROP TABLE tour_like CASCADE CONSTRAINTS;
DROP TABLE tour_memo CASCADE CONSTRAINTS;
DROP TABLE tour CASCADE CONSTRAINTS;
DROP TABLE user_authority CASCADE CONSTRAINTS;
DROP TABLE users CASCADE CONSTRAINTS;
DROP TABLE user_log CASCADE CONSTRAINTS;


/*-------------------------------------------------------------- Create Sequence --------------------------------------------------------------*/
CREATE SEQUENCE us_uid_seq;
CREATE SEQUENCE tu_uid_seq;
CREATE SEQUENCE tag_uid_seq;
CREATE SEQUENCE pl_uid_seq;
CREATE SEQUENCE pc_uid_seq;
CREATE SEQUENCE cmt_uid_seq;
CREATE SEQUENCE log_uid_seq;
CREATE SEQUENCE place_uid_seq;
CREATE SEQUENCE rv_uid_seq;


/*-------------------------------------------------------------- Drop Sequence --------------------------------------------------------------*/
DROP SEQUENCE us_uid_seq;
DROP SEQUENCE tu_uid_seq;
DROP SEQUENCE tag_uid_seq;
DROP SEQUENCE pl_uid_seq;
DROP SEQUENCE pc_uid_seq;
DROP SEQUENCE cmt_uid_seq;
DROP SEQUENCE log_uid_seq;
DROP SEQUENCE place_uid_seq;
DROP SEQUENCE rv_uid_seq;


/*-------------------------------------------------------------- Create Tables --------------------------------------------------------------*/

CREATE TABLE picture
(
	pc_uid number NOT NULL,
	us_uid number NOT NULL,
	pc_contents varchar2(400),
	pc_hits number,
	pc_location NUMBER DEFAULT 0,
	pc_focus number DEFAULT 0,
	pc_with number,
	pc_write_date date NOT NULL,
	pc_del_ck number DEFAULT 0,
	PRIMARY KEY (pc_uid)
);


CREATE TABLE pic_comment
(
	cmt_uid number NOT NULL,
	cmt_contents varchar2(100),
	cmt_date date NOT NULL,
	pc_uid number NOT NULL,
	us_uid number NOT NULL,
	PRIMARY KEY (cmt_uid)
);


CREATE TABLE pic_lib
(
	pl_uid number NOT NULL,
	pc_uid number NOT NULL,
	pl_name varchar2(20),
	pl_type varchar2(10) NOT NULL,
	pl_size number,
	pl_path varchar2(20) NOT NULL,
	PRIMARY KEY (pl_uid)
);


CREATE TABLE pic_like
(
	us_uid number NOT NULL,
	pc_uid number NOT NULL,
	pic_like_ck number
);


CREATE TABLE pic_tag
(
	tag_uid number NOT NULL,
	pc_uid number NOT NULL
	
);


CREATE TABLE place
(
	place_uid number NOT NULL,
	contentid number NOT NULL,
	contenttypeid number NOT NULL,
	title varchar2(200) NOT NULL,
	mapx float ,
	mapy float ,
	areaCode number,
	sigunguCode number,
	addr1 varchar2(200),
	tel varchar2(100),
	firstimage2 varchar2(100),
	pl_viewcnt NUMBER DEFAULT 0,
	PRIMARY KEY (place_uid)
);


CREATE TABLE place_like
(
	place_uid number NOT NULL,
	us_uid NUMBER DEFAULT 0 NOT NULL
);


CREATE TABLE review
(
	us_uid number NOT NULL,
	place_uid number NOT NULL,
	rv_uid NUMBER NOT NULL,
	rv_content clob,
	rv_rate number DEFAULT 0,
	rv_write_date DATE DEFAULT SYSDATE
);


CREATE TABLE tag
(
	tag_uid number NOT NULL,
	tag_name varchar2(20),
	PRIMARY KEY (tag_uid)
);


CREATE TABLE tour
(
	tu_uid number NOT NULL,
	us_uid number NOT NULL,
	tu_title varchar2(100) NOT NULL,
	tu_hits number,
	tu_period number DEFAULT 0,
	tu_location number DEFAULT 0,
	tu_with number,
	tu_focus number DEFAULT 0,
	tu_del_ck number DEFAULT 0,
	tu_write_date date,
	tu_start_tour date,
	PRIMARY KEY (tu_uid)
);


CREATE TABLE tour_like
(
	tu_like_ck number DEFAULT 0,
	tu_uid number NOT NULL,
	us_uid number NOT NULL
);


CREATE TABLE tour_location
(
	tu_uid number NOT NULL,
	place_uid number NOT NULL
);


CREATE TABLE tour_memo
(
	tu_uid number NOT NULL,
	memo_day number,
	memo_contents varchar2(400)
);


CREATE TABLE tour_tag
(
	tu_uid number NOT NULL,
	tag_uid number NOT NULL
);


CREATE TABLE users
(
	us_uid number NOT NULL,
	us_id varchar2(20) NOT NULL,
	us_pw varchar2(20) NOT NULL,
	us_email varchar2(40) NOT NULL,
	us_nickName varchar2(20),
	us_gender number DEFAULT 0,
	us_birth date,
	us_memo varchar2(100),
	us_join_date DATE,
	us_pic varchar2(20),
	us_exit_ck number DEFAULT 0,
	us_exit_date date,
	PRIMARY KEY (us_uid)
);


CREATE TABLE user_authority
(
	us_uid number NOT NULL,
	us_authority NUMBER
);


CREATE TABLE user_log
(
	log_uid number NOT NULL,
	log_contents varchar2(40),
	log_date date NOT NULL,
	PRIMARY KEY (log_uid)
);



/*-------------------------------------------------------------- Create Foreign Keys --------------------------------------------------------------*/

ALTER TABLE pic_comment
	ADD FOREIGN KEY (pc_uid)
	REFERENCES picture (pc_uid)
;


ALTER TABLE pic_lib
	ADD FOREIGN KEY (pc_uid)
	REFERENCES picture (pc_uid)
;


ALTER TABLE pic_like
	ADD FOREIGN KEY (pc_uid)
	REFERENCES picture (pc_uid)
;


ALTER TABLE pic_tag
	ADD FOREIGN KEY (pc_uid)
	REFERENCES picture (pc_uid)
;


ALTER TABLE place_like
	ADD FOREIGN KEY (place_uid)
	REFERENCES place (place_uid)
;


ALTER TABLE review
	ADD FOREIGN KEY (place_uid)
	REFERENCES place (place_uid)
;


ALTER TABLE tour_location
	ADD FOREIGN KEY (place_uid)
	REFERENCES place (place_uid)
;


ALTER TABLE pic_tag
	ADD FOREIGN KEY (tag_uid)
	REFERENCES tag (tag_uid)
;


ALTER TABLE tour_tag
	ADD FOREIGN KEY (tag_uid)
	REFERENCES tag (tag_uid)
;


ALTER TABLE tour_like
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;


ALTER TABLE tour_location
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;


ALTER TABLE tour_memo
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;


ALTER TABLE tour_tag
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;


ALTER TABLE picture
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE pic_comment
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE pic_like
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE place_like
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE review
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE tour
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE tour_like
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


ALTER TABLE user_authority
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;


/*-------------------------------------------------------------- Select All From Table --------------------------------------------------------------*/
SELECT * FROM pic_comment;

SELECT * FROM pic_lib;

SELECT * FROM pic_like;

SELECT * FROM pic_tag;

SELECT * FROM picture;

SELECT * FROM place_like;

SELECT * FROM review;

SELECT * FROM tour_location;

SELECT * FROM place;

SELECT * FROM tour_tag;

SELECT * FROM tag;

SELECT * FROM tour_like;

SELECT * FROM tour_memo;

SELECT * FROM tour;

SELECT * FROM user_authority;

SELECT * FROM users;

SELECT * FROM user_log;

/* test */
DELETE users WHERE us_uid = 1041;

SELECT 
			place_uid, 
			title, 
			contentId,
			mapx, 
			mapy, 
			addr1,
			tel,
			firstimage2
		FROM 
			place 
		WHERE 
			contentTypeId = 12
		ORDER BY 
			place_uid;
		
		
SELECT 
			place_uid, 
			title, 
			contentId,
			mapx, 
			mapy, 
			addr1,
			tel,
			firstimage2
		FROM 
			place 
		WHERE 
			contentTypeId = 12
		ORDER BY 
			place_uid;

SELECT
place_uid "uid", title, contentid, contenttypeid
FROM place
WHERE place_uid = 3413;



/* users 더미데이터 */
BEGIN
FOR i IN 1..50 LOOP
insert into users(us_uid, us_id, us_pw, us_email)
values(us_uid_seq.nextval, CONCAT('ID',i), CONCAT('PW',i),CONCAT(i,'@google.com'));
END LOOP;
END;
/* review 더미데이터 */
BEGIN
FOR i IN 1..20 LOOP
insert into review(us_uid, place_uid, rv_uid, rv_content, rv_write_date)
values(i, 2, rv_uid_seq.nextval , CONCAT(i,'번째 리뷰남깁니다'), SYSDATE);
END LOOP;
END;
/* picture 더미데이터 */
BEGIN
FOR i IN 1..20 LOOP
insert into picture(pc_uid , us_uid, pc_contents , pc_hits , pc_location, pc_focus,pc_with,pc_write_date ,pc_del_ck)
values(pc_uid_seq.nextval, us_uid_seq.nextval, CONCAT(i,'번째 내용남깁니다'), 0, 3, 2, 1, SYSDATE, 0);
END LOOP;
END;
/* pic_lib 더미데이터 */
BEGIN
FOR i IN 1..20 LOOP
insert into pic_lib(pl_uid  , pc_uid , pl_name  , pl_type  , pl_size , pl_path)
values(pl_uid_seq.nextval, pc_uid_seq.nextval, CONCAT(i,'번째 이름'), '.png', 1, CONCAT(i,'번째 경로'));
END LOOP;
END;
ALTER TABLE PIC_LIB MODIFY pl_path varchar2(200);
/* tour_location 더미데이터 */
BEGIN
FOR i IN 1..20 LOOP
insert into tour_location(tu_uid  , place_uid)
values(i, i);
END LOOP;
END;
ALTER TABLE PIC_LIB MODIFY pl_path varchar2(200);

/* test */
UPDATE PIC_LIB SET PL_PATH ='https://www.sisa-news.com/data/photos/20200936/art_159912317533_32480a.jpg' WHERE pc_uid = 20;

SELECT * FROM PIC_LIB pl  ;

SELECT p.PC_UID, pl.PL_PATH FROM 
(SELECT * from
(SELECT * FROM PICTURE WHERE PC_WRITE_DATE BETWEEN '2021-04-18' AND '2021-04-20' ORDER BY PC_HITS DESC)
WHERE ROWNUM= 1) p JOIN PIC_LIB pl ON p.PC_UID = pl.PC_UID ;
DELETE PICTURE WHERE us_uid=1;
 ;
SELECT * from
(SELECT * FROM PICTURE WHERE PC_WRITE_DATE BETWEEN '2021-04-18' AND '2021-04-20' ORDER BY PC_HITS DESC)
WHERE ROWNUM= 1;
SELECT * FROM PICTURE WHERE PC_WRITE_DATE BETWEEN '2021-04-18' AND '2021-04-20' ORDER BY PC_HITS DESC;



SELECT pl.PC_UID "pcuid" ,pl.PL_PATH "path"
FROM 
	(SELECT * FROM
				(SELECT * FROM PICTURE WHERE PC_WRITE_DATE BETWEEN '${startDate}' AND '${endDate}'ORDER BY PC_HITS DESC)
	WHERE ROWNUM= 1) p 
			JOIN 
				PIC_LIB pl 
			ON 
				p.PC_UID = pl.PC_UID;
			
SELECT J.*, P.FIRSTIMAGE2 FROM
(SELECT H.tu_uid, H.tu_title, H.TU_HITS, D.place_uid FROM 
(SELECT * FROM 
(SELECT * FROM tour ORDER BY tu_hits DESC) 
WHERE ROWNUM < 4) H JOIN tour_location D ON H.tu_uid = D.tu_uid) J JOIN place P ON J.place_uid = P.place_uid;

SELECT * FROM tour_location;

		SELECT pl.PC_UID "pcuid" ,pl.PL_PATH "path", pc_focus
		FROM 
			(SELECT * 
				FROM(SELECT * FROM PICTURE ORDER BY PC_HITS DESC)
				WHERE ROWNUM< 4) p 
			JOIN 
				PIC_LIB pl 
			ON 
				p.PC_UID = pl.PC_UID;

				
				SELECT * 
				FROM(SELECT * FROM PICTURE ORDER BY PC_HITS DESC)
				WHERE ROWNUM< 4;
				
INSERT  INTO user_authority
VALUES (1021,1);



SELECT *FROM users;
SELECT U.us_uid , U.us_id, U.us_pw, U.us_email, U.us_nickname, U.us_gender, U.us_birth,  U.us_memo, U.us_pic, U.session_key, UA.us_authority FROM 
(SELECT *
	FROM users
	WHERE session_key = 'none') U JOIN USER_AUTHORITY UA ON U.us_uid = UA.us_uid;
	

SELECT *
FROM users

SELECT * 
FROM USER_AUTHORITY;

 INSERT INTO user_authority 
		(
			us_uid,
			us_authority
		)
		VALUES 
		(
			(
				SELECT * 
				FROM
					(
						SELECT us_uid
						FROM users
						ORDER BY us_uid DESC
					)
					WHERE ROWNUM = 1
				)
			, 1
			);
		