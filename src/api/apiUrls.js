class UserApiUrlClass
{
  domain = "";
  constructor(domain)
  {
    this.domain = domain;
  }
  getLogin()
  {
    return this.domain + "/login";
  }
}

class CatApiUrlClass
{
  domain = "";
  constructor(domain)
  {
    this.domain = domain;
  }

  getBase()
  {
    return this.domain + "/cats";
  }

  getCreate()
  {
    return this.getBase();
  }

  getUpdate(id)
  {
    return this.getBase() + "/" + id;
  }

  getDelete(id)
  {
    return this.getBase() + "/" + id;
  }
}

class DogApiUrlClass
{
  domain = "";
  constructor(domain)
  {
    this.domain = domain;
  }

  getBase() {
    return this.domain + "/dogs";
  }

  getCreate()
  {
    return this.getBase();
  }

  getUpdate(id)
  {
    return this.getBase() + "/" + id;
  }

  getDelete(id)
  {
    return this.getBase() + "/" + id;
  }
}

class OwnerApiUrlClass
{
  domain = "";
  constructor(domain)
  {
    this.domain = domain;
  }

  getBase() {
    return this.domain + "/owners";
  }

  getCreate()
  {
    return this.getBase();
  }
  
  getUpdate(id)
  {
    return this.getBase() + "/" + id;
  }

  getDelete(id)
  {
    return this.getBase() + "/" + id;
  }

  getAllocatePet(id, petId)
  {
    return this.domain + "/owner/" + id + "/pet/" + petId;
  }

  getRemovePet(id, petId)
  {
    return this.domain + "/owner/" + id + "/pet/" + petId;
  }
}

//local = http://localhost:3004
//live = https://cdo-json-server.rezelute.now.sh
const domain = process.env.REACT_APP_API_URL;//without ending forward slash - process.env.REACT_APP_API_URL;


let UserApiUrl = new UserApiUrlClass(domain);
let CatApiUrl = new CatApiUrlClass(domain);
let DogApiUrl = new DogApiUrlClass(domain);
let OwnerApiUrl = new OwnerApiUrlClass(domain);

export { UserApiUrl, CatApiUrl, DogApiUrl, OwnerApiUrl };