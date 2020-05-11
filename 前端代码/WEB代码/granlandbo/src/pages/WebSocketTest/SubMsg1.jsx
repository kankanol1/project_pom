/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useEffect, useReducer, useState} from 'react'
import PubSub from "pubsub-js";

const SubMsg = props => {
  const {category} = props;
  const [data, setData] = useState([]);
  console.log(category);
// 组件将要被渲染的时候进行订阅

  if (category && category.length > 0) {
    for (let i = 0; i < category.length; i++) {
      PubSub.subscribe(category[i], (msg, data) => {
        setData(data);
        setMsg(msg);
      })
    }
  }

  return (
    <div>
      {/*{(category && category.length > 0) && category.map(i => {*/}
      {/*  PubSub.subscribe(category[i], (msg, data) => (*/}
      <div>
             <span style={{display: "block"}}>
               频道: {(category && category.length > 0) && category.map(i => (<span>{i}</span>))}
             </span>
        <span style={{display: "block"}}>
              信息: {data ? data : ''}
            </span>
      </div>
      {/*))*/}
      {/*})}*/}


    </div>
  )
}
export default SubMsg
