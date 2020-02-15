import React, { useState, useEffect, useRef } from "react";

interface SkillsData {
  skills: [Skill]
}
interface Skill {
  name: string,
  _id: string
}


const Dropdown = (props: any) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [listOfSkills, setListOfSkills] = useState([]);
  const dropDownRef: any = useRef(null);
  const dropDownContentRef: any = useRef(null);

  function handleClickOutside(event: any) {
    if ((dropDownRef.current && !dropDownRef.current.contains(event.target)) || (dropDownContentRef.current && !dropDownContentRef.current.contains(event.target))) {
      setToggleMenu(false);
    }
  }

  useEffect(() => {
    if (toggleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });
  


  useEffect(() => {
    setListOfSkills(props.data)
  }, [props.data])

  const handleListOfSkills = () => {
    return listOfSkills.map((skill: Skill, index) => {
      return (
        <a href="MenuItem" onClick={e => {
          e.preventDefault()
          handleSelection(skill.name)
        }} className="dropdown-item" key={index}>
          {skill.name}
        </a>
      );
    });
  };

  const handleSelection = (value: any) => {
    setSelectedValue(value);
    props.handleSelectedItem(value);
    setToggleMenu(!toggleMenu)
  }

  const handleAutoComplete = (event: any) => {
    let value = event.target.value
    if (value === "") {
      handleSelection(value)
      setListOfSkills(props.data);
      return;
    }
    const lowerCaseValue = value.toLowerCase();
    const findSame = props.data.find((skill: Skill) => skill.name.toLowerCase() === lowerCaseValue)
    if (!findSame) {
      const findSimilar = props.data.filter((skill: Skill) => skill.name.toLowerCase().includes(lowerCaseValue));
      setSelectedValue(value);
      setListOfSkills(findSimilar);
    } else {
      handleSelection(value)
      // setSelectedValue(event.target.value);
      // props.handleSelectedItem(value);
    }
  }

  return (
    <div className="field is-horizontal">
      <div className="field-label" style={{alignSelf : "center"}}>
      <label className="label">{props.label}</label>
      </div>
      {/* <div className="control"> */}
        <div className="dropdown" ref={dropDownRef}>
          <input
            className="input is-normal column is-hovered"
            value={selectedValue}
            onChange={handleAutoComplete}
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
            placeholder={`Filter by ${props.label}`}
          />
          {toggleMenu && (
            <div className="dropdown-menu" style={{ display: "block" }}>
              <ul className="dropdown-content" ref={dropDownContentRef}>{handleListOfSkills()}</ul>
            </div>
          )}
        </div>

      </div>
    // </div>
  );
};

export default Dropdown;
