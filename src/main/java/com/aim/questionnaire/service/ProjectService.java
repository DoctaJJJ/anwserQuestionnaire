package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.ProjectEntityMapper;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by wln on 2018\8\6 0006.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectEntityMapper projectEntityMapper;


    /**
     * 添加项目
     * @param projectEntity
     * @return
     */
    public int addProjectInfo(ProjectEntity projectEntity,String user) {
        String id = UUIDUtil.getOneUUID();
        projectEntity.setId(id);
        //获取用户信息
        projectEntity.setCreatedBy(user);
        projectEntity.setLastUpdatedBy(user);
        // 获取当前时间
        Date date = DateUtil.getCreateTime();
        projectEntity.setCreationDate(date);
        projectEntity.setLastUpdateDate(date);

        int result = projectEntityMapper.insertSelective(projectEntity);
        return result;
    }

    /**
     * 修改项目
     * @param projectEntity
     * @return
     */
    public int modifyProjectInfo(ProjectEntity projectEntity,String user) {
        // 获取当前时间
        Date date = DateUtil.getCreateTime();
        projectEntity.setLastUpdateDate(date);
        //获取用户信息
        projectEntity.setLastUpdatedBy(user);
        int result = projectEntityMapper.updateByPrimaryKeySelective(projectEntity);
        return result;
    }

    /**
     * 删除项目
     * @param projectEntity
     * @return
     */
    public int deleteProjectById(ProjectEntity projectEntity) {
        String projectId = projectEntity.getId();
        int result = projectEntityMapper.deleteProjectById(projectId);
        return result;
    }

    /**
     * 查询项目列表
     * @param projectEntity
     * @return
     */
    public List<Object> queryProjectList(ProjectEntity projectEntity) {
        List<Object> resultList = new ArrayList<Object>();
        if("".equals(projectEntity.getProjectName())){
            projectEntity.setProjectName(null);
        }

        List<Map<String,Object>> proResult = projectEntityMapper.queryProjectList(projectEntity);
        for(Map<String,Object> proObj : proResult) {
            resultList.add(proObj);
        }
        return resultList;
    }

    /**
     * 查询全部项目的名字接口
     * @return
     */
    public List<Map<String,Object>> queryAllProjectName() {
        List<Map<String,Object>> result = projectEntityMapper.queryAllProjectName();
        return result;
    }
}
