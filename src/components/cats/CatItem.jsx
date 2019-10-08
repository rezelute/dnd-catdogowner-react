import React from 'react'
import PropTypes from "prop-types"


export default function CatItem(props) {
  return (
    <li draggable="true" onDragStart={props.onDragStart} onDrag={props.onDrag}>
      <h3 className="pet-name">{props.name}</h3>
      <div className="pet-attributes">
        <div><span>Breed:</span> {props.breed}</div>
        <div><span>Color:</span> {props.color}</div>
      </div>
      <span className="pet-id">{props.id}</span>
    </li>
  )
}


//PropTypes
CatItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired
}