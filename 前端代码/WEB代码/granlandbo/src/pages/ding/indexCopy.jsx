/**
 * Created by lidianzhong on 2020-04-26.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React,{useEffect,useState} from 'react';
import {Button} from 'antd';
import CopyTocClipboardComponent from '../../components/components/CopyTocClipboardComponent'

import * as dd from 'dingtalk-jsapi';

const DingApp = ()=>{

  const [data,setData] = useState('');
  const getData = ()=>{
    dd.ready(function() {
      // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
      dd.runtime.permission.requestAuthCode({
        corpId: "ding6b255b38c0466accffe93478753d9884",
        onSuccess: function(result) {
          console.log(result);
          setData(JSON.stringify(result));
          /*{
              code: 'hYLK98jkf0m' //string authCode
          }*/
        },
        onFail : function(err) {
          console.log(err);
        }
      });
    });
  }

  return (<div>
    <h4>钉钉测试</h4>
    <Button onClick={()=>getData}>获取数据</Button>
    <div>
      <CopyTocClipboardComponent text={"点击一下自动复制到粘贴板"}/>
    </div>
  </div>)
}

export default DingApp;
