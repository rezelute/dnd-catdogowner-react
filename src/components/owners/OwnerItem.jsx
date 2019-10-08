import React, { Component } from 'react'
import PropTypes from "prop-types"


export default class OwnerItem extends Component {
  render()
  {
    const { id, name, country, age, catCount, dogCount } = this.props;

    return (
      <li onDrop={this.props.onDrop} onDragOver={this.props.onDragOver} >
        <div>
          <div className="owner-attributes">
            <h3 className="owner-name">{name}</h3>
            <div><span>Age:</span> {age}</div>
            <div><span>Country:</span> {country}</div>
          </div>
          <div className="owner-pets">
            <div><span>Cat count:</span> {catCount}</div>
            <div><span>Dog count:</span> {dogCount}</div>
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
  catCount: PropTypes.number.isRequired,
  dogCount: PropTypes.number.isRequired,

  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
}