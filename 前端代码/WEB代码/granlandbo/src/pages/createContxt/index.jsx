/**
 * Created by lidianzhong on 2020-04-15.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {
  createContext,
  useDebugValue,
  useState,
  useEffect,
  useContext,
  useReducer} from 'react';
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

const Count = () => {
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, {count: 0});
  return (
    <>
      <span>
        Count: {state.count}
      </span>
      <Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
      <Button onClick={() => dispatch({type: 'increment'})}>+</Button>
    </>
  );
}


const App = () => {
  const [values, setValues] = useState({
    theme: themes.datk, toggleTheme: () => {
    },
  });
  const [theme, setTheme] = useState(true);
  useDebugValue(theme ? 'True' : 'False');
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
      <Count/>
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
  const {theme, toggleTheme} = useContext(ThemeContext);
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
