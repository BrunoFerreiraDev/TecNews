import { createContext, useState } from "react";

export const themaContext = createContext()

export function ThemeProvider({ children }) {
    const [stateTheme, setStateTheme] = useState('dark')


    return (
        <themaContext.Provider value={{ stateTheme, setStateTheme }} >
            {children}
        </ themaContext.Provider>
    )
}
