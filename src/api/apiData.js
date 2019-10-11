import axios from "axios"
import * as ApiUrls from "./apiUrls"

export default class ApiData
{
  static getAuthData()
  {
    return axios.post(ApiUrls.UserUrl.getLogin(), {
      params: {
        username: "hamzah",
        password: "husseini"
      }
    })
    .then((resp) =>
    {
      if (resp.status === 200) {
        return resp.data["x-api-key"]; //auth token
      }
      else {
        console.log(`Error logging into account - status: ${resp.status}, error: ${resp.data.error}`);
        throw Error("Error logging in.");
      }
    })
  }

  static getPageData()
  {
    return axios.all([
      axios.get(ApiUrls.CatUrl.getBase()),
      axios.get(ApiUrls.DogUrl.getBase()),
      axios.get(ApiUrls.OwnerUrl.getBase())
    ])
      .then(axios.spread((catList, dogList, ownerList) => 
      {
        catList.name = "catList";
        dogList.name = "dogList";
        ownerList.name = "ownerList";

        const lists = [catList, dogList, ownerList];

        const listsSuccess = lists.every(list => list.status === 200);
        if (listsSuccess) {
          return {
            catList: catList.data,
            dogList: dogList.data,
            ownerList: ownerList.data
          }
        }
        else {
          //loop and console log the error
          for (let i = 0; i < lists.length; i++) {
            const list = lists[i];
            if (list.status !== 200) {
              console.log(`Error loading data list: ${list.name} - status: ${list.status}, error: ${list.data.error}`);
            }
          }
          throw Error("Error loading page data.");
        }
      }));
  }

  static createOwner(name)
  {
    axios.post(ApiUrls.OwnerUrl.getUpdate(), {
      params: {
        name
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}