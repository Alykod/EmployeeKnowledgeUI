import React, { useState, useEffect } from 'react'
import Dropdown from './searchDropDown'
import { useQuery } from '@apollo/react-hooks'
import { GetSkills } from '../services/queries';
import MultiSelectCheckBox from './multiSelectCheckBox';
import MultiSelect from './multiSelectCheckBox';
import { useSelector } from 'react-redux'


const SideBar = (props: any) => {
    const { loading: skillsLoading, error: skillsError, data: skills } = useQuery(GetSkills);
    const listOfCountries = useSelector((state: any) => state.listOfCountries)
    const listOfCities = useSelector((state: any) => state.listOfCities)
    const listOfRoles = useSelector((state: any) => state.listOfRoles)
    const [available, setAvailable] = useState(true);
    const [fullTimeEmployee, setFullTimeEmployee] = useState(true);
    const [rolesSelected, setRolesSelected] = useState([]);
    const [citiesSelected, setCitiesSelected] = useState([]);
    const [countriesSelected, setCountriesSelected] = useState([]);
    const [sideBarActive, setSideBarActive] = useState(false);
    const [listOfSkills, setListOfSkills] = useState<Skill[]>([]);
    const [skillsSelected, setSkillsSelected] = useState([]);
    const [initialRender, setInitialRender] = useState(true);


    useEffect(() => {
        if (skills) {
            setListOfSkills(skills.skills);
        }
    }, [skills])

    // useEffect(() => {
    //     if(initialRender) {
    //         setInitialRender(false);
    //     } else {
    //         props.filter({
    //             "skills": skillsSelected,
    //             "countries": countriesSelected,
    //             "cities": citiesSelected,
    //             "roles": rolesSelected,
    //             "available": available,
    //             "fullTimeEmployee": fullTimeEmployee
    //         })
    //     }
       
    // }, [skillsSelected, countriesSelected, citiesSelected, rolesSelected, available, fullTimeEmployee])

    // const handleSelect = (value: any) => {
    //     props.handleSelectedSkill(value);
    // }

    // const displayDropDown = () => {
    //     return (
    //         <div className="row is-full">
    //             <Dropdown data={listOfSkills} label="Skills" handleSelectedItem={handleSelect} />
    //         </div>
    //     )
    // }

    const rolesDropDown = (roles: any) => {
        setRolesSelected(roles);
    }

    // const handleMultiSelectData = () => {
    //     const data = skills.skills.map((skill: any) => skill.name);
    //     return data
    // }

    const handleSkillsSelected = (data: any) => {
        setSkillsSelected(data);
    }

    const handleCountrySelected = (data: any) => {
        setCountriesSelected(data)
    }

    const handleCitiesSelected = (cities: any) => {
        setCitiesSelected(cities)
    }

    const handleRolesSelected = (roles: any) => {
        setRolesSelected(roles)
    }
    const handleEmployeeStatus = (isFullTime:boolean) => {
        setFullTimeEmployee(isFullTime)
    }

    const handleSubmitFilter = () => {
        props.filter({
            "skills": skillsSelected,
            "countries": countriesSelected,
            "cities": citiesSelected,
            "roles": rolesSelected,
            "available": available,
            "fullTimeEmployee": fullTimeEmployee
        })  
    }

    return (
        <div className="column is-2">
            <aside className="menu rows has-text-centered">
                <h1 className="is-size-2">Filtering Bar</h1>
                <br/>
                <div className="row is-full">
                    {skills && <MultiSelect data={skills.skills} label="Skills" handleData={handleSkillsSelected} />}
                </div>
                <div className="row is-full">
                    {listOfCountries && <MultiSelect data={listOfCountries} label="Countries" handleData={handleCountrySelected} />}
                </div>
                <div className="row is-full">
                    {listOfCities && <MultiSelect data={listOfCities} label="Cities" handleData={handleCitiesSelected} />}
                </div>
                <div className="row is-full">
                    {listOfRoles && <MultiSelect data={listOfRoles} label="Roles" handleData={handleRolesSelected} />}
                </div>
                <div className="row is-full">
                    <div className="form columns">
                        <label className="label column is-half">
                            <input type="radio" value="fullTimeEmployee" checked={fullTimeEmployee} onChange={(e)=> {
                                handleEmployeeStatus(true);
                            }}/>
                            Full Time Employee
                        </label>
                        <label className="label column is-half">
                            <input type="radio" value="contractor" checked={!fullTimeEmployee} onChange={(e)=> {
                                handleEmployeeStatus(false);
                            }}/>
                            Contractor
                        </label>
                    </div>
                    <hr className="has-background-black"></hr>
                </div>
                <br/>
                <div className="row is-full">
                    <div className="form columns">
                        <label className="label column is-half">
                            <input type="radio" value="available" checked={available} onChange={(e)=> {
                                setAvailable(true)
                            }}/>
                            Available
                        </label>
                        <label className="label column is-half">
                            <input type="radio" value="notAvailable" checked={!available} onChange={(e)=> {
                                setAvailable(false)
                                } }/>
                            Not Available
                        </label>
                    </div>
                    <hr className="has-background-black"></hr>
                </div>
                <br/>
                <div className="row is-full">
                    <button className="button is-primary" onClick={(e)=> {
                        e.preventDefault();
                        handleSubmitFilter()
                    }}>
                        Filter
                    </button>
                </div>
            </aside>
        </div>
    )





}

export default SideBar



interface Skill {
    name: string,
    _id: string
}