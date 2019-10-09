import React from 'react'
import DogItem from "./DogItem";
import PropTypes from "prop-types"


export default function DogList(props) {
  return (
    <ul className="pet-list dogs">
    {
      props.list.map((dog, index) => (
        (!dog.hasOwner &&
          <DogItem
            id={dog.id} name={dog.name} breed={dog.breed} color={dog.color} key={dog.id}
            onDrag={props.onDrag.bind(this, dog.id, "dog")}
          />
        )
      ))
    }
    </ul>
  )
}

//PropTypes
DogList.propTypes = {
  list: PropTypes.array.isRequired,

  onDrag: PropTypes.func.isRequired
}