import React, { Component } from 'react'
import PropTypes from "prop-types"

export default class CreateOwner extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 0,
      country: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onCreateOwner = this.onCreateOwner.bind(this);
  }


  handleChange = (event) =>
  {
    this.setState({[event.target.name]: event.target.value});
  }

  onCreateOwner = (event) =>
  {
    event.preventDefault();
    this.props.onCreateOwner(this.state.name, this.state.country, Number(this.state.age));
  }

  render() {
    return (
      <section id="create-new-owner">
        <h2>Create a new owner</h2>
        
        <form action="">
          <label htmlFor="name">Owner name</label>
          <input type="text" name="name" value={this.state.name} placeholder="Enter owner name" onChange={this.handleChange} />
          
          <label htmlFor="age">Owner age</label>
          <input type="text" name="age" value={(this.state.age===0 ? "" : this.state.age)} placeholder="Enter owner age" onChange={this.handleChange} />
          
          <label htmlFor="country">Owner country</label>
          <input type="text" name="country" value={this.state.country} placeholder="Enter owner country" onChange={this.handleChange} />

          <input type="submit" onClick={this.onCreateOwner} value="Create new owner"/>
        </form>
      </section>
    )
  }
}

CreateOwner.propTypes = {
  onCreateOwner: PropTypes.func.isRequired,
}