import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import LoadingOverlay from 'react-loading-overlay';

import PetList from "./components/pets/PetList"
import OwnerPets from "./components/modal/ownerPets/OwnerPets"
import OwnerList from "./components/owners/OwnerList"
import CreatePet from "./components/modal/createPet/CreatePet"
import CreateOwner from "./components/modal/createOwner/CreateOwner"

import * as ApiAuth from "./api/auth-api"
import * as ApiPage from "./api/page-api"
import * as ApiOwner from "./api/owner-api"
import * as ApiPet from "./api/pet-api"

import PetTypes from './js/petTypes'
//import UUID from 'uuid'

import './style/app.scss'


export default class App extends Component
{
  state = {
    showLoadingOverlay: false, //overlay when stuff is loading
    catList: [], //{ id: 0, name: "", ownerId: 1, attributes: { breed: "", color: "" } },
    dogList: [], //{ id: 0, name: "", ownerId: 1, attributes: { breed: "", color: "" } },
    ownerList: [], //{ id: 0, name: "", attributes: {age: -1, country: ""} , catIds: [], dogIds: [] },
    draggedItem: {
      petId: "-1",
      animal: ""
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
    ApiAuth.setAuthData()
    .then((authToken) =>
    {
      //load page data
      ApiPage.getPageData()
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
        console.log("Data load error - " + error.message);
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


  showLoadingOverlay = (show) =>
  {
    this.setState({
      showLoadingOverlay: show
    })
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
  onDrag = (petId, animal) =>
  {
    this.setState({
      draggedItem: {
        petId,
        animal
      }
    });
  }

  //on drop in one of the owners > assign the pet to the owner
  onDrop = (ownerId) =>
  {
    //another method
    //var data = event.dataTransfer.getData("text"); //console.log("Data id is: ", data);
    const { petId, animal } = JSON.parse(JSON.stringify(this.state.draggedItem));
    console.log("Pet dropped - ID: ", petId, " Animal: ", animal);
    console.log("Dropped on owner ID: ", ownerId);

    this.showLoadingOverlay(true);

    //find owner item to be updated
    let updOwnerList = [...this.state.ownerList];
    let updOwner = updOwnerList.find(owner => owner.id === ownerId);

    //find pet item to be updated
    let updPetList;
    let updPet;
    if (animal === PetTypes.Cat) {
      updPetList = [...this.state.catList];
      updPet = updPetList.find(cat => cat.id === petId);
    }
    else if (animal === PetTypes.Dog) {
      updPetList = [...this.state.dogList];
      updPet = updPetList.find(dog => dog.id === petId);
    }


    if (updOwner !== undefined && updPet !== undefined) {
      ApiOwner.allocatePet(petId, animal, ownerId)
      .then((resp_petId, resp_ownerId) =>
      {
        //assign petid to the owner cat/dog ids list
        if (animal === PetTypes.Cat) {
          updOwner.catIds.push(petId);
        }
        else if (animal === PetTypes.Dog) {
          updOwner.dogIds.push(petId);
        }
        //update owner state
        this.setState({
          ownerList: updOwnerList
        });

        //assign ownerid to pet list
        updPet.ownerId = ownerId;
        if (animal === PetTypes.Cat) {
          this.setState({
            catList: updPetList
          });
        }
        else if (animal === PetTypes.Dog) {
          this.setState({
            dogList: updPetList
          });
        }

        this.createNotification("success", `Owner ${updOwner.name} has been allocated ${animal} '${updPet.name}'`);
        this.showLoadingOverlay(false);
      })
      .catch((error) =>
      {
        this.createNotification("error", error.message);
        this.showLoadingOverlay(false);
      });
    }
  }

  //create new pet
  onPetCreate = (animal, name, breed, color) =>
  {
    this.showLoadingOverlay(true);

    ApiPet.createPet(name, animal)
    .then((newPetId) =>
    {
      let newPet = {
        id: newPetId, //UUID.v4()
        name,
        ownerId: -1,
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
      this.showLoadingOverlay(false);
    })
    .catch((error) =>
    {
      this.createNotification("error", error);
      this.showLoadingOverlay(false);
    });
  }

  //handles pet renames
  onPetRename = (petId, animal, newName) =>
  {
    this.showLoadingOverlay(true);

    console.log("Pet name to change - ID: ", petId, ", animal: ", animal, ", new name: ", newName);

    //find pet item to be updated
    let updPetList;
    let updPet;
    if (animal === PetTypes.Cat) {
      updPetList = [...this.state.catList];
      updPet = updPetList.find(cat => cat.id === petId);
    }
    else if (animal === PetTypes.Dog) {
      updPetList = [...this.state.dogList];
      updPet = updPetList.find(dog => dog.id === petId);
    }

    if (updPet !== undefined) {
      ApiPet.renamePet(petId, newName, animal, updPet.ownerId)
      .then((resp_newName) =>
      {
        let oldPetName = updPet.name;
        updPet.name = resp_newName; //update new name for state

        //update state
        if (animal === PetTypes.Cat) {
          this.setState({
            catList: updPetList
          });
        }
        else if (animal === PetTypes.Dog) {
          this.setState({
            dogList: updPetList
          });
        }

        this.createNotification("success", `Pet '${oldPetName}' has been renamed to: '${resp_newName}'`);
        this.showLoadingOverlay(false);
      })
      .catch((error) =>
      {
        this.createNotification("error", error.message);
        this.showLoadingOverlay(false);
      });
    }

    

    if (animal === PetTypes.Cat) {
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
    else if (animal === PetTypes.Dog) {
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
  onPetDelete = (delPetId, animal) =>
  {
    this.showLoadingOverlay(true);

    let updPetList;
    let updPet;
    if (animal === PetTypes.Cat) {
      updPetList = [...this.state.catList];
      updPet = updPetList.find(cat => cat.id === delPetId);
    }
    else if (animal === PetTypes.Dog) {
      updPetList = [...this.state.dogList];
      updPet = updPetList.find(dog => dog.id === delPetId);
    }

    if (updPet !== undefined) {
      ApiPet.deletePet(delPetId, animal)
      .then((deletedId) =>
      {
        const delPetName = updPet.name;
        
        //update state
        if (animal === PetTypes.Cat) {
          //update state
          this.setState({
            catList: this.state.catList.filter(cat => cat.id !== delPetId)
          });
        }
        else if (animal === PetTypes.Dog) {
          //update state
          this.setState({
            dogList: this.state.dogList.filter(dog => dog.id !== delPetId)
          });
        }
  
        this.createNotification("success", `Pet '${delPetName}' (id: ${deletedId}) has been deleted`);
        this.showLoadingOverlay(false);
      })
      .catch((error) =>
      {
        this.createNotification("error", error.message);
        this.showLoadingOverlay(false);
      });
    }


    //console.log("Pet delete - ID: ", delPetId, ", animal: ", delAnimal);

    
  }

  //create new owner
  onCreateOwner = (name, country, age) =>
  {
    this.showLoadingOverlay(true);

    ApiOwner.createOwner(name)
    .then((newOwnerId) =>
    {
      let newOwner = {
        id: newOwnerId,
        name,
        attributes: {
          country,
          age
        },
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
      this.showLoadingOverlay(false);
    })
    .catch((error) =>
    {
      this.createNotification("error", error);
      this.showLoadingOverlay(false);
    });
  }

  //handle owner deletions
  onOwnerDelete = (delOwnerId) =>
  {
    this.showLoadingOverlay(true);

    let owner = this.state.ownerList.find(owner => owner.id === delOwnerId);
    if (owner !== undefined) {
      ApiOwner.deleteOwner(delOwnerId)
      .then((deletedId) =>
      {
        const delOwnerName = owner.name;

        //update state
        this.setState({
          ownerList: this.state.ownerList.filter(owner => owner.id !== delOwnerId)
        });
  
        this.createNotification("success", `Owner '${delOwnerName}' (id: ${deletedId}) has been deleted`);
        this.showLoadingOverlay(false);
      })
      .catch((error) =>
      {
        this.createNotification("error", error.message);
        this.showLoadingOverlay(false);
      });
    }
  }

  //handle owner rename
  onOwnerRename = (ownerId, newName) =>
  {
    this.showLoadingOverlay(true);

    let updList = [...this.state.ownerList];
    let updOwner = updList.find(owner => owner.id === ownerId);

    if (updOwner !== undefined) {
      ApiOwner.renameOwner(ownerId, newName, updOwner.catIds, updOwner.dogIds)
      .then((resp_newName) =>
      {
        let oldOwnerName = updOwner.name;
        updOwner.name = resp_newName; //update new name for state

        //update state
        this.setState({
          ownerList: updList
        });

        this.createNotification("success", `Owner '${oldOwnerName}' has been renamed to: '${resp_newName}'`);
        this.showLoadingOverlay(false);
      })
      .catch((error) =>
      {
        this.createNotification("error", error.message);
        this.showLoadingOverlay(false);
      });
    }
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
  onRemoveOwnerPet = (ownerId, petId, animal) =>
  {
    console.log("Remove pet ID: ", petId, ", animal: ", animal, " - from owner id: ", ownerId);

    let updOwnerList = [...this.state.ownerList];
    let updOwner = updOwnerList.find(owner => owner.id === ownerId);
    if (updOwner === undefined) {
      this.createNotification("error", `Could not find owner to remove pet from, owner ID: ${ownerId}`);
      return;
    }

    if (animal === PetTypes.Cat) {
      updOwner.catIds = updOwner.catIds.filter(catId => catId !== petId);
    }
    else if (animal === PetTypes.Dog) {
      updOwner.dogIds = updOwner.dogIds.filter(dogId => dogId !== petId);
    }

    //update owner state
    this.setState({
      ownerList: updOwnerList
    });

    // //update showOwnerPets modal state
    // let updShowOwnerPets = JSON.parse(JSON.stringify(this.state.showOwnerPets));
    // if (animal === PetTypes.Cat) {
    //   updShowOwnerPets.catList = updShowOwnerPets.catList.filter(cat => cat.id !== petId);
    // }
    // else if (animal === PetTypes.Dog) {
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
              <CreatePet animal={this.state.modal.createPet.animal} onPetCreate={this.onPetCreate} />
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
        <LoadingOverlay active={this.state.showLoadingOverlay} spinner text='Loading ...'></LoadingOverlay>
      </main>
    );
  }
}