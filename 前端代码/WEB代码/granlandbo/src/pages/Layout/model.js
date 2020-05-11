import {themes} from "@/pages/Layout/service";
import defaultSet from "./settings";

const updateColorWeak = colorWeak => {
  const root = document.getElementById('root');

  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const updateColor= primaryColor => {

  console.log(primaryColor);
  window.less.modifyVars(
    {
      '@primary-color': '#aaa',
      '@menu-dark-item-active-bg':'#aaa',
      '@link-color': '#aaa',
      '@text-color':'#aaa',
      '@btn-primary-bg': '#aaa',
    }
  )
    .then(() => {
      message.success('主题切换成功')
    })
    .catch(error => {
      message.error(`主题切换失败`);
      console.log(error)
    });
};

const Model={
  namespace:'themes',
  state: {
    theme: [],
    status:false,
    settings:defaultSet,
  },
  effects:{
    *fetch({payload},{call,pull}){
      const response =yield call(themes,payload);
      pull({
        type:'change',
        payload:response
      })
    }
  },
  reducers:{
    change(state,{payload}){
      console.log(payload);
      return{...state,...payload}
    },
    changeSettings(state,{payload}){
      // console.log(payload);
      //themeColor
      const { colorWeak, contentWidth ,primaryColor} = payload;
      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      primaryColor&&updateColor(primaryColor);
      return{...state,settings:{...state.settings,...payload}}
    }
  }
};

export default Model;
