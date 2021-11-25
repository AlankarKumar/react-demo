import React from "react";
import './SelectedFilter.css'

const SelectedFilters = (props) => {
    return (
        <div className="SelectedFilter-container" >
                <h2>Selected Filters</h2>
                <div className="SelectedFilter-filters">

                {props.filters.map((filter,index) => <div className="SelectedFilter-filter" key={index}>{filter}</div>)}
                </div>
    
        </div>
    )
}

export default SelectedFilters;