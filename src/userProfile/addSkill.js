import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CreateUserSkill, GetSkills } from "../services/queries";
import { useSelector } from "react-redux";
import StarSelector from "./starSelector";
import { useAddSkill } from "./services";

const AddSkill = props => {
  const userId = props.userData._id;
  const userCurrentSkills = props.userData.skills;
  const [toggleAddNew, setToggleAddNew] = useState(false);
  const { loading, error, data } = useQuery(GetSkills);
  const [addSkill, { values }] = useMutation(CreateUserSkill);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [level, setLevel] = useState(1);
  const [interest, setInterest] = useState(1);

  useEffect(() => {
    if (data) {
      handleAvailableSkills();
    }
  }, [data]);

  const handleSkillValue = value => {
    setLevel(value);
  };

  const handleInterestValue = value => {
    setInterest(value);
  };

  const handleAvailableSkills = () => {
    if (userCurrentSkills.length == 0) {
      setAvailableSkills(data.skills);
    } else {
      let mapUserExistingSkills = userCurrentSkills.map(allSkills => {
        return allSkills.skill.name;
      });
      let allSkills = data.skills;
      let filteredSkills = allSkills.filter(individualSkill => {
        return !mapUserExistingSkills.includes(individualSkill.name);
      });
      setAvailableSkills(filteredSkills);
    }
  };
  const handleResetComponent = () => {
    props.refetchUser();
    setLevel(1);
    setInterest(1);
    setSelectedSkill("");
  };

  const handleSubmit = () => {
    if (selectedSkill !== "") {
      addSkill({
        variables: {
          userId: userId,
          skillName: selectedSkill,
          level: level,
          interest: interest
        }
      }).then(() => {
        props.refetchUser();
        handleResetComponent();
      });
    } else {
      alert("missing values");
    }
  };

  const displayInput = () => {
    return (
      <>
        <div className="form column rows is-offset-3">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Skill</label>
            </div>
            <div className="field-body is-grouped">
              <div className="field  is-narrow">
                <div className="control">
                  <input
                    className="input is-danger"
                    list="AvailableSkills"
                    type="text"
                    placeholder="React, .Net core etc"
                    value={selectedSkill}
                    onChange={e => setSelectedSkill(e.target.value)}
                  />
                  <datalist id="AvailableSkills">
                    {availableSkills &&
                      availableSkills.length > 0 &&
                      handleListOfSkills()}
                  </datalist>
                </div>
              </div>
            </div>
          </div>
          <div className="longerField field row">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Knowledge Level</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <StarSelector skillValue={handleSkillValue} level={level} />
                </div>
              </div>
            </div>
            <div className="longerField field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Interest Level</label>
              </div>
              <div className="field-body">
                <StarSelector
                  skillValue={handleInterestValue}
                  level={interest}
                />
              </div>
            </div>

            <p className="field-body is-pulled-right">
              <button
                className="button is-info"
                onClick={() =>
                  handleSubmit(userId, selectedSkill, level, interest)
                }>
                Save
              </button>
            </p>
          </div>
        </div>
      </>
    );
  };

  const handleListOfSkills = () => {
    return availableSkills.map((skill, index) => {
      return <option value={skill.name} key={index} />;
    });
  };

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

// function HandleCall(userId, selectedSkill, level) {
//     const {loading, data, error} = useAddSkill(userId, selectedSkill, level);
// }

export default AddSkill;
