import { Tag } from 'antd';
import React from 'react';
import { connect } from 'dva';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="gl"
        options={[
          {
            label: <a href="https://www.weaver.com.cn/new/product/emobile/experience.html">内容1</a>,
            value: '内容1',
          },
          {
            label: <a href="https://www.weaver.com.cn/new/product/emobile/experience.html">内容二</a>,
            value: '内容二',
          },
          {
            label: <a href="https://www.weaver.com.cn/new/product/emobile/experience.html">内容三</a>,
            value: '内容三',
          },
          {
            label: <a href="https://www.weaver.com.cn/new/product/emobile/experience.html">内容四</a>,
            value: '内容四',
          },
        ]}
        onSearch={value => {
          // eslint-disable-next-line no-console
          console.log('input', value);
        }}
      />
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
          <p>sdgfa</p>
        </span>
      )}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
