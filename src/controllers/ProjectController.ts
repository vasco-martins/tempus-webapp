import axios from 'axios';
import { Project } from '../@types/project';

export default class ProjectController {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL + '/projects';



  static async index (token): Promise<Project> {
    const response = await axios.get(this.baseUrl, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    });

    return response.data.data as Project;
  }

  static async store (token, projectName) {

    try {
      const response = await axios.post(this.baseUrl,
        {
         name: projectName
       }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
         },
         
      })
      return response.data.data;
    } catch (err) {
      return { error: err.response.data.errors.name };
    }
  
  }

}