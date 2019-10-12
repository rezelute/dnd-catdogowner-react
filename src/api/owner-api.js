import axios from "axios"
import { authToken } from "./auth-api";
import { OwnerApiUrl } from "./apiUrls"
import {GenerateOwnerAttr} from "../js/data-generator";

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
        age: GenerateOwnerAttr.getAge(),
        country: GenerateOwnerAttr.getCountry(),
      },
      catIds,
      dogIds
    };
  });
}

//gets an array of all the owners
export function getOwners(api_cats, api_dogs)
{
  return axios.get(OwnerApiUrl.getBase(), {
    headers: {
      "x-api-key": authToken
    }
  })
    .then((resp) =>
    {
      if (resp.status === 200) { //success
        return {
          ownerList: formatOwners(resp.data, api_cats.data, api_dogs.data)
        };
      }
      else { //error code
        throw Error(`Error retrieving owners data - status: ${resp.status}, error: ${resp.data.error}`);
      }
    });
}

export function deleteOwner(id)
{
  
}

//create owner
export function createOwner(name)
{
  let errorMsg = `Failed to create the new owner, error is: `;

  return axios.post(OwnerApiUrl.getCreate(),
    { //data
      name,
      pets:[] //testing (useless for LIVE)
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
      else {
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
