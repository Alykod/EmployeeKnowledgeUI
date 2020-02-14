import React from 'react';

interface Props {
    handleInputChange: (value: boolean, type: any)=> void,
    value: boolean,
    type: any
}

const RadioSelector = (props: Props) => {
    return (
        <div className="columns">
        <div className="column is-10 is-offset-1">
            <div className="field">
                <label className="label">
                    Employment Status
                </label>
                <div className="control">
                    <label className="radio">
                        <input type="radio" style={{margin: '.5em'}} name="employmentStatus" checked={props.value === true} onChange={() => {props.handleInputChange(true, props.type)}}/>
                        Full Time
                    </label>
                    <label className="radio">
                        <input type="radio" style={{margin: '.5em'}}name="employmentStatus" checked={props.value === false} onChange={() => {props.handleInputChange(false, props.type)}}/>
                        Contractor
                    </label>
                </div>
            </div>   
        </div>
    </div>
    )

}

export default RadioSelector