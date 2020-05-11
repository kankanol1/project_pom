/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React,{useState,useEffect} from 'react'
import PubSub from 'pubsub-js'
import {Button} from 'antd'

const WSApp =()=>{
  const [ws,setWs] = useState(undefined);
  useEffect(()=>{
    if(ws){
      ws.onopen = function()
      {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send("发送数据");
        alert("数据发送中...");
      };

      ws.onmessage = function (evt)
      {
        var received_msg = evt.data;
        console.log(evt);
        alert("数据已接收...");
      };

      ws.onclose = function()
      {
        // 关闭 websocket
        alert("连接已关闭...");
      };
    }
  },[ws]);
  const checkWS= ()=>{
    if("WebSocket" in window){
      setWs(new WebSocket("ws://localhost:8887/ws/test"));
      alert("您的浏览器支持 WebSocket!");
    }
  }
  const connectWS= ()=>{
    if(ws){
      ws.onopen = function()
      {
        // Web Socket 已连接上，使用 send() 方法发送数据
        ws.send("发送数据");
        alert("数据发送中...");
      };
    }
  }




  const pubmsg = ()=>{
    PubSub.publish("MY TOPIC",'hello world!');

  }


  // PubSub.publishSync("MY TOPIC","hello world!")

  return (<div>
    <h3>websocket Test</h3>

    <Button onClick={()=>pubmsg()}>发布信息</Button>
    <p>{token}</p>
  </div>)
}

export default WSApp;
