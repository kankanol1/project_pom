import {get,update,deleteTab} from './service'

const Model = {
  namespace: 'tabs',
  state: {
    panes: []
  },
  effects: {
    *get(_, {call, put}) {
      const response = yield call(get);
      yield put({
        type: 'change',
        payload: response,
      });
    },
    *delete({payload}, {call, put}) {
      console.log("model",payload);
      const response = yield call(deleteTab, payload);
      if(response.status==="ok"){
        const responses = yield call(get);
        yield put({
          type: 'change',
          payload: responses,
        });
      }
    },
    *update({payload}, {call, put}) {
      const response = yield call(update, payload);
      yield put({
        type: 'change',
        payload: response,
      });
    },
  },
  reducers: {
    change(state, {payload}) {
      return {...state, ...payload};
    },
  }
}
export default Model;
