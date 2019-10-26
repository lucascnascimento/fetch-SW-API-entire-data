import React, { Component } from 'react'
import Character from "./Character"
import axios from "axios"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      currentCharacter: null,
      isLoading: true
    };
    this.pickUpRandomCharacter = this.pickUpRandomCharacter.bind(this);
  }

  //Get characters and update the state
  componentDidMount(){
    const URL = "https://swapi.co/api/people/";
    new Promise((resolve, reject) => {
      this.getCharacters(URL, [], resolve, reject)
    })
    .then(response => {
      this.setState(
        {
          characters: response,
          isLoading: false
        }
      )
    })
  }

  //Get all characters from Star Wars API
  getCharacters = (url, characters, resolve, reject) => {
    axios.get(url)
    .then(response => {
      const retrievedCharacters = characters.concat(response.data.results)
      if(response.data.next !== null){
        this.getCharacters(response.data.next, retrievedCharacters, resolve, reject)
      }
      else{
        resolve(retrievedCharacters)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
  }

  //Pick up a random character from the app state
  pickUpRandomCharacter() {
      let num = Math.floor(Math.random() * this.state.characters.length)
      this.setState({currentCharacter: this.state.characters[num]})
  }

  render() {
    // Conditional rendering logic for choose button display
    const isLoading = this.state.isLoading;
    let btnChoose;
    if(isLoading){
      btnChoose = <h1>Loading...</h1>
    }
    else{
      btnChoose = <button onClick={this.pickUpRandomCharacter}>Choose your Star Wars character of the Day</button>
    }

    // Conditional redenring logic for character display
    const currentCharacterState = this.state.currentCharacter;
    let currentCharacter;
    if(currentCharacterState !== null){
      currentCharacter = <div>
        <Character character={this.state.currentCharacter}/>
        <button onClick={this.pickUpRandomCharacter}>Oh snap! I don't want this character, let me choose another one</button>
      </div>
    }
    
    return (
      <div>
        {btnChoose}
        {currentCharacter}
      </div>
    )
  }
}



