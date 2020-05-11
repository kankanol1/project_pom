/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React,{useState,useEffect,Component} from 'react'
import PubSub from 'pubsub-js'
import Data from './DataComponents'
import {Button} from 'antd'


// 在有数据的地方进行发布
// class Data extends Component{
//   pubmsg = ()=>{
//     PubSub.publish("频道","频道发布的消息")
//   }
//   render() {
//     return(
//       <button onClick={this.pubmsg}>Data组件,发布消息</button>
//     )
//   }
// }

// 订阅
class WSApp extends Component {
  // 组件将要被渲染的时候进行订阅
  componentWillMount() {
    PubSub.subscribe("频道", (msg,data)=> {
      console.log(msg,data)
    })
  }

  render() {
    return (
      <div className="App">
        <Data />
      </div>
    );
  }
}

export default WSApp;
