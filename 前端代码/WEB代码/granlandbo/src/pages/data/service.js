import request from '@/utils/request';
export async function getData(){
  return request('/api/test_data',{
    method:'POST',
  });
}
export async function deleteData(payload){
  return request(`/api/delete_data`,{
    method:'POST',
    params:payload
  });
}
export async function addData(payload){
  return request(`/api/add_data`,{
    method:'POST',
    params:payload
  });
}
export async function editData(payload){
  return request(`/api/edit_data`,{
    method:'POST',
    params:payload
  });
}

