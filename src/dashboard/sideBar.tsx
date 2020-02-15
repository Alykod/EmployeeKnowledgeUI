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
    const [available, setAvailable] = useState(null);
    const [fullTimeEmployee, setFullTimeEmployee] = useState(true);
    const [rolesSelected, setRolesSelected] = useState([]);
    const [citiesSelected, setCitiesSelected] = useState([]);
    const [countriesSelected, setCountriesSelected] = useState([]);
    const [sideBarActive, setSideBarActive] = useState(false);
    const [listOfSkills, setListOfSkills] = useState<Skill[]>([]);
    const [skillsSelected, setSkillsSelected] = useState([]);


    useEffect(() => {
        if (skills) {
            setListOfSkills(skills.skills);
        }
    }, [skills])

    useEffect(() => {
        props.filter({
            "skills": skillsSelected,
            "countries": countriesSelected,
            "cities": citiesSelected,
            "roles": rolesSelected,
            "available": available
        })
    }, [skillsSelected, countriesSelected, citiesSelected, rolesSelected, available])

    const handleSelect = (value: any) => {
        props.handleSelectedSkill(value);
    }

    const displayDropDown = () => {
        return (
            <div className="row is-full">
                <Dropdown data={listOfSkills} label="Skills" handleSelectedItem={handleSelect} />
            </div>
        )
    }

    const rolesDropDown = () => {

    }

    const handleMultiSelectData = () => {
        const data = skills.skills.map((skill: any) => skill.name);
        return data
    }

    const handleSkillsSelected = (data: any) => {
        setSkillsSelected(data);
    }

    const hanldeCountrySelected = (data: any) => {
        console.log(data)
    }

    return (
        <div className="column is-2">
            <aside className="menu rows">
                <h1 className="is-size-2">Filtering Bar</h1>
                {/* {displayDropDown()} */}
                {/* <div className="row is-full rows">
                    <div className="card has-background-warning">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" name="fullTimeEmployment" checked={fullTimeEmployee ? true : false} onChange={(e) => {
                                    setFullTimeEmployee(true)
                                }} />
                                Full Time
                   </label>
                            <label className="checkbox">
                                <input type="checkbox" name="contractor" checked={fullTimeEmployee ? false : true} onChange={(e) => {
                                    setFullTimeEmployee(false)
                                }} />
                                Contractor
                   </label>
                        </div>
                    </div>
                </div> */}
                <div className="row is-full">
                    {skills && <MultiSelect data={skills.skills} label="Skills" handleData={handleSkillsSelected} />}
                    {/* <p>Roles will go here as check boxes</p> */}
                </div>
                <div className="row is-full">
                    {listOfCountries && <MultiSelect data={listOfCountries} label="Countries" handleData={hanldeCountrySelected} />}
                </div>
                <div className="row is-full">
                    {listOfCities && <MultiSelect data={listOfCities} label="Cities" handleData={hanldeCountrySelected} />}
                </div>
                <div className="row is-full">
                    {listOfRoles && <MultiSelect data={listOfRoles} label="Roles" handleData={hanldeCountrySelected} />}
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
