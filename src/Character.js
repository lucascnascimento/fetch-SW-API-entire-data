import React from 'react'

function Character(props) {
    return (
        <div>
            <h1>Your character of the day is:</h1>
            <h2>{props.character.name}</h2>
        </div>
    )
}

export default Character

