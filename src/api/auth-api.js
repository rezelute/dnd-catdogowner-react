import axios from "axios"
import {UserApiUrl} from "./apiUrls"

export let authToken = ""; //authentication token


//gets the user authentication token to verify login
export default function setAuthData()
{
  return axios.post(UserApiUrl.getLogin(), {
    params: {
      username: "hamzah",
      password: "husseini"
    }
  })
    .then((resp) =>
    {
      if (resp.status === 200) {
        authToken = resp.data["x-api-key"]; //set auth token in class to be used by every method
        return authToken; //auth token
      }
      else {
        console.log(`Error logging into account - status: ${resp.status}, error: ${resp.data.error}`);
        throw Error("Error logging in.");
      }
    })
}