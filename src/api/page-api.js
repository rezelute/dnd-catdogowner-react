//import axios from "axios"
//import * as ApiUrls from "./apiUrls"
//import * as DataGenerator from "../js/data-generator";
//import {authToken} from "./auth-api";
import {getCats as ApiGetCats} from "./pet-api";
import {getDogs as ApiGetDogs} from "./pet-api";
import {getOwners as ApiGetOwners} from "./owner-api";


//get initial page data
export function getPageData()
{
  return Promise.all([ApiGetCats(), ApiGetDogs(), ApiGetOwners()])
    .then(function (values) //values is array
    {
      console.log("appCatList: ", values[0]);
      console.log("appDogList: ", values[1]);
      console.log("appOwnerList: ", values[2]);

      return {
        catList: values[0],
        dogList: values[1],
        ownerList: values[2]
      }
    })
    .catch((error) =>
    {
      console.log(error);
      throw Error(error);
    })
}