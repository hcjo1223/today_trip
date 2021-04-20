SELECT * FROM PLACE ORDER BY PLACE_UID DESC;
SELECT * FROM PLACE_LIKE;	

SELECT * FROM USERS;

BEGIN
FOR i IN 1..20 LOOP
INSERT INTO PLACE_LIKE (PLACE_UID, US_UID)
	VALUES (195, i);END LOOP;
END;

SELECT * FROM REVIEW WHERE PLACE_UID = 195;

SELECT  
	us_uid, place_uid, rv_uid "re_uid", rv_content "content", rv_rate "rate", rv_write_date "write_date"
FROM 
	(SELECT ROWNUM AS RNUM, T.* FROM 
		(SELECT * FROM review WHERE place_uid = 195 ORDER BY rv_uid DESC) T) 
WHERE 
	RNUM >= 1 AND RNUM < 11;

-- 좋아요 등록 --
INSERT INTO PLACE_LIKE (PLACE_UID, US_UID)
VALUES (193, 103);

-- 좋아요 취소 --
DELETE FROM PLACE_LIKE 
WHERE PLACE_UID = 195 AND US_UID = 201;

-- 좋아요 수 --
SELECT COUNT(*) AS likeCnt FROM PLACE_LIKE
WHERE PLACE_UID = 194;

-- 해당 user 좋아요 체크 --
SELECT count(*) AS likeChk FROM PLACE_LIKE  
WHERE PLACE_UID = 195 AND US_UID = 1;

SELECT A.*, B.reviewcnt, C.likecnt FROM 
	(SELECT place_uid,
			contentid,
			contenttypeid,
			title,
			mapx,
			mapy,
			areaCode,
			sigunguCode,
			addr1,
			tel,
			firstimage2,
			pl_viewcnt AS viewcnt 
	 FROM (SELECT ROWNUM AS RNUM, T.* FROM (SELECT * FROM place ORDER BY place_uid DESC) T) 
 	 WHERE RNUM >= #{from} AND RNUM < (#{from} + #{pageRows})) A 
LEFT OUTER JOIN (SELECT PLACE_UID ,count(*) AS reviewcnt FROM REVIEW group BY PLACE_UID ) B
ON A.place_uid = B.place_uid
