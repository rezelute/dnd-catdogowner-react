import axios from "axios"
import { authToken } from "./auth-api";
import { OwnerApiUrl } from "./apiUrls"
import { GenerateOwnerAttr } from "../js/data-generator";

//owner data: { "id": 1,"name": "Hamzah","pets": [{...}, {...} ] },
//owner app data: { id: "0", name: "", age: -1, country: "", catIds: [], dogIds: [] },
function formatOwners(api_owners)
{
  return api_owners.map(api_owner =>
  {
    const { id, name } = api_owner; //, pets 

    return {
      id,
      name,
      attributes: {
        age: GenerateOwnerAttr.getAge(),
        country: GenerateOwnerAttr.getCountry(),
      },
      catIds: [], //allocated later
      dogIds: [] //allocated later
    };
  });
}

//gets an array of all the owners
export function getOwners()
{
  return axios.get(OwnerApiUrl.getBase(), {
    headers: {
      "x-api-key": authToken
    }
  })
    .then((resp) =>
    {
      if (resp.status === 200) { //success
        return formatOwners(resp.data);
      }
      else { //error code
        throw Error(`status: ${resp.status}, error: ${resp.data.error}`);
      }
    })
    .catch(error => //catches 404 not found and above errors
    {
      throw Error("Failed to retrieve owners data - Error info: " + error.message);
    })
}

//deletes an owner
export function deleteOwner(id)
{
  let errorMsg = `Failed to delete the owner, error is: `;

  return axios.delete(OwnerApiUrl.getDelete(id),
    null,
    { //config
      headers: {
        "x-api-key": authToken
      }
    }
  )
  // .catch(function (respError) //404 - could be page not found or owner not found
  // {
  //   //owner was not found in the DB to be deleted, just delete from the state list
  //   if (respError.data !== undefined && respError.data.error !== undefined) {
  //     console.log("Owner was not found in DB, delete anyway");
  //     return {
  //       status: 200
  //     }
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

        throw Error(error_info);
      }
    })
    .catch(function (error) //THEN block error || 404 page not found error || owner not found
    {
      throw Error(errorMsg + error.message);
    })
}

//renames an owner
export function renameOwner(id, newName, catIds, dogIds)
{
  let errorMsg = `Failed to rename the owner, error is: `;

  //only used to update the json-server (if pets is not passed in then it only inserts name)
  let ownerPetsForApi = [];
  catIds.forEach(petId =>
  {
    ownerPetsForApi.push({
      petId,
      animal: "cat"
    })
  })
  dogIds.forEach(petId =>
  {
    ownerPetsForApi.push({
      petId,
      animal: "dog"
    })
  })

  return axios.put(OwnerApiUrl.getUpdate(id),
    { //data
      name: newName,
      pets: ownerPetsForApi //testing for json-server (useless for LIVE)
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
      if (respError.data !== undefined && respError.data.error !== undefined) { //owner not found
        throw Error("Owner was not found in DB to be renamed");
      }
      else { //One of the errors above OR 404 page not found
        throw Error(errorMsg + respError.message);
      }
    })
}

//createa an owner
export function createOwner(name)
{
  let errorMsg = `Failed to create the new owner, error is: `;

  return axios.post(OwnerApiUrl.getCreate(),
    { //data
      name,
      pets: [] //testing (useless for LIVE)
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
      else {
        let error_info = "Server error"; //default error
        if (resp.status === 400 || resp.status === 409) {//400="Names must be alphanumeric", 409="Name exists"
          error_info = resp.error;
        }
        else if (resp.status === 403) { //unauth
          error_info = resp.error;
        }

        throw Error(errorMsg + error_info);
      }
    })
    .catch(function (error) //404 page not found or error above
    {
      throw Error(errorMsg + error.message);
    })
}

//allocate pet to owner
export function allocatePet(petId, animal, ownerId)
{
  let errorMsg = `Failed to allocate pet to owner, error is: `;

  return axios.post(OwnerApiUrl.getAllocatePet(ownerId,petId),
    null,
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
      else {
        let error_info = "Server error"; //default error
        if (resp.status === 403) { //unauth
          error_info = resp.error;
        }

        throw Error(errorMsg + error_info);
      }
    })
    .catch(function (errorResp)
    {
      if (errorResp.data !== undefined && errorResp.data.error !== undefined) { //"Owner or Pet not found"
        throw Error(errorMsg + "Owner or pet not found in the database");
      }
      else { //Error from THEN block OR 404 page not found
        throw Error(errorMsg + errorResp.message);
      }
    })
}


//UNallocate pet to owner
export function unAllocatePet(petId, animal, ownerId)
{
  let errorMsg = `Failed to un-allocate pet to owner, error is: `;

  return axios.delete(OwnerApiUrl.getUnallocatePet(ownerId,petId),
    null,
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
      else {
        let error_info = "Server error"; //default error
        if (resp.status === 403) { //unauth
          error_info = resp.error;
        }

        throw Error(errorMsg + error_info);
      }
    })
    .catch(function (errorResp)
    {
      if (errorResp.data !== undefined && errorResp.data.error !== undefined) { //"Owner or Pet not found"
        throw Error(errorMsg + errorResp.data.error.message);
      }
      else {//error from THEN block or 404 page not found
        throw Error(errorMsg + errorResp.message);
      }
    })
}
