/**
 * Created by lidianzhong on 2020-04-09.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React from 'react';
import {BasicLayout} from '@ant-design/pro-layout';
import {Row, Col, Button, Switch} from 'antd'
import {connect} from 'dva';
import logo from '../../assets/logo.svg'


const Layout = props => {
  const {themes, dispatch, settings} = props;
  // const {theme,status, settings}=themes;

  const changeSettings = params => {
    const {colorWeak, contentWidth} = themes.settings;
    dispatch({
      type: 'themes/changeSettings',
      payload: {colorWeak, contentWidth, ...params},
    })
  }
  const changeWeak = params => {
    dispatch({
      type: 'settings/changeSettings',
      payload: params,
    })
  }


  return (<BasicLayout
    logo={logo}
    loading={false}
    menuHeaderRender={(logo, title) => (
      <div style={{textAlign: 'center'}}>{logo}{title}</div>
    )}
    contentStyle={{margin: 0}}
    // layout="sidemenu"//topmenu sidemenu
    // contentWidth="Fixed"//Fixed Fluid
    // navTheme="dark"//'light' | 'dark'
    // fixedHeader="true" //boolean
    // fixSiderbar="true" //boolean
    breakpoint={{xs: 8, sm: 16, md: 24, lg: 32}}//Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' }
    onMenuHeaderClick={() => (console.log("onMenuHeaderClick"))}
    // siderWidth="256"// 默认256 number

    {...themes.settings}

  >
    {/*{children}*/}
    <div style={{backgroundColor: 'white', margin: 10, padding: 20}}>
      <h1 style={{textAlign: 'center'}}>主题设置</h1>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>整体风格：</h3></Col>
        <Col className="gutter-row"><Button type={themes.settings.navTheme === "light" ? "primary" : null}
                                            onClick={() => changeSettings({navTheme: 'light'})}>亮色</Button></Col>
        <Col className="gutter-row"><Button type={themes.settings.navTheme === "dark" ? "primary" : null}
                                            onClick={() => changeSettings({navTheme: 'dark'})}>半暗</Button></Col>
        <Col className="gutter-row"><Button type={themes.settings.navTheme === "realDark" ? "primary" : null}
                                            onClick={() => changeSettings({navTheme: 'realDark'})}>全暗</Button></Col>
      </Row>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>主题颜色：</h3></Col>
        <Col className="gutter-row">
          <Button
            type={themes.settings.primaryColor === "#1890ff" ? "primary" : null}
            onClick={() => changeSettings({primaryColor: 'pink'})}
          >
            默认
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>导航模式：</h3></Col>
        <Col className="gutter-row">
          <Button
            type={themes.settings.layout === "sidemenu" ? "primary" : null}
            onClick={() => changeSettings({layout: 'sidemenu'})}
          >
            左边
          </Button>
        </Col>
        <Col className="gutter-row">
          <Button
            type={themes.settings.layout === "topmenu" ? "primary" : null}
            onClick={() => changeSettings({layout: 'topmenu'})}
          >
            上边
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>内容区域：</h3></Col>
        <Col className="gutter-row">
          <Button
            type={themes.settings.contentWidth === "Fluid" ? "primary" : null}
            onClick={() => changeSettings({contentWidth: 'Fluid'})}
          >
            流式
          </Button>
        </Col>
        <Col className="gutter-row">
          <Button
            type={themes.settings.contentWidth === "Fixed" ? "primary" : null}
            onClick={() => changeSettings({contentWidth: 'Fixed'})}
          >
            定宽
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>固定菜单：</h3></Col>
        <Col className="gutter-row">
          <Switch defaultChecked={themes.settings.fixSiderbar}
                  onChange={() => changeSettings({fixSiderbar: !themes.settings.fixSiderbar})}/>
        </Col>
      </Row>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>固定Header：</h3></Col>
        <Col className="gutter-row">
          <Switch defaultChecked={themes.settings.fixedHeader}
                  onChange={() => changeSettings({fixedHeader: !themes.settings.fixedHeader})}/>
        </Col>
      </Row>
      <Row gutter={[16, {xs: 8, sm: 16, md: 24, lg: 32}]}>
        <Col className="gutter-row"><h3 style={{verticalAlign: 'middle'}}>色弱模式：</h3></Col>
        <Col className="gutter-row">
          <Switch defaultChecked={themes.settings.colorWeak}
                  onChange={() => changeSettings({colorWeak: !themes.settings.colorWeak})}/>
        </Col>
      </Row>
      <div style={{height: 1000}}>
        test
      </div>
    </div>
  </BasicLayout>)
}
export default connect(({themes, settings}) => ({themes, settings}))(Layout);
