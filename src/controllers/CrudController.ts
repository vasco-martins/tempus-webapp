import axios from 'axios';


export default class CrudController {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL + '/project-models';

  static async addCrud (name, label, softDeletes, fields, projectId, token, parentMenuId) {

    const jsonFields = [];


    for (let i in fields) {
      let validations = [];
      
      for (let name in fields[i].validations) {
        validations.push({
          name: name,
          value: fields[i].validations[name],
        })
      }


      jsonFields.push({
        'type': fields[i].type,
        'label': fields[i].name,
        'database_name': fields[i].databaseFieldName,
        'validations': validations
      });
    }

    const data = {
      "project_id": projectId,
      "project_model_id": parentMenuId,
      "name": name,
      "label": label,
      "soft_delete": softDeletes,
      "fields": jsonFields
    }

    try {
      const response = await axios.post(this.baseUrl, data, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token

        },
      });
  
      return response.data;
    } catch (ex) {
      return null;
    }
  }

      
  static async removeProjectModel (projectModelId, token) {



    try {
      const response = await axios.delete(this.baseUrl + "/" + projectModelId, {
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
    
  static async addParent (name, projectId, token) {

    const url = process.env.NEXT_PUBLIC_API_URL + '/projects/' + projectId + '/parent-menus';
    const data = {
      'label': name,
      'project_id': projectId,
      'soft_delete': 1
    }

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
  
      return response.data.data;
    } catch (ex) {
      return { error: ex.response.data.errors.label };
    }
  }


}