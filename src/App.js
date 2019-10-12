import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import PetList from "./components/pets/PetList"
import OwnerPets from "./components/modal/ownerPets/OwnerPets"
import OwnerList from "./components/owners/OwnerList"
import CreatePet from "./components/modal/createPet/CreatePet"
import CreateOwner from "./components/modal/createOwner/CreateOwner"

//import AppData from "./js/appData"
import ApiData from "./api/apiData"
import PetTypes from './js/petTypes'
import UUID from 'uuid'

import './style/app.scss'


export default class App extends Component
{
  state = {
    catList: [], //{ id: "0", name: "", attributes: { breed: "", color: "" } },
    dogList: [], //{ id: "0", name: "", attributes: { breed: "", color: "" } },
    ownerList: [], //{ id: "0", name: "", attributes: {age: -1, country: ""} , catIds: [], dogIds: [] },
    draggedItem: {
      petId: "-1",
      petType: ""
    },
    modal: {
      active: "", //ownerPets | createOwner | createPet | ""
      ownerPets: { //modal options
        ownerId: "-1"
      },
      createPet: { //modal options
        animal: ""
      }
    },
    // showOwnerPets: {
    //   open: false,
    //   ownerId: 0,
    //   //ownerName: "",
    //   //catList: [],
    //   //dogList: []
    // }
  };

  componentDidMount()
  {
    //first log user in 
    ApiData.getAuthData().then((authToken) =>
    {
      //load page data
      ApiData.getPageData()
      .then((data) =>
      {
        this.setState({
          catList: data.catList,
          dogList: data.dogList,
          ownerList: data.ownerList
        });
      })
      .catch((error) => //handle data load retrieval error
      {
        console.log("data load error - " + error);
      });
    })
    .catch((error) => //handle user login error
    {
      alert("User login error - " + error);
    });
  
     //STATIC API
    //let data = StaticData.getData();
    // this.setState({
    //   catList: data.catList,
    //   dogList: data.dogList,
    //   ownerList: data.ownerList
    // });
  }

