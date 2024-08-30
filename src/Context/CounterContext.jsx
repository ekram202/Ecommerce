import React, { createContext, useState } from 'react'



export let userContext = createContext();
export default function UserContextprovider(props) {
    const [userlogin, setUserlogin] = useState(
         localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") :null 
        ); 
  return (<>
        <userContext.Provider value={{userlogin , setUserlogin}}>
            {props.children}
        </userContext.Provider>
    </>
  )
}
