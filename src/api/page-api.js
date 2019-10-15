//import axios from "axios"
//import * as ApiUrls from "./apiUrls"
//import * as DataGenerator from "../js/data-generator";
//import {authToken} from "./auth-api";
import {getCats as ApiGetCats, formatCats as ApiFormatCats} from "./pet-api";
import {getDogs as ApiGetDogs, formatDogs as ApiFormatDogs} from "./pet-api";
import {getOwners as ApiGetOwners} from "./owner-api";

function allocatePetsToOwners(ownerList, api_cats, api_dogs)
{
  ownerList.forEach(owner =>
  {
    //make sure that the pets in the array can be found in the returned cats/dogs list
    api_cats.forEach(api_cat =>
    {
      if (api_cat.owner === owner.id) {
        owner.catIds.push(api_cat.id);
      }
    });

    api_dogs.forEach(api_dog =>
    {
      if (api_dog.owner === owner.id) {
        owner.dogIds.push(api_dog.id);
      }
    });
  });
}

//get initial page data
export function getPageData()
{
  console.log("get page data");
  return Promise.all([
    ApiGetCats(false),
    ApiGetDogs(false),
    ApiGetOwners()
  ])
    .then(function (values) //values is array
    {
      let appCatList =ApiFormatCats(values[0]);
      let appDogList = ApiFormatDogs(values[1]);
      let appOwnerList = values[2]; //aready formatted
      
      allocatePetsToOwners(appOwnerList, values[0], values[1]);
      console.log("appCatList: ", appCatList);
      console.log("appDogList: ", appDogList);
      console.log("appOwnerList: ", appOwnerList);

      return {
        catList: appCatList,
        dogList: appDogList,
        ownerList: appOwnerList
      }
    })
}