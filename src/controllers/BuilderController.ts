import axios from 'axios';


export default class ProjectController {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL + '/builder';

  static async showFields () {

    try {
      const response = await axios.get(this.baseUrl + "/fields", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      });
  
      return response.data ;
    } catch (ex) {
      return null;
    }
  }


}