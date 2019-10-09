import React, { Component } from 'react'
import PropTypes from "prop-types"


export default class DogItem extends Component
{
  //onDragStart={this.onDragStart.bind(this, 100, 200)
  // onDragStart = (itemId, ItemId2, event) =>
  // {
  //   console.log("Dragging started. id: ", itemId, ItemId2, "- react event is:", event);
  //   event.dataTransfer.setData("text", event.target.id);
  // }

  render()
  {
    const { id, name, breed, color } = this.props;

    return (
      <li id={"dog-item-" + id} draggable="true"
        onDrag={this.props.onDrag} //onDragStart={this.onDragStart}
      >
        <h3 className="pet-name">{name}</h3>
        <div className="pet-attributes">
          <div><span>Breed:</span> {breed}</div>
          <div><span>Color:</span> {color}</div>
        </div>
        <span className="pet-id">{id}</span>
      </li>
    )
  }
}


//PropTypes
DogItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

  onDrag: PropTypes.func.isRequired
}