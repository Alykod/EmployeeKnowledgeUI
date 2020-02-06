import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CreateUserSkill, GetSkills } from "../services/queries";

const AddSkill = () => {
  const [toggleAddNew, setToggleAddNew] = useState(false);
  const { loading, error, data } = useQuery(GetSkills);
  const [availableSkills, setAvailableSkills] = useState([]);

  useEffect(() => {
    if (data) {
      setAvailableSkills(data.skills);
    }
  }, [data]);

  const displayInput = () => {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Skill</label>
        </div>
        <div className="field-body">
        <div className="field is-narrow">
        <div className="control">
        <input className="input is-danger" list="AvailableSkills" type="text" placeholder="React, .Net core etc" />
        <datalist id="AvailableSkills">
                {availableSkills && availableSkills.length > 0 && handleListOfSkills()}
        </datalist>
         </div>
        </div>
        </div>
      </div>
    );
  };

  const handleListOfSkills = () => {
    return availableSkills.map((skill, index) => {
        return <option value={skill.name} key={index} />
    })
}

  const displayAddNew = () => {
    return (
      <div className="level">
        <div className="level-item has-text-centered">
          <h4 className="title is-4">Add New Skill</h4>
        </div>
        <div className="level-item has-text-centered">
          <a
            type="toggleNew"
            href="AddNewSkill"
            className="has-text-info"
            onClick={event => {
              event.preventDefault();
              setToggleAddNew(true);
            }}>
            <i
              onClick={() => setToggleAddNew(true)}
              className="fas fa-plus-circle fa-2x"></i>
          </a>
        </div>
      </div>
    );
  };

  return toggleAddNew ? displayInput() : displayAddNew();
};

const HandleAddSkill = (userId, skill, level) => {
  const { loading, error, data } = useQuery(CreateUserSkill, {
    variables: { userId: userId, skill: skill, level: level }
  });

  const skillAdded = {
    loading,
    error,
    data
  };

  return skillAdded;
};

export default AddSkill;
