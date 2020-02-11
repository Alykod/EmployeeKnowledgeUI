import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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
    const { loading, error, data, refetch } = useQuery(GetUser, { variables: { userId: userId } })

    useEffect(() => {
            setUserData(data && data.userById)
    }, [data])

    const handleRefetech = () => {
        refetch();
    }

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
               <section className="section columns">
                   <div className="column">
                   {handleSkillsDisplay()}
                   </div>
                   <div className="column">
                   <AddSkill userData={userData} refetchUser={handleRefetech}/>
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
            return <div className="column is-offset-4"> {
            userData.skills.map((skill:any, index: number) => {
                return <StarsBar key={index} name={skill.skill.name}  filled={skill.level}/>
            }) }
            </div>
        }
       
    }



    return (
        loading ? handleLoading() : userData ? userDisplay() : null
    )

}

export default UserProfile