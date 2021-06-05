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

  static async show (token, id): Promise<Project> {
    try {
      const response = await axios.get(this.baseUrl + "/" + id, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
  
      return response.data.data as Project;
    } catch (ex) {
      return null;
    }
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


  static async update (token, projectId, projectName) {

    try {
      const response = await axios.patch(this.baseUrl + '/' + projectId,
        {
         name: projectName
       }, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
         },
         
      })
      return {};
    } catch (err) {
      return { error: err.response.data.errors.name };
    }
  
  }

  static async destroy (token, projectId) {

    try {
      const response = await axios.delete(this.baseUrl + '/' + projectId,
        {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
         },
         
      })
      return true;
    } catch (err) {
      return false;
    }
  
  }

  static async deploy (token, id) {
    try {
       await axios.get(this.baseUrl + "/" + id + '/deploy', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
  
      return true;
    } catch (ex) {
      return false;
    }
  }


  static async getDeployStatus (token, id) {
    try {
       const response = await axios.get(this.baseUrl + "/" + id + '/deployStatus', {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
  
      return response.data;
    } catch (ex) {
      return false;
    }
  }

  static async reorderMenu (token, id, ids) {
    const data = {
      ids: ids
    }

    try {
      await axios.post(this.baseUrl + "/" + id + '/menu/reorder',data, 
        {
       headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
         "Authorization": "Bearer " + token
       },
     });
 
     return true;
   } catch (ex) {
     return false;
   }
  }

}