/**
 * Created by lidianzhong on 2020-04-14.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {createContext, useState, useEffect, useContext} from 'react';
import {Button} from 'antd';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    color: '#fff'
  },
};

const ThemeContext = createContext({
  theme: themes.datk,
  toggleTheme: () => {
  },
});

const UserContext = createContext({name: 'kankan'})


const App = () => {
  const [values, setValues] = useState({
    theme: themes.datk, toggleTheme: () => {},
  });
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
        values ? <ThemeContext.Provider value={values} data={'kankan'}>
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
  const {theme,toggleTheme} = useContext(ThemeContext);
  return (
        <Button
          style={theme}
          onClick={toggleTheme}
        >
          改变主题
        </Button>
  );
}

export default App;
