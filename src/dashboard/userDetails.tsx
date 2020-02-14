import React from 'react';
import StarsBar from './starsBar'
import {useQuery} from '@apollo/react-hooks'

interface UserProps {
    _id: string,
    user: User,
 
}

interface Props {
    user: User,
    selectedSkill?: string | null
}

interface User {
    firstName: string,
    lastName: string,
    email: string,
    skills: Skill[];
    country: string,
    city: string,
    state: string,
    available: boolean,
    role: string
}
interface SubSkill {
    name: string
}
interface Skill {
    skill: SubSkill,
    level: number
}


const UserDetails = (props:Props) => {
    const { user} = props;


    const handleSkillsDisplay = () => {
        if(user.skills.length === 0) {
            return (
                <p>No Skills Added <i className="fas fa-frown"></i></p>
                )
        } else {
            return <div className="column is-offset-4"> {
                user.skills.map((skill:any, index: number) => {
                return <StarsBar key={index} name={skill.skill.name}  filled={skill.level}/>
            }) }
            </div>
        }
       
    }

    return (
        <div className="container is-wide">
             <section className="hero is-primary">
                 <div className="hero-body">
                <h1 className="title">{user.firstName} {user.lastName}`s profile</h1>
                </div>
             </section>
            <div className="card-content"> 
                <p>{user.email}</p>
            </div>
            <section className="section columns">
                   <div className="column">
                   {handleSkillsDisplay()}
                   </div>
                   <div className="column columns">
                        <h2 className="subtitle column">{user.email}</h2>
                        <h2 className="subtitle column">{`Located in ${user.city}, ${user.state}, ${user.country}`}</h2>
                        <h2 className="subtitle column">{user.available ? "Is Currently Available" : "Is on a project"}</h2>
                   </div>
                </section>
        </div>
    )

}
export default UserDetails