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


// export const GetUsersAndSkills = gql `
// query {
//     userSkills {
//       _id,
//       user {
//         firstName,
//         lastName,
//         email
//       }
//       skill {
//         name,
//       }
//       level,
//     }
//   }

export const GetUsersAndSkills = gql `
query {
    users {
      firstName,
      lastName,
      email,
      skills{
        skill{
          name
        }    
        level
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