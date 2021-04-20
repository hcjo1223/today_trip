package com.spring.app.util;

import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

public class UploadFileUtils {
	public static final Logger logger = LoggerFactory.getLogger(UploadFileUtils.class);
	
	
	public static String uploadFile(String uploadPath, String originalName, byte[] fileData) throws Exception{
		UUID uuid = UUID.randomUUID();
		
		String savedName = uuid.toString() + "_" + originalName; 
		
		String savedPath = calcPath(uploadPath);
		
		File target = new File(uploadPath + savedPath,savedName);
		
		FileCopyUtils.copy(fileData, target);
		
		// 파일 확장자 추출
		String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
	
		String uploadFileName = null;
		
		return uploadFileName;
	}
	
	private static String calcPath(String uploadPath) {
		Calendar calendar = Calendar.getInstance();
		
		String yearPath = File.separator + calendar.get(Calendar.YEAR);
		
		String monthPath = yearPath + File.separator + new DecimalFormat("00").format(calendar.get(Calendar.MONTH) + 1);
		
		String datePath = monthPath + File.separator + new DecimalFormat("00").format(calendar.get(Calendar.DATE));

		makeDir(uploadPath, yearPath, monthPath, datePath);
		
		return datePath;
	}
	
	private static void makeDir(String uploadPath, String...paths) {
		if(new File(uploadPath + paths[paths.length -1]).exists()) {
			return;
		}
		
		for(String path : paths) {
			File dirPath = new File(uploadPath + path);
			
			if(!dirPath.exists()) {
				dirPath.mkdir();
			}
		}
		
	}
	
	public static String makeThumbnail(String uploadPath, String path, String fileName) throws Exception{
		BufferedImage sourceImg = ImageIO.read(new File(uploadPath + path, fileName));
		
		BufferedImage destImg = Scalr.resize(sourceImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT, 100);
		
		String thumbnailName = uploadPath + path + File.separator + "s_" + fileName;
		
		File newFile = new File(thumbnailName);
		
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
		
		ImageIO.write(destImg, formatName.toUpperCase(), newFile);
		return thumbnailName.substring(uploadPath.length()).replace(File.separatorChar,'/');
	}
	
	public static void removeFile(String uploadPath, String fileName) {
		
	new File(uploadPath + fileName.replace('/', File.separatorChar)).delete();
	}
	
}
