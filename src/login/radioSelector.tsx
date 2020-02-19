import React from 'react';

interface Props {
    handleInputChange: (value: boolean, type: any)=> void,
    value: boolean,
    type: any,
    firstValue: string,
    secondValue: string
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
                        <input type="radio" style={{margin: '.5em'}} name={props.firstValue} checked={props.value === true} onChange={() => {props.handleInputChange(true, props.type)}}/>
                        {props.firstValue}
                    </label>
                    <label className="radio">
                        <input type="radio" style={{margin: '.5em'}} name={props.secondValue} checked={props.value === false} onChange={() => {props.handleInputChange(false, props.type)}}/>
                       {props.secondValue}
                    </label>
                </div>
            </div>   
        </div>
    </div>
    )

}

export default RadioSelector