package com.spring.app.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spring.app.domain.CardsAjaxList;
import com.spring.app.domain.CardsAjaxResult;
import com.spring.app.domain.CardsDTO;
import com.spring.app.domain.PicAjaxList;
import com.spring.app.domain.PicAjaxResult;
import com.spring.app.domain.picLibDTO;
import com.spring.app.service.CardsAjaxService;

@RestController
@RequestMapping("/cards")
public class CardsAjaxController {
	
	@Autowired
	CardsAjaxService ajaxService;
	
	// A. 글 목록(페이징)
	@GetMapping("/{page}/{pageRows}")
	public CardsAjaxList list(
			@PathVariable int page,
			@PathVariable int pageRows
			) {
		List<CardsDTO> lists = null;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		
		String status = "FAIL"; // 기본 FAIL
		
		
		// 페이징 관련 세팅 값들
		//page : 현재 페이지
		//pageRows : 한 '페이지'에 몇개의 글을 리스트 할것인가?
		int writePages = 8;    // 한 [페이징] 에 몇개의 '페이지'를 표현할 것인가?
		int totalPage = 0; // 총 몇 '페이지' 분량인가? 
		int totalCnt = 0;  // 글은 총 몇개인가?
		int uid = 0;
		try {
			// 글 전체 개수 구하기
			totalCnt = ajaxService.count();
			
			// 총 몇페이지 분량인가?
			totalPage = (int)Math.ceil(totalCnt / (double)pageRows);
			
			// from: 몇번째 row 부터?
			int from = (page - 1) * pageRows + 1;  // ORACLE 은 1부터 시작
			//int from = (page - 1) * pageRows;  // MySQL 은 0부터 시작
			
			
			// 내용은 리스트에
			lists = ajaxService.list(from, pageRows);
			
			if(lists == null) {
				message.append("[리스트할 데이터가 없습니다]");
			}else {
				status = "OK";
			}

		} catch(Exception e) {
			message.append("[트랜잭션 에러: " + e.getMessage() + "]");
		}
		
		
		List<picLibDTO> pdto = new ArrayList<picLibDTO>();
		CardsAjaxList result = new CardsAjaxList();
		result.setStatus(status);
		result.setMessage(message.toString());
		
		for (CardsDTO a : lists) {
			uid = a.getUid(); // lists CardsDTO 에서 uid 뽑음
			System.out.println("uid = " + uid);
			pdto = ajaxService.selectFileByUid(uid); // uid 값으로 picDto 배열을 만듬
			System.out.println("pdto = " + pdto);
			a.setList(pdto);
//			result.setArr(pdto); // 배열을 입력시키는데 마지막 배열값이들어감 내가 원하는건 배열의 배열들이 들어가야됨
			
			System.out.println("result pic= " + result);
			
		}
		if(lists != null) {
			result.setCount(lists.size());
			result.setList(lists);
		}
		System.out.println("result list= " + result);
		
		result.setPage(page);
		result.setTotalPage(totalPage);
		result.setWritePages(writePages);
		result.setPageRows(pageRows);
		result.setTotalCnt(totalCnt);



		return result;
	}
	
//	 B. 글 읽기
	@GetMapping("/{uid}")
	public CardsAjaxList view(@PathVariable int uid) {
		List<CardsDTO> list = null;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {
			list = ajaxService.viewByUid(uid); // 조회수 증가 + 읽기
			
			if(list.size() == 0) { // ★
				message.append("[해당 데이터가 없습니다]");
			} else {
				status = "OK";					
			}



		} catch (NumberFormatException e) { 
			e.printStackTrace();
			message.append("[유효하지 않은 parameter]");
		} catch (Exception e) { // ★  
			e.printStackTrace();
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}
		List<picLibDTO> pdto = new ArrayList<picLibDTO>();
		CardsAjaxList result = new CardsAjaxList();
		pdto = ajaxService.selectFileByUid(uid);
		
		result.setStatus(status);
		result.setMessage(message.toString());
		
		if(list != null) {			
			result.setCount(list.size());
			result.setList(list);
			result.setArr(pdto);
		}
		
		return result;

	}
	
