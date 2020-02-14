import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {GetSkills, GetUsersAndSkills} from '../services/queries'
import UserCard from './card'
import Header from './header'
import './dashboard.scss'
import {useQuery} from '@apollo/react-hooks'
import UserDetails from './userDetails';



const DashBoard = () => {
    const {loading, error, data} = useQuery(GetUsersAndSkills);
    const dispatch = useDispatch();
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [employees, setEmployees] = useState<any>();
    const [employeeSelected, setEmployeeSelected] = useState<any>();
    const [toggleEmployeeView, setToggleEmployeeView] = useState<boolean>(false)

    useEffect(()=> {
        if(selectedSkill == "" && data) {
            setEmployees(data.users)
        } else if(selectedSkill && data) {
            handleUpdatedEmployeeList();
        }
    }, [selectedSkill])


    useEffect(()=> {
        if(data) {
            setEmployees(data.users)
        }
    }, [data])

    const handleUserSelected = (user: any) => {
        setEmployeeSelected(user);
        setToggleEmployeeView(true);
    }

    const handleSkillsCard = () => {
        return employees && employees.length > 0 && employees.map((user:any, index: number) => {
            return <UserCard key={index} user={user} selectedSkill={selectedSkill} handleUserSelected={handleUserSelected}/>
        })
    }

    const handleUpdatedEmployeeList = () => {
        const newList = employees.filter((employee: any) => {
            let employeeSkills = employee.skills.find((skill: any) => skill.skill.name === selectedSkill)
            if(employeeSkills) {
                return employee
            } 
        })
        setEmployees(newList)
    }

    const handleSelectedSkill = (skill: string) => {
        setSelectedSkill(skill)
    }

    const handleDisplay = () => {
        if(loading) {
            return <p>Loading</p>
        }else if(employees) {
            return handleSkillsCard()
        }else if(error) {
            return <p>error</p>
        }
    }

    return(
        <>
        <Header handleSelectedSkill={handleSelectedSkill}/>
        {!toggleEmployeeView && <div className="CardsContainer">
            {handleDisplay()}
        </div>}
        {toggleEmployeeView && <UserDetails user={employeeSelected}/>}
        </>
    )
}



export default DashBoard