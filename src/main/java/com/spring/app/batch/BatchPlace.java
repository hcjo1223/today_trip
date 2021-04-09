package com.spring.app.batch;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.net.URL;

public class BatchPlace {

	// JDBC 관련 기본 객체 변수들 선언
	Connection conn = null;
	Statement stmt = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;   // executeQuery(), SELECT 결과 
	
	final String DRIVER = "oracle.jdbc.driver.OracleDriver";	  // JDBC 드라이버 클래스
	final String URL = "jdbc:oracle:thin:@localhost:1521:XE";   // DB 접속 URL
	final String USERID = "scott99";   // DB 접속 계정 정보
	final String USERPW = "tiger99";


	final String SQL_INSERT_PLACE = "INSERT INTO place\r\n"
			+ "	(place_uid, contentid, contenttypeid, title, mapx, mapy, areaCode, sigunguCode, addr1, tel,firstimage2)\r\n"
			+ "	VALUES(place_uid_seq.nextval, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)";
	
	
	public static void main(String[] args) {
//		new BatchPlace().runBatchPlace();
		new BatchPlace().mainBatch();
	}


	private void runBatchPlace(int contentid, int contenttypeid, String title, float mapx, float mapy, int areaCode, int sigunguCode,String addr1,String tel,String firstimage2) throws NumberFormatException {
		try{
			Class.forName(DRIVER);
			System.out.println("드라이버 로딩 성공" + "<br>");   // 테스트 출력
			conn = DriverManager.getConnection(URL, USERID, USERPW);
			System.out.println("conn 성공" + "<br>");       // 테스트 출력
			
			pstmt = conn.prepareStatement(SQL_INSERT_PLACE);
			
				pstmt.setInt(1, contentid);
				pstmt.setInt(2, contenttypeid);
				pstmt.setString(3, title);
				pstmt.setFloat(4, mapx);
				pstmt.setFloat(5, mapy);
				pstmt.setInt(6, areaCode);
				pstmt.setInt(7, sigunguCode);
				pstmt.setString(8, addr1);
				pstmt.setString(9, tel);
				pstmt.setString(10, firstimage2);
			
				
				pstmt.executeUpdate();
				System.out.println("insert 성공");
		} catch(Exception e){
			e.printStackTrace();
			//※ 예외처리를 하든지, 예외 페이지를 설정해주어야 한다.
		} finally {
			// DB 리소스 해제
			try{
				if(rs != null) rs.close();
				if(stmt != null) stmt.close();
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			}catch(Exception e){
				e.printStackTrace();
			}
		} // end try
		
	}
	
	private void mainBatch() {
		
		try {
			int contentTypeArr [] = {12, 32, 39};//관광지 (12) 숙박 (32) 식당 (39)
			// 관광지 - 9487개 
			// 숙박 - 3434개
			// 식당 - 6329개
			int numOfRows = 100;
			int pageNo = 1;
			String serviceKey = "pJTimjFQ8JAUDC5tNBIN6Pq%2Fv%2Bn2Ttf4vF84sqbJCPzRtR3Sqc3EDbm9CwScgDxnHDZNYh3xlwVDwNvS1mdZag%3D%3D";
			for(int j=0; j<contentTypeArr.length; j++) {
				String urlString = 
						"http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=" 
						+ serviceKey + "&contentTypeId=" 
						+ contentTypeArr[j] + "&MobileOS=ETC&MobileApp=TourAPI3.0_Guide"
						+ "&numOfRows=" + numOfRows
						+ "&pageNo=" + pageNo +"&_type=json";
				
				
				URL url;
				
				BufferedReader bf;
				String result="";
				String line = "";
				url = new URL(urlString);
				
				bf = new BufferedReader(new InputStreamReader(url.openStream()));
				
				while((line=bf.readLine())!=null){
					result=result.concat(line); 
					 System.out.println(result);
				}
				
				JSONParser parser = new JSONParser(); 
				JSONObject obj = (JSONObject) parser.parse(result);

				
				JSONObject parse_response = (JSONObject) obj.get("response");
				JSONObject parse_body = (JSONObject) parse_response.get("body");
				JSONObject parse_items = (JSONObject) parse_body.get("items");

				JSONArray parse_item = (JSONArray) parse_items.get("item");

				JSONObject place;
				
				for(int i = 0 ; i <parse_item.size(); i++) {
					place = (JSONObject) parse_item.get(i);
					
					int contentid = Integer.parseInt(String.valueOf(place.get("contentid")));
					int contenttypeid = Integer.parseInt(String.valueOf(place.get("contenttypeid")));
					String title = (String)place.get("title");
					
					float mapx;
					float mapy;
					if (place.get("mapx") == null || place.get("mapy") == null) {// mapx,mapy가 null 이면 0.0으로 설정
						mapx = (float)0.0;
						mapy = (float)0.0;
					}else {
						mapx = Float.parseFloat(String.valueOf(place.get("mapx")));
						mapy = Float.parseFloat(String.valueOf(place.get("mapy")));
						
					}
					
					int areacode;
					if (place.get("areacode") == null) {// areacode가 null 이면 0으로 설정
						areacode = 0;
					}else {
						areacode = Integer.parseInt(String.valueOf(place.get("areacode")));
					}
					
					int sigungucode;
					if (place.get("sigungucode") == null) {// sigungucode가 null 이면 0으로 설정
						sigungucode = 0;
					}else {
						sigungucode = Integer.parseInt(String.valueOf(place.get("sigungucode")));
					}
					
					String addr1;
					if (place.get("addr1") == null) {
						addr1 = "";
					} else {
						addr1 = (String) place.get("addr1");
					}
					
					String tel;
					if(place.get("tel") == null) {
<<<<<<< HEAD
						tel = " ";
					} else {
					tel = (String)place.get("tel");
					}
					
					String firstimage2;
					if(place.get("firstimage2") == null) {
						firstimage2 = " ";
=======
						tel = "";
					} else {
					tel = (String)place.get("tel");
					}
					
					String firstimage2;
					if(place.get("firstimage2") == null) {
						firstimage2 = "";
>>>>>>> branch 'master' of https://github.com/hcjo1223/today_trip.git
					} else {
					firstimage2 = (String)place.get("firstimage2");
					}
					
					runBatchPlace(contentid, contenttypeid, title, mapx, mapy, areacode, sigungucode, addr1,tel, firstimage2);
					System.out.println();
					System.out.println("contentid : " + contentid);
					System.out.println("contenttypeid : " + contenttypeid);
					System.out.println("title : " + title);
					System.out.println("mapx : " + mapx);
					System.out.println("mapy : " + mapy);
					System.out.println("areacode : " + areacode);
					System.out.println("sigungucode : " + sigungucode);
					System.out.println("tel : " + tel);
					System.out.println("addr1 : " + addr1);
				}
				
				bf.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		
		
		
	}//end mainBatch
		
		
}














