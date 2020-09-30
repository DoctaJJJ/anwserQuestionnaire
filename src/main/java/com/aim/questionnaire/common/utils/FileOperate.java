package com.aim.questionnaire.common.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/**
 * 文件操作工具类
 * Created by maru on 2018/01/04 下午3:07.
 */
public class FileOperate {
    /**
     * 图片上传
     * @param files 图片文件组
     * @param parent 图片存储地址
     * @return 地址信息数组
     */
    public List<String> imageUpload(MultipartFile[] files, String parent) throws IOException {
        String url;
        List<String> imageList = new ArrayList<String>();
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();//获取上传文件名
            System.out.println("文件名："+fileName);
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            String name = UUID.randomUUID().toString();
            fileName = name + suffixName;
            File targetFile = new File(parent, fileName);
            //创建文件夹
            if (!targetFile.getParentFile().exists()) {
                targetFile.getParentFile().mkdirs();
            }
            //将上传文件存储到服务器中
            file.transferTo(targetFile);
            //背景图片地址
            url = targetFile.getName();
            //将地址添加到集合中
            imageList.add(url);
            System.out.println("图片地址为:" + url);
        }
        return imageList;
    }

    /**
     * 图片移动
     * @param srcFileName 旧图片文件名
     * @param destFilePath 目标路径
     * @param parent 旧图片路径
     * @return 自定义状态码
     */
    public int copyFile(String srcFileName, String destFilePath , String parent) throws Exception {
        int i;
        //判断原文件是否存在
        File srcFile = new File(parent,srcFileName);
        File target = new File(destFilePath);
        if (!srcFile.exists()) {
            if (!target.exists()){
                //文件不存在
                i = -1;
            }else {
                i = 1;
            }
        } else if (!srcFile.isFile()) {
            //原文件不是一个文件
            i = -2;
        }else {
            if (!target.getParentFile().exists()) {
                //如果目标文件所在的目录不存在，则创建目录
//                System.out.println("目标文件所在的目录不存在，准备创建它！");
                target.getParentFile().mkdirs();
                if (!target.getParentFile().exists()) {
                    //创建文件目录失败
                    i = 0;
                } else {
                    srcFile.renameTo(target);
                    i = 1;
                }
            }else {
                //如果原文件存在，覆盖它
                srcFile.renameTo(target);
                i = 1;
            }
        }
        return i;
    }

    /**
     * 文件删除
     * @param dir 要删除的文件
     * @return 删除状态
     */
    public boolean deleteDir(File dir){
        if (dir.isDirectory()) {
            String[] children = dir.list();
            //递归删除目录中的子目录下
            for (int i = 0; i< Objects.requireNonNull(children).length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        // 目录此时为空，可以删除
        return dir.delete();
    }
}
