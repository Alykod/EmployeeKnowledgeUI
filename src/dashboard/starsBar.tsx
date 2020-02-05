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
            <div className="skillStarBar is-flexed">
                 <p className="is-size-4">{props.name} : {handleStarFill(mappableStars)}</p> 
            </div>
        )
    }

    return (handleStarBar())

}

export default StarBar