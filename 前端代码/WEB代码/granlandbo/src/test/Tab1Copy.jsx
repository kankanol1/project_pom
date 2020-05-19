/* eslint-disable react/no-danger */
/**
 * @Author Libing
 * @Author HuPengcheng
 * @Date 2020/04/09
 */
import React from 'react';
import {Row, Col, Divider,Table,Tag,Popover} from 'antd';
import {connect} from "dva";
import styles from './../style.less'

/**
 * 督办详情标签页
 * 右上角按钮：搜索，关注，反馈，共享，分解，变更，催办，完成，废弃，删除，重新开启，添加共享，批量删除，批示，编辑
 * * 关注：关注该事项/任务
 * * 共享：共享该事项/任务到...
 * * 分解：对事项/任务进行分解操作，生成下级任务
 * * 变更：对当前事项/任务进行编辑
 * * 催办：添加催办
 * * 完成：标记事项/任务已完成
 * * 废弃：标记事项/任务为丢弃状态
 * * 删除：只有管理以及管理以上权限的用户才显示该按钮；删除后列表、统计、任务视图将不再显示；有‘督查督办类型维护’权限的人通过单独访问网址可查看信息，且只有详情、日志tab页，其他人直接提示无权限
 * * 重新开启：对于该类型已关闭的事项/任务，有事项监控权限、及上级任务管理权限的用户在任务的右上角快捷按钮区域显示“重新开启”按钮；对于监控权限的用户，所有级别的已关闭任务都可以点击重新开启。
 */
class Tab1 extends React.Component {
  // eslint-disable-next-line react/sort-comp
  setState(state, callback) {
    super.setState(state, callback);
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  // 协办人计算
  assistCalc = items => {
    const element = [];
    if (items) {
      items.forEach((item, index) => {
        element.push(<a>{item.fun}</a>);
        if (index !== items.length - 1) {
          element.push('，');
        }
      });
    }

    return element;
  }

  render() {
    // console.log('taskDetails',this.props.supervisoryData.taskDetails);// 调用model数据
    const { itemInfo } = this.props;

    // 获取协办人
    const element = itemInfo ? this.assistCalc(itemInfo.sao) : [];

    // 获取子级任务
    const tasks = [];
    if(itemInfo && itemInfo.task) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let assist = [];
      itemInfo.task.forEach(item => {
        if(item.sao) {
          assist = this.assistCalc(item.sao);
        }

        tasks.push(
          <div>
              <Row>
                <Col span={6} style={{fontWeight: 'bold'}}>任务名称：</Col>
                <Col span={6}>{item.st}</Col>
                <Col span={12}/>
              </Row>
              <Row>
                <Col span={24}><span style={{fontWeight: 'bold'}}>任务描述：</span>
                <p style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html:item.ct}} /></Col>
              </Row>
              <Row>
                <Col span={6} style={{fontWeight: 'bold'}}>计划开始时间：</Col>
                <Col span={6}>{item.sdt}</Col>
                <Col span={6} style={{fontWeight: 'bold'}}>计划结束时间：</Col>
                <Col span={6}>{item.edt}</Col>
              </Row>
              <Row>
                <Col span={6} style={{fontWeight: 'bold'}}>主办</Col>
                <Col span={6}><a>{item.smo ? item.smo.fun : ''}</a></Col>
                <Col span={6} style={{fontWeight: 'bold'}}>协办：</Col>
                <Col span={6}><a>{assist}</a></Col>
              </Row>
              <Divider style={{marginTop: '3px', marginBottum: '3px'}}/>
            </div>
        )
      })
    }
    const dataSource = itemInfo?[
      {
        st: itemInfo.st||'',
        ct:itemInfo.ct||'',
        sc: itemInfo.sc||'',
        so: itemInfo.so?itemInfo.so.fun:'',
        slf: itemInfo.slf?itemInfo.slf.dname:'',
        slo: itemInfo.slo?itemInfo.slo.fun:'',
        smf: itemInfo.smf?itemInfo.smf.dname:'',
        smo: itemInfo.smo?itemInfo.smo.fun:'',
      },
    ]:[];

    const content =<div key="ct" className={styles["task-detail-p"]} dangerouslySetInnerHTML={{__html:itemInfo?itemInfo.ct||'':''}} />
    const columns = [
      {
        title: '任务名称',
        dataIndex: 'st',
        key: 'st',
        render:(text,row)=> <Popover content={content} title="任务描述">
          <a>{text}</a>
        </Popover>
      },
      /*{
        title: '详情',
        dataIndex: 'ct',
        key: 'ct',
        render:(text,row)=>
      },*/
      {
        title: '督办字号',
        dataIndex: 'sc',
        key: 'sc',
        render:(text,row)=> <a key="sc">{text}</a>
      },
      {
        title: '责任人',
        dataIndex: 'so',
        key: 'so',
        render:(text,row)=> <a key="so">{text}</a>
      },
      {
        title: '牵头部门',
        dataIndex: 'slf',
        key: 'slf',
        render:(text,row)=> <a key="slf">{text}</a>
      },
      {
        title: '牵头人',
        dataIndex: 'slo',
        key: 'slo',
        render:(text,row)=> <a key="slo">{text}</a>
      },
      {
        title: '主办单位',
        dataIndex: 'smf',
        key: 'smf',
        render:(text,row)=> <a key="smf">{text}</a>
      },
      {
        title: '主办人',
        dataIndex: 'smo',
        key: 'smo',
        render:(text,row)=> <a key="smo">{text}</a>
      },
    ];
    console.log(itemInfo);
    return (<>
      {itemInfo&&<div >
        <span className={styles["task-title"]}>任务内容</span>
        <div className={styles["task-content"]}>
          <Table size={"small"} dataSource={dataSource} columns={columns} pagination={false}/>
          <div className={styles["task-div"]}>
            <Row>
              <Col span={12}>协办单位：
                {itemInfo.sao?itemInfo.saf.length>0?itemInfo.saf.map(i=>
                  <Tag color="success">
                    <a>{i.dname}</a>
                  </Tag>):'':''}</Col>
              <Col span={12}>协办人员：
                {itemInfo.sao?itemInfo.sao.length>0?itemInfo.sao.map(i=>
                  <Tag color="success">
                    <a>{i.fun}</a>
                  </Tag>):'':''}
              </Col>
            </Row>
          </div>
          <div className={styles["task-div"]}>
            <Row>
              <Col> 截止日期：{itemInfo.sdt} - {itemInfo.edt}</Col>
            </Row>
          </div>
        </div>
        <div>
          <span className={styles["task-title"]}>任务阶段 </span>
          <Divider style={{margin: '3px'}}/>
          <div style={{overflow: 'auto', height: '250px', width: '100%'}}>
            {tasks}
          </div>
        </div>
      </div>}

    </>);
  }
}

export default connect(({supervisoryData}) => ({supervisoryData}))(Tab1);
