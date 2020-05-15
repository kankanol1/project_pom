/**
 * Created by lidianzhong on 2020-05-15.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React,{useState} from 'react';
import {Steps} from 'intro.js-react';

const stepsList = [
  {
    element: '.ant-pro-sider-menu',
    intro: '菜单',
  }, {
    element: '.antd-pro-components-global-header-index-account',
    intro: '账号设置',
  }, {
    element: '.antd-pro-components-global-header-index-search',
    intro: '全局搜素',
  },{
    element: '.antd-pro-pages-data-styles-box',
    intro: '全局搜素',
  }
];
const IntroComponent = props => {
  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);
  const [steps, setSteps] = useState(stepsList);

  console.log(stepsList);
  const onExit = () => {
    setStepsEnabled(false)
  }
  return (
    <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={() => onExit()}
      onChange={e => {
      }}
      onPreventChange={e => {
      }}
      onBeforeChange={e => {
      }}
      onAfterChange={e => {
      }}
      onComplete={e => {
      }}
      options={{
        nextLabel: "下一步",
        prevLabel: "上一步",
        skipLabel: "退出",
        doneLabel: "完成",
        showStepNumbers: false,
        hidePrev: true,
        hideNext: true,
        overlayOpacity: 0.5
      }}
    />
  );
}

export default IntroComponent;


