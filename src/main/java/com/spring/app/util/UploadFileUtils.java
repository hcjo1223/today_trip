package com.spring.app.util;

import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

public class UploadFileUtils {
        public static final Logger logger = LoggerFactory.getLogger(UploadFileUtils.class);

        private static final Set<String> IMAGE_EXTENSIONS = new HashSet<>(
                        Arrays.asList("jpg", "jpeg", "png", "gif", "bmp"));
	
	
        public static String uploadFile(String uploadPath, String originalName, byte[] fileData) throws Exception {
                UUID uuid = UUID.randomUUID();

                String savedName = uuid + "_" + originalName;
                String savedPath = calcPath(uploadPath);

                File target = new File(uploadPath + savedPath, savedName);
                FileCopyUtils.copy(fileData, target);

                String extension = getExtension(originalName);
                if (isImageType(extension)) {
                        return makeThumbnail(uploadPath, savedPath, savedName);
                }

                return toRelativePath(savedPath + File.separator + savedName);
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

        private static String getExtension(String filename) {
                int dotIndex = filename.lastIndexOf('.');
                if (dotIndex < 0 || dotIndex + 1 >= filename.length()) {
                        return "";
                }

                return filename.substring(dotIndex + 1).toLowerCase(Locale.ROOT);
        }

        private static boolean isImageType(String extension) {
                return IMAGE_EXTENSIONS.contains(extension);
        }

        private static String toRelativePath(String path) {
                return path.replace(File.separatorChar, '/');
        }
	
}
