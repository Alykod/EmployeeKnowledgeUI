import React from 'react';

interface Props {
    title: string,
    handleInputChange: (value: string, type: any)=> void,
    value: string,
    type: any,
    isPassword?: boolean
}

const Field = (props: Props) => {
    return (
        <div className="columns">
            <div className="column is-10 is-offset-1">
                <div className="field">
                    <label className="label">
                        {props.title}
                    </label>
                    <div className="control is-clearfix">
                        <input type={props.isPassword? "password" : "text"} autoComplete="false" className="input is-hovered" placeholder={props.title} value={props.value} onChange={e => props.handleInputChange(e.target.value, props.type)}/>
                    </div>
                </div>   
            </div>
        </div>
    )
}


export default Field;