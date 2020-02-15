import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetSkills, GetUsersAndSkills } from '../services/queries'
import UserCard from './card'
import Header from './header'
import './dashboard.scss'
import { useQuery } from '@apollo/react-hooks'
import UserDetails from './userDetails';
import SideBar from './sideBar';
import {handleFilterValues} from './services'


const DashBoard = () => {
    const { loading, error, data } = useQuery(GetUsersAndSkills);
    const dispatch = useDispatch();
    const employeesList = useSelector((state: any) => state.employees)
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [employees, setEmployees] = useState<any>();
    const [employeeSelected, setEmployeeSelected] = useState<any>();
    const [toggleEmployeeView, setToggleEmployeeView] = useState<boolean>(false);
    const [filtering, setFiltering] = useState<boolean>(false);
    const [toggleSideBar, setToggleSideBar] = useState(true);
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
            let filteringData = handleFilterValues(data.users);
            dispatch({ type: "FILTERING_LIST", payload: filteringData })
            dispatch({type: "LIST_OF_EMPLOYEES", payload: data.users});
            setEmployees(data.users)
        }
    }, [data])

    const handleUserSelected = (user: any) => {
        setEmployeeSelected(user);
        setToggleEmployeeView(true);
    }
    
    const handleSkillsCard = () => {
        return employeesList && employeesList.length > 0 && employeesList.map((user: any, index: number) => {
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
    const handleFilter = (filterData: any) => {
        console.log("filterData", filterData)
    }

    const handleDisplay = () => {
        if (loading) {
            return <p>Loading</p>
        } else if (error) {
            return <p>error</p>
        } else if (employeesList) {
            return handleSkillsCard()
        } else return <p>No Employees have the selected skills</p>
    }

    return (
        <>
            <Header handleSideBarDisplay={handleSideBarDisplay} />
            <div className="columns">
                {!toggleEmployeeView &&
                    <>
                        {toggleSideBar && <SideBar handleSelectedSkill={handleSelectedSkill} filter={handleFilter} />}
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