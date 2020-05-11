/**
 * Created by lidianzhong on 2020-04-19.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useEffect} from 'react';
import {Button,Row,Col} from 'antd'
import {connect} from 'dva';

const App = props=>{

  const {getpost,dispatch} = props;
  const {get,post,getparam,postparam} = getpost;


  function getType() {
    dispatch({
      type: 'getpost/get',
    })
  }
  function getparamType() {
    dispatch({
      type: 'getpost/getparam',
    })
  }
  function postType() {
    dispatch({
      type: 'getpost/post',
    })
  }
  function postparamType() {
    dispatch({
      type: 'getpost/postparam',
    })
  }


  return(
    <div>
      <h2 style={{textAlign:'center'}}>GET & POST TEST</h2>
      <Row>
        <Col span={24}>
          <Button onClick={()=>getType()}>GET无参请求</Button>
          {get}
        </Col>
        <Col span={24}>
          <Button onClick={()=>postType()}>GET有参请求</Button>
          {getparam}
        </Col>
        <Col span={24}>
          <Button onClick={()=>postType()}>POST无参请求</Button>
          {post}
        </Col>
        <Col span={24}>
          <Button onClick={()=>postparamType()}>POST有参请求</Button>
          {postparam}
        </Col>
      </Row>
    </div>
  )
}

export default connect(({getpost})=>({getpost}))(App);