  //create notifications
  createNotification = (type, message) =>
  {
    switch (type) {
      case 'info':
        toast.info(message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        break;
      case 'success':
        toast.success(message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        break;
      case 'warning':
        toast.warn(message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        break;
      case 'error':
        console.log("here i am");
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER
        });
        break;
      default:
        toast.error("Something else went wrong", {
          position: toast.POSITION.BOTTOM_CENTER
        });
    }
  };

  //drag started > set draggedItem state which is used on drop (to know which item was dropped)
  onDrag = (petId, petType) =>
  {
    this.setState({
      draggedItem: {
        petId,
        petType
      }
    });
  }

  //on drop in one of the owners > assign the pet to the owner
  onDrop = (droppedOwnerId) =>
  {
    const { petId, petType } = JSON.parse(JSON.stringify(this.state.draggedItem));

    //another method (firefox likes this)
    //var data = event.dataTransfer.getData("text");
    //console.log("Data id is: ", data);
    //const { id, draggedTask, todos } = this.state;

    console.log("Pet dropped - ID: ", petId, " Type: ", petType);
    console.log("Dropped on owner ID: ", droppedOwnerId);

    //assign pet to owner
    let updOwners = [...this.state.ownerList];
    let updOwner = updOwners.find(owner => owner.id === droppedOwnerId);
    if (updOwner === undefined) {
      this.createNotification("error", `Could not find Owner to update, Owner ID: ${droppedOwnerId}`);
      return;
    }
    if (petType === PetTypes.Cat) {
      updOwner.catIds.push(petId);
    }
    else if (petType === PetTypes.Dog) {
      updOwner.dogIds.push(petId);
    }

    console.log("updOwners is now: ", updOwners);

    //update owner state
    this.setState({
      ownerList: updOwners
    });


    //set the hasOwner on the pet to true
    let updCat, updDog;
    if (petType === PetTypes.Cat) {
      let updCatList = [...this.state.catList];
      updCat = updCatList.find(cat => cat.id === petId);
      if (updCat === undefined) {
        this.createNotification("error", `Could not find Cat to update, Cat ID: ${petId}`);
        return;
      }
      updCat.hasOwner = true;

      //update state
      this.setState({
        catList: updCatList
      });

      this.createNotification("success", `Owner ${updOwner.name} has been allocated ${petType} '${updCat.name}'`);
    }
    else if (petType === PetTypes.Dog) {
      let updDogList = [...this.state.dogList];
      updDog = updDogList.find(dog => dog.id === petId);
      if (updDog === undefined) {
        this.createNotification("error", `Could not find Dog to update, Dog ID: ${petId}`);
        return;
      }

      updDog.hasOwner = true;

      //update state
      this.setState({
        dogList: updDogList
      });

      this.createNotification("success", `Owner ${updOwner.name} has been allocated ${petType} '${updDog.name}'`);
    }
  }

  //handles pet renames
  onPetRename = (petId, petType, newName) =>
  {
    console.log("Pet name change - ID: ", petId, ", type: ", petType, ", new name: ", newName);

    if (petType === PetTypes.Cat) {
      let updList = [...this.state.catList];
      let updCat = updList.find(cat => cat.id === petId);
      if (updCat === undefined) {
        this.createNotification("error", `Could not find Cat to rename, Cat ID: ${petId}`);
        return;
      }
      updCat.name = newName;

      //update state
      this.setState({
        catList: updList
      });
    }
    else if (petType === PetTypes.Dog) {
      let updList = [...this.state.dogList];
      let updDog = updList.find(dog => dog.id === petId);
      if (updDog === undefined) {
        this.createNotification("error", `Could not find Dog to rename, Dog ID: ${petId}`);
        return;
      }
      updDog.name = newName;

      //update state
      this.setState({
        dogList: updList
      });
    }
  }

  //handles pet deletions
  onPetDelete = (delPetId, delPetType) =>
  {
    //console.log("Pet delete - ID: ", delPetId, ", type: ", delPetType);

    if (delPetType === PetTypes.Cat) {
      //update state
      this.setState({
        catList: this.state.catList.filter(cat => cat.id !== delPetId)
      });
    }
    else if (delPetType === PetTypes.Dog) {
      //update state
      this.setState({
        dogList: this.state.dogList.filter(dog => dog.id !== delPetId)
      });
    }
  }

  //handle owner deletions
  onOwnerDelete = (delOwnerId) =>
  {
    this.setState({
      ownerList: this.state.ownerList.filter(owner => owner.id !== delOwnerId)
    });
  }
  //handle owner rename
  onOwnerRename = (ownerId, newName) =>
  {
    let updList = [...this.state.ownerList];
    let updOwner = updList.find(owner => owner.id === ownerId);
    if (updOwner === undefined) {
      this.createNotification("error", `Could not find Owner to rename, Owner ID: ${ownerId}`);
      return;
    }
    updOwner.name = newName;

    //update state
    this.setState({
      ownerList: updList
    });
  }

  //open modal to create a new pet
  openModal_CreatePet = (animal) =>
  {
    this.setState({
      modal: {
        active: "createPet",
        createPet: {
          animal: animal
        }
      }
    })
  }

  //open modal to create a new owner
  openModal_CreateOwner = () =>
  {
    this.setState({
      modal: {
        active: "createOwner",
      }
    });
  }

  //show owner pets in a modal
  onShowOwnerPets = (ownerId) =>
  {
    let ownerItem = this.state.ownerList.find(owner => owner.id === ownerId);
    if (ownerItem === undefined) {
      this.createNotification("error", `Could not find owner to get the pets, owner ID: ${ownerId}`);
      return;
    }

    //update state
    this.setState({
      modal: {
        active: "ownerPets",
        ownerPets: {
          ownerId: ownerId
        }
      }
    });
  }

  //remove pet from owner
  onRemoveOwnerPet = (ownerId, petId, petType) =>
  {
    console.log("Remove pet ID: ", petId, ", type: ", petType, " - from owner id: ", ownerId);

    let updOwnerList = [...this.state.ownerList];
    let updOwner = updOwnerList.find(owner => owner.id === ownerId);
    if (updOwner === undefined) {
      this.createNotification("error", `Could not find owner to remove pet from, owner ID: ${ownerId}`);
      return;
    }

    if (petType === PetTypes.Cat) {
      updOwner.catIds = updOwner.catIds.filter(catId => catId !== petId);
    }
    else if (petType === PetTypes.Dog) {
      updOwner.dogIds = updOwner.dogIds.filter(dogId => dogId !== petId);
    }

    //update owner state
    this.setState({
      ownerList: updOwnerList
    });

    // //update showOwnerPets modal state
    // let updShowOwnerPets = JSON.parse(JSON.stringify(this.state.showOwnerPets));
    // if (petType === PetTypes.Cat) {
    //   updShowOwnerPets.catList = updShowOwnerPets.catList.filter(cat => cat.id !== petId);
    // }
    // else if (petType === PetTypes.Dog) {
    //   updShowOwnerPets.dogList = updShowOwnerPets.dogList.filter(dog => dog.id !== petId);
    // }
    // this.setState({
    //   showOwnerPets: updShowOwnerPets
    // });
  }

  //pet owner modal closed
  onCloseModal = () =>
  {
    this.setState({
      modal: {
        active: "",
        ownerPets: {
          ownerId: -1
        }
      }
    })
  }


  //create new pet
  onCreatePet = (animal, name, breed, color) =>
  {
    let newPet = {
      id: UUID.v4(),
      name,
      attributes: { breed, color }
    }

    if (animal === PetTypes.Cat) {
      this.setState({
        catList: [...this.state.catList, newPet],
        modal: {
          active: "",
          createPet: {//reset
            animal: ""
          }
        }
      })
    }
    else if (animal === PetTypes.Dog) {
      this.setState({
        dogList: [...this.state.dogList, newPet],
        modal: {
          active: "",
          createPet: {//reset
            animal: ""
          }
        }
      })
    }

    this.createNotification("success", `New ${animal} with name '${name}' has been added to the ${animal}'s list`);
  }

  //create new owner
  onCreateOwner = (name, country, age) =>
  {
    // let newOwner = {
    //   id: UUID.v4(),
    //   name,
    //   country,
    //   age,
    //   catIds: [],
    //   dogIds: []
    // }
    ApiData.createOwner(name, country, age)
      .then((newOwnerId) =>
      {
        let newOwner = {
          id: newOwnerId,
          name,
          country,
          age,
          catIds: [],
          dogIds: []
        }
    
        //update owners list and close modal
        this.setState({
          ownerList: [...this.state.ownerList, newOwner],
          modal: {
            active: ""
          }
        });

        this.createNotification("success", `New owner '${name}' has been added to the owners list`); 
      })
      .catch((error) =>
      {
        this.createNotification("error", error); 
      });
  }

  render()
  {
    //get unassigned cats and dogs to render in sidebar
    let unassignedCatList = this.state.catList.filter((cat) =>
    {
      let ownerFound = this.state.ownerList.find(owner => owner.catIds.find(ownCatId => ownCatId === cat.id));
      if (ownerFound === undefined) { //owner was NOT found > add this cat to list
        return true;
      }
      return false;
    });
    let unassignedDogList = this.state.dogList.filter((dog) =>
    {
      let ownerFound = this.state.ownerList.find(owner => owner.dogIds.find(ownDogId => ownDogId === dog.id));
      if (ownerFound === undefined) { //owner was NOT found > add this dog to list
        return true;
      }
      return false;
    });

    //if the modal is open to show the owner pets, get the owner pets from the live list 
    let modal_cats = [];
    let modal_dogs = [];
    let modal_ownerName = "";
    if (this.state.modal.active === "ownerPets") {
      let ownerIdToQuery = this.state.modal.ownerPets.ownerId;
      let modal_owner = this.state.ownerList.find(owner => owner.id === ownerIdToQuery);

      modal_ownerName = modal_owner.name;

      modal_owner.catIds.forEach((catId) =>
      {
        let catFound = this.state.catList.find(cat => cat.id === catId);
        if (catFound !== undefined) {
          modal_cats.push(catFound);
        }
      });

      modal_owner.dogIds.forEach((dogId) =>
      {
        let dogFound = this.state.dogList.find(dog => dog.id === dogId);
        if (dogFound !== undefined) {
          modal_dogs.push(dogFound);
        }
      });
    }


    return (
      <main>
        <div className={"modal" + (this.state.modal.active !== "" ? " open" : "")}>
          <div className="modal-content">
            <button className="modal-btn-close" onClick={this.onCloseModal}>Close Modal</button>

            {this.state.modal.active === "createPet" &&
              <CreatePet animal={this.state.modal.createPet.animal} onCreatePet={this.onCreatePet} />
            }

            {this.state.modal.active === "createOwner" &&
              <CreateOwner onCreateOwner={this.onCreateOwner} />
            }

            {this.state.modal.active === "ownerPets" &&
              <OwnerPets
                ownerId={this.state.modal.ownerPets.ownerId} ownerName={modal_ownerName} catList={modal_cats} dogList={modal_dogs}
                onPetRename={this.onPetRename} onPetDelete={this.onPetDelete} onRemoveOwnerPet={this.onRemoveOwnerPet} onCloseModal={this.onCloseModal}
              />
            }
          </div>
        </div>

        <section id="sidebar-left">
          <div className="sidebar-controls">
            <button onClick={this.openModal_CreatePet.bind(this, 'cat')} className="add-new-pet cat" title="Add new pet"></button>
          </div>
          <h2>Cats</h2>
          <PetList page="sidebar" animal={PetTypes.Cat} list={unassignedCatList} onDrag={this.onDrag} onPetRename={this.onPetRename} onPetDelete={this.onPetDelete} />
        </section>

        <section id="pageArea">
          <div className="sidebar-controls">
            <button onClick={this.openModal_CreateOwner.bind(this)} className="add-new-owner" title="Add new person"></button>
          </div>
          <h2>Owners</h2>
          <OwnerList ownerList={this.state.ownerList} onDrop={this.onDrop} onOwnerRename={this.onOwnerRename} onOwnerDelete={this.onOwnerDelete} onShowOwnerPets={this.onShowOwnerPets} />
        </section>

        <section id="sidebar-right">
          <div className="sidebar-controls">
            <button onClick={this.openModal_CreatePet.bind(this, 'dog')} className="add-new-pet dog" title="Add new pet"></button>
          </div>
          <h2>Dogs</h2>
          <PetList page="sidebar" animal={PetTypes.Dog} list={unassignedDogList} onDrag={this.onDrag} onPetRename={this.onPetRename} onPetDelete={this.onPetDelete} />
        </section>

        <ToastContainer closeOnClick />
      </main>
    );
  }
}