import axios from "axios"
import PetTypes from '../js/petTypes'
import { authToken } from "./auth-api";
import {CatApiUrl, DogApiUrl} from "./apiUrls"
import { GenerateCatAttr, GenerateDogAttr } from "../js/data-generator";


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
        breed: GenerateCatAttr.getBreed(),
        color: GenerateCatAttr.getColor(),
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
        breed: GenerateDogAttr.getBreed(),
        color: GenerateDogAttr.getColor(),
      }
    }
  });
}

//get all cats
export function getCats()
{
  return axios.get(CatApiUrl.getBase(), {
    headers: {
      "x-api-key": authToken
    }
  })
    .then((resp)=>
    {
      if (resp.status === 200) { //success
        return {
          catList: formatCats(resp.data)
        };
      }
      else { //error code
        throw Error(`Error retrieving cats data - status: ${resp.status}, error: ${resp.data.error}`);
      }
    })
}

//get all dogs
export function getDogs()
{
  return axios.get(DogApiUrl.getBase(), {
    headers: {
      "x-api-key": authToken
    }
  })
    .then((resp)=>
    {
      if (resp.status === 200) { //success
        return {
          dogList: formatDogs(resp.data)
        };
      }
      else { //error code
        throw Error(`Error retrieving dogs data - status: ${resp.status}, error: ${resp.data.error}`);
      }
    })
}

//create pet
export function createPet(name, animal)
{
  let errorMsg = `Failed to create the new ${animal}, error is: `;
  let animalUrl = "";
  if (animal === PetTypes.Cat) {
    animalUrl = CatApiUrl.getCreate()
  }
  else if (animal === PetTypes.Dog) {
    animalUrl = DogApiUrl.getCreate()
  }

  return axios.post(animalUrl,
    { //data
      name,
      owner: -1 //testing (useless for LIVE)
    },
    { //config
      headers: {
        "x-api-key": authToken
      }
    }
  )
    .then(function (resp)
    {
      if (resp.status === 201) { //success
        return resp.data.id;
      }
      else { //error
        let error_info = "Server error";
        if (resp.status === 400 || resp.status === 409) {
          error_info = resp.error;
        }
        else if (resp.status === 403) { //unauth
          error_info = resp.error;
        }

        throw Error(errorMsg + error_info);
      }
    })
    .catch(function (error) //something else went wrong (such as 404 accessing the URL)
    {
      console.log(error);
      throw Error(errorMsg + error);
    })
}
