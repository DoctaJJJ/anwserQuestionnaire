package com.aim.questionnaire.common.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import org.json.JSONArray;
import org.json.JSONObject;

public class TurnToJson {

    public String Json(){
        String driver = "com.mysql.jdbc.Driver";

//这里我的数据库名字是Person，改成你自己的数据库名
        String url = "jdbc:mysql://localhost:3206/questionnaire";
        String user = "root";
        String pwd = "jjsc172412";
        try {
            Class.forName(driver);
            Connection con =   DriverManager.getConnection(url,user,pwd);

            Statement stet = con.createStatement();

//我的数据库Person中的表student，改成你自己的表
            String sql = "select * from user_info";
//aaaaaaa
            ResultSet rs = stet.executeQuery(sql);
            ResultSetMetaData metaData =  rs.getMetaData();
            int columnCount= metaData.getColumnCount();

            JSONArray array = new JSONArray();
            while(rs.next()){
                JSONObject jsonObj = new JSONObject();
                for(int i = 1; i <= columnCount;i++)
                {
                    String columnName = metaData.getColumnLabel(i);
                    String value =rs.getString(columnName);
                    jsonObj.put(columnName, value);
                }
                array.put(jsonObj);
            }
            System.out.println("转换JSON数据：");
            System.out.println(array.toString());
            return array.toString();
//            con.close();

        } catch (Exception e) {

            e.printStackTrace();// TODO: handle exception
        }
        return null;
    }
}