import React, { Component } from 'react'
//import PetItem from "../pets/PetItem";
import PetList from "../pets/PetList";
import PetTypes from '../../petTypes'
import PropTypes from "prop-types"
import './ownerModal.scss';

export default class OwnerModal extends Component
{

  onRemoveOwnerPet = (petId, animal) =>
  {
    //add the owner Id and pass back up to App to handle removal
    this.props.onRemoveOwnerPet(this.props.ownerId, petId, animal);
  }

  render()
  {
    const { open, ownerId, ownerName, catList, dogList } = this.props;

    return (
      <section id="owner-pets-modal" className={open ? "open" : ""}>
        <div id="owner-pets-modal-content">
          <button id="owner-pets-modal-close" onClick={this.props.onCloseModal}>Close Modal</button>
          <h2>Pets list for owner: {ownerName} (Id: {ownerId})</h2>

          <section id="owner-pets-cats">
            <h3>Owner cat(s)</h3>
            {catList.length > 0 &&
              <PetList page="owner" animal={PetTypes.Cat} list={catList}
                onPetRename={this.props.onPetRename} onPetDelete={this.props.onPetDelete}
                onRemoveOwnerPet={this.onRemoveOwnerPet}
              />
            }
            {catList.length === 0 &&
              <p>This owner has not been allocated any cats yet.</p>
            }
          </section>

          <section id="owner-pets-dogs">
            <h3>Owner dog(s)</h3>
            {dogList.length > 0 &&
              <PetList page="owner" animal={PetTypes.Dog} list={dogList}
                onPetRename={this.props.onPetRename} onPetDelete={this.props.onPetDelete}
                onRemoveOwnerPet={this.onRemoveOwnerPet}
              />
            }
            {dogList.length === 0 &&
              <p>This owner has not been allocated any dogs yet.</p>
            }
          </section>


        </div>
      </section>
    )
  }
}


//PropTypes
OwnerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  ownerId: PropTypes.number.isRequired,
  ownerName: PropTypes.string.isRequired,
  catList: PropTypes.array.isRequired,
  dogList: PropTypes.array.isRequired,

  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired,
  onRemoveOwnerPet: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}