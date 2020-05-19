import request from '@/utils/request';

export async function get(){
  return request(`/api/get_tabs`,{
    method:'POST',
  });
}

export async function deleteTab(e){
  console.log("service",e)
  return request(`/api/delete_tabs`,{
    method:'POST',
    data:e,
  });
}
export async function update(){
  return request(`/api/update_tabs`,{
    method:'POST',
  });
}
