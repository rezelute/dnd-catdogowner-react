import React, { Component } from 'react'
import OwnerItem from "./OwnerItem";
import "./owners.scss";

export default class OwnerList extends Component
{
  state = {
    ownerList: [
      { id: 1, name: "Hamzah", age: 16, country: "Lebanon", catCount: 0, dogCount: 0 },
      { id: 2, name: "Adam", age: 32, country: "Egypt", catCount: 0, dogCount: 0 },
      { id: 3, name: "Laura", age: 33, country: "United Kingdom", catCount: 0, dogCount: 0 },
      { id: 4, name: "Denise", age: 54, country: "United Kingdom", catCount: 0, dogCount: 0 },
      { id: 5, name: "Hassan", age: 29, country: "United Kingdom", catCount: 0, dogCount: 0 },
      { id: 6, name: "Ali", age: 59, country: "Lebanon", catCount: 0, dogCount: 0 },
    ]
  }

  onDragOver = (event) =>
  {
    //console.log("Dragging over...");
    event.preventDefault();
  }

  onDrop = (event, droppedOwnerId) =>
  {
    //another method (firefox likes this)
    // var data = event.dataTransfer.getData("text");
    // console.log("Data id is: ", data);
    //const { owners, draggedTask, todos } = this.state;

    console.log("Dropped on owner ID: ", droppedOwnerId);

    // let updOwners = owners;
    // let updOwner = updOwners.find(owner => owner.ownerId === droppedOwnerId);
    // if (updOwner !== undefined) {
    //   updOwner.tasks.push(draggedTask)
    // }

    // this.setState({
    //   owners: updOwners,
    //   todos: todos.filter(task => task.id !== draggedTask.id),
    //   draggedTask: {}, //reset dragged task
    // })

    // this.setState({
    //   completedTasks: [...completedTasks, draggedTask],
    //   todos: todos.filter(task => task.id !== draggedTask.id),
    //   draggedTask: {},
    // })

    event.preventDefault();
  }

  render()
  {
    return (
      <ul id="owner-list">
        {
          this.state.ownerList.map((owner) => (
            <OwnerItem key={owner.id}
              id={owner.id} name={owner.name} age={owner.age} country={owner.country} catCount={owner.catCount} dogCount={owner.dogCount}
              onDrop={event => this.onDrop(event, owner.id)} onDragOver={(event => this.onDragOver(event))}
            />
          ))
        }
      </ul>
    )
  }
}
