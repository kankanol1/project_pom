import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd'

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

class ModelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  formRef = React.createRef();

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    })
  };

  hideModelHandler = () => {this.setState({visible: false,})};

  okHandler = () => {this.formRef.current.submit();};

  okHandlers = (values) => {
    const {onOk, item} = this.props;
    item.name = values.work;
    onOk(item);
    this.formRef.current.setFieldsValue({work:'',});
    this.hideModelHandler();
  };

  render() {
    const {children,action, item} = this.props;

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal title={action} visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler}>
          <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.okHandlers} initialValues={{work: item.name,}}>
            <Form.Item name="work" label="任务" rules={[{required: true,},]}>
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </span>
    )
  }
}

export default ModelItem;
