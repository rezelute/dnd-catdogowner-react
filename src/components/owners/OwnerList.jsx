import React, { Component } from 'react'
import OwnerItem from "./OwnerItem";
import "./owners.scss";
import PropTypes from "prop-types"


export default class OwnerList extends Component {
  render() {
    return (
      <ul id="owner-list">
        {
          this.props.ownerList.map((owner) => (
            <OwnerItem key={owner.id}
              id={owner.id} name={owner.name} attributes={owner.attributes} catIds={owner.catIds} dogIds={owner.dogIds}
              onDrop={this.props.onDrop}
              onOwnerRename={this.props.onOwnerRename} onOwnerDelete={this.props.onOwnerDelete} onShowOwnerPets={this.props.onShowOwnerPets}
            />
          ))
        }
      </ul>
    )
  }
}


//PropTypes
OwnerList.propTypes = {
  ownerList: PropTypes.array.isRequired,

  //onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onOwnerRename: PropTypes.func.isRequired,
  onOwnerDelete: PropTypes.func.isRequired,
  onShowOwnerPets: PropTypes.func.isRequired,
}