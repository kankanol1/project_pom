/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useEffect, useReducer, useState} from 'react'
import PubSub from "pubsub-js";
import {connect} from 'dva'
import {Row, Col, Button} from 'antd'

const SubMsg = props => {
  const {wsspace,dispatch} = props;
  const {ws,dataAll, tocken} = wsspace;





  useEffect(()=>{
    if("WebSocket" in window){
      dispatch({
        type:'wsspace/setws',
        payload:new WebSocket("ws://localhost:8887/ws/test"),
      });
    }
  },[]);

  const sub = (category) => {
    if(false){
      let t={};
      t[category] = PubSub.subscribe(category, (msg, data) => {
        let a={};
        a[category] = data;
        dispatch({
          type:'wsspace/changeDataAll',
          payload:a,
        });
      })
      dispatch({
        type:'wsspace/changeTocken',
        payload:t,
      });
    }

    if(ws){
      ws.onopen=()=>{
        ws.send("发送数据");
      };
    }



  }

  const unsub = (category) => {

    // PubSub.unsubscribe(tocken[category]);
  }

  return (
    <div>
      <Row style={{marginTop:20}}>
        <Col>
          <Button onClick={() => sub("CCTV")}>订阅CCTV</Button>
          <Button onClick={() => unsub("CCTV")}>取消CCTV</Button>
          <div>
            信息：
            {dataAll && dataAll.CCTV}
          </div>
        </Col>
      </Row>
      <Row style={{marginTop:20}}>
        <Col>
          <Button onClick={() => sub("NEWS")}>订阅NEWS</Button>
          <Button onClick={() => unsub("NEWS")}>取消NEWS</Button>
          <div>
            信息：
            {dataAll && dataAll.NEWS}
          </div>
        </Col>
      </Row>

    </div>
  )
}
export default connect(({wsspace})=>({wsspace}))(SubMsg);
