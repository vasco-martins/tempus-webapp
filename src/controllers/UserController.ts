import axios from 'axios';
import { NextRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';

export default class UserController {
  
  static async register (name: string, email: string, password: string, password_confirmation: string) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/register";

    try {
      const response = await axios.post(url, {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }, {
        headers: {
          Accept: "application/json",
        }
      });
      return response.data.token;
    } catch (err) {
      console.log(err.response.data)
      return { errors: err.response.data.errors }

    }

  }

  static async validateRegister (name: string, email: string, password: string, password_confirmation: string) {

      const url = process.env.NEXT_PUBLIC_API_URL + "/auth/register/validate";
  
      try {
        await axios.post(url, {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }, {
          headers: {
            Accept: "application/json",
          }
        });
        return true;
      } catch (err) {
        return err.response.data.errors
      }
  

  }

  static async logout (router: NextRouter) {
    const { token } = parseCookies();

    if (token) {
      const url = process.env.NEXT_PUBLIC_API_URL + "/auth/logout";
      
      await axios.post(url, {}, {
        headers: {
          Authorization: "Bearer " + token,
        }
      });
  
      destroyCookie(null, "token");
      router.push("/auth/login");
    }

  }

}
