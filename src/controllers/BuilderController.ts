import axios from 'axios';


export default class BuilderController {
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


  static async showProjectModelFieldList (token, projectId) {

    try {
      const response = await axios.get(this.baseUrl + "/" + projectId + "/projectModelFieldList", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
  
      return response.data ;
    } catch (ex) {
      return null;
    }
  }



  static async showProjectModelList (token, projectId) {

    try {
      const response = await axios.get(this.baseUrl + "/" + projectId + "/projectModelList", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
  
      return response.data ;
    } catch (ex) {
      return null;
    }
  }


  static async getModelNames (token, projectId): Promise<boolean> {
      const response = await axios.post(this.baseUrl + "/projectModelNames", {
        'project_id': projectId,
      },{
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },

      });
      
      return response.data;
  }

  static async getParentMenuNames (token, projectId): Promise<boolean> {
    const response = await axios.post(this.baseUrl + "/parentMenuNames", {
      'project_id': projectId,
    },{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },

    });
    
    return response.data;
}


}