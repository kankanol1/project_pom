/**
 * Created by lidianzhong on 2020-05-09.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useState} from 'react'
import {Modal, Button, Row, Col} from 'antd';

const ModalComponent = props => {
  const {details, columns, title, layout, child} = props;
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // 提交
  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  };

  // 渲染子节点
  const childNode = (child) => {
    let ele = undefined;
    switch (child) {
      case 'a':
        ele = <a onClick={()=>setVisible(true)}>{title}</a>;
        break;
      case 'button':
        ele = <Button type="primary" onClick={()=>setVisible(true)}>{title}</Button>;
        break;
      case 'span':
        ele = <span onClick={()=>setVisible(true)}>{title}</span>;
        break;
      default:
        ele = <a onClick={()=>setVisible(true)}>{title}</a>;
        break;
    }
    return ele;
  }

  // 渲染footer
  const footerArray = (title)=>{
    return title === "查看" ? [] : [
      <Button key="back" onClick={()=>setVisible(false)}>
        返回
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
        提交
      </Button>,
    ]
  }

  return (
    <>
      {childNode(child)}
      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={()=>setVisible(false)}
        footer={footerArray(title)}
      >
        {columns && columns.filter(j => j.valueType !== "option").map((item ,i)=> <Row key={i}>
          <Col span={layout[0]}>{item.title}:</Col>
          <Col span={layout[1]}>{details? details[item.dataIndex]:""}</Col>
        </Row>)}
      </Modal>
    </>
  );
}

export default ModalComponent;
