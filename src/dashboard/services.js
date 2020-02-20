import {useDispatch, useSelector} from 'react-redux';


export const handleFilterValues = data => {
  let cities = [];
  let countries = [];
  let roles = [];
  data.forEach(employee => {
    cities = [...cities, employee.city];
    // countries = [...countries, employee.country];
    roles = [...roles, employee.role.name];
  });
  cities = [...new Set(cities)];
  // countries = [...new Set(countries)];
  roles = [...new Set(roles)];

  return { cities, countries, roles };
};
