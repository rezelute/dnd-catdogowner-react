import React, { Component } from 'react'
import PropTypes from "prop-types"


export default class OwnerItem extends Component
{
  state = {
    isDragOver:false
  }

  //item drag over entered this box > highlight box
  onDragOver = (event) =>
  {
    event.preventDefault();
    
    this.setState({
      isDragOver: true
    });
  }
  //item drag over left this box > unhighlight box
  onDragLeave = (event) =>
  {
    event.preventDefault();
    
    this.setState({
      isDragOver: false
    });
  }

  //ondrop of item in the box > prevent default (default is redirect) then pass up to parent
  onDrop = (ownerId) => {
    //event.preventDefault();

    //remove highlight
    this.setState({
      isDragOver: false
    });

    console.log("ownerId ", ownerId);
    this.props.onDrop(ownerId);
  }

  promptNewOwnerName = (ownerId, oldName) =>
  {
    var newName = prompt(`Please enter a new name for owner: '${oldName}'`, "");
    if (newName != null) {
      this.props.onOwnerRename(ownerId, newName);
    }
  }

  render()
  {
    const { id, name, attributes, catIds, dogIds } = this.props;

    return (
      <li>
        <div className={(this.state.isDragOver ? "dragOver" : "")} onDrop={this.onDrop.bind(this,id)} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}>
          
          <div className="owner-buttons invisible">
            <button className="info" title="click for more owner information"></button>
            <button className="rename" title="rename owner" onClick={this.promptNewOwnerName.bind(this, id, name)}></button>
            <button className="delete" title="delete owner" onClick={this.props.onOwnerDelete.bind(this, id)}></button>
          </div>

          <div className="owner-attributes">
            <h3 className="owner-name">{name}</h3>

            <div className="owner-attributes">
              {
                Object.entries(attributes).map(([key, value], index) =>
                (
                  <div key={index}><span className="label">{key}:</span> {value}</div>
                ))
              }
            </div>
          </div>

          <div className="owner-pets-count">
            <div><span className="label">Cat count:</span> {catIds.length}</div>
            <div><span className="label">Dog count:</span> {dogIds.length}</div>
          </div>

          <span className="owner-id">{id}</span>

          <div className="owner-show-pets">
            <button className="normal" onClick={this.props.onShowOwnerPets.bind(this, id)}>Show pets</button>
          </div>

        </div>
      </li>
    )
  }
}

//PropTypes
OwnerItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired, //{age: <string>, country: <string>}
  catIds: PropTypes.array.isRequired,
  dogIds: PropTypes.array.isRequired,

  onDrop: PropTypes.func.isRequired,
  onOwnerRename: PropTypes.func.isRequired,
  onOwnerDelete: PropTypes.func.isRequired,
  onShowOwnerPets: PropTypes.func.isRequired,
  //onDragOver: PropTypes.func.isRequired,
}