import React, { Component } from 'react'
import PropTypes from "prop-types"

export default class PetItem extends Component
{
  state = {
    hover: false
  }

  onHoverToggle = (hoverState) =>
  {
    this.setState({
      hover: hoverState
    });
  }

  //onDragStart={this.onDragStart.bind(this, 100, 200)
  onDragStart = (event) =>
  {
    //hide the controls on drag
    this.setState({
      hover: false
    });

    //console.log("Dragging started. id: ", itemId, ItemId2, "- react event is:", event);
    //firefox fix to drag
    event.dataTransfer.setData("text/html", event.target.outerHTML);
  }

  promptNewPetName = (petId, oldPetName) =>
  {
    var newName = prompt(`Please enter a new ${this.props.animal} name for '${oldPetName}'`, "");
    if (newName != null) {
      this.props.onPetRename(petId, this.props.animal, newName);
    }
  }

  render()
  {
    const { id, animal, ownerId, name, attributes, page } = this.props;

    return (
      <li data-owner-id={ownerId} data-pet-id={id} className={"pet-draggable" + (this.state.hover ? " isHover" : "")}
        draggable={page === "sidebar" ? true : false}
        onDragStart = {this.onDragStart}
        onDrag={page === "sidebar" ? this.props.onDrag.bind(this, id, animal) : () => { return false }}
        onMouseEnter={this.onHoverToggle.bind(this, true)} onMouseLeave={this.onHoverToggle.bind(this, false)}
      >
        <div>
          <div className={"pet-buttons invisible"}>
            <button className="info" title="click for more pet information"></button>
            <button className="rename" title="rename pet" onClick={this.promptNewPetName.bind(this, id, name)}></button>
            <button className="delete" title="delete pet" onClick={this.props.onPetDelete.bind(this, id, animal)}></button>
          </div>

          <div>
            <h3 className="pet-name">{name}</h3>
            <div>
              <div className="pet-attributes">
                {
                  Object.entries(attributes).map(([key, value], index) =>
                  (
                    <div key={index}><span>{key}:</span> {value}</div>
                  ))
                }
              </div>
              <div className="pet-id">{id}</div>
            </div>
            
          </div>
  
          {page === "owner" &&
            <div className="remove-owner-pet">
              <button className="normal" onClick={this.props.onRemoveOwnerPet.bind(this, id, animal)}>Remove from owner</button>
            </div>
          }
        </div>
      </li>
    )
  }
}


//PropTypes
PetItem.propTypes = {
  page: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  ownerId: PropTypes.number,
  animal: PropTypes.string.isRequired, //is cat, dog etc.
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired, //breed, colour, etc
  //breed: PropTypes.string.isRequired,
  //color: PropTypes.string.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func, //drag only allowed in sidebar
  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired,
  onRemoveOwnerPet: PropTypes.func, //only shows if page is the owner modal
}