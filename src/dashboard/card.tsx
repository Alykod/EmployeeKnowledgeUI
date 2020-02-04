import React from 'react';
interface UserProps {
    _id: String,
    level: number,
    user: User,
    skill: Skill
}

interface User {
    firstName: String,
    lastName: String,
    email: String
}

interface Skill {
    name: String
}


const UserCard = ({ _id, level, user }: UserProps) => {
    return (
        <div className="card cardSmall">
            <div className="card-content">
                <p className="is-size-2-desktop">{user.firstName} {user.lastName}</p>
                <p>{user.email}</p>

            </div>
        </div>
    )

}
export default UserCard