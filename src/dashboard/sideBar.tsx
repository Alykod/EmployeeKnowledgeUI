import React, { useState, useEffect } from 'react'
import Dropdown from './searchDropDown'
import { useQuery } from '@apollo/react-hooks'
import { GetSkills } from '../services/queries';



const SideBar = (props: any) => {
    const { loading, error, data } = useQuery(GetSkills);
    const [toggleAvailable, setToggleAvailable] = useState(null);
    const [toggleFullTimeEmployee, setToggleFullTimeEmployee] = useState(null);
    const [rolesSelected, setRolesSelected] = useState([]);
    const [citiesSelected, setCitiesSelected] = useState([]);
    const [countriesSelected, setCountriesSelected] = useState([]);
    const [sideBarActive, setSideBarActive] = useState(false);
    const [listOfSkills, setListOfSkills] = useState<Skill[]>([]);


    useEffect(() => {
        if (data) {
            setListOfSkills(data.skills);
        }
    }, [data])


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


    return (
        <div className="column is-2">
            <aside className="menu rows">
                <h1 className="is-size-2">Filtering Bar</h1>
                {displayDropDown()}
                <div className="row is-full rows">
                    <div className="card has-background-warning">
                        <div className="control">
                            <label className="radio">
                                <input type="radio" name="fullTimeEmployement" />
                                Full Time
                   </label>
                            <label className="radio">
                                <input type="radio" name="contractor" />
                                Contractor
                   </label><label className="radio">
                                <input type="radio" name="both" />
                                Both
                   </label>
                        </div>
                    </div>
                </div>
                <div className="row is-full">
                    <p>Roles will go here as check boxes</p>
                </div>
                <div className="row is-full">
                    <p>Available or not</p>
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
