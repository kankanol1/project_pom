/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useEffect, useReducer, useState} from 'react'
import PubSub from "pubsub-js";
import ReconnectingWebSocket from 'reconnecting-websocket';
import {connect} from 'dva'
import {Row, Col, Button} from 'antd'

const SubMsg = props => {
  const {wsspace, dispatch} = props;
  const {ws, dataAll, tocken} = wsspace;
  // const [ws,setWS] = useState(undefined);
  // let ws = undefined;
  // ReconnectingWebSocket
  // let a = new ReconnectingWebSocket("ws://localhost:8887/ws/test");

  useEffect(() => {
    // if ("WebSocket" in window) {
    let wst = new ReconnectingWebSocket("ws://localhost:8887/ws/test");
 /*   wst.onopen = function () {
      // Web Socket 已连接上，使用 send() 方法发送数据
      console.log("连接成功时触发...");
      // wst.send("发送数据AAAA");
    };
*/
    // 监听消息
    wst.addEventListener('message', function (event) {
      console.log(event);
    });
 /*   wst.onmessage = function (evt) {
      console.log("数据接收时触发...", evt);
    };

    wst.addEventListener("message", function (event) {
      var data = event.data;
    });

    wst.onclose = function () {
      // 关闭 websocket
      console.log("连接关闭时触发...");
    };*/
    dispatch({
      type: 'wsspace/setws',
      payload: wst,
    })
    // }
  }, []);


  const sendMessage = message => {
    if (ws.readyState === 1) {
      ws.send(message);
    }
  }

  const sub = (category) => {
    if (false) {
      let t = {};
      t[category] = PubSub.subscribe(category, (msg, data) => {
        let a = {};
        a[category] = data;
        dispatch({
          type: 'wsspace/changeDataAll',
          payload: a,
        });
      })
      dispatch({
        type: 'wsspace/changeTocken',
        payload: t,
      });
    }
    if (ws) {
      ws.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send("发送数据" + category);
        alert("数据发送中...");
      };
      ws.onmessage = function (evt) {
        console.log(evt);
      };
    }
  }

  const unsub = (category) => {


    // PubSub.unsubscribe(tocken[category]);
  }
  const webs = () => {
    if ("WebSocket" in window) {
      alert("您的浏览器支持 WebSocket!");

      // 打开一个 web socket
      const wsa = new WebSocket("ws://localhost:8887/ws/test1");

      wsa.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        console.log("连接成功时触发...");
        // alert("数据发送中...");
        // wsa.send("发送数据AAAA");

      };


      wsa.onmessage = function (evt) {
        console.log("获得后台返回数据", evt);
      };

      wsa.onclose = function () {
        // 关闭 websocket
        console.log("连接关闭时触发...");
      };
    } else {
      // 浏览器不支持 WebSocket
      alert("您的浏览器不支持 WebSocket!");
    }
  }
  /*
  * CONNECTING：值为0，表示正在连接。
  OPEN：值为1，表示连接成功，可以通信了。
  CLOSING：值为2，表示连接正在关闭。
  CLOSED：值为3，表示连接已经关闭，或者打开连接失败
  * */
  return (
    <div>
      <Row style={{marginTop: 20}}>
        <Col>
          <Button onClick={() => sub("CCTV")}>订阅CCTV</Button>
          <Button onClick={() => unsub("CCTV")}>取消CCTV</Button>
          <div>
            信息：
            {dataAll && dataAll.CCTV}
          </div>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col>
          <Button onClick={() => sub("NEWS")}>订阅NEWS</Button>
          <Button onClick={() => unsub("NEWS")}>取消NEWS</Button>
          <div>
            信息：
            {dataAll && dataAll.NEWS}
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button onClick={() => webs()}>webs</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => sendMessage("CCTV")}>发送数据</Button>
        </Col>
      </Row>
    </div>
  )
}
export default connect(({wsspace}) => ({wsspace}))(SubMsg);
