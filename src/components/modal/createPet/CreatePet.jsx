import React, { Component } from 'react'
import PropTypes from "prop-types"

export default class CreatePet extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      animal: this.props.animal,
      name: "",
      breed: "",
      color: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onPetCreate = this.onPetCreate.bind(this);
  }


  handleChange = (event) =>
  {
    this.setState({[event.target.name]: event.target.value});
  }

  onPetCreate = (event) =>
  {
    event.preventDefault();
    this.props.onPetCreate(this.state.animal, this.state.name, this.state.breed, this.state.color);
  }

  render() {
    return (
      <section id="create-new-owner">
        <h2>Create a new pet</h2>
        
        <form action="">
          <label htmlFor="animal">Select pet</label>
          <select name="animal" onChange={this.handleChange} value={this.state.animal}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>

          <label htmlFor="name">Pet name</label>
          <input type="text" name="name" value={this.state.name} placeholder="Enter pet name" onChange={this.handleChange} />
          
          <label htmlFor="breed">Pet breed</label>
          <input type="text" name="breed" value={this.state.breed} placeholder="Enter pet breed" onChange={this.handleChange} />
          
          <label htmlFor="color">Pet color</label>
          <input type="text" name="color" value={this.state.color} placeholder="Enter pet color" onChange={this.handleChange} />

          <input type="submit" onClick={this.onPetCreate} value="Create new pet"/>
        </form>
      </section>
    )
  }
}

CreatePet.propTypes = {
  animal: PropTypes.string.isRequired,
  onPetCreate: PropTypes.func.isRequired,
}