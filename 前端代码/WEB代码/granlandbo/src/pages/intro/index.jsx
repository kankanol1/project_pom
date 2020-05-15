/**
 * Created by lidianzhong on 2020-05-15.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {Component} from 'react';
import {Steps, Hints} from 'intro.js-react';

import './style.less'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stepsEnabled: true,
      initialStep: 0,
      steps: [
        {
          element: '.hello',
          intro: '账号设置',
        },
        {
          element: '.world',
          intro: '菜单',
        },{
          element: '.search',
          intro: '全局搜索',
        },{
          element: '.ant-pro-sider-menu',
          intro: '菜单',
        },
      ],
      hintsEnabled: true,
      hints: [
        {
          element: '.hello',
          hint: 'Hello hint',
          hintPosition: 'middle-right',

        }
      ]
    };
  }

  render() {
    const {stepsEnabled, steps, initialStep, hintsEnabled, hints} = this.state;
    return (
      <div>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={this.onExit}
          onChange={e=>{console.log("改变",e)}}
          onPreventChange={e=>{console.log("onPreventChange",e)}}
          onBeforeChange={e=>{console.log("onBeforeChange",e)}}
          onAfterChange={e=>{console.log("onAfterChange",e)}}
          onComplete={e=>{console.log("完成",e)}}
          options={{
            nextLabel:"下一步",
            prevLabel:"上一步",
            skipLabel:"退出",
            doneLabel:"完成",
            showStepNumbers:false,
            hidePrev:true,
            hideNext:true,
            overlayOpacity:0.5
          }}
        />
        <Hints
          enabled={hintsEnabled}
          hints={hints}
          onClose={(e) => {
            console.log(e);
          }}
          onClick={(e) => {
            console.log(e);
          }}
          options={{
          }}
        />
        <div className="controls">
          <div>
            <button onClick={this.toggleSteps}>Toggle Steps</button>
            <button onClick={this.addStep}>Add Step</button>
          </div>
          <div>
            <button onClick={this.toggleHints}>Toggle Hints</button>
            <button onClick={this.addHint}>Add Hint</button>
          </div>
        </div>

        <h1 className="hello">账号设置</h1>
        <hr/>
        <h1 className="world">菜单</h1>
        <hr/>
        <h1 className="search">全局搜索</h1><hr/>
        <h1 className="alive">主页面</h1>
      </div>
    );
  }

  onExit = () => {
    this.setState(() => ({stepsEnabled: false}));
  };

  toggleSteps = () => {
    this.setState(prevState => ({stepsEnabled: !prevState.stepsEnabled}));
  };

  addStep = () => {
    const newStep = {
      element: '.alive',
      intro: 'Alive step',
    };

    this.setState(prevState => ({steps: [...prevState.steps, newStep]}));
  };

  toggleHints = () => {
    this.setState(prevState => ({hintsEnabled: !prevState.hintsEnabled}));
  };

  addHint = () => {
    const newHint = {
      element: '.alive',
      hint: 'Alive hint',
      hintPosition: 'middle-right',
    };

    this.setState(prevState => ({hints: [...prevState.hints, newHint]}));
  }
}



