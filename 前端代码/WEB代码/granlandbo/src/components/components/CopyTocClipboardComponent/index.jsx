/**
 * Created by lidianzhong on 2020-05-08.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React from 'react';
import {Tooltip,message} from 'antd';
import copy from 'copy-to-clipboard';
import styles from './style.less'


/*
*
* @params text require
* */

const  CopyTocClipboardComponent=props=>{
  const {text,size} = props;
  const copyText=(e)=>{
    message.destroy();
    copy(e);
    message.success("复制成功!");
  }
  return (
    <Tooltip title={"点击复制"}>
       <span
         style={{cursor:"pointer",fontSize:size?size:14}}
         className={styles["copy-text"]}
         onClick={(e)=>copyText(e.target.innerText)}>
      {text?text:'请设置内容'}
    </span>
    </Tooltip>
  )
}
export default CopyTocClipboardComponent;
