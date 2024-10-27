import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MenuBtnContext = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true); // Initialize your state here

    return (
        <MyContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
            {children}
        </MyContext.Provider>
    );
};