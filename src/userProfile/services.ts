import { GetUser } from '../services/queries'
import { client } from '../services/apolloClient';


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