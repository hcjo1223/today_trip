/*-------------------------------------------------------------- Drop Tables --------------------------------------------------------------*/
DROP TABLE users CASCADE CONSTRAINTS;
DROP TABLE tour CASCADE CONSTRAINTS;
DROP TABLE tour_memo CASCADE CONSTRAINTS;
DROP TABLE tour_location CASCADE CONSTRAINTS;
DROP TABLE place CASCADE CONSTRAINTS;

/*-------------------------------------------------------------- Drop Sequence --------------------------------------------------------------*/
DROP SEQUENCE us_uid_seq;
DROP SEQUENCE tu_uid_seq;
DROP SEQUENCE memo_uid_seq;
DROP SEQUENCE lc_uid_seq;
DROP SEQUENCE place_uid_seq;

/*-------------------------------------------------------------- Create Sequence --------------------------------------------------------------*/
CREATE SEQUENCE us_uid_seq;
CREATE SEQUENCE tu_uid_seq;
CREATE SEQUENCE memo_uid_seq;
CREATE SEQUENCE lc_uid_seq;
CREATE SEQUENCE place_uid_seq;

/*-------------------------------------------------------------- Select All From Table --------------------------------------------------------------*/
SELECT * FROM tab;
SELECT * FROM users;
SELECT * FROM tour ORDER BY tu_write_date DESC;
SELECT * FROM tour_memo;
SELECT * FROM tour_location;
SELECT * FROM tour_like;
SELECT * FROM place;

INSERT INTO tour_like (tu_like_ck, tu_uid, us_uid)
	VALUES (1, 664, 641);
DELETE FROM tour_like
WHERE us_uid = 643;

UPDATE TOUR
SET tu_title = '가나다'
	, tu_period = 2
	, tu_location = 2
	, tu_with = 2
	, tu_focus = 2
	, tu_write_date = SYSDATE 
	, tu_start_tour = '2021-04-22'
	, tu_end_tour = '2021-04-23'
	, tu_img_url = 'http://tong.visitkorea.or.kr/cms/resource/63/2480263_image2_1.jpg'
WHERE tu_uid = 645;


/*-------------------------------------------------------------- Create Tables --------------------------------------------------------------*/
CREATE TABLE users
(
	us_uid NUMBER NOT NULL,
	us_id VARCHAR2(20) NOT NULL,
	us_pw VARCHAR2(20) NOT NULL,
	us_email VARCHAR2(40) NOT NULL,
	us_nickName VARCHAR2(20),
	us_gender NUMBER DEFAULT 0,
	us_birth DATE,
	us_memo VARCHAR2(100),
	us_join_date DATE,
	us_pic VARCHAR2(20),
	us_exit_ck NUMBER DEFAULT 0,
	us_exit_date DATE,
	PRIMARY KEY (us_uid)
);

CREATE TABLE tour
(
	tu_uid NUMBER NOT NULL,
	us_uid NUMBER NOT NULL,
	tu_title VARCHAR2(100) NOT NULL,
	tu_hits NUMBER,
	tu_period NUMBER DEFAULT 0,
	tu_location NUMBER DEFAULT 0,
	tu_with NUMBER,
	tu_focus NUMBER DEFAULT 0,
	tu_del_ck NUMBER DEFAULT 0,
	tu_write_date DATE,
	tu_start_tour DATE,
	tu_end_tour DATE,
	tu_img_url VARCHAR2(250) NULL,
	PRIMARY KEY (tu_uid)
);

ALTER TABLE tour
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;

CREATE TABLE tour_memo
(
	memo_uid NUMBER NOT NULL,
	tu_uid NUMBER NOT NULL,
	tu_day NUMBER NOT NULL,
	memo_contents VARCHAR2(400) NULL,
	PRIMARY KEY (memo_uid)
);

ALTER TABLE tour_memo
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;

CREATE TABLE place
(
	place_uid NUMBER NOT NULL,
	contentid NUMBER NOT NULL,
	contenttypeid NUMBER NOT NULL,
	title VARCHAR2(200) NOT NULL,
	mapx FLOAT ,
	mapy FLOAT ,
	areaCode NUMBER,
	sigunguCode NUMBER,
	addr1 VARCHAR2(200),
	tel VARCHAR2(100),
	firstimage2 VARCHAR2(100),
	pl_viewcnt NUMBER DEFAULT 0,
	PRIMARY KEY (place_uid)
);

CREATE TABLE tour_location
(
	lc_uid NUMBER NOT NULL,
	place_uid NUMBER NOT NULL,
	tu_uid NUMBER NOT NULL,
	tu_day NUMBER NOT NULL,
	PRIMARY KEY (lc_uid)
);

ALTER TABLE tour_location
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;

ALTER TABLE tour_location
	ADD FOREIGN KEY (place_uid)
	REFERENCES place (place_uid)
;

CREATE TABLE tour_like
(
	tu_like_ck number DEFAULT 0,
	tu_uid number NOT NULL,
	us_uid number NOT NULL
);

ALTER TABLE tour_like
	ADD FOREIGN KEY (tu_uid)
	REFERENCES tour (tu_uid)
;

ALTER TABLE tour_like
	ADD FOREIGN KEY (us_uid)
	REFERENCES users (us_uid)
;



