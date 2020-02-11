import React from 'react';

interface Stars {
    filled: number,
    name: String,
}



const StarBar = (props: Stars) => {


    const handleStarFill = (starInformation:any) => {
        return starInformation.map((star: any, index: any)=> {
            return (
                <span key={index} className={star.filled? "fas fa-star starFilled" : "fas fa-star starNotFilled"}>
                    <i className={star.filled? "fas fa-star starFilled" : "fas fa-star starNotFilled"}></i>
                </span>
            )
        })
    }

    const handleStarBar = () => {
        let filledNumber = props.filled;
        let numberOfStars = 5;
        let mappableStars = [];
        for(let i = 1; i <= numberOfStars; i++) {
            if(i <= filledNumber) {
                mappableStars.push({filled: true});
            } else mappableStars.push({filled: false});
        }

        return (
            <div className="skillStarBar field is-horizontal">
                <div className="field-label is-normal">
                <label className="label is-size-4 ">{props.name}:</label> 
                </div>
                 <div className="field-body is-size-4">
                 {handleStarFill(mappableStars)}
                </div>
            </div>
        )
    }

    return (handleStarBar())

}

export default StarBar