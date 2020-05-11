/**
 * Created by lidianzhong on 2020-04-14.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {createContext, useState, useEffect} from 'react';
import {Button} from 'antd';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    color:'#fff'
  },
};

const ThemeContext = createContext({
  theme: themes.datk,
  toggleTheme: () => {
  },
});

const UserContext = createContext({name:'kankan'})


const App = () => {
  const [values, setValues] = useState({theme: themes.datk, toggleTheme: () => {},});
  const [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme(true);
  }
  useEffect(() => {
    if (theme) {
      setValues({
        theme: values.theme === themes.dark ? themes.light : themes.dark,
        toggleTheme: toggleTheme,
      });
      setTheme(false);
    }
  }, [theme])
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Context测试</h1>
      {
        values ? <ThemeContext.Provider value={values}>
          <Toolbar/>
        </ThemeContext.Provider> : null
      }
    </div>
  )
};
const Toolbar = () => {
  return (
    <div>
      <ThemedButton/>
    </div>
  )
};

const ThemedButton = () => {
  return (
    <ThemeContext.Consumer>
      {props => (
        <UserContext>
          {params=>(
            <div>
              <Button style={props.theme} onClick={props.toggleTheme}>
                改变主题
              </Button>
              <span>用户名：{params.name}</span>
            </div>
          )}
        </UserContext>

      )
      }
    </ThemeContext.Consumer>
  );
}

export default App;
