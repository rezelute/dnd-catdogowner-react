//import logo from './logo.svg';
import React, {Component} from 'react';
import CatList from "./components/cats/CatList"
import DogList from "./components/dogs/DogList"
import OwnerList from "./components/owners/OwnerList"
import './style/app.scss';

export default class App extends Component
{
  
  render() {
    return (
      <main>
        <section id="sidebar-left">
          <h2>Cats</h2>
          <CatList />
        </section>
  
        <section id="pageArea">
          <h2>Owners</h2>
          <OwnerList />
        </section>
  
        <section id="sidebar-right">
          <h2>Dogs</h2>
          <DogList />
        </section>
      </main>
    );
  }
}