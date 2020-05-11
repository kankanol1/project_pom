/**
 * Created by lidianzhong on 2020-04-09.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */

import React, {useEffect} from 'react';
import {connect} from 'dva';

const App = props => {
  const {dispatch,themes} = props;

  useEffect(() => {
    console.log(themes);
    dispatch({
      type:'themes/change',
      payload:{status:true},
    })
  },[])
  return (
    <div>
      <h1>test</h1>
      asdfasdfasd
    </div>
  )
}
export default connect(({themes}) => ({themes}))(App);
