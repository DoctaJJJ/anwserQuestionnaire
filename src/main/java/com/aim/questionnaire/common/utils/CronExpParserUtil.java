package com.aim.questionnaire.common.utils;

import org.quartz.CronExpression;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class CronExpParserUtil {
    /**
     * 解析corn表达式，生成指定日期的时间序列
     *
     * @param cronExpression cron表达式
     * @param cronDate cron解析日期
     * @param result crom解析时间序列
     * @return 解析成功失败
     */
    public static boolean parser(String cronExpression, String cronDate, List<String> result)
    {
        if (cronExpression == null || cronExpression.length() < 1 || cronDate == null || cronDate.length() < 1)
        {
            return false;
        }
        else
        {
            CronExpression exp = null;
            // 初始化cron表达式解析器
            try
            {
                exp = new CronExpression(cronExpression);
            }
            catch (ParseException e)
            {
                // TODO Auto-generated catch block
                e.printStackTrace();
                return false;
            }

            // 定义生成时间范围
            // 定义开始时间，前一天的23点59分59秒
            Calendar c = Calendar.getInstance();
            String sStart = cronDate + " 00:00:00";
            SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date dStart = null;
            try
            {
                dStart = sdf.parse(sStart);
            }
            catch (ParseException e)
            {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            c.setTime(dStart);
            c.add(Calendar.SECOND, -1);
            dStart = c.getTime();

            // 定义结束时间，当天的23点59分59秒
            c.add(Calendar.DATE, 1);
            Date dEnd = c.getTime();

            // 生成时间序列
            java.util.Date dd = dStart;
            dd = exp.getNextValidTimeAfter(dd);
            while ((dd.getTime() >= dStart.getTime()) && (dd.getTime() <= dEnd.getTime()))
            {
                result.add(sdf.format(dd));
                dd = exp.getNextValidTimeAfter(dd);
            }
            exp = null;
        }
        return true;
    }

    public static String translateToChinese(String cronExp)
    {
        if (cronExp == null || cronExp.length() < 1)
        {
            return "cron表达式为空";
        }
        CronExpression exp = null;
        // 初始化cron表达式解析器
        try
        {
            exp = new CronExpression(cronExp);
        }
        catch (ParseException e)
        {
            return "corn表达式不正确";
        }
        String[] tmpCorns = cronExp.split(" ");
        StringBuffer sBuffer = new StringBuffer();
        if(tmpCorns.length == 6)
        {
            //解析月
            if(!tmpCorns[4].equals("*"))
            {
                sBuffer.append(tmpCorns[4]).append("月");
            }
            else
            {
                sBuffer.append("每月");
            }
            //解析周
            if(!tmpCorns[5].equals("*") && !tmpCorns[5].equals("?"))
            {
                char[] tmpArray =  tmpCorns[5].toCharArray();
                for(char tmp:tmpArray)
                {
                    switch (tmp)
                    {
                        case '1':
                        sBuffer.append("星期天");
                        break;
                        case '2':
                        sBuffer.append("星期一");
                        break;
                        case '3':
                        sBuffer.append("星期二");
                        break;
                        case '4':
                        sBuffer.append("星期三");
                        break;
                        case '5':
                        sBuffer.append("星期四");
                        break;
                        case '6':
                        sBuffer.append("星期五");
                        break;
                        case '7':
                        sBuffer.append("星期六");
                        break;
                        case '-':
                        sBuffer.append("至");
                        break;
                        default:
                            sBuffer.append(tmp);
                            break;
                    }
                }
            }

            //解析日
            if(!tmpCorns[3].equals("?"))
            {
                if(!tmpCorns[3].equals("*"))
                {
                    sBuffer.append(tmpCorns[3]).append("日");
                }
                else
                {
                    sBuffer.append("每日");
                }
            }

            //解析时
            if(!tmpCorns[2].equals("*"))
            {
                sBuffer.append(tmpCorns[2]).append("时");
            }
            else
            {
                sBuffer.append("每时");
            }

            //解析分
            if(!tmpCorns[1].equals("*"))
            {
                sBuffer.append(tmpCorns[1]).append("分");
            }
            else
            {
                sBuffer.append("每分");
            }

            //解析秒
            if(!tmpCorns[0].equals("*") && !tmpCorns[0].equals("0/1"))
            {
                sBuffer.append(tmpCorns[0]).append("秒");
            }
            else
            {
                sBuffer.append("每秒");
            }
        }

        return sBuffer.toString();

    }

    //测试方法
//    public static void main(String[] args)
//    {
//        String CRON_EXPRESSION = "0 59 0-23 * * ?";
        // 生成指定日期的CRON时间序列
//        String CRON_DATE = "2018-10-26";
//        System.out.println(CRON_EXPRESSION);
//        System.out.println(CronExpParserUtil.translateToChinese(CRON_EXPRESSION));

//        List<String> lTime = new ArrayList<String>();
//        if(!CronExpParserUtil.parser(CRON_EXPRESSION, CRON_DATE, lTime)){
//            System.out.println("无法生成Cron表达式：日期,"+CRON_DATE+";不符合规则cron表达式："+CRON_EXPRESSION);
//        }
//        for(int i=0;i<lTime.size();i++){
//            System.out.println(lTime.get(i));
//        }
//    }
}
