import { useState } from "react";
import './CharacterCard.css';

const CharacterCard = (props) => {

    const transformDate = () => {
        const date = new Date(props.character.created);
        const curDate = new Date(Date.now());
        return Math.round(curDate.getFullYear()-date.getFullYear());

    }


        return (
            <div className="CharacterCard-container">
            <div>
                <img src={props.character.image} alt="character"/>
            </div>
            <div className="CharacterCard-header">
            <div>
                <h3>{props.character.name}</h3>
            </div>
            <div className="CharacterCard-header-2">
                <p>ID {props.character.id} - created {transformDate()} years ago </p>
            </div>
            </div>
            <div className="CharacterCard-properties">
                <p className="CharacterCard-propoerties-labels">STATUS</p>
                <p>{props.character.status}</p>
            </div>
            <div className="CharacterCard-properties">
                <p className="CharacterCard-propoerties-labels">SPECIES</p>
                <p> {props.character.species}</p>
            </div>
            <div className="CharacterCard-properties">
                <p className="CharacterCard-propoerties-labels">GENDER</p>
                <p>{props.character.gender}</p>
            </div>
            <div className="CharacterCard-properties">
                <p className="CharacterCard-propoerties-labels">ORIGIN</p>
                <p>{props.character.origin.name}</p>
            </div>
            <div className="CharacterCard-properties">
                <p className="CharacterCard-propoerties-labels">LOCATION</p>
                <p>{props.character.location.name}</p>
            </div>
            </div>
        )
}

export default CharacterCard;