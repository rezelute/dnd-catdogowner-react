import React, { Component } from 'react'
import CatItem from "./CatItem";

export default class CatsList extends Component {
  state = {
    catsList: [
      { id: 1, name: "felix", breed: "siamese", color: "green"},
      { id: 2, name: "attenborough", breed: "normal", color: "green" },
      { id: 3, name: "attenborough", breed: "normal", color: "green" },
    ],
    draggedItem: {}
  }

  onDrag = (event, catItem) =>
  {
    //event.preventDefault();
    //console.log("Dragging now...");
    this.setState({
      draggedItem: catItem
    });
  }

  onDragStart(event)
  {
    //console.log('Dragging started, react event is:', event);
    event.dataTransfer.setData("text", event.target.id);
  }

  //load config file into state
  // componentWillMount()
  // {
  //   axios.get('/config.json').then((response) =>
  //   {
  //     let parsedData = parseJson(response.data);
  //     //console.log("parsedData", parsedData);
  //     this.setState(parsedData)
  //   })
  // }

  render()
  {
    return (
      <ul className="pet-list cats">
      {
        this.state.catsList.map( (cat,c_index)=>(
          <CatItem id={cat.id} name={cat.name} breed={cat.breed} color={cat.color} key={cat.id}
            onDragStart={this.onDragStart} onDrag={(event) => this.onDrag(event, cat)}
          />
        ))
      }
      </ul>
    )
  }
}
