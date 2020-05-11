import { Form, Input, Button,Checkbox } from 'antd';
import React, { useState,useEffect } from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Algorithm from "@/utils/Algorithm";
import RID from "@/utils/rid";
import {LockTwoTone} from "@ant-design/icons";



const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

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
      <h4 style={{textAlign:'center'}}>账户密码登录</h4>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleOk}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="userName"
          rules={[
            {required: true, message: '不低于6位；数字、字母和下划线；包含数字和字母！',
              pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,245}$/},]
          }
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
     {/* <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleOk}>
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
      </LoginFrom>*/}
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/loginnm'],
}))(Login);
