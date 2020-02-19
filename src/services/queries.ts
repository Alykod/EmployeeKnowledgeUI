import {gql} from 'apollo-boost';


export const GetSkills = gql `
query {
  skills {
    name
    _id
  }
}
`


export const SignIn = gql `
query Login($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        tokenExpiration
        userId
    }
}
`


export const GetUser = gql `
query UserById($userId: String!) {
    userById(userId: $userId) {
        firstName
        lastName
        skills{
            level
            interest
            skill {
                name
            }
        }
        _id
        email
        country
        state
        city
        available
        fullTimeEmployee
        role {
          name
        }
    }
}
`

export const CreateUserSkill = gql `
mutation CreateUserSkill($skillName : String!, $level: Int!, $userId: ID!, $interest: Int!) {
    CreateUserSkill(skillName: $skillName, userId: $userId,  level: $level, interest: $interest) {
     _id
    }
  }
`

export const ChangeUserAvailability = gql `
mutation ChangeUserAvailability($userId: ID! $available: Boolean, $role: String, $active: Boolean) {
  ChangeUserAvailability(userId: $userId, available: $available, role: $role, active: $active) {
    _id
  }
}
`


export const CreateNewUser = gql `
mutation CreateUser($firstName : String!, $lastName: String!, $fullTimeEmployee: Boolean!, $email: String!, $password: String!, $country: String!, $city: String!, $state: String!) {
  CreateUser(userInput: {firstName: $firstName, lastName: $lastName, fullTimeEmployee: $fullTimeEmployee, email: $email, password: $password, city: $city, state: $state, country: $country}) {
    token
    tokenExpiration
    userId
  }
}
`

export const GetRoles = gql `
query {
  roles {
    name
    _id
  }
}`

export const GetUsersAndSkills = gql `
query {
    users {
      _id,
      firstName,
      lastName,
      email,
      skills{
        skill{
          name
        }    
        level
        interest
      }
      city,
      state,
      country,
      available,
      fullTimeEmployee,
      role {
        name
      }
    }
  }`


//   `

// export const SelectedPodcastQuery  = gql`
//     query Podcasts($someId: ID!) {
//       podcast(id: $someId) {
//         description
//         title
//         image {
//           url
//           id
//           mime
//         }
//         id
//         audioFile {
//           url
//           id
//           mime
//         }
//       }
//     }
//   `;