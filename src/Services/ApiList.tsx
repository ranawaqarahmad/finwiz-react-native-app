import api from './ApiServices';

export const baseUrl = 'https://api-finwiz.softsquare.io';
export const liveUrl = 'https://api-finwiz.softsquare.io';


export const registerApi = async (data: any) => {
  console.log('DATA IN THE LIST END IS ',data);
  
  const url = '/api/register';
  const method = 'POST';
  const res = await api(url, method, false, data, false);
  return res;
};