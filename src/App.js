//import logo from './logo.svg';
import React, { Component } from 'react';
// import CatList from "./components/cats/CatList"
// import DogList from "./components/dogs/DogList"
import PetList from "./components/pets/PetList"
import OwnerModal from "./components/ownerModal/OwnerModal"
import OwnerList from "./components/owners/OwnerList"
import AppData from "./js/appData"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PetTypes from './petTypes'
import './style/app.scss';

export default class App extends Component
{
  state = {
    catList: [
      { id: 0, name: "", attributes: { breed: "", color: "" } },
    ],
    dogList: [
      { id: 0, name: "", attributes: { breed: "", color: "" } },
    ],
    ownerList: [
      { id: 0, name: "", age: -1, country: "", catIds: [], dogIds: [] },
    ],
    draggedItem: {
      petId: -1,
      petType: ""
    },
    showOwnerPets: {
      open: false,
      ownerId: 0,
      ownerName: "",
      catList: [],
      dogList: []
    }
  };

  componentDidMount()
  {
    this.setState(AppData.getData());
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
    const { petId, petType } = { ...this.state.draggedItem };

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

  //show owner pets in a modal
  onShowOwnerPets = (ownerId) =>
  {
    let ownerCats = [];
    let ownerDogs = [];

    let ownerItem = this.state.ownerList.find(owner => owner.id === ownerId);
    if (ownerItem === undefined) {
      this.createNotification("error", `Could not find owner to get the pets, owner ID: ${ownerId}`);
      return;
    }

    ownerItem.catIds.forEach((catId) =>
    {
      let catFound = this.state.catList.find(cat => cat.id === catId);
      console.log("catfound: ", catFound);
      if (catFound !== undefined) {
        ownerCats.push(catFound);
      }
    })
    ownerItem.dogIds.forEach((dogId) =>
    {
      let dogFound = this.state.dogList.find(dog => dog.id === dogId);
      if (dogFound !== undefined) {
        ownerDogs.push(dogFound);
      }
    })

    //update state
    this.setState({
      showOwnerPets: {
        open: true,
        ownerId: ownerItem.id,
        ownerName: ownerItem.name,
        catList: ownerCats,
        dogList: ownerDogs
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

    //update showOwnerPets modal state
    let updShowOwnerPets = JSON.parse(JSON.stringify(this.state.showOwnerPets));
    if (petType === PetTypes.Cat) {
      updShowOwnerPets.catList = updShowOwnerPets.catList.filter(cat => cat.id !== petId);
    }
    else if (petType === PetTypes.Dog) {
      updShowOwnerPets.dogList = updShowOwnerPets.dogList.filter(dog => dog.id !== petId);
    }

    this.setState({
      showOwnerPets: updShowOwnerPets
    });
  }

  //pet owner modal closed
  onCloseModal = () =>
  {
    this.setState({
      showOwnerPets: {
        open: false,
        ownerId: -1,
        ownerName: "",
        catList: [],
        dogList: []
      }
    })
  }

  render()
  {
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

    return (
      <main>
        <OwnerModal
          open={this.state.showOwnerPets.open} ownerId={this.state.showOwnerPets.ownerId} ownerName={this.state.showOwnerPets.ownerName} catList={this.state.showOwnerPets.catList} dogList={this.state.showOwnerPets.dogList}
          onPetRename={this.onPetRename} onPetDelete={this.onPetDelete} onRemoveOwnerPet={this.onRemoveOwnerPet} onCloseModal={this.onCloseModal}
        />
        <ToastContainer closeOnClick />

        <section id="sidebar-left">
          <h2>Cats</h2>
          <PetList page="sidebar" animal={PetTypes.Cat} list={unassignedCatList} onDrag={this.onDrag} onPetRename={this.onPetRename} onPetDelete={this.onPetDelete} />
        </section>

        <section id="pageArea">
          <h2>Owners</h2>
          <OwnerList ownerList={this.state.ownerList} onDrop={this.onDrop} onOwnerRename={this.onOwnerRename} onOwnerDelete={this.onOwnerDelete} onShowOwnerPets={this.onShowOwnerPets} />
        </section>

        <section id="sidebar-right">
          <h2>Dogs</h2>
          <PetList page="sidebar" animal={PetTypes.Dog} list={unassignedDogList} onDrag={this.onDrag} onPetRename={this.onPetRename} onPetDelete={this.onPetDelete} />
        </section>

      </main>
    );
  }
}