	@GetMapping("/pic/{uid}")
	public PicAjaxResult viewFile(@PathVariable int uid){
		List<picLibDTO> list = null;
		// response 에 필요한 값들
				StringBuffer message = new StringBuffer();
				String status = "FAIL";  // 기본 FAIL
				
				try {
					list = ajaxService.selectFileByUid(uid); // 조회수 증가 + 읽기
					
					if(list.size() == 0) { // ★
						message.append("[해당 데이터가 없습니다]");
					} else {
						status = "OK";					
					}



				} catch (NumberFormatException e) { 
					e.printStackTrace();
					message.append("[유효하지 않은 parameter]");
				} catch (Exception e) { // ★  
					e.printStackTrace();
					message.append("[트랜잭션 에러:" + e.getMessage() + "]");
				}

				PicAjaxResult result = new PicAjaxResult();
				result.setStatus(status);
				result.setMessage(message.toString());
				
				if(list != null) {			
					result.setCount(list.size());
					result.setList(list);
				}
				
				return result;
	}
	@GetMapping("/pics/{uid}")
	public List<picLibDTO> viewFile2(@PathVariable int uid){
		List<picLibDTO> list = null;
		// response 에 필요한 값들
				StringBuffer message = new StringBuffer();
				String status = "FAIL";  // 기본 FAIL
				
				try {
					list = ajaxService.selectFileByUid(uid); // 조회수 증가 + 읽기
					
					if(list.size() == 0) { // ★
						message.append("[해당 데이터가 없습니다]");
					} else {
						status = "OK";					
					}



				} catch (NumberFormatException e) { 
					e.printStackTrace();
					message.append("[유효하지 않은 parameter]");
				} catch (Exception e) { // ★  
					e.printStackTrace();
					message.append("[트랜잭션 에러:" + e.getMessage() + "]");
				}

				PicAjaxList result = new PicAjaxList();
				
				if(list != null) {			
//					result.setList(list);
				}
				
				return list;
	}
//	
//	
//	// C 글 작성(페이징)
//	@PostMapping("")
//	public CardsAjaxResult writeOk(CardsDTO dto) {
//		int count = 0;
//		
//		// response 에 필요한 값들
//		StringBuffer message = new StringBuffer();
//		String status = "FAIL";  // 기본 FAIL
//
//		try {	
//
//			count = ajaxService.write(dto);
//			
//			if(count == 0) {
//				message.append("[트랜잭션 실패 : 0 insert]");
//			} else {
//				status = "OK";
//			}
//			
//		} catch (Exception e) {
//			//e.printStackTrace();				
//			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
//		}
//
//		CardsAjaxResult result = new CardsAjaxResult();
//		result.setStatus(status);
//		result.setMessage(message.toString());
//		result.setCount(count);
//		return result;	
//
//
//
//	}
//	
	// D. 글 수정(페이징)
	@PutMapping("")
	public CardsAjaxResult updateOk(CardsDTO dto, HttpServletRequest req) throws Exception {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL
		
		String [] delFiles = req.getParameterValues("delfile");
		if(delFiles != null && delFiles.length > 0) {// 삭제될 파일이 있었다면
			
			// String[] -> int[] 변환
			int [] delFileUids = new int[delFiles.length];
			for(int i = 0; i < delFiles.length; i++) {
				delFileUids[i] = Integer.parseInt(delFiles[i]);
				ajaxService.deleteFileByUid(delFileUids[i]);
			}	
		}// end if
		
		
		
		try {	

			count = ajaxService.update(dto);
			status = "OK";
			
			if(count == 0) {
				message.append("[트랜잭션 실패: 0 update]");
			}

		} catch (Exception e) {
			//e.printStackTrace();				
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		CardsAjaxResult result = new CardsAjaxResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
//	
//	// E. 글 삭제
	@DeleteMapping("")
	public CardsAjaxResult deleteOk(int uid) {
		int count = 0;
		
		// response 에 필요한 값들
		StringBuffer message = new StringBuffer();
		String status = "FAIL";  // 기본 FAIL

		try {	

			if(uid != 0)
				count = ajaxService.deleteByUid(uid);
			status = "OK";

		} catch (Exception e) {
			//e.printStackTrace();				
			message.append("[트랜잭션 에러:" + e.getMessage() + "]");
		}

		CardsAjaxResult result = new CardsAjaxResult();
		result.setStatus(status);
		result.setMessage(message.toString());
		result.setCount(count);
		return result;	
	}
//	@RequestMapping(value = "", method = RequestMethod.POST)
//	@ResponseBody
//	public ResponseEntity<?> uploadFile(
//	    @RequestParam("files") MultipartFile files) {
//	  System.out.println(files);
//	  try {
//	    // Get the filename and build the local file path (be sure that the 
//	    // application have write permissions on such directory)
//	    String filename = files.getOriginalFilename();
//	    System.out.println(filename);
//	    String directory = "/var/netgloo_blog/uploads";
//	    String filepath = Paths.get(directory, filename).toString();
//	    
//	    // Save the file locally
//	    BufferedOutputStream stream =
//	        new BufferedOutputStream(new FileOutputStream(new File(filepath)));
//	    stream.write(files.getBytes());
//	    stream.close();
//	  }
//	  catch (Exception e) {
//	    System.out.println(e.getMessage());
//	    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  }
//	  
//	  return new ResponseEntity<>(HttpStatus.OK);
//	} // method uploadFile
	
	
	
	@PostMapping("/fileUpload/{uid}")
	public List<picLibDTO>fileUp(@PathVariable int uid,MultipartHttpServletRequest multi) throws Exception {
		
		List<picLibDTO> picFileList = new ArrayList<picLibDTO>();
		picLibDTO picLibDTO = null; 
		String fileName = null;
        String fileExt = null;
        String fileNameKey = null;
        String fileType = null;
        long fileSize = 0;
        // 파일이 저장될 Path 설정
        String filePath = "c:/upload";
        String filePath2 = null;
		File dir = new File(filePath);
		
		if (dir.exists() == false) {
            dir.mkdirs();
        }
		List<String> originalFileNames = new ArrayList<String>();
		Iterator<String> files = multi.getFileNames();
		while(files.hasNext()) {
			String file = files.next();
			MultipartFile multipartFile = multi.getFile(file);
			fileName = multipartFile.getOriginalFilename();
			fileSize = (long) multipartFile.getSize();
        	fileExt = fileName.substring(fileName.lastIndexOf(".")); // .jpg
        	if(fileSize != 0) {
        		
        		picLibDTO =	new picLibDTO();
//        		String fileName2 = servletContext.getRealPath("/") + "resources\\img\\" + fileNameKey;
        		// 파일명 변경(uuid로 암호화) + 확장자
        		fileNameKey = getRandomString() + fileExt;
        		System.out.println("filePath2 = " + filePath2);

        		fileType = multipartFile.getContentType();
        		filePath2 = filePath + dir.separator + fileNameKey;
        		// 설정한 Path에 파일 저장
        		dir = new File(filePath2);
        		System.out.println("filePath2 = " + filePath2);
        		System.out.println("file =" + dir.exists());
        		multipartFile.transferTo(dir);
//        		System.out.println("filename2 = " + fileName2);
        		System.out.println("fileNameKey = " +fileNameKey);
        		// TODO 
//                picDTO = new picLibDTO();
        	
        		picLibDTO.setPcUid(uid);
        		picLibDTO.setName(fileNameKey); // fileExt
        		picLibDTO.setType(fileType);
        		picLibDTO.setPath(filePath2);
        		picLibDTO.setSize(fileSize);
        		picFileList.add(picLibDTO);
        	}
        	
        
		}
        for (picLibDTO LibDTO : picFileList) {
        	ajaxService.insertFile(LibDTO);
        }
		return picFileList;
			
	}

	public static String getRandomString() {
		
	    return UUID.randomUUID().toString().replaceAll("-", "");
	}

}