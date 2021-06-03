import axios from 'axios';


export default class CrudController {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL + '/project-models';

  static async addOrEdit (name, label, softDeletes, fields, projectId, token, parentMenuId, projectModel) {

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
      "fields": jsonFields,
      "edit_project_model_id": projectModel ? projectModel.id : null
    }

    try {
      let response = null;
      if (projectModel) {
         response = await axios.patch(this.baseUrl + '/' + projectModel.id, data, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
  
          },
        });
      } else {
         response = await axios.post(this.baseUrl, data, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
  
          },
        });
      }
     
  
      return response.data;
    } catch (ex) {
      return null;
    }
  }

  static async showCrud (projectModelId, token) {
    
    try {
      const response = await axios.get(this.baseUrl + '/' + projectModelId, {
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
    
  static async addOrEditParent (name, projectId, token, parentMenuId) {

    const url = process.env.NEXT_PUBLIC_API_URL + '/projects/' + projectId + '/parent-menus';
    const data = {
      'label': name,
      'project_id': projectId,
      'soft_delete': 1
    }

    try {
      let response = null;
      if (parentMenuId) {
        response = await axios.patch(url + "/" + parentMenuId, data, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
        });
      } else {
        response = await axios.post(url, data, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
        });
      }
    
  
      return response.data.data;
    } catch (ex) {
      return { error: ex.response.data.errors.label };
    }
  }


}