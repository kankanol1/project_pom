/**
 * Created by lidianzhong on 2020-04-14.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React,{createContext} from 'react';
import {Button} from 'antd';

const ThemeContext = createContext('pink');

const App=()=>{
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Context测试</h1>
      <ThemeContext.Provider value="yellow">
        <Toolbar/>
      </ThemeContext.Provider>
    </div>
  )
};
const Toolbar= props=>{
  console.log("Toolbar",props);
  return(
    <div>
      <ThemedButton/>
    </div>
  )
};

const ThemedButton =props=>{
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  // const contextType = ThemeContext;
  // Object.keys(contextType).map(i=>console.log(i," : ",contextType[i]));
  console.log("ThemedButton",props);
  return <Button>Context</Button>;
}
ThemedButton.contextType = ThemeContext;

export default App;
