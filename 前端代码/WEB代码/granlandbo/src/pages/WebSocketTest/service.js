import request from '@/utils/request';
export async function setws(){
  return request('/ws/setws',{
    method:'POST',
  });
}
