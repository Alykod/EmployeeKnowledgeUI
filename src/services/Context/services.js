import _ from 'lodash';

export const handleFilterEmployees = (allEmployees, filteringValues) => {
  let employees = allEmployees.filter((employee) => {
    let filterCities = filteringCities(employee, filteringValues);
    // let filterCountries = filteringCountries(employee, filteringValues);
    let filterSkills = filteringSkills(employee, filteringValues);
    let filterRoles = filteringRoles(employee, filteringValues);
    let filterFullTimeEmployee = employee.fullTimeEmployee === filteringValues.fullTimeEmployee 
    let filterAvailable = employee.available === filteringValues.available
    let filterName = true
    if(filteringValues.userName !== ""){
       filterName = employee.firstName.toLowerCase().includes(filteringValues.userName.toLowerCase()) || employee.lastName.toLowerCase().includes(filteringValues.userName.toLowerCase())
    }
    if(filterCities && filterSkills && filterRoles && filterFullTimeEmployee && filterAvailable && filterName) {
      return true;
    } else {
      return false;
    }
  })
  return employees;
}


const filteringRoles = (employee, filteringValues) => {
    return filteringValues.roles.length === 0 ? true : filteringValues.roles.includes(employee.role.name);
}

const filteringCities = (employee, filteringValues) => {
    return filteringValues.cities.length === 0 ? true : filteringValues.cities.includes(employee.city);
  }

  // const filteringCountries = (employee, filteringValues) => {
  //   return filteringValues.countries.length === 0 ? true : filteringValues.countries.includes(employee.country);
  // }
  const filteringSkills = (employee, filteringValues) => {
    let employeeSkills = employee.skills.map((skill) => skill.skill.name);
    if(filteringValues.skills.length === 0) {
      return true;
    } else {
      let intersectionArray = _.intersection(filteringValues.skills, employeeSkills)
      return _.isEqual(_.sortBy(intersectionArray), _.sortBy(filteringValues.skills));
    }
  }


