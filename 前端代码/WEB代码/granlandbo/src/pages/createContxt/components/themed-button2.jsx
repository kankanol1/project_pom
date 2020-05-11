/**
 * Created by lidianzhong on 2020-04-14.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React from 'react'
import {ThemeContext} from './theme-context2';

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
export default ThemeTogglerButton;
