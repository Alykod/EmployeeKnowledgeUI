import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

const MultiSelect = props => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [allStates, setAllStates] = useState({});
  const [toggleValues, setToggleValues] = useState(false);

  function initializeDynamic() {
    let intializedObject = {};
    props.data.forEach(value => {
      intializedObject[value] = false;
    });
    setAllStates(intializedObject);
  }

  useEffect(() => {
    initializeDynamic();
  }, [props.data]);

  function handleChecked(value) {
    if (selectedValue.includes(value)) {
      let updatedValue = selectedValue.splice(selectedValue.indexOf(value));
      setSelectedValue(updatedValue);
      props.handleData(updatedValue);
    } else {
      let updatedValue = [...selectedValue, value];
      setSelectedValue(updatedValue);
      props.handleData(updatedValue);
    }
  }
  const handleValuesListObject = () => {
    const data = props.data;
    return data.map(value => {
      return (
        <label className="checkbox column is-one-third" key={value._id}>
          <input
            type="checkbox"
            name={value.name}
            checked={allStates[value.name] || false}
            onChange={e => {
              setAllStates({
                ...allStates,
                [value.name]: !allStates[value.name]
              });
              handleChecked(value.name);
            }}
          />
          {value.name}
        </label>
      );
    });
  };

  const handleValuesListArray = () => {
    const data = props.data;
    return data.map((value, index) => {
      return (
        <label className="checkbox column is-one-third" key={index}>
          <input
            type="checkbox"
            name={value}
            checked={allStates[value] || false}
            onChange={e => {
              setAllStates({ ...allStates, [value]: !allStates[value] });
              handleChecked(value);
            }}
          />
          {value}
        </label>
      );
    });
  };

  const handleValuesList = () => {
    const data = props.data;
    if (typeof data[0] === "object") {
      return handleValuesListObject();
    } else {
      return handleValuesListArray();
    }
  };

  return (
    <div className="is-full is-multiline columns rows">
      <div className="is-full column has-text-centered row">
        <a
          href="toggleMultiSelect"
          onClick={e => {
            setToggleValues(!toggleValues);
            e.preventDefault();
          }}>
          <label className="label">{props.label}</label>
        </a>
      </div>
      <div className="row is-full column columns is-multiline">
        {toggleValues && handleValuesList()}
      </div>
      {toggleValues && <div className="column is-full">
        <hr className="has-background-black"></hr>
      </div>}
    </div>
  );
};

MultiSelect.propTypes = {
  data: PropTypes.any,
  handleData: PropTypes.any,
  label: PropTypes.any
};

export default MultiSelect;
