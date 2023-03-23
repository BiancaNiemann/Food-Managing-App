import React, { useContext } from "react";
import { ThemeContext } from "../../App";

export default function ThemeButton(){

    const {theme, setTheme} = useContext(ThemeContext)

    return (
        <button 
            style={theme ? {backgroundColor : "#12343b"} : {}} 
            onClick={()=> setTheme(!theme)}
        >
            Change Theme
        </button>
    )

}