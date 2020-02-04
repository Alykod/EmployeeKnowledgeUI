import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {GetSkills, GetUsersAndSkills} from '../services/queries'
import UserCard from './card'
import './dashboard.scss'

import {useQuery} from '@apollo/react-hooks'
const DashBoard = () => {
    const {loading, error, data} = useQuery(GetUsersAndSkills);
    const dispatch = useDispatch();
    // useEffect(()=> {
    //     if(data && data.skills.length > 0) {
    //         dispatch({type: "SET_SKILLS", payload: data })
    //     }
    // }, [data, dispatch])

    const handleSkillsCard = () => {
        return data && data.userSkills.map((user:any, index: number) => {
            return <UserCard key={index} {...user}/>
        })
    }

    const handleDisplay = () => {
        if(loading) {
            return <p>Loading</p>
        }else if(data) {
            return handleSkillsCard()
        }else if(error) {
            return <p>error</p>
        }
    }

    return(
        <div className="CardsContainer">
            {handleDisplay()}
        </div>
    )
}


// const DataHandler = () => {
//     const {loading, error, data} = useQuery(GetSkills);
//     const dispatch = useDispatch();

//     useEffect(()=> {
//         if(data && data.skills.length > 0) {
//             dispatch({type: "SET_SKILLS", payload: data })
//         }
//     }, [data, dispatch])

//     return {loading, error, data};
// }

export default DashBoard