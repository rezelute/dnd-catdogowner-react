import axios from "axios"
import * as ApiUrls from "./apiUrls"
import * as DataGenerator from "../js/data-generator";

//convert the returned JSON data into app usable format
//cat data: {"id": 1, "name": "Felix", "owner": -1}
//cat app data: { id: 0, name: "", attributes: { breed: "", color: "" } },
function formatCats(api_cats)
{
  return api_cats.map(api_cats =>
  {
    const { id, name } = api_cats; //{ id, name, owner }
    return {
      id,
      name,
      attributes: {
        breed: DataGenerator.Cat.generateBreed(),
        color: DataGenerator.Cat.generateColor(),
      }
    }
  });
}
//dog data: {"id": 1, "name": "Felix", "owner": -1}
//dog app data: { id: 0, name: "", attributes: { breed: "", color: "" } },
function formatDogs(api_dogs)
{
  return api_dogs.map(api_dog =>
  {
    const { id, name } = api_dog; //{ id, name, owner }
    return {
      id,
      name,
      attributes: {
        breed: DataGenerator.Dog.generateBreed(),
        color: DataGenerator.Dog.generateColor(),
      }
    }
  });
}
//owner data: { "id": 1,"name": "Hamzah","pets": [{...}, {...} ] },
//owner app data: { id: "0", name: "", age: -1, country: "", catIds: [], dogIds: [] },
function formatOwners(api_owners, api_cats, api_dogs)
{
  return api_owners.map(api_owner =>
  {
    const { id, name } = api_owner; //, pets 

    //make sure that the pets in the array can be found in the returned cats/dogs list
    let catIds = [];
    api_cats.forEach(cat =>
    {
      if (cat.owner === id) {
        catIds.push(id);
      }
    });
    let dogIds = [];
    api_dogs.forEach(dog =>
    {
      if (dog.owner === id) {
        dogIds.push(id);
      }
    });

    return {
      id,
      name,
      attributes: {
        age: DataGenerator.Owner.generateAge(),
        country: DataGenerator.Owner.generateCountry(),
      },
      catIds,
      dogIds
    };
  });
}

export default class ApiData
{
  static authToken = ""; //authentication token

  //gets the user authentication token to verify login
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
          this.authToken = resp.data["x-api-key"]; //set auth token in class to be used by every method
          return this.authToken; //auth token
        }
        else {
          console.log(`Error logging into account - status: ${resp.status}, error: ${resp.data.error}`);
          throw Error("Error logging in.");
        }
      })
  }

  //get initial page data
  static getPageData()
  {
    return axios.all([
      axios.get(ApiUrls.CatUrl.getBase(), {
        headers: {
          "x-api-key": this.authToken
        }
      }),
      axios.get(ApiUrls.DogUrl.getBase(), {
        headers: {
          "x-api-key": this.authToken
        }
      }),
      axios.get(ApiUrls.OwnerUrl.getBase(), {
        headers: {
          "x-api-key": this.authToken
        }
      }),
    ])
      .then(axios.spread((api_cats, api_dogs, api_owners) => 
      {
        //added for error checks in loop
        api_cats.name = "catList";
        api_dogs.name = "dogList";
        api_owners.name = "ownerList";

        const lists = [api_cats, api_dogs, api_owners];

        const listsSuccess = lists.every(list => list.status === 200); //all lists were queried successfully
        if (listsSuccess) {
          let appCatList = formatCats(api_cats.data);
          let appDogList = formatDogs(api_dogs.data);
          let appOwnerList = formatOwners(api_owners.data, api_cats.data, api_dogs.data);

          console.log("appCatList: ", appCatList);
          console.log("appDogList: ", appDogList);
          console.log("appOwnerList: ", appOwnerList);

          return {
            catList: appCatList,
            dogList: appDogList,
            ownerList: appOwnerList
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

  //create owner
  static createOwner(name)
  {
    axios.post(ApiUrls.OwnerUrl.getUpdate(),
      { //data
        params: {
          name
        },
      },
      { //config
        headers: {
          "x-api-key": this.authToken
        }
      }
    )
      .then(function (response)
      {
        console.log(response);
      })
      .catch(function (error)
      {
        console.log(error);
      })
  }
}