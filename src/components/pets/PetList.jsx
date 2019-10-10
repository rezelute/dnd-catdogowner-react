import React, {Component} from 'react'
import PetItem from "./PetItem";
import PropTypes from "prop-types"


export default class PetList extends Component {
  render()
  {
    return (
      <ul className={"pet-list " + this.props.page + " " + this.props.animal}>
      {
        this.props.list.map((pet, index) => (
          <PetItem
            animal={this.props.animal} id={pet.id} name={pet.name} attributes={pet.attributes} page={this.props.page} key={pet.id}
            onDrag={this.props.onDrag}
            onPetRename={this.props.onPetRename} onPetDelete={this.props.onPetDelete}
            onRemoveOwnerPet={this.props.onRemoveOwnerPet}
          />
        ))
      }
      </ul>
    )
  }
}

//PropTypes
PetList.propTypes = {
  list: PropTypes.array.isRequired,
  page: PropTypes.string.isRequired,
  animal: PropTypes.string.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func, //drag only allowed in sidebar
  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired,
  onRemoveOwnerPet: PropTypes.func //only shows if page is the owner modal
}