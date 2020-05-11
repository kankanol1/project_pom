import request from '@/utils/request';

export async function themes(data){
  return request('/api/theme',{
    method:'POST',
    payload: data
  });
}
