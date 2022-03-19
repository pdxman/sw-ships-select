import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'

export default function Ships(){
    const [ships, setShips] = useState([])
    const [shipName, setShipName] = useState("Placeholder Ship!")

    useEffect(() => {
        fetch('https://swapi.dev/api/starships/?format=json')
        .then(res => res.json())
        .then(data => setShips(data.results))
        console.log('the ships: ', ships)
        console.log('useEffect ran!')   
    }, [])    
   
    const handleChange = (e) => {
        setShipName(e.target.value)
        console.log("is this on?")
    }

    return(
        <div>
            <select onChange={handleChange}>
                {ships.map(ship => (
                    <option 
                        key={uuid()}
                        value={ship.name} >
                        {ship.name}
                    </option>
                ))}
            </select>
            <p><strong>Selected Ship:</strong> {shipName}</p>
           <h2>Ship Details</h2>
           {ships
            .filter(ship => ship.name === shipName)
            .map(ship => <p>
                <strong>Name:</strong> {ship.name}<br />
                <strong>Manufacturer:</strong> {ship.manufacturer}<br />
                <strong>Model:</strong> {ship.model}<br />
                <strong>Passengers:</strong> {ship.passengers}
           </p>)}
        </div>
    )
}