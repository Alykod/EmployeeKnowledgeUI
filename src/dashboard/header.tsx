import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { GetSkills } from '../services/queries';
import { useDispatch } from 'react-redux';


interface SkillsData {
    skills: [Skill]
}
interface Skill {
    name: string,
    _id: string
}

const Header = (props: any) => {
    const { loading, error, data } = useQuery(GetSkills);
    const [selectedSkill, setSelectedSkill] = useState<string>("");
    const [listOfSkills, setListOfSkills] = useState<Skill[]>([]);

    useEffect(() => {
        if(data) {
            setListOfSkills(data.skills);
        }
    }, [data])


    const handleAutoComplete = (event: any) => {
        let value = event.target.value
        if (value === "") {
            setSelectedSkill(value);
            setListOfSkills(data.skills);
            props.handleSelectedSkill(value);
            return;
        }
        const lowerCaseValue = value.toLowerCase();
        const findSame = data.skills.find((skill: Skill ) => skill.name.toLowerCase() === lowerCaseValue)
        if(!findSame) {
            const findSimilar = data.skills.filter((skill: Skill) => skill.name.toLowerCase().includes(lowerCaseValue));
            setSelectedSkill(value);
            setListOfSkills(findSimilar);
        } else {
            setSelectedSkill(event.target.value);
            props.handleSelectedSkill(value);
        }
    }

    // const handleSelect = (event: any) => {
    //     const value = event.target.value;
    //     setSelectedSkill(value);
    //     props.handleSelectedSkill(value);
    // }

    const handleListOfSkills = () => {
        return listOfSkills.map((skill, index) => {
            return <option value={skill.name} key={index} />
        })
    }

    const displayDropDown = () => {
        return (
            <div className="navheader column is-full columns">
            <label className="label column is-half">Skills</label>
            <input className="input is-normal column is-half" list="availableSkills" value={selectedSkill} onChange={handleAutoComplete} placeholder="Filter by Skill"/>
            <datalist id="availableSkills">
                {listOfSkills && listOfSkills.length > 0 && handleListOfSkills()}
            </datalist>
            </div>
        )
    }


    return (
        <nav className="navbar is-fixed-top columns" aria-label="dashboard filter">
            <div className="navbar-menu is-active column is-three-quarters is-centered">
                    {displayDropDown()}
            </div>
        </nav>
    )



}

export default Header