/*-------------------------------------------------------------- 더미 데이터 --------------------------------------------------------------*/
-- user
BEGIN
FOR i IN 1..100 LOOP
insert into users(us_uid, us_id, us_pw, us_email)
values(us_uid_seq.nextval, CONCAT('ID',i), CONCAT('PW',i),CONCAT(i,'@google.com'));
END LOOP;
END;

-- tour
INSERT INTO tour
         (tu_uid, us_uid, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url)
      VALUES
         (tu_uid_seq.nextval, us_uid_seq.nextval, 'test1', 1, 3,2,1,3,0,sysdate,sysdate,sysdate,'http://tong.visitkorea.or.kr/cms/resource/88/1982388_image2_1.jpg');
INSERT INTO tour
         (tu_uid, us_uid, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url)
      VALUES
         (tu_uid_seq.nextval, us_uid_seq.nextval, 'test2', 1, 6,3,1,3,0,sysdate,sysdate,sysdate,'http://tong.visitkorea.or.kr/cms/resource/32/2026832_image2_1.JPG');
INSERT INTO tour
         (tu_uid, us_uid, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url)
      VALUES
         (tu_uid_seq.nextval, us_uid_seq.nextval, 'test3', 1, 7,2,2,3,0,sysdate,sysdate,sysdate,'http://tong.visitkorea.or.kr/cms/resource/38/2682638_image2_1.jpg');
INSERT INTO tour
         (tu_uid, us_uid, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url)
      VALUES
         (tu_uid_seq.nextval, us_uid_seq.nextval, 'test4', 1, 12,1,1,3,0,sysdate,sysdate,sysdate,'http://tong.visitkorea.or.kr/cms/resource/24/588124_image2_1.jpg');
INSERT INTO tour
         (tu_uid, us_uid, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url)
      VALUES
         (tu_uid_seq.nextval, us_uid_seq.nextval, 'test5', 1, 7,2,1,7,0,sysdate,sysdate,sysdate,'http://tong.visitkorea.or.kr/cms/resource/34/1181034_image2_1.jpg');
/* 2배복사 */
INSERT INTO tour
         (tu_uid, us_uid, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url)
SELECT tu_uid_seq.nextval, us_uid_seq.nextval, tu_title, tu_hits, tu_period, tu_location, tu_with, tu_focus, tu_del_ck, tu_write_date, tu_start_tour, tu_end_tour, tu_img_url
FROM tour;

SELECT * FROM tour;
        
-- memo
BEGIN
FOR i IN 1..640 LOOP
insert into tour_memo(memo_uid, tu_uid, tu_day, memo_contents)
values(memo_uid_seq.nextval, i, 1, CONCAT(i,'eiebgeibwiwn'));
END LOOP;
END;	

SELECT * FROM tour_memo;

-- TL
INSERT INTO tour_location
		(lc_uid, place_uid, tu_uid, tu_day)
	VALUES
		(lc_uid_seq.nextval, 7, 1, 1);
INSERT INTO tour_location
		(lc_uid, place_uid, tu_uid, tu_day)
	VALUES
		(lc_uid_seq.nextval, 3, 2, 1);
INSERT INTO tour_location
		(lc_uid, place_uid, tu_uid, tu_day)
	VALUES
		(lc_uid_seq.nextval, 55, 3, 1);
INSERT INTO tour_location
		(lc_uid, place_uid, tu_uid, tu_day)
	VALUES
		(lc_uid_seq.nextval, 83, 4, 1);
INSERT INTO tour_location
		(lc_uid, place_uid, tu_uid, tu_day)
	VALUES
		(lc_uid_seq.nextval, 62, 5, 1);
	
/* 2배복사 */
INSERT INTO tour_location
         (lc_uid, place_uid, tu_uid, tu_day)
SELECT lc_uid_seq.nextval, place_uid, tu_uid, tu_day
FROM tour_location;

SELECT * FROM TOUR_LOCATION;

	
SELECT * FROM place;

SELECT * 
FROM(
      SELECT ROWNUM NUM, F.*
      FROM (
            SELECT  *
            FROM tour 
            ORDER BY tu_write_date DESC
         ) F
   )
WHERE NUM BETWEEN 1 AND 35;


SELECT
			S1.us_uid, 
			S1.us_id, 
			S1.us_email,
			S1.us_nickName, 
			S1.us_gender, 
			S1.us_birth,
			S1.us_join_date,
			S1.us_exit_date,
			S2.us_authority 
		FROM 
			(SELECT ROWNUM AS RNUM, T.* FROM 
				(SELECT * FROM users ORDER BY us_uid) T) S1 JOIN USER_AUTHORITY S2 ON S1.us_uid = S2.US_UID ;
		WHERE 
			RNUM >= 10 AND RNUM < (10 + 10);
			
		
		SELECT * FROM USERS;
		
	SELECT 
			pl.PC_UID ,pl.PL_PATH, pc_focus,pl_name
		FROM 
			(SELECT * 
				FROM
					(SELECT * 
						FROM 
							PICTURE 
						WHERE pc_del_ck = 1
						ORDER BY 
							PC_HITS DESC)
				WHERE ROWNUM< 4) p 
			JOIN 
				PIC_LIB pl 
			ON 
				p.PC_UID = pl.PC_UID
			WHERE ROWNUM< 4;
				
			
SELECT * FROM PICTURE;