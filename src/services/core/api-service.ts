import axios from "axios";

namespace APIService {
  export const post = async (url: string, body: object,headers?:object) => {
    try {
      const config = headers && { headers };
      const response = await axios.post(url, body,config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const put = async (url: string, body: object,headers?:object) => {
    try {
      const config = headers && { headers };
      const response = await axios.put(url, body,config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const patch = async (url: string, body: object,headers?:object) => {
    try {
      const config = headers && { headers };
      const response = await axios.patch(url, body,config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const del = async (url: string,headers?:object) => {
    try {
      const config = headers && { headers };
      const response = await axios.delete(url,config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const get = async (url: string,headers?:object) => {
    try {
      const response = await axios.get(url,headers);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default APIService;
