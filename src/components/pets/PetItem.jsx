import React, { Component } from 'react'
import PropTypes from "prop-types"

export default class PetItem extends Component
{
  //onDragStart={this.onDragStart.bind(this, 100, 200)
  // onDragStart = (itemId, ItemId2, event) =>
  // {
  //   console.log("Dragging started. id: ", itemId, ItemId2, "- react event is:", event);
  //   event.dataTransfer.setData("text", event.target.id);
  // }

  promptNewPetName = (petId, oldPetName) =>
  {
    var newName = prompt(`Please enter a new ${this.props.animal} name for '${oldPetName}'`, "");
    if (newName != null) {
      this.props.onPetRename(petId, this.props.animal, newName);
    }
  }

  render()
  {
    const { id, animal, name, attributes } = this.props;

    return (
      <li>
        <div className="pet-buttons invisible">
          <button className="info" title="click for more pet information"></button>
          <button className="rename" title="rename pet" onClick={this.promptNewPetName.bind(this, id, name)}></button>
          <button className="delete" title="delete pet" onClick={this.props.onPetDelete.bind(this, id, animal)}></button>
        </div>
        <div className="pet-draggable" draggable="true" onDrag={this.props.onDrag.bind(this, id, animal)}>
          <h3 className="pet-name">{name}</h3>
          <div className="pet-attributes">
            {
              Object.entries(attributes).map(([key, value], index) =>
              (
                <div key={index}><span>{key}:</span> {value}</div>
              ))
            }
          </div>
          <span className="pet-id">{id}</span>
        </div>
      </li>
    )
  }
}


//PropTypes
PetItem.propTypes = {
  id: PropTypes.number.isRequired,
  animal: PropTypes.string.isRequired, //is cat, dog etc.
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired, //breed, colour, etc
  //breed: PropTypes.string.isRequired,
  //color: PropTypes.string.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired,
}