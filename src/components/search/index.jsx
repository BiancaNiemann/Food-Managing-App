import React, { useState, useEffect } from "react"


export default function Search(props) {

    const [inputValue, setInputValue] = useState("")

    const { dataFromSearch, setSucsessApi, sucsessApi} = props
    

    function handleInputValue(e) {
        const { value } = e.target
        setInputValue(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dataFromSearch(inputValue)
    }

    useEffect(() => {
        if(sucsessApi){
            setInputValue("")
            setSucsessApi(false)
        }
    },[sucsessApi])
    

    return (
        <form onSubmit={handleSubmit}>
            <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search recipes" id="search" />
            <button type="submit">Search</button>
        </form>
    )
}