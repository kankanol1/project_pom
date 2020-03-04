import {Component} from 'react';
import {Row, Col} from 'antd';
import ColComponent from "@/pages/test/components/ColComponent";

import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const functionName = [
  {image: <HomeOutlined/>, name: '模块1', component: 'home'},
  {image: <SettingFilled/>, name: '模块2', component: 'setting'},
  {image: <SyncOutlined/>, name: '模块3', component: 'setting'},
  {image: <SmileOutlined/>, name: '模块4', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块5', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块6', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块7', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块8', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块9', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块10', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块11', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块12', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块13', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块14', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块15', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块16', component: 'setting'},
  {image: <LoadingOutlined/>, name: '模块17', component: 'setting'},
];

class Github extends Component {
  render() {
    return (
      <div>
        <Row gutter={{'xs': 8, 'sm': 16, 'md': 24, 'lg': 32}}>
          {functionName.map((item, key) => {
            return <ColComponent key={key} params={item}/>;
          })}
        </Row>
      </div>
    )
  }
}

export default Github;
