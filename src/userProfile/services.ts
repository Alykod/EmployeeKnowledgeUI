import { GetUser } from '../services/queries'
import { client } from '../services/apolloClient';
import {CreateUserSkill} from "../services/queries"
import {useQuery} from '@apollo/react-hooks'


export const GetUserInfo = async(id: String)=> {
    try {
        let result = await client.query({
            query: GetUser,
            variables: {
                userId: id
            }
        })
        
        return result.data
    } catch (err) {
        console.error(err)
        return false
    }

}

export function useAddSkill(userId: string, skill: string, level: number){
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