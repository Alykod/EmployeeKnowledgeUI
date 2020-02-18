import React, { useState } from 'react';
import StarsBar from './starsBar'
import { useMutation } from '@apollo/react-hooks'
import { ChangeUserAvailability } from '../services/queries'
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
    role: any,
    fullTimeEmployee: boolean
    _id: string
}
interface SubSkill {
    name: string
}
interface Skill {
    skill: SubSkill,
    level: number
}


const UserDetails = (props: Props) => {
    const { user } = props;
    const [userAvailability, setUserAvailability] = useState(user.available)
    const [toggleUserAvailability, setToggleUserAvailability] = useState(false);
    const [changeUserAvailability] = useMutation(ChangeUserAvailability)
    // const handleSkillsDisplay = () => {
    //     if (user.skills.length === 0) {
    //         return (
    //             <p>No Skills Added <i className="fas fa-frown"></i></p>
    //         )
    //     } else {
    //         return <div className="column is-offset-4"> {
    //             user.skills.map((skill: any, index: number) => {
    //                 return <StarsBar key={index} name={skill.skill.name} filled={skill.level} />
    //             })}
    //         </div>
    //     }

    // }

    const handleSkillsDisplay = () => {
        if (user.skills.length === 0) {
            return (
                <p>You don't have any skills added <i className="fas fa-frown"></i></p>
            )
        } else {
            return <div className="column tile is-vertical"> {
                user.skills.map((skill: any, index: number) => {
                    return (
                        <article key={`${skill.skill.name}+${skill.interest}`} className="tile is-child notification is-info has-text-white">
                            <label className="title">{skill.skill.name}</label>
                            <StarsBar key={`${index}level`} name="Knowledge" filled={skill.level} />
                            <StarsBar key={`${index}interest`} name="Interest" filled={skill.interest} />
                        </article>
                    )
                })}
            </div>
        }

    }
    const handleChangeUserAvailability = () => {
        if (user.available === userAvailability) {
            return setToggleUserAvailability(false);
        }
        else {
            debugger;
            changeUserAvailability({
                variables: {
                    userId: user._id,
                    available: userAvailability
                }
            }).then(() => {
                setToggleUserAvailability(false);
                alert("User Availability Successfully Changed")
            }).catch((err) => {
                alert("Error Changing")
            })
        }
    }


    const handlePreference = () => {
        return user.skills.map((skill: any, index: any)=> {
            if(skill.interest >= 3) {
                return <span className="subtitle">{skill.skill.name} </span>
            } 
            else return null;
        })
    }

    return (
        <div className="container is-wide">
            <section className="hero is-primary">
                <div className="hero-body columns is-centered">
                    <div className="column has-text-centered">
                        <h1 className="title">{user.firstName} {user.lastName}`s profile</h1>
                        <h2 className="subtitle column">Email: {user.email}</h2>
                    </div>
                    {/* <div className="column has-text-centered">
                        <label className="title">{user.role.name} <span className="subtitle has-text-black">({user.fullTimeEmployee ? "Full Time" : "Contractor"})</span></label>
                        <label className="label">Based in <span className="subtitle">{user.city},{user.state},{user.country}</span></label>
                    </div> */}
                </div>
            </section>
            <section className="section columns">
                <div className="column columns">
                    {handleSkillsDisplay()}
                </div>
                <div className="column tile">
                    <div className="tile is-parent is-vertical">
                        {!toggleUserAvailability && <a href="AvailabilityTile" className="has-tooltip-bottom" data-tooltip="Click on this card to change employee's availability" onClick={(e) => {
                            e.preventDefault();
                            setToggleUserAvailability(true)
                        }}>{userAvailability ? <article className="tile is-child notification is-primary">
                            <p className="title">Is Currently Available</p>
                            <p className="subtitle">and not on a project</p>
                        </article> : <article className="tile is-child notification is-danger">
                                <p className="title">Is on a Project</p>
                                <p className="subtitle">and not available</p>
                            </article>}
                        </a>}
                        {toggleUserAvailability && <article className="tile is-child notification is-white rows">
                            <p className="title row">Change User Availability</p>
                            <div className="row columns">
                                <div className="field column">
                                    <input type="checkbox" name="available" id="userSwitchAvailable" className="switch is-full" checked={userAvailability} onChange={e => {
                                        setUserAvailability(!userAvailability)
                                    }} />
                                    <label htmlFor="userSwitchAvailable" className="label">{userAvailability ? "Available" : "Not Available"}</label>
                                </div>
                                <div className="column field is-grouped">
                                    <p className="control">
                                        <button onClick={handleChangeUserAvailability} className="button is-primary">
                                            Submit
                            </button>
                                    </p>
                                    <p className="control">
                                        <button onClick={() => {
                                            setUserAvailability(user.available);
                                            setToggleUserAvailability(false);
                                        }} className="button is-warning">
                                            Cancel
                            </button>
                                    </p>
                                </div>
                            </div>
                        </article>}
                        <br />
                        <div className="tile is-child notification is-info">
                            <p className="title"><span className="subtitle">{user.firstName} is a </span>{user.fullTimeEmployee ? "Full Time" : "Contractor"} {user.role.name} </p>
                            {/* <p className="title">and is </p> */}
                        </div>
                        <div className="tile is-child notification is-primary">
                            <p className="title"><span className="subtitle">Based in </span> {user.city}, {user.state}, {user.country}</p>
                        </div>
                        <div className="tile is-child notification is-info">
                            <p className="title">
                                    {user.firstName} <span className="subtitle">prefers to work with </span>{handlePreference()}
                            </p>
                        </div>
                    </div>
                    {/* <h2 className="subtitle row">{user.available ? <span className="has-text-info"> Is Currently Available</span> : <span className="has-text-warning">"Is on a project" </span>}</h2> */}
                </div>
            </section>
        </div>
    )

}
export default UserDetails