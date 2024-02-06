import React from 'react'
import { createContext } from 'react'

export const myContext = createContext();

const MyContext = ({ children }) => {

    return (
        <myContext.Provider >
            <div>{children}</div>
        </myContext.Provider>
    )
}

export default MyContext