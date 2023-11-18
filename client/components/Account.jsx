import React from "react";
import { useSelector } from "react-redux";



const Account = () => {
    const user = useSelector(state => state.token.user)

    console.log("user details:", user)
    return (
        <div>
            <h1> This is the user account page! </h1>
            {user && (
                <div>
                    <h2>ACCOUNT INFO</h2>
                    <h3>{user.name}</h3>
                    <h3>{user.username}</h3>
                </div>
            )}
            {/* Order History Here */}
        </div>
    );
};  

export default Account; 
