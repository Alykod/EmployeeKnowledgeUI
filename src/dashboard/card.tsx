import React from 'react';
import StarsBar from './starsBar'
interface UserProps {
    _id: String,
    user: User,
 
}

interface Props {
    user: User,
    selectedSkill?: String | null,
    handleUserSelected(user: User): void
}

interface User {
    firstName: String,
    lastName: String,
    email: String
    skills: Skill[];
    country: string
    city: string
    state: string
    fullTimeEmployee: boolean
    available: boolean

}
interface SubSkill {
    name: String
}
interface Skill {
    skill: SubSkill,
    level: number,
    interest: number
}


const UserCard = (props:Props) => {
    const { user} = props;
    const selectedSkill= props.selectedSkill;


    const handleSelectedSkill = () => {
        const skillSelected = user.skills.find(skill => skill && skill.skill.name === selectedSkill);
        if(skillSelected){
            return (<StarsBar isDark={true} name={skillSelected.skill.name} filled={skillSelected.level}/>)
    } else return null;
    }

    return (
        <div className="cardOuter">
        <div className="cardSmall" onClick={(e) => {
            e.preventDefault();
            props.handleUserSelected(props.user)}}>
                    {/* <a href={`UserCard${user.firstName}${user.lastName}`} onClick={(e) => {
                        e.preventDefault();
                        props.handleUserSelected(props.user)}}> */}
             <div className="card-header">
                <p className="card-header-title is-centered is-size-4">{user.firstName} {user.lastName}</p>
                </div>
            <div className="card-content columns"> 
              <div className="column rows">
                <p>{user.email}</p>
                <p>{user.state} {user.country}</p>
              </div>    
              <div className="column">
              <p>{user.fullTimeEmployee ? "Full Time": "Contractor"}</p>
                </div>         
            </div>
            {selectedSkill && <div className="card-footer is-flexed has-text-black" style={{justifyContent: "center"}}>
                {handleSelectedSkill()}
            </div>}
            {/* </a> */}
        </div>
        </div>
    )

}
export default UserCard