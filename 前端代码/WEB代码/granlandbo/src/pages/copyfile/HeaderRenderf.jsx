import React, {useEffect, useState} from 'react';
import {connect} from 'dva'
import RightContent from "@/components/GlobalHeader/RightContent";
import {Card, Row, Col} from 'antd';
import {Link, router} from 'umi';
import {
  LayoutOutlined,
  SettingOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  TeamOutlined,
  LaptopOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import routesALl from '../../config/routes'
import '../assets/icon/iconcolor'
import styles from './style.less'

const icons = [
  'shouye', 'paizhao', 'tupian', 'riqi', 'zhuangtailishi',
  'liebiao', 'saoma', 'shezhi', 'guanli', 'kongzhi', 'weizhi',
  'youxiang', 'fenxiang', 'erweima',
];


const HeaderRender = props => {
  const {dispatch, collapsed} = props;
  const [visible, setVisible] = useState("none");
  const [bgcolor, setBgcolor] = useState("");
  const [menu, setMenu] = useState(undefined);
  // const [routes, setRoutes] = useState([]);

  let routes = [];
  if (localStorage) {// 获取可以看到的菜单
    const authority = JSON.parse(localStorage.getItem("user-info"));
    routes= routesALl.filter(i =>
      (!i.authority && i.path) || (i.authority && i.authority.filter(j => authority.indexOf(j) >= 0)).length > 0)

  }


  // 过滤的二级菜单
  let listTable = routes
    // 过滤非管理员权限
    .filter(g => g.routes && g.name !== 'admin')
    // 二级菜单图标
    .map((f, v) => ({title: f.name.trim(), icon: icons[v]}))
    // 二级菜单样式
    .map(item => {
      const img1 = <svg className={styles.icon} aria-hidden="true">
        <use xlinkHref={"#icon-" + item.icon}/>
      </svg>;
      item = {
        ...item,
        img: img1,
        path: '/',
        color: '',
        routers: routes.filter(a => a.name.trim() === item.title)[0].routes.filter(j => j.name).map(k => {
          k.icon = k.img;
          return k
        }),
      };
      return item;
    });


  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/gl/doors') {// 判断是否是首页
      // if(localStorage.getItem('user-info')||localStorage.getItem('username'))
        goHome();
    } else {
      settingHandel(routes, pathname.substring(3));
      menu&&settingHandel(menu, pathname.substring(3));

    }
  }, []);

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
    });
  }, []);

  const handleMenuCollapse = payload => {
    payload = !payload;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: payload,
    });
  };

  const onMouseEnterHandel = () => {
    setVisible("block");
    setBgcolor("rgba(0, 0, 0, 0.7)");
  };

  const onMouseLeaveHandel = () => {
    setVisible("none");
    setBgcolor("");
  };

  const settingHandel = (routers, path) => {
    setMenu(routers);
    dispatch({
      type: 'global/changeRouter',
      payload: routers,
    });
    router.push(path);
  };

  const goHome = () => {
    if(routes.filter(i=>i.path==='/doors').length>0){
      router.push('/');
    }else{
      routes[0]&&router.push(routes[0].path);
    }
    // console.log(routes);
    dispatch({
      type: 'global/changeRouter',
      payload: routes.map(i => {
        i.icon = i.img;
        return i;
      }),
    });
  };

  return (
    <>
      <div className={styles.box}>
        <Row>
          <Col span={1}>
            {collapsed ?
              <MenuFoldOutlined onClick={() => handleMenuCollapse(collapsed)} className={styles.iconL}/> :
              <MenuUnfoldOutlined onClick={() => handleMenuCollapse(collapsed)} className={styles.iconL}/>}
          </Col>
          <Col span={1}>
            <span onClick={() => goHome()} className={styles.app} title="首页">
              <HomeOutlined style={{fontSize: 18,}}/>
            </span>
          </Col>
          <Col span={1}>
            <span onMouseLeave={() => onMouseLeaveHandel()} onMouseEnter={() => onMouseEnterHandel()}
                  className={styles.app} style={{backgroundColor: bgcolor}} title="全部应用">
              {visible === 'block' ? <AppstoreOutlined style={{fontSize: 18, color: "#fff"}}/> :
                <AppstoreOutlined style={{fontSize: 18}}/>}
            </span>
          </Col>
          <RightContent/>
        </Row>
      </div>
      <Card
        onClick={() => onMouseLeaveHandel()}
        onMouseLeave={() => onMouseLeaveHandel()}
        onMouseEnter={() => onMouseEnterHandel()}
        style={{display: visible}} className={styles.card}
      >
        {listTable.map((i, j) => (
          <Card.Grid
            onClick={() => settingHandel(i.routers, i.routers[0].path)}
            key={j}
            className={styles.cardItem} style={{backgroundColor: `${i.color}`}}>
            <a href="#">{i.img}<br/>{i.title}</a>
          </Card.Grid>))}
      </Card>
    </>
  )
};

export default connect(({global}) => ({collapsed: global.collapsed}))(HeaderRender);
