import React from 'react'
import CatItem from "./CatItem";
import PropTypes from "prop-types"


export default function CatList(props) {
  return (
    <ul className="pet-list cats">
    {
      props.list.map((cat, c_index) => (
        (!cat.hasOwner &&
          <CatItem
            id={cat.id} name={cat.name} breed={cat.breed} color={cat.color} key={cat.id}
            onDrag={props.onDrag.bind(this, cat.id, "cat")}
          />
        )
      ))
    }
    </ul>
  )
}

//PropTypes
CatList.propTypes = {
  list: PropTypes.array.isRequired,

  //onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired
}