/**
 * Created by lidianzhong on 2020-04-14.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React from 'react'
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    console.log(this);
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      >修改主题</button>
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
