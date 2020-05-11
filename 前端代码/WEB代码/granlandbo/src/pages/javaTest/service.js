import request from '@/utils/request';
export async function get(){
  return request('/api/get',{
    method:'GET',
  });
}export async function post(){
  return request('/api/post',{
    method:'POST',
  });
}export async function getParam(data){
  return request('/api/getparam',{
    method:'GET',
    params:data,
  });
}export async function postParam(data){
  return request('/api/postparam',{
    method:'POST',
    data:data,
  });
}
