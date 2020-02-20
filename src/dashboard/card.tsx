import React from 'react';
import StarsBar from './starsBar'
import _ from 'lodash';

interface UserProps {
    _id: String,
    user: User,
 
}

interface Props {
    user: User,
    selectedSkill: any, 
    handleUserSelected(user: User): void
}

interface User {
    firstName: String,
    lastName: String,
    email: String
    skills: Skill[];
    // country: string
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
        let userSkills = user.skills.map((skill: Skill) => skill.skill.name);
        return user.skills.map((skillValue: Skill) => {
           return selectedSkill.includes(skillValue.skill.name) ?  <div className="row is-full"><StarsBar isDark={true} name={skillValue.skill.name} filled={skillValue.level}/></div>: null
        })
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
            <div className="card-content rows">
                <div className="row columns"> 
              <div className="column rows">
                <p>{user.email}</p>
                    <p>{user.city} {user.state}</p>
              </div>    
              <div className="column">
              <p>{user.fullTimeEmployee ? "Full Time": "Contractor"}</p>
                </div>         
                </div>
            {selectedSkill.length > 0 && <div className="row">
                {handleSelectedSkill()}
            </div>}
            </div>
            {/* </a> */}
        </div>
        </div>
    )

}
export default UserCard