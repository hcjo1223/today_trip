package com.spring.app.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.app.domain.CardsAjaxDAO;
import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.UsersDTO;
import com.spring.app.domain.picLibDTO;

@Service
public class CardsAjaxService {
	CardsAjaxDAO dao;
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<CardsDTO> list(int from, int pageRows){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return  dao.selectFromRow(from, pageRows);
		
	}
	public List<CardsDTO> locationList(int from, int pageRows, int search){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return  dao.selectLocationFromRow(from, pageRows,search);
		
	}
	
	public List<CardsDTO> WithsList(int from, int pageRows, int search){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return  dao.selectWithsFromRow(from, pageRows,search);
		
	}
	
	public List<CardsDTO> FocusList(int from, int pageRows, int search){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return  dao.selectFocusFromRow(from, pageRows,search);
		
	}
	public int count() {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		return dao.countAll();
	}
	
	public int countLocation(int search) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		return dao.countLocation(search);
	}
	
	public int countWiths(int search) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		return dao.countWiths(search);
	}
	
	public int countFocus(int search) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		return dao.countFocus(search);
	}
	
	public List<CardsDTO> viewByUid(int uid) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		// ※ 트랜잭션 처리해야 한다.
		dao.incHits(uid);
		return dao.selectByUid(uid);
	}
	
	public int write(CardsDTO dto) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		return dao.insert(dto); 
	}
	
	public int insertFile(picLibDTO LibDTO) throws Exception {
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return dao.insertLib(LibDTO); 
	}
	
	public int update(CardsDTO dto) throws Exception {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
		return dao.update(dto);
	}
	
	public int deleteByUid(int uid) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return dao.deleteByUid(uid);
	}
	
	public int deleteFileByUid(int uid) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return dao.deleteFileByUid(uid);
	}
	
	public List<CardsDTO> selectByUid(int uid) {
		dao = sqlSession.getMapper(CardsAjaxDAO.class); // MyBatis 사용
//		List<picLibDTO> cards = selectFileByUid(uid);
		return dao.selectByUid(uid);  // 1개짜리 List
	}
	
	public List<picLibDTO> selectFileByUid(int uid){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return dao.selectFileByUid(uid);
	}
	
	public picLibDTO selectFile1ByUid(int uid){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return dao.selectFile1ByUid(uid);
	}
	
	public List<UsersDTO> selectUserName(int uid){
		dao = sqlSession.getMapper(CardsAjaxDAO.class);
		return dao.selectUserName(uid);
	}
	
	public List<picLibDTO> setFileInfo(CardsDTO dto) throws Exception{
//		dao = sqlSession.getMapper(CardsDAO.class);
		
		List<MultipartFile> files = dto.getFiles();
		System.out.println("files값 = " + files);
		 List<picLibDTO> picFileList = new ArrayList<picLibDTO>();
		 
		 picLibDTO picLibDTO = null; 
		 
//		 picDTO picDTO = new picDTO();
		 
		 int pcuid = dto.getUid();
	        String fileName = null;
	        String fileExt = null;
	        String fileNameKey = null;
	        String fileType = null;
	        long fileSize = 0;
	        // 파일이 저장될 Path 설정
	        String filePath = "c:/upload";
	        String filePath2 = null;
	        
	       
	 
	        File file = new File(filePath);
	        
	        // 디렉토리가 없으면 생성
	        if (file.exists() == false) {
	            file.mkdirs();
	        }
	 
	        for (MultipartFile multipartFile : files) {
	        	fileName = multipartFile.getOriginalFilename();
	        	System.out.println("fileName = " + fileName + " ");
	        	fileSize = (long) multipartFile.getSize();
	        	fileExt = fileName.substring(fileName.lastIndexOf(".")); // .jpg
	        	if(fileSize != 0) {
	        		
	        		picLibDTO =	new picLibDTO();
//	        		String fileName2 = servletContext.getRealPath("/") + "resources\\img\\" + fileNameKey;
	        		// 파일명 변경(uuid로 암호화) + 확장자
	        		fileNameKey = getRandomString() + fileExt;
	        		System.out.println("filePath2 = " + filePath2);

	        		fileType = multipartFile.getContentType();
	        		filePath2 = filePath + file.separator + fileNameKey;
	        		// 설정한 Path에 파일 저장
	        		file = new File(filePath2);
	        		System.out.println("filePath2 = " + filePath2);
	        		System.out.println("file =" + file.exists());
	        		multipartFile.transferTo(file);
//	        		System.out.println("filename2 = " + fileName2);
	        		System.out.println("fileNameKey = " +fileNameKey);
	        		// TODO 
//	                picDTO = new picLibDTO();
	        	
	        		picLibDTO.setPcUid(pcuid);
	        		picLibDTO.setName(fileNameKey); // fileExt
	        		picLibDTO.setType(fileType);
	        		picLibDTO.setPath(filePath2);
	        		picLibDTO.setSize(fileSize);
	        		picFileList.add(picLibDTO);
	        	}
	        }
	        
	 
	        return picFileList;
	}

		 	/** 32글자의 랜덤한 문자열(숫자포함) 생성 */
			public static String getRandomString() {
			
			    return UUID.randomUUID().toString().replaceAll("-", "");
			}
}
