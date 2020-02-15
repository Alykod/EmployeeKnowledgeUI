import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetSkills, GetUsersAndSkills } from '../services/queries'
import UserCard from './card'
import Header from './header'
import './dashboard.scss'
import { useQuery } from '@apollo/react-hooks'
import UserDetails from './userDetails';
import SideBar from './sideBar';



const DashBoard = () => {
    const { loading, error, data } = useQuery(GetUsersAndSkills);
    // const dispatch = useDispatch();
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [employees, setEmployees] = useState<any>();
    const [employeeSelected, setEmployeeSelected] = useState<any>();
    const [toggleEmployeeView, setToggleEmployeeView] = useState<boolean>(false)
    const [filtering, setFiltering] = useState<boolean>(false)
    const [toggleSideBar, setToggleSideBar] = useState(true)
    useEffect(() => {
        if (selectedSkill === "" && data) {
            setEmployees(data.users)
        } else if (selectedSkill !== "" && data && filtering) {
            handleUpdatedEmployeeList(employees);
        } else if (data) {
            setEmployees(data.users)
            //potential race condition
            handleUpdatedEmployeeList(data.users);
        }
    }, [selectedSkill])

    const handleSideBarDisplay = (status: boolean) => {
        setToggleSideBar(status)
    }

    useEffect(() => {
        if (data) {
            setEmployees(data.users)
        }
    }, [data])

    const handleUserSelected = (user: any) => {
        setEmployeeSelected(user);
        setToggleEmployeeView(true);
    }

    const handleSkillsCard = () => {
        return employees && employees.length > 0 && employees.map((user: any, index: number) => {
            return <UserCard key={index} user={user} selectedSkill={selectedSkill} handleUserSelected={handleUserSelected} />
        })
    }

    const handleUpdatedEmployeeList = (employees: any) => {
        const newList = employees.filter((employee: any) => {
            let employeeSkills = employee.skills.find((skill: any) => skill.skill.name === selectedSkill)
            if (employeeSkills) {
                return employee
            }
        })
        setEmployees(newList)
    }

    const handleSelectedSkill = (skill: string) => {
        setSelectedSkill(skill)
    }

    const handleDisplay = () => {
        if (loading) {
            return <p>Loading</p>
        } else if (error) {
            return <p>error</p>
        } else if (employees) {
            return handleSkillsCard()
        } else return <p>No Employees have the selected skills</p>
    }

    return (
        <>
            <Header handleSideBarDisplay={handleSideBarDisplay} />
            <div className="columns">
                {!toggleEmployeeView &&
                    <>
                        {toggleSideBar && <SideBar handleSelectedSkill={handleSelectedSkill} />}
                        <div className="CardsContainer column">
                            {handleDisplay()}
                        </div>
                    </>
                }
                {toggleEmployeeView && <UserDetails user={employeeSelected} />}
            </div>
        </>
    )
}



export default DashBoard