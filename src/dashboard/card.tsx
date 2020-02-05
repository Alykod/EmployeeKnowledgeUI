import React from 'react';
import StarsBar from './starsBar'
interface UserProps {
    _id: String,
    user: User,
 
}

interface Props {
    user: User,
    selectedSkill?: String | null
}

interface User {
    firstName: String,
    lastName: String,
    email: String
    skills: Skill[];
}
interface SubSkill {
    name: String
}
interface Skill {
    skill: SubSkill,
    level: number
}


const UserCard = (props:Props) => {
    const { user} = props;
    const selectedSkill= props.selectedSkill;


    const handleSelectedSkill = () => {
        const skillSelected = user.skills.find(skill => skill && skill.skill.name === selectedSkill);
        if(skillSelected){
            return (
            <StarsBar name={skillSelected.skill.name} filled={skillSelected.level}/>
        )
    } else return null;
    }

    return (
        <div className="card cardSmall">
             <div className="card-header">
                <p className="card-header-title is-centered is-size-4">{user.firstName} {user.lastName}</p>
                </div>
            <div className="card-content"> 
                <p>{user.email}</p>
            </div>
            {selectedSkill && <div className="card-footer columns is-centered">
                {handleSelectedSkill()}
            </div>}
        </div>
    )

}
export default UserCard