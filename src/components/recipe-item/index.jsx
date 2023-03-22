import React from "react"

export default function RecipeItem(props) {
    const { id, image, title, addToFavorites } = props

    return (
        <div key={id} className="recipe-boxes">
            <div>
                <img src={image} alt="image of recipe"></img>
            </div>
            <p>{title}</p>
            <button type="button" onClick={addToFavorites}>Add to Favorites</button>
        </div>
    )
}