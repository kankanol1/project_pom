import {get,post,getParam,postParam} from "./service";

const Model = {
  namespace:'getpost',
  state:{
    get:undefined,
    post:undefined,
    getparam:undefined,
    postparam:undefined,
  },
  effects:{
    * get(_, {call, put}) {
      const response = yield call(get);
      yield put({
        type: 'get',
        payload: {data:response},
      });
    },
    * post(_, {call, put}) {
      const response = yield call(post);
      yield put({
        type: 'get',
        payload: {post:response},
      });
    },
    * getparam({payload}, {call, put}) {
      const response = yield call(getParam,payload);
      yield put({
        type: 'get',
        payload: {getparam:response},
      });
    },* postparam({payload}, {call, put}) {
      const response = yield call(postParam,payload);
      yield put({
        type: 'get',
        payload: {postparam:response},
      });
    },
  },
  reducers:{
    get(state,{payload}){
      return {...state,...payload}
    }
  }
}

export default Model;
