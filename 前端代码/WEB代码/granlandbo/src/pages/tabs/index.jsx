/**
 * Created by lidianzhong on 2020-05-18.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useEffect,useState} from 'react';
import {Form,Tabs, Button,Radio,Select} from 'antd';
import {connect} from 'dva'
import TabsList from './tabs'

const {TabPane} = Tabs;

const TagsPage = props => {
  const [option,setOption] = useState("jack");

  const {tabs, dispatch} = props;
  const {panes} = tabs;
  useEffect(() => {
    dispatch({
      type: 'tabs/get',
    })
  }, [])

  const onChangeTab = e => {
    console.log(e);
  }

  const onEditTab = e => {
    dispatch({
      type: 'tabs/delete',
      payload:{key:e},
    })
  }
  return (<div style={{backgroundColor: '#fff'}}>
    <Tabs
      hideAdd
      onChange={(e) => onChangeTab(e)}
      onEdit={(e) => onEditTab(e)}
      type='editable-card'
      defaultActiveKey="3"
      size='small'>
      {
        panes && panes.map((item, j) => <TabPane tab={item.title} key={item.key}>
          <div style={{padding:20}}>{TabsList[j]["context"]}</div>
        </TabPane>)
      }
    </Tabs>


  </div>)

}



export default connect(({tabs}) => ({tabs}))(TagsPage);
