import { Alert, Checkbox } from 'antd';
import React, { useState,useEffect } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginFrom from './components/Login';
import styles from './style.less';
import Algorithm from "@/utils/Algorithm";
import RID from "@/utils/rid";
const { Tab, UserName, Password, Submit } = LoginFrom;
const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting ,dispatch} = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');
  const [submit,setSubmit]=useState(false);
  const [values,setValues]=useState(undefined);
  const [key,setKey]=useState(undefined);
  const [data,setData]=useState(undefined);
  const [chl,setChl]=useState(undefined);


  useEffect(()=>{
    if(data&&submit&&values&&chl&&key){
      const tid = new Date().getTime();
      const params={
        "chl": (tid % 1024) << 6,
        "ful": location.href,
        "pd": Algorithm.decodePw(chl, data.rk, key, values.password),
        "rid": RID,
        tid,
        tp:values.tp,
        "un": values.userName,
      };
      dispatch({
        type: 'login/loginnm',
        payload: params,
        callback:res=>{
          console.log(res);
        },
      });
      setSubmit(false);
    }
  },[submit]);

  const handleOk = values => {
    values.tp='Br';
    setValues(values);
    const key = Algorithm.keyCreate(8);
    setKey(key);
    const tid = new Date().getTime();
    const chl = (tid % 1024) << 6;
    setChl(chl);
    const params={
      did: Algorithm.stringToHex(key).join('').split('').reverse().join(''),
      tp:values.tp,
      chl: (tid % 1024) << 6,
      tid,
      un:values.userName,
      rid:RID,
      ful:location.href,
    };
    dispatch({
      type: 'login/loginsu',
      payload: params,
      callback: res=>{
        if(res&&((res.status & 0b11) === 0b01)){
          setData(res.data);
          setSubmit(true);
        }else{
          message.destroy();
          message.info(res.msg||'注册失败，请重试！');
          setSubmit(false);
        }
      }
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleOk}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（gl2020）" />
          )}

          <UserName
            name="userName"
            placeholder="用户: gl2020"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: gl2020"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/loginnm'],
}))(Login);
