import {DefaultFooter, getMenuData, getPageTitle} from '@ant-design/pro-layout';
import {Helmet} from 'react-helmet';
import React from 'react';
import {formatMessage} from 'umi-plugin-react/locale';
import {connect} from 'dva';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const {routes = []} = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const {breadcrumb} = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title}/>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <div>
                <img alt="logo" className={styles.logo} src={logo}/>
                <span className={styles.title}>GrandLand BO</span>
              </div>
            </div>
            <div className={styles.desc}>GLBO是一款专门为中小型企业打造的一款集BI和OA于一体的管理软件</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 济南观澜数据版权所有"
          links={[]}
        />
      </div>
    </>
  );
};

export default connect(({settings}) => ({...settings}))(UserLayout);
