import {getData, deleteData, addData, editData} from './service';

const Model = {
  namespace: 'testData',
  state: {
    data: []
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(getData);
      yield put({
        type: 'get',
        payload: response,
      });
    },
    * delete({payload}, {call, put}) {
      console.log("删除：", payload.id);
      const data = {...payload, data: JSON.stringify(payload.data)};
      const response = yield call(deleteData, {...data});
      yield put({
        type: 'get',
        payload: response,
      });
    },
    * add({payload}, {call, put}) {
      const response = yield call(addData, {data: JSON.stringify(payload)});
      yield put({
        type: 'get',
        payload: response,
      });
    },
    * edit({payload}, {call, put}) {
      const response = yield call(editData, {data: JSON.stringify(payload)});
      yield put({
        type: 'get',
        payload: response,
      });
    }
  },
  reducers: {
    get(state, {payload}) {
      return {
        data: payload.map((i, j) => {
          i.id = j;
          return i
        })
      };
    },

  }
};
export default Model;
