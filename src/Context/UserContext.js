import { createContext, useState } from "react";

export let UserContext=createContext();


export default function UserContextProvider(props){
    const [userToken, setuserToken] = useState(null)
    const [userData, setuserData] = useState(null)

    return  <UserContext.Provider value={{userToken,setuserToken,setuserData,userData}}>
                {props.children}
            </UserContext.Provider>

}