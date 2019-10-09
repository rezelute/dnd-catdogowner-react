import React, {Component} from 'react'
import CatItem from "./CatItem";
import PropTypes from "prop-types"


export default class CatList extends Component {
  render()
  {
    return (
      <ul className="pet-list cats">
      {
        this.props.list.map((cat, index) => (
          (!cat.hasOwner &&
            <CatItem
              id={cat.id} name={cat.name} breed={cat.breed} color={cat.color} key={cat.id}
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
CatList.propTypes = {
  list: PropTypes.array.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onPetRename: PropTypes.func.isRequired,
  onPetDelete: PropTypes.func.isRequired
}