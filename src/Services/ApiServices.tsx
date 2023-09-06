import axios from "axios";
import { getServerURL } from '../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async (url: string, method: string, token = false, body = {}, isFormData = false) => {
  let headers;
  if (isFormData) {
    headers = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",

    };
  }

  if (token) {
    const userToken = await AsyncStorage.getItem('@UserToken');
    console.log('USer Token For Api', userToken)
    headers['Authorization'] = `Bearer ${userToken}`;
  }

  url = await getServerURL() + url;
  const structure = {
    url,
    method,
  };

  if (method === "GET") {
    structure.params = body;
  } else {
    structure.data = body;
    console.log('STRUCTURE IS', structure);

  }




  
 try {
          const response = await axios.post('https://api-finwiz.softsquare.io/api/register', body);
          const response2={response}

          
          // Assuming a successful registration returns a success message
          if (response2.status) {
            console.log('Registration successful!');
            // Handle further navigation or user feedback as needed
          } else {
            console.log('Registration failed. Please check your data.');
            console.log(response.data.status);

          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.log('FUCKING RESPONSE ',error);

            // If the server returns a 422 status code, it usually means validation errors
            console.log('Validation errors. Please check your data.');
            console.log(error.response.data); // Log the specific validation errors
          } else {
            console.log('Registration failed. Please try again later.');
            console.error(error); // Log other types of errors
          }
        }
    
  
  return await axios.post(url, body)
    .then((resp) => {
      console.log('AXIOS RESPONSE IS THIS ', resp.data);

      return resp;
    })
    .catch((err) => {
      console.log('AXIOS ERRO IS THIS ', err);

      return err;
    });
};