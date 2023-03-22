import React from "react"

export default function FavoriteItem(props) {
    const { id, image, title, removeFromFavorites } = props

    return (
        <div key={id} className="recipe-boxes">
            <div>
                <img src={image} alt="image of recipe"></img>
            </div>
            <p>{title}</p>
            <button type="button" onClick={removeFromFavorites} >Remove From Favorites</button>
        </div>
    )
}