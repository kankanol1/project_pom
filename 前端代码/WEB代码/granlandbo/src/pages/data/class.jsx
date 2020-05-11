import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Popconfirm} from 'antd'
import ModelBox from "@/pages/data/components/ModelBox";
import styles from './styles.less'

class Github extends Component {

  componentDidMount() {
    this.getHandler();
  }

  getHandler = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'testData/fetch',
    })
  };

  deleteHandler = (id) => {
    const {dispatch, testData} = this.props;
    dispatch({
      type: 'testData/delete',
      payload: {id, data: testData.data},
    })
  };

  addHandler = (item) => {
    const {dispatch, testData} = this.props;
    dispatch({
      type: 'testData/add',
      payload: {item, data: testData.data},
    });
  };

  editHandler = (item) => {
    const {dispatch, testData} = this.props;
    dispatch({
      type: 'testData/edit',
      payload: {item, data: testData.data},
    });
  };

  render() {
    const {testData} = this.props;
    const data = testData.data || [];
    return (
      <div>
        <ModelBox item={{}} onOk={this.addHandler} action="添加任务"/><br/>
        {data.map((item, i) =>
          <div key={i} className={styles.box}>
            <span>{item.name}</span><br/>
            <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteHandler(item.id)}>
              <Button className={styles.button} type="primary">删除</Button>
            </Popconfirm>
            <ModelBox item={item} onOk={this.editHandler} action="编辑"/>
          </div>
        )}
      </div>
    );
  }
}
export default connect(({testData}) => ({testData}))(Github);
