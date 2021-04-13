package com.spring.app.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.app.domain.CardsDAO;
import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.picLibDTO;

@Service
public class CardsService {
	
	CardsDAO dao;
	
	@Autowired
	ServletContext servletContext;
	
	private SqlSession sqlSession;
	
	
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		System.out.println("SqlSession() 생성");
		this.sqlSession = sqlSession;
	}
	
	// 테스트 출력
	public CardsService() {
		super();
		System.out.println("BoardService() 생성");
	}
	
	public List<CardsDTO> list(){
		// MyBatis 가 만들어준 DAO
		dao = sqlSession.getMapper(CardsDAO.class);
		return dao.select();
	}
	
	public int write(CardsDTO dto) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CardsDAO.class);
		
		int result = dao.insert(dto);
        List<picLibDTO> picFileList = setFileInfo(dto);
        for (picLibDTO LibDTO : picFileList) {
        	dao.insertLib(LibDTO);
        }
        System.out.println("생성된 uid 는 " + dto.getUid());
		
		
		return result;
		
//		return dao.insert(dto.getSubject(), dto.getContent(), dto.getName());
	}
	
	
	
	public List<CardsDTO> selectByUid(int uid){
		dao = sqlSession.getMapper(CardsDAO.class);
		return dao.selectByUid(uid);
	}
	
	public int update(CardsDTO dto, HttpServletRequest req) throws IllegalStateException, IOException {
		dao = sqlSession.getMapper(CardsDAO.class);
		
		
		
		String [] delFiles = req.getParameterValues("delfile");
		if(delFiles != null && delFiles.length > 0) {// 삭제될 파일이 있었다면
			
			// String[] -> int[] 변환
			int [] delFileUids = new int[delFiles.length];
			for(int i = 0; i < delFiles.length; i++) {
				delFileUids[i] = Integer.parseInt(delFiles[i]);
				dao.deleteFileByUid(delFileUids[i]);
			}	
		}// end if
		
		List<picLibDTO> picFileList = setFileInfo(dto);
        for (picLibDTO LibDTO : picFileList) {
        	dao.insertLib(LibDTO);
        }
		return dao.update(dto.getUid(), dto);
	}
	
	
	public int deleteByUid(int uid) {
		dao = sqlSession.getMapper(CardsDAO.class);
		return dao.deleteByUid(uid);
	}
	
	
	
	
	public List<picLibDTO> setFileInfo(CardsDTO dto) throws IllegalStateException, IOException{
		dao = sqlSession.getMapper(CardsDAO.class);
		
		List<MultipartFile> files = null;
		files = CardsDTO.getFiles();
		
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
            	if(fileSize != 0) {
            		
            		picLibDTO =	new picLibDTO();
            		String fileName2 = servletContext.getRealPath("/") + "resources\\img\\" + fileNameKey;
            		// 파일명 변경(uuid로 암호화) + 확장자
            		fileNameKey = getRandomString() + fileExt;
            		fileType = multipartFile.getContentType();
            		filePath2 = filePath + file.separator + fileNameKey;
            		fileExt = fileName.substring(fileName.lastIndexOf(".")); // .jpg
            		// 설정한 Path에 파일 저장
            		file = new File(filePath2);
            		
            		multipartFile.transferTo(file);
            		System.out.println("filename2 = " + fileName2);
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
   

	public List<picLibDTO> selectFileByUid(int uid){
		dao = sqlSession.getMapper(CardsDAO.class);
		return dao.selectFileByUid(uid);
	}
	
	// @transactional
		public List<CardsDTO> viewByUid(int uid) throws IOException{
			// *****사실, 트랜잭션은 여기서 발생해야 한다.
			// 1. 조회수 증가 : incViewCnt()
			// 2. 글 하나 읽어오기 : selectByUid()
			dao = sqlSession.getMapper(CardsDAO.class);
			dao.incHits(uid);

			return dao.selectByUid(uid);
		}
	
	 /** 32글자의 랜덤한 문자열(숫자포함) 생성 */
    public static String getRandomString() {
 
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
    
    
}