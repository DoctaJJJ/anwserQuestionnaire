package com.aim.questionnaire.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExcelWrite {
    public final static Logger logger = LoggerFactory.getLogger(ExcelWrite.class);
    //Excel 2003及以下的版本
    private static HSSFWorkbook workbook = null;
    //Excel 2007-2010版本
    private static XSSFWorkbook workbook1 = null;
    private static SXSSFWorkbook sxssfWorkbook = new SXSSFWorkbook(workbook1, 100);

    /**
     * 判断文件是否存在.
     * @param fileDir  文件路径
     * @return
     */
    public static boolean fileExist(String fileDir,String fileName){
        boolean flag = false;
        File targetFile = new File(fileDir, fileName);
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdirs();
        }
        flag = targetFile.exists();
        return flag;
    }
    /**
     * 判断文件的sheet是否存在.
     * @param fileDir   文件路径
     * @param sheetName  表格索引名
     * @return
     */
    public static boolean sheetExist(String fileDir,String sheetName) throws Exception{
        boolean flag = false;
        File file = new File(fileDir);
        if(file.exists()){    //文件存在
            //创建workbook
            try {
                workbook = new HSSFWorkbook(new FileInputStream(file));
                //添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
                HSSFSheet sheet = workbook.getSheet(sheetName);
                if(sheet!=null)
                    flag = true;
            } catch (Exception e) {
                throw e;
            }

        }else{    //文件不存在
            flag = false;
        }
        return flag;
    }
    /**
     * 创建新excel.
     * @param fileDir  excel的路径
     * @param sheetName 要创建的表格索引
     * @param titleRow excel的第一行即表格头
     */
    public static void createExcel(String fileDir,String sheetName,String titleRow[]){
        //创建workbook
        workbook = new HSSFWorkbook();
        //添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
        HSSFSheet sheet1 = workbook.createSheet(sheetName);
        //新建文件
        FileOutputStream out = null;
        try {
            //添加表头
            HSSFRow row = workbook.getSheet(sheetName).createRow(0);
            //创建第一行
            for(short i = 0;i < titleRow.length;i++){
                HSSFCell cell = row.createCell(i);
                cell.setCellValue(titleRow[i]);
            }
            out = new FileOutputStream(fileDir);
            workbook.write(out);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * 删除文件.
     * @param fileDir  文件路径
     */
    public static boolean deleteExcel(String fileDir) {
        boolean flag = false;
        File file = new File(fileDir);
        // 判断目录或文件是否存在
        if (!file.exists()) {  // 不存在返回 false
            return flag;
        } else {
            // 判断是否为文件
            if (file.isFile()) {  // 为文件时调用删除文件方法
                file.delete();
                flag = true;
            }
        }
        return flag;
    }
    /**
     * 往excel中写入(已存在的数据无法写入).
     * @param fileDir    文件路径
     * @param sheetName  表格索引
     * @throws Exception
     */
    public static void writeToExcel(String fileDir,String sheetName,List<Map<String,Object>> mapList){
        //创建workbook
        File file = new File(fileDir);
        try {
            workbook = new HSSFWorkbook(new FileInputStream(file));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //流
        FileOutputStream out = null;
        HSSFSheet sheet = workbook.getSheet(sheetName);
        // 获取表格的总行数
        // int rowCount = sheet.getLastRowNum() + 1; // 需要加一
        // 获取表头的列数
        int columnCount = sheet.getRow(0).getLastCellNum();
        String[] mapKey = {"answerBelong","answerName","questionNum","questionTitle","questionAnswer"};
        try {
            // 获得表头行对象
            HSSFRow titleRow = sheet.getRow(0);
            if(titleRow!=null){
                for(int rowId=0;rowId<mapList.size();rowId++){
                    Map map = mapList.get(rowId);
                    HSSFRow newRow=sheet.createRow(rowId+1);
                    for (short columnIndex = 0; columnIndex < columnCount; columnIndex++) {  //遍历表头
//                        String mapKey = titleRow.getCell(columnIndex).toString();
                        HSSFCell cell = newRow.createCell(columnIndex);
                        cell.setCellValue(map.get(mapKey[columnIndex])==null ? null : map.get(mapKey[columnIndex]).toString());

                    }
                }
            }

            out = new FileOutputStream(fileDir);
            workbook.write(out);
        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    ///////////////////////////////////////////////////////Excel 2007-2010版本

    /**
     * 判断文件的sheet是否存在.
     * @param fileDir   文件路径
     * @param sheetName  表格索引名
     * @return
     */
    public static boolean sheetExistXSSF(String fileDir,String sheetName){
        boolean flag = false;
        File file = new File(fileDir);
        if(file.exists()){    //文件存在
            //创建workbook
            try {
                workbook1 = new XSSFWorkbook(new FileInputStream(file));
                //添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
                Sheet sheet = sxssfWorkbook.getSheet(sheetName);
                if(sheet!=null)
                    flag = true;
            } catch (Exception e) {
                e.printStackTrace();
            }

        }else{    //文件不存在
            flag = false;
        }
        return flag;
    }
    /**
     * 创建新excel.
     * @param fileDir  excel的路径
     * @param sheetName 要创建的表格索引
     * @param titleRow excel的第一行即表格头
     */
    public static void createExcelXSSF(String fileDir,String sheetName,String titleRow[]){
        //创建workbook
        workbook1 = new XSSFWorkbook();
        //添加Worksheet（不添加sheet时生成的xls文件打开时会报错)
        sxssfWorkbook = new SXSSFWorkbook(workbook1, 100);
        Sheet sheet1 = sxssfWorkbook.createSheet(sheetName);

        //新建文件
        FileOutputStream out = null;
        try {
            //添加表头
            Row row = sxssfWorkbook.getSheet(sheetName).createRow(0);
            //创建第一行
            for(short i = 0;i < titleRow.length;i++){
                row.createCell(i).setCellValue(titleRow[i]);
            }
            out = new FileOutputStream(fileDir);
            sxssfWorkbook.write(out);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 往excel中写入(已存在的数据无法写入).
     * @param fileDir    文件路径
     * @param sheetName  表格索引
     * @throws Exception
     */
    public static void writeToExcelXSSF(String fileDir,String sheetName,List<Map<String,Object>> mapList, String[] mapKey){
//        创建workbook
        File file = new File(fileDir);
        try {
            workbook1 = new XSSFWorkbook(new FileInputStream(file));
            sxssfWorkbook = new SXSSFWorkbook(workbook1, 100);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //流
        FileOutputStream out = null;
        Sheet sheet = workbook1.getSheetAt(0);
        // 获取表头的列数
        int columnCount = sheet.getRow(0).getLastCellNum();
 //       String[] mapKey = {"answerBelong","answerName","questionNum","questionTitle","questionAnswer"};
//        String[] mapKey = {"id","name","password"};
        try {
            // 获得表头行对象
            Row titleRow = sheet.getRow(0);
            if(titleRow!=null){
                for(int rowId=0;rowId<mapList.size();rowId++){
                    Map map = mapList.get(rowId);
                    Row newRow=sheet.createRow(sheet.getLastRowNum()+1);
                    for (short columnIndex = 0; columnIndex < columnCount; columnIndex++) {  //遍历表头
//                        String mapKey = titleRow.getCell(columnIndex).toString();
                        Cell cell = newRow.createCell(columnIndex);
                        cell.setCellValue(map.get(mapKey[columnIndex])==null ? null : map.get(mapKey[columnIndex]).toString());

                    }
                }
            }

            out = new FileOutputStream(fileDir);
            sxssfWorkbook.write(out);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

//    public static void main(String[] args) {
//        //判断文件是否存在
//        Boolean bln = ExcelWrite.fileExist("E:/test1.xlsx");
//
//        if(!bln) {
//            //创建文件
//            String title[] = {"学校","姓名","题号","题目","答题选项号"};
//            createExcelXSSF("E:/test1.xlsx","sheet1",title);
//
//        }
//
//        List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
//        Map<String,Object> map=new HashMap<String,Object>();
//        map.put("answerBelong", "dddd");
//        map.put("answerName", "张三");
//        map.put("questionNum", "1");
//        map.put("questionTitle", "fsdfdfdfdfd");
//        map.put("questionAnswer", "1");
//
//        Map<String,Object> map2=new HashMap<String,Object>();
//        map.put("answerBelong", "dddfdfdfdd");
//        map.put("answerName", "张三2");
//        map.put("questionNum", "2");
//        map.put("questionTitle", "dfdfdf");
//        map.put("questionAnswer", "2");
//        list.add(map);
//        list.add(map2);
//        writeToExcelXSSF("E:/test1.xlsx","sheet1",list);

//        String sql="select aaa,bbb,ccc from dddd";
//        String sqlForSplit = sql.substring(sql.toLowerCase().indexOf("select")+6,sql.toLowerCase().indexOf("from")).trim();
//        String sqlRemoveFrom=sql.substring(sql.toLowerCase().indexOf("from")+5).trim();
//        System.out.println(sqlRemoveFrom);
//        String tableName=sqlRemoveFrom.indexOf(" ")==-1 ?  sqlRemoveFrom : sqlRemoveFrom.substring(0,sqlRemoveFrom.indexOf(" "));
//        System.out.println(tableName);
//    }

}