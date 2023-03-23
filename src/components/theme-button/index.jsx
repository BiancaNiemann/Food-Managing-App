import React, { useContext } from "react";
import { ThemeContext } from "../../App";

export default function ThemeButton(){

    const {theme, setTheme} = useContext(ThemeContext)

    return (
        <div className="theme-btn">
            <button 
                style={theme ? {backgroundColor : "#12343b"} : {}} 
                onClick={()=> setTheme(!theme)}
            >
                Change Theme
            </button>
        </div>
    )

}