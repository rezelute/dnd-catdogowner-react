import axios from "axios"
import PetTypes from '../js/petTypes'
import { authToken } from "./auth-api";
import {CatApiUrl, DogApiUrl} from "./apiUrls"
import { GenerateCatAttr, GenerateDogAttr } from "../js/data-generator";


//convert the returned JSON data into app usable format
//cat data: {"id": 1, "name": "Felix", "owner": -1}
//cat app data: { id: 0, name: "", attributes: { breed: "", color: "" } },
export function formatCats(api_cats)
{
  return api_cats.map(api_cats =>
  {
    const { id, name } = api_cats; //{ id, name, owner }
    return {
      id: Number(id),
      name,
      ownerId: Number(api_cats.owner),
      attributes: {
        breed: GenerateCatAttr.getBreed(),
        color: GenerateCatAttr.getColor(),
      }
    }
  });
}
//dog data: {"id": 1, "name": "Felix", "owner": -1}
//dog app data: { id: 0, name: "", attributes: { breed: "", color: "" } },
export function formatDogs(api_dogs)
{
  return api_dogs.map(api_dog =>
  {
    const { id, name } = api_dog; //{ id, name, owner }
    return {
      id: Number(id),
      name,
      ownerId: Number(api_dog.owner),
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

        throw Error(error_info);
      }
    })
    .catch(function (respError) //error from THEN block or 404 page not found
    {
      throw Error(errorMsg + respError.message);
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

  return axios.delete( petApiUrl+"penis",
    null,
    { //config
      headers: {
        "x-api-key": authToken
      }
    }
  )
    // .catch(function (respError) //404 - could be page not found or pet not found
    // {
    //   console.log("respError", respError.response.data);
    //   if (respError !== undefined && respError.response !== undefined && respError.response.data.error !== undefined) { //pet was not found in the DB to be deleted, just delete from the state list
    //     console.log("Pet was not found in DB, delete anyway");
    //     return {
    //       status: 200
    //     }
    //   }
    //   else { //404 page not found
    //     throw Error(errorMsg + "Page not found");
    //   }
    // })
    .then(function (resp)
    {
      if (resp.status === 201 || resp.status === 200) { //success, response is null
        return id;
      }
      else {
        let error_info = "Server error"; //default error
        if (resp.status === 403) { //unauth
          error_info = resp.error;
        }

        throw Error(errorMsg + error_info);
      }
    })
    .catch(function (respError) //error from THEN block OR 404 page not found error OR pet not found
    {
      throw Error(errorMsg + respError.message);
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
      owner: ownerId //testing for json-server (useless for LIVE)
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
      else {
        let error_info = "Server error"; //default error (such as 404)
        if (resp.status === 400 || resp.status === 409) {//400="Names must be alphanumeric", 409="Name exists"
          error_info = resp.error;
        }
        else if (resp.status === 403) { //unauth
          error_info = resp.error;
        }

        throw Error(error_info);
      }
    })
    .catch(function (respError) //error from THEN block or page not found or owner not found
    {
        throw Error(errorMsg + respError.message);
    })
}