import React, {Component} from 'react'
import PetItem from "./PetItem";
import PropTypes from "prop-types"


export default class PetList extends Component {
  render()
  {
    return (
      <ul className={"pet-list " + this.props.animal }>
      {
        this.props.list.map((pet, index) => (
          (!pet.hasOwner &&
            <PetItem
              animal={this.props.animal} id={pet.id} name={pet.name} attributes={pet.attributes} key={pet.id}
              onDrag={this.props.onDrag} onPetRename={this.props.onPetRename} onPetDelete={this.props.onPetDelete}
            />
          )
        ))
      }
      </ul>
    )
  }
}

//PropTypes
PetList.propTypes = {
  list: PropTypes.array.isRequired,
  animal: PropTypes.string.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired
}