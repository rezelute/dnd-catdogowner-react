import React, { Component } from 'react'
import PropTypes from "prop-types"
import PetTypes from '../../petTypes'


export default class CatItem extends Component
{
  //onDragStart={this.onDragStart.bind(this, 100, 200)
  // onDragStart = (itemId, ItemId2, event) =>
  // {
  //   console.log("Dragging started. id: ", itemId, ItemId2, "- react event is:", event);
  //   event.dataTransfer.setData("text", event.target.id);
  // }

  promptNewPetName = (petId) =>
  {
    var newName = prompt("Please a new cat name", "");
    if (newName != null) {
      this.props.onPetRename(petId, "cat", newName);
    }
  }

  render()
  {
    const { id, name, breed, color } = this.props;

    return (
      <li id={"cat-item-" + id}>
        <div className="pet-buttons invisible">
          <button className="info" title="click for more pet information"></button>
          <button className="rename" title="rename pet" onClick={this.promptNewPetName.bind(this, id)}></button>
          <button className="delete" title="delete pet" onClick={this.props.onPetDelete.bind(this, id, PetTypes.Cat)}></button>
        </div>
        <div className="pet-draggable" draggable="true" onDrag={this.props.onDrag.bind(this, id, PetTypes.Cat)}>
          <h3 className="pet-name">{name}</h3>
          <div className="pet-attributes">
            <div><span>Breed:</span> {breed}</div>
            <div><span>Color:</span> {color}</div>
          </div>
          <span className="pet-id">{id}</span>
        </div>
      </li>
    )
  }
}


//PropTypes
CatItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired,
}