import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { client } from '../services/apolloClient';
import { GetUser } from '../services/queries'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks'
import StarsBar from '../dashboard/starsBar'
import AddSkill from './addSkill'

const UserProfile = () => {
    const history = useHistory();
    const userId = useSelector((state: any) => state.user);
    const [userData, setUserData] = useState<any>({})
    if (!userId) {
        history.push("/")
    }
    const { loading, error, data } = useQuery(GetUser, { variables: { userId: userId } })

    useEffect(() => {
        setUserData(data && data.userById)
    }, [data])

    const userDisplay = () => {
        console.log(userData)
        return (
            <div>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">Welcome</h1> <h2 className="subtitle">{userData.firstName} {userData.lastName}</h2>
                        </div>
                    </div>
                </section>
               <section className="section">
                   <div className="container">
                   {handleSkillsDisplay()}
                   </div>
                </section>
                <section className="section">
                   <div className="container">
                       <AddSkill />
                       {/* <h1 className="title">Add New Skills Here</h1> */}
                   </div>
                </section>
            </div>
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
            return userData.skills.map((skill:any, index: number) => {
                return <StarsBar key={index} name={skill.skill.name}  filled={skill.level}/>
            })
        }
       
    }



    return (
        loading ? handleLoading() : userData ? userDisplay() : null
    )

}

export default UserProfile