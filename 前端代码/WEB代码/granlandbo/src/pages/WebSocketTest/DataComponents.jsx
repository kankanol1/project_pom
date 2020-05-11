/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useState, useEffect, Component, useRef} from 'react'
import PubSub from 'pubsub-js'
import {Button, Input, Select} from 'antd'

const {Option} = Select;

// 在有数据的地方进行发布
const Data = () => {
  const [msg, setSelect] = useState("CCTV")
  const inputs = useRef();
  const pubmsg = () => {
    if (inputs.current.state.value && msg) {
      PubSub.publish(msg, inputs.current.state.value)
    } else {
      alert("发布失败！")
    }
  }
  return (
    <div>
      <span>频道：</span>
      <Select onChange={e => setSelect(e)} defaultValue="CCTV">
        <Option key="CCTV">CCTV</Option>
        <Option key="NEWS">NEWS</Option>
        <Option key="SONG">SONG</Option>
      </Select><br/>
      <span>信息：</span>
      <Iinputsnput.TextArea ref={inputs}/><br/>
      <Button onClick={pubmsg}>发布消息</Button>
    </div>
  )

}

export default Data;
