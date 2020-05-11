/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useEffect, useRef, useState} from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket';
import {connect} from 'dva'
import {Row, Col, Button, Input} from 'antd'


const SubMsg = props => {
  const {wsspace, dispatch} = props;
  const {ws, data} = wsspace;
  const inputs = useRef();
  const [auto, setAuto] = useState(false);
  const [conn, setCon] = useState(false);

  useEffect(() => {
    con(true);
  }, []);
  useEffect(() => {
    const s = document.getElementsByClassName("div1")[0];
    s.scrollTop = s.scrollHeight;
  }, [data]);

  /*
  * 发送数据
  * @params message
  * */
  const sendMessage = message => {
    dispatch({
      type: 'wsspace/addData',
      payload: ['client', message],
    });
    /*
    * 判断连接状态
    * 0 正在建立连接。。。
    * 1 连接成功 可以发送数据
    * 2 正在断开连接。。。
    * 3 连接断开
    * */
    if (ws.readyState === 1) {
      ws.send(message);
    }
  }

  /*
  * 建立连接
  * */
  const con = (flag) => {

    //WebSocket("ws://localhost:8080/websocket/"+nickname)

    const nickname="kankan"
    if (flag) {
      let wst = new WebSocket("ws://localhost:8080/websocket/"+nickname);


      /*
      * 添加监听事件
      * @type message
      * */

      wst.addEventListener('message', function (event) {
        dispatch({
          type: 'wsspace/addData',
          payload: ['server', event.data],
        });
      });

      wst.addEventListener('close', function (event) {
        dispatch({
          type: 'wsspace/addData',
          payload: ['server', "服务器连接已断开"],
        });
      });

      dispatch({
        type: 'wsspace/setws',
        payload: wst,
      })
    } else {
      if (ws) {
        ws.close();
      }
    }

    setCon(flag);
  }

  /*
  * 后台自动推数据到前台
  * */
  const autosend = (flag) => {
    sendMessage(flag ? 'true' : 'false');
    setAuto(flag);
  }

  /*
  * 清空聊天框
  * */
  const clearData = () => {
    dispatch({
      type: 'wsspace/clearData',
    })
  }

  return (
    <div style={{width: '100%'}}>
      <Row>
        <Col span={12}>
          <Input.TextArea ref={inputs}/><br/>
          <Button stylel={{marginRight: 20}} onClick={() => sendMessage(inputs.current.state.value || '')}>发送数据</Button>
          <Button stylel={{marginRight: 20}} onClick={() => con(!conn)}
                  type={'primary'}>{!conn ? "建立连接" : "断开连接"}</Button>
          <Button stylel={{marginRight: 20}} onClick={() => autosend(!auto)}
                  type={'primary'}>{!auto ? '自动推送' : '取消自动推送'}</Button>
          <Button stylel={{marginRight: 20}} onClick={() => clearData()}>清空聊天记录</Button>
        </Col>
        <Col span={12}>
          <div className={"div1"}
               style={{position: 'relative', padding: 20, maxHeight: 200, overflow: 'auto', backgroundColor: '#fff'}}>
            {data && data.map((item, i) => <div key={i}><span
              style={{color: item[0] === 'server' ? 'red' : 'blue'}}>{item[0]}：</span><span>{item[1]}</span></div>)}
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default connect(({wsspace}) => ({wsspace}))(SubMsg);
