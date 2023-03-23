import React, { useContext } from "react"
import { ThemeContext } from "../../App"

export default function FavoriteItem(props) {
    const { id, image, title, removeFromFavorites } = props
    const {theme} = useContext(ThemeContext)

    return (
        <div key={id} className="recipe-boxes">
            <div>
                <img src={image} alt="image of recipe"></img>
            </div>
            <p style={theme ? {color : "#12343b"} : {}} >{title}</p>
            <button 
                type="button" 
                onClick={removeFromFavorites} 
                style={theme ? {backgroundColor : "#12343b"} : {}} 
            >
                Remove From Favorites
            </button>
        </div>
    )
}