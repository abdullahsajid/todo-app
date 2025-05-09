import { API_ROUTES } from "../constants/apisPath";
import APIService from "./core/api-service";
import Cookies from "universal-cookie";
const cookie = new Cookies();
namespace UserService {
  export const signUp = async (payload:any) => {
    try {  
      const response = await APIService.post(API_ROUTES.SIGNUP, payload);
      return response;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  };

  export const login = async (payload:any) => {
    try {
      const response = await APIService.post(API_ROUTES.LOGIN,payload);
      return response;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  };

  export const getTodo = async () => {
    try {
      const token = cookie.get("todo-app");
      const headers: any = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await APIService.get(API_ROUTES.TODO,{ headers });
      return response;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

}

export default UserService;
