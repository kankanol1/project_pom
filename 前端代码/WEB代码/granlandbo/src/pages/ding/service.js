import request from '@/utils/request';

export async function getTableData(){
  return request(`/api/get_test_data`,{
    method:'POST',
  });
}

export async function onChangeItemE(payload){
  return request(`/api/change_item_data`,{
    method:'POST',
    params:payload,
  });
}
