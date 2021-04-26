import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const SearchBar = (props) => {
    const [isSearching, setIsSearching] = useState(false);

    const inputChange = (value) => {
        props.onChange(value);
        if (value === "") {
            setIsSearching(!isSearching);
        }
    }

    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem", borderRadius: "50px"};
    return (
        <div>
            {isSearching ?
                <input
                    style={BarStyling}
                    key="random1"
                    value={props.input}
                    placeholder={"search tasks"}
                    onChange={(e) => inputChange(e.target.value)}
                />
                :
                <Button data-testid="enableSearching" onClick={() => setIsSearching(!isSearching)}>
                    <Search />
                </Button>
            }
        </div>
    );
}

export default SearchBar;