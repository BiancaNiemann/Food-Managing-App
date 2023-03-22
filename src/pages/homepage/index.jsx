import React, { useState } from 'react'
import RecipeItem from '../../components/recipe-item';
import Search from '../../components/search';

export default function HomePage() {

    const [loadingState, setLoadingState] = useState(false)
    const [recipes, setRecipes] = useState([])

    function dataFromSearch(getData) {

        setLoadingState(true)

        async function getRecipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fe43c23afdb64cf1a8385295bd4bd851&query=${getData}`)
            const result = await apiResponse.json()
            const { results } = result

            if (results && results.length > 0) {
                setLoadingState(false)
                setRecipes(results)
            }
        }
        getRecipes()
    }

    

    return (
        <div>
            <Search dataFromSearch={dataFromSearch} />
            {loadingState && (<h3>Loading Recipes, please wait</h3>)}
            <div className="recipe-render">
                {recipes && recipes.length > 0 
                    ? recipes.map(item => <RecipeItem id={item.id} image={item.image} title={item.title} />)
                    : null
                }    
            </div>
        </div>
    )
}
