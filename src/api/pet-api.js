import axios from "axios"
import PetTypes from '../js/petTypes'
import { authToken } from "./auth-api";
import {CatApiUrl, DogApiUrl} from "./apiUrls"
import { GenerateCatAttr, GenerateDogAttr } from "../js/data-generator";


//convert the returned JSON data into app usable format
//cat data: {"id": 1, "name": "Felix", "owner": null}
//cat app data: { id: 0, name: "", ownerId:null, attributes: { breed: "", color: "" } },
export function formatCats(api_cats)
{
  return api_cats.map(api_cats =>
  {
    const { id, name, owner } = api_cats; //{ id, name, owner }
    return {
      id: Number(id),
      name,
      ownerId: (owner!==null ? Number(owner) : null),
      attributes: {
        breed: GenerateCatAttr.getBreed(),
        color: GenerateCatAttr.getColor(),
      }
    }
  });
}
//dog data: {"id": 1, "name": "Felix", "owner": null}
//dog app data: { id: 0, name: "", ownerId:null, attributes: { breed: "", color: "" } },
export function formatDogs(api_dogs)
{
  return api_dogs.map(api_dog =>
  {
    const { id, name, owner } = api_dog; //{ id, name, owner }
    return {
      id: Number(id),
      name,
      ownerId: (owner!==null ? Number(owner) : null),
      attributes: {
        breed: GenerateDogAttr.getBreed(),
        color: GenerateDogAttr.getColor(),
      }
    }
  });
}

/** no forma
 * @param {*} noFormat 
 */
export function getCats(formatData=true)
{
  return axios.get(CatApiUrl.getBase(), {
    headers: {
      "x-api-key": authToken
    }
  })
    .then((resp)=>
    {
      if (resp.status === 200) { //success
        if (!formatData) {
          return resp.data; //send back unformatted data (data in api format)
        }
        else { //format data and return
          return formatCats(resp.data);
        }
      }
      else { //error code
        throw Error(`status: ${resp.status}, message: ${resp.data.error}`);
      }
    })
    .catch(error => //catches 404 not found and above errors
    {
      throw Error("Failed to retrieve cats data - Error info: " + error.message);
    })
}

//get all dogs
export function getDogs(formatData=true)
{
  return axios.get(DogApiUrl.getBase(), {
    headers: {
      "x-api-key": authToken
    }
  })
    .then((resp)=>
    {
      if (resp.status === 200) { //success
        if (!formatData) { //send back unformatted data (data in api format)
          return resp.data;
        }
        else { //format data and return
          return formatDogs(resp.data);
        }
      }
      else { //error code
        throw Error(`status: ${resp.status}, error: ${resp.data.error}`);
      }
    })
    .catch(error => //catches 404 not found and above errors
    {
      throw Error("Failed to retrieve dogs data - Error info: " + error.message);
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
      owner: null
    },
    { //config
      headers: {
        "x-api-key": authToken
      }
    }
  )
    .then(function (resp)
    {
      if (resp.status === 201 || resp.status === 200) { //success
        return resp.data.id;
      }
    })
    .catch(function (err) //error from THEN block or 404 page not found
    {
      let error_info = "";

      if (err.response.status === 400 || err.response.status === 409) {//400="Names must be alphanumeric", 409="Name exists"
        error_info = err.response.data.error;
      }
      else if (err.response.status === 403) { //unauth
        error_info = err.response.data.error;
      }
      else { //404 maybe
        error_info = err.message;
      }

      throw Error(errorMsg + error_info);
    })
}


//deletes a pet
export function deletePet(id, animal)
{
  let errorMsg = `Failed to delete the pet, error is: `;

  let petApiUrl="";
  if (animal === PetTypes.Cat) {
    petApiUrl = CatApiUrl.getDelete(id)
  }
  else if (animal === PetTypes.Dog) {
    petApiUrl = DogApiUrl.getDelete(id)
  }

  return axios.delete( petApiUrl,
    null,
    { //config
      headers: {
        "x-api-key": authToken
      }
    }
  )
    .then(function (resp)
    {
      if (resp.status === 201 || resp.status === 200) { //success, response is null
        return id;
      }
    })
    .catch(function (err) //error from THEN block OR 404 page not found error OR pet not found
    {
      let error_info = "Server error"; //default error

      if (err.response.status === 403) { //unauth
        error_info = err.response.data.error;
      }

      throw Error(errorMsg + error_info);
    })
}

//renames a pet
export function renamePet(id, newName, animal, ownerId)
{
  let errorMsg = `Failed to rename the pet, error is: `;

  let petApiUrl="";
  if (animal === PetTypes.Cat) {
    petApiUrl = CatApiUrl.getUpdate(id)
  }
  else if (animal === PetTypes.Dog) {
    petApiUrl = DogApiUrl.getUpdate(id)
  }

  return axios.put(petApiUrl,
    { //data
      name: newName,
      owner: ownerId //ownerId on the pet itself
    },
    { //config
      headers: {
        "x-api-key": authToken
      }
    }
  )
    .then(function (resp)
    {
      if (resp.status === 201 || resp.status === 200) { //success, response is null
        return newName;
      }
    })
    .catch(function (err) //error from THEN block or page not found or owner not found
    {
      let error_info = "Server error"; //default error (such as 404)

      if (err.response.status === 400 || err.response.status === 409) {//400="Names must be alphanumeric", 409="Name exists"
        error_info = err.response.data.error;
      }
      else if (err.response.status === 403) { //unauth
        error_info = err.response.data.error;
      }

      throw Error(errorMsg + error_info);
    })
}