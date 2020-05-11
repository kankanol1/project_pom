import {getTableData,onChangeItemE} from "./service";

const Model = {
  namespace: 'dynamicSpace',
  state: {
      columns:[],
      data:[],
    layout:[]
  },
  effects:{
    * get({callback}, {call, put}) {
      const response = yield call(getTableData);
      if(callback&&typeof callback==='function'){
        callback({status:'ok'});
      }
      yield put({
        type: 'change',
        payload: response,
      });
    },
    * changeItemE({payload}, {call, put}) {
      const response = yield call(onChangeItemE,payload);
      if(response.status==="ok"){
        const response = yield call(getTableData);
        yield put({
          type: 'change',
          payload: response,
        });
      }
    },
  },
  reducers:{
    change(state, {payload}) {
      return {...state,...payload};
    },
    changeItem(state, {payload}) {
      return {...state,data:state.data.map(item=>item.key===payload.key?payload:item)};
    },

  }
}

export default Model;
