import {} from "@/pages/data/service";

const Model = {
  namespace: 'wsspace',
  state: {
    ws:undefined,
    tocken:{},
    dataAll:{},
    data:[],
  },
  effects: {

  },
  reducers: {

    setws(state,{payload}){
      return {...state,ws:payload}
    },
    addData(state,{payload}){
      return {...state,data:[...state.data,payload]}
    },
    clearData(state,{}){
      return {...state,data:[]}
    },
    changeTocken(state,{payload}){
      return {...state,tocken:{...state.tocken,...payload}}
    },
    filterTocken(state,{payload}){
      delete state.tocken[payload];
      return state;
    },
    changeDataAll(state,{payload}){
      return {...state,dataAll:{...state.dataAll,...payload}}
    },
    filterDataAll(state,{payload}){
      delete state.dataAll[payload];
      return state;
    }

  }
};
export default Model;
