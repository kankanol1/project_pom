import { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

class TestPage extends Component {
  render() {
    const { children } = this.props;
    return (
      <PageHeaderWrapper>
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default TestPage;
