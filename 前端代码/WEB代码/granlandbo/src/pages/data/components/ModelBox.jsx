import React, {Component} from 'react';
import {Button} from 'antd';
import ModelItem from "@/pages/data/components/ModelItem";
import styles from '../styles.less';

class ModelBox extends Component{
  render() {
    const {item,onOk,action} = this.props;
    return(
      <ModelItem item={item} onOk={onOk} action={action}>
        <Button className={styles.button} type="primary">{action}</Button>
      </ModelItem>
    )
  }
}
export default ModelBox;
