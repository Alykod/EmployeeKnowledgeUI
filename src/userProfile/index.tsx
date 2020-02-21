import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { client } from '../services/apolloClient';
import { GetUser } from '../services/queries'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import StarsBar from '../dashboard/starsBar'
import AddSkill from './addSkill'
import Header from '../dashboard/header';

const UserProfile = () => {
    const history = useHistory();
    const userId = useSelector((state: any) => state.user);
    const [userData, setUserData] = useState<any>(null)
    if (!userId) {
        history.push("/")
    }
    const { loading, error, data, refetch } = useQuery(GetUser, { variables: { userId: userId } })

    useEffect(() => {
            setUserData(data && data.userById)
    }, [data])

    const handleRefetech = () => {
        refetch();
    }

    const userDisplay = () => {
        return (
            <>
            <Header myAccount={true} isAdmin={userData.role && userData.role.name === "Admin" ? true : false}/>
            <div>
                <section className="hero is-primary">
                    <div className="hero-body columns is-centered">
                        {/* <div className="container columns is-centered"> */}
                            <div className="column has-text-centered">
                            <h1 className="title ">Welcome</h1> <h2 className="subtitle">{userData.firstName} <label className="has-text-black">{userData.lastName}</label></h2>
                            </div>
                            <div className="column has-text-centered">
                            <label className="title">{userData.role && userData.role.name} <span className="subtitle has-text-black">({userData.fullTimeEmployee ? "Full Time" : "Contractor"})</span></label>
                            <label className="label">Based in <span className="subtitle">{userData.city},{userData.state}</span></label>
                            </div>
                        {/* </div> */}
                    </div>
                </section>
               <section className="section columns">
                   <div className="column columns">
                   {handleSkillsDisplay()}
                   </div>
                   <div className="column">
                   <AddSkill userData={userData} refetchUser={handleRefetech}/>
                   </div>
                </section>
            </div>
            </>
        )
    }

    const handleLoading = () => {
        return (
            <p>loading....</p>
        )
    }

    const handleSkillsDisplay = () => {
        if(userData.skills.length === 0) {
            return (
                <p>You don't have any skills added <i className="fas fa-frown"></i></p>
                )
        } else {
            return <div className="column is-offset-4 tile is-vertical"> {
            userData.skills.map((skill:any, index: number) => {
                return (
                <article key ={`${skill.skill.name}+${skill.interest}`} className="tile is-child notification is-info has-text-white">
                    <label className="title">{skill.skill.name}</label>
                    <StarsBar key={`${index}level`} name="Knowledge"  filled={skill.level}/>
                    <StarsBar key={`${index}interest`} name="Interest"  filled={skill.interest}/> 
                </article>
                )
            }) }
            </div>
        }
       
    }



    return (
        loading ? handleLoading() : userData ? userDisplay() : null
    )

}

export default UserProfile