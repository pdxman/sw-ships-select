import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import {Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';

export default function Ships(){
    const [ships, setShips] = useState([])
    const [shipName, setShipName] = useState("None Selected")

    useEffect(() => {
        fetch('https://swapi.dev/api/starships/?format=json')
        .then(res => res.json())
        .then(data => setShips(data.results))
    }, [])    
   
    const handleChange = (e) => {
        setShipName(e.target.value)
    }

    return(
        <div>
            <FormControl mediumWidth>
                <InputLabel id="demo-simple-select-label">Ships</InputLabel>
                <Select style={{minWidth: "15em"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Ship"
                    onChange={handleChange}
                >
                    {ships.map(ship => (
                        <MenuItem
                        key={uuid()}
                        value={ship.name}
                        >
                            {ship.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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