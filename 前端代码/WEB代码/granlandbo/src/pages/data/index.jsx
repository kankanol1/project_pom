import React, {useEffect} from 'react';
import {connect} from 'dva';
import {Button, Popconfirm} from 'antd'
import ModelBox from "@/pages/data/components/ModelBox";
import styles from './styles.less'
import {getData, deleteData, addData, editData} from './service';

const  GithubComponent=({location,dispatch, testData})=>{
  console.log(location,dispatch, testData);
  useEffect(() => {
    getHandler();
  },[]);

  function getHandler() {
    // console.log(123);
    dispatch({
      type: 'testData/fetch',
    })
  }
  function deleteHandler(id) {
    if(testData&&testData.data){dispatch({
      type: 'testData/delete',
      payload: {id, data: testData.data},
    })}
  }
  function addHandler(item) {
    if(testData&&testData.data){
      dispatch({
        type: 'testData/add',
        payload: {item, data: testData.data},
      });
    }

  }

  function editHandler(item) {
    dispatch({
      type: 'testData/edit',
      payload: {item, data: testData.data},
    });
  }

  return (
    <div>
      <ModelBox item={{}} onOk={addHandler.bind(this)} action="添加任务"/><br/>
      {testData&&testData.data&&testData.data.map((item, i) =>
        <div key={i} className={styles.box}>
          <span>{item.name}</span><br/>
          <Popconfirm title="确定删除任务吗？" onConfirm={deleteHandler.bind(this, item.id)}>
            <Button type="primary">删除</Button>
          </Popconfirm>
          <ModelBox item={item} onOk={editHandler.bind(this)} action="编辑"/>
        </div>
      )}
    </div>
  );
}

export default connect(({testData}) => ({testData}))(GithubComponent);

