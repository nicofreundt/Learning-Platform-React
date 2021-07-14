import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { getAllStatusForUser } from '../../resources/backend';

const Statusdaten = (props) => {
    const open = useState(false)
    return (
        <div>
            {open ?

                <div>
                    <h1>props.thema</h1>
                    <p>props.prozent</p>
                </div>
                :
                <div>props.thema</div>

            }
        </div>
    )
}

const Schuelerdaten = (props) => {
    const [status, setStatus] = useState(false)
    const [data, setData] = useState()

    const list = ["Python", "Java", "DB"]

    useEffect(() => {
        getAllStatusForUser().then(res => setData(res))
    }, [])

    return (
        <div>
            {props.name}
            {props.mail}
            {status && 
            <div>
                {list.map((thema, i) => <Statusdaten thema={thema} prozent={data[i]}/>)}
            </div>}
            <Button onClick={setStatus(!status)}>{status ? "Open" : "Close"}</Button>
        </div>
    );
}

export default Schuelerdaten;