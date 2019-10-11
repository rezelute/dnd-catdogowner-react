
export class UserUrl
{
  static getLogin()
  {
    return "http://localhost:3004/login";
  }
}

export class CatUrl
{
  static getBase()
  {
    return "http://localhost:3004/catList";
  }

  static getUpdate(id)
  {
    return this.getBase() + "/" + id;
  }

  static getDelete(id)
  {
    return this.getBase() + "/" + id;
  }
}

export class DogUrl
{
  static getBase() {
    return "http://localhost:3004/dogList";
  }

  static getUpdate(id)
  {
    return this.getBase() + "/" + id;
  }

  static getDelete(id)
  {
    return this.getBase() + "/" + id;
  }
}

export class OwnerUrl
{
  static getBase() {
    return "http://localhost:3004/ownerList";
  }

  static getUpdate(id)
  {
    return this.getBase() + "/" + id;
  }

  static getDelete(id)
  {
    return this.getBase() + "/" + id;
  }

  static allocatePet(id, petId)
  {
    return this.getBase() + "/" + id + "/pet/" + petId;
  }

  static unAllocatePet(id, petId)
  {
    return this.getBase() + "/" + id + "/pet/" + petId;
  }
}