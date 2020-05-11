/**
 * Created by lidianzhong on 2020-04-28.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React,{useState,useEffect,Component} from 'react'
import PubSub from 'pubsub-js'
import Data from './DataComponents'
import SubMsg from './SubMsg'

import {Button,Row,Col} from 'antd'
// 订阅
const WSApp =()=> {
    return (
      <div className="App">
        <Data />
        <Row>
          <Col>
            <SubMsg/>
          </Col>
        </Row>
      </div>
    );
}

export default WSApp;
