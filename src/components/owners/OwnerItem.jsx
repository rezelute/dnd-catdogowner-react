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
  onDrop = (event) => {
    event.preventDefault();

    //remove highlight
    this.setState({
      isDragOver: false
    });

    this.props.onDrop();
  }

  promptNewOwnerName = (ownerId, oldName) =>
  {
    var newName = prompt(`Please enter a new name for '${oldName}'`, "");
    if (newName != null) {
      this.props.onOwnerRename(ownerId, newName);
    }
  }

  render()
  {
    const { id, name, country, age, catIds, dogIds } = this.props;

    return (
      <li>
        <div className={(this.state.isDragOver ? "dragOver" : "")} onDrop={this.props.onDrop.bind(this,id)} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}>
          <div className="owner-attributes">
            <h3 className="owner-name">{name}</h3>
            <div><span>Age:</span> {age}</div>
            <div><span>Country:</span> {country}</div>
          </div>
          <div className="owner-pets">
            <div><span>Cat count:</span> {catIds.length}</div>
            <div><span>Dog count:</span> {dogIds.length}</div>
          </div>
          <span className="owner-id">{id}</span>
        </div>
      </li>
    )
  }
}

//PropTypes
OwnerItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  catIds: PropTypes.array.isRequired,
  dogIds: PropTypes.array.isRequired,

  onDrop: PropTypes.func.isRequired,
  onOwnerRename: PropTypes.func.isRequired,
  onOwnerDelete: PropTypes.func.isRequired,
  onShowOwnerPets: PropTypes.func.isRequired,
  //onDragOver: PropTypes.func.isRequired,
}