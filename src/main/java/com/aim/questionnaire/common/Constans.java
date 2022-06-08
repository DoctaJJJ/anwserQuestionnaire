package com.aim.questionnaire.common;

/**
 * Created by wln on 2018/8/3.
 */
public class Constans {

    /**
     * Created by wln on 2018/8/3
     * Descriptions:公用成功失败状态码
     */
    public static final String SUCCESS_CODE = "666"; //成功状态码
    public static final String EXIST_CODE = "20001"; //失败状态码

    public static final String EXIST_MESSAGE="系统异常";
    public static final String DELETE_MESSAGE="删除成功";
    public static final String UPDATE_MESSAGE="修改成功";
    public static final String ADD_MESSAGE="添加成功";
    public static final String STATUS_MESSAGE="查询成功";
    public static final String MAKE_MESSAGE="设置成功";
    public static final String MAKE_MESSAGE_NULL="没有下一个了";
    public static final String MAKE_ERROR="设置成功";

    /**
     * Created by wln on 2018/8/7
     * Descriptions:项目状态码
     */
    public static final String PROJECT_EXIST_MESSAGE="有(历史)问卷，不可以删除";
    public static final String QUESTION_EXIST_MESSAGE="项目有发布中的问卷，不可以编辑";
    public static final String QUESTION_COUNT_MESSAGE="项目可以编辑";


    /**
     * Created by wln on 2018/8/8
     * Descriptions:问卷状态码
     */
    public static final String COPY_MESSAGE = "复制成功";
    public static final String COPY_EXIT_MESSAGE = "问卷发布中，不可复制";
    public static final String NAME_EXIT_MESSAGE = "问卷名称重复";
    public static final String COPY_EXIT_DELETE_MESSAGE = "问卷发布中，不可删除";

    public static final String ANSWER_ZERO_MESSAGE = "此问卷没有答题人"; //问卷没有答题人

    public static final String ANSWER_STOP_CODE = "40001"; //问卷不在运行中，无法答题
    public static final String ANSWER_STOP_MESSAGE = "此问卷不在运行中，无法答题"; //问卷状态不在运行中，无法答题
    public static final String ANSWER_ZERO_CODE = "40000"; //此问卷没有问题或者没有答题人
    public static final String QUESTION_ANSWER_ZERO_MESSAGE = "此问卷没有问题或者没有答题人";
    public static final String QUESTION_SEND_ZERO_MESSAGE = "此问卷没有问题或者没有发送人";

    public static final String QUESTIONNAIRE_NO_CODE="40002";
    public static final String QUESTIONNAIRE_NO_MESSAGE = "此问卷没有问题"; //问卷没有问题

    public static final String QUESTIONNAIRE_SEND_CODE="40003";
    public static final String QUESTIONNAIRE_SEND_MESSAGE = "此问卷发送过，不可以再设计"; //问卷没有问题

    public static final String QUESTIONNAIRE_CREATE_CODE="40004";
    public static final String QUESTIONNAIRE_CREATE_MESSAGE = "此人没有创建过问卷";

    /**
     * Created by wln on 2018/8/8
     * Descriptions:用户状态码
     */
    public static final String LOGOUT_NO_CODE="333";

    public static final String LOGIN_MESSAGE="登录成功";
    public static final String LOGOUT_NO_MESSAGE="没有登录";
    public static final String LOGIN_USERNAME_MESSAGE="用户名不存在";
    public static final String LOGIN_PASSWORD_MESSAGE="密码不正确";
    public static final String LOGIN_USERNAME_PASSWORD_MESSAGE="用户名或者密码错误";

    public static final String LOGOUT_PERMISSION_MESSAGE="没有权限";

    public static final String USER_CODE = "50001";
    public static final String USER_PASSWORD_MESSAGE = "用户原密码错误";

    public static final String USER_STATUS_CODE = "50002";
    public static final String USER_STATUS_MESSAGE = "管理员不可以关闭";

    public static final String USER_USERNAME_CODE = "50003";
    public static final String USER_USERNAME_MESSAGE = "用户名已存在";

    public static final String USER_DELETE_CODE = "50004";
    public static final String USER_DELETE_MESSAGE = "用户不可删除，请先删除用户所创建的项目、问卷、模板";

    public static final String USER_UPDATE_CODE = "50005";
    public static final String USER_UPDATE_MESSAGE = "您的权限已被关闭";

    public static final String USER_ROLE_DELETE_MESSAGE = "超级管理员不可以被删除";
    public static final String ROLE_HAVE_USER = "此角色对应的用户没有被删除";
    public static final String ROLE_NAME_EXIT = "角色code已经存在";

    public static final String USER_ROLE_UPDATE_MESSAGE = "超级管理员不可以被修改";
    public static final String ROLE_NO_UPDATE = "角色权限不可禁用";

    /**
     * Created by wln on 2018/8/8
     * Descriptions:定时任务状态码
     */
    public static final String SCHEDULE_NAME_NO_FOUND = "没有找到接口名";

    /**
     * Created by wln on 2018/8/8
     * Descriptions:参数状态码
     */
    public static final String PARAMETER_NO_DELETE= "系统配置不可删除";

    /**
     * Created by wln on 2018/8/8
     * Descriptions:模块状态码
     */
    public static final String MODEL_EXIST_CODE = "222";
    public static final String MODEL_SORT_EXIT= "此模块已存在此排序值";
    public static final String MODEL_SORT_NULL="模块的排序不能为空";
    public static final String MODEL_PARENTID_FALSE="父id不符合模块设计规范";
    public static final String MODEL_DELETE_FAIL="删除失败";
    public static final String MODEL_NO_PATH_PERMISSION="权限管理找不到模块的路径";
    public static final String MODEL_NO_PATH="找不到模块信息";
}
