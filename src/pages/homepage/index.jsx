import React, { useState, useEffect, useReducer, useContext, useCallback } from "react"
import FavoriteItem from "../../components/favorite-item/index"
import RecipeItem from "../../components/recipe-item"
import Search from "../../components/search"
import data from "../../data"
import { ThemeContext } from "../../App"

function reducer(state, action) {
    switch (action.type) {
        case "filterFavorites":
            return {
                ...state,
                filteredValue: action.value
            }
        default:
            return state
    }
}

const initialState = {
    filteredValue: ""
}

export default function HomePage() {

    const [loadingState, setLoadingState] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [favorites, setFavorites] = useState([])
    const [sucsessApi, setSucsessApi] = useState(false)
    const [filteredState, dispatch] = useReducer(reducer, initialState)
    const { theme } = useContext(ThemeContext)

    function dataFromSearch(getData) {
        setLoadingState(true)

        /*async function getRecipes() {
            const apiResponse = 
                await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=fe43c23afdb64cf1a8385295bd4bd851&query=${getData}")
                const result = await apiResponse.json()
                const { results } = result*/

        // delete both these line
        let results = data
        let filterResults = results.filter(item =>
            item.title.toLowerCase().includes(getData))

        // delete this if statement
        if (filterResults && filterResults.length > 0) {
            setLoadingState(false)
            setRecipes(filterResults)
            setSucsessApi(true)

            /*    
            if (results && results.length > 0) {
                setLoadingState(false)
                setRecipes(results)
                setSucsessApi(true)
            */
            //}
        }
        //getRecipes()
    }

    const addToFavorites = useCallback((getItem) => {
        let copyFavorites = [...favorites]
        const index = copyFavorites.findIndex(item => item.id === getItem.id)
        if (index === -1) {
            copyFavorites.push(getItem)
            setFavorites(copyFavorites)
            localStorage.setItem("favorites", JSON.stringify(copyFavorites))
        } else {
            alert("Item is already added to Favorites")
        }
    }, [favorites])


    function removeFromFavorites(removeItem) {
        let copyFavorites = [...favorites]
        copyFavorites = copyFavorites.filter(item => item.id !== removeItem)
        setFavorites(copyFavorites)
        localStorage.setItem("favorites", JSON.stringify(copyFavorites))
    }

    useEffect(() => {
        const extractFavorites = JSON.parse(localStorage.getItem("favorites"))
        setFavorites(extractFavorites)
    }, [])

    const filteredFavItems = favorites.filter(item =>
        item.title.toLowerCase().includes(filteredState.filteredValue)
    )

    const renderRecipes = useCallback(() => {
        if (recipes && recipes.length > 0) {
            return (
                recipes.map(item =>
                    <RecipeItem
                        addToFavorites={() => addToFavorites(item)}
                        key={item.id} id={item.id}
                        image={item.image}
                        title={item.title}
                    />
                )
            )
        }
    }, [recipes, addToFavorites])

    return (
        <div>

            <Search
                dataFromSearch={dataFromSearch}
                setSucsessApi={setSucsessApi}
                sucsessApi={sucsessApi}
            />
            <div>
                {loadingState &&
                    (<h3 style={theme ? { color: "#12343b" } : {}} >Loading Recipes, please wait</h3>
                    )}
                <h1 style={theme ? { color: "#12343b" } : {}} >Your Recipe search selection</h1>
                <div className="recipe-render">
                    {renderRecipes()}
                </div>

                {
                    !loadingState && !recipes.length &&
                    <h3
                        style={theme ? { color: "#12343b" } : {}}
                    >
                        No recipes are found
                    </h3>
                }
            </div>

            <div>
                <h1 style={theme ? { color: "#12343b" } : {}} >Favorites</h1>
                <div className="search-form">
                    <input
                        name="searchFavorites"
                        placeholder="Search Favorites"
                        onChange={(e) =>
                            dispatch({
                                type: "filterFavorites",
                                value: e.target.value
                            })}
                        value={filteredState.filteredValue} />
                </div>
                <div className="favorite-render">
                    {
                        !filteredFavItems.length &&
                        <h3
                            style={theme ? { color: "#12343b" } : {}}
                        >
                            No favorite recipes are found
                        </h3>
                    }
                    {favorites && favorites.length > 0
                        ? filteredFavItems.map(item =>
                            <FavoriteItem
                                removeFromFavorites={() => removeFromFavorites(item.id)}
                                key={item.id}
                                image={item.image}
                                title={item.title}
                            />)
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
