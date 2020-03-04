/**
 * Created by kankan on 2020-03-04.
 * E-mail: lidainzhong@gl-data.com
 * To: More pain, more gain.
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Col} from 'antd';

const styles = {cursor: 'pointer', boxShadow: '5px 5px 8px #333', padding: '20px', textAlign: 'center'};

class ColComponent extends Component {
  constructor(props) {
    super(props);
  }

  handelClick() {
    const {history, params} = this.props;
    history.push('/test/github/details/'+ params.component);
    console.log(history);

  }

  render() {
    const {params} = this.props;
    return (
      <Col span="4" style={{marginTop: '10px'}}>
        <div
          onClick={() => this.handelClick()}
          style={styles}
        >
          {params.image}<br/>
          {params.name}
        </div>
      </Col>
    )
  }
}

export default withRouter(ColComponent);
