import React, { useState, useEffect, useContext } from "react"
import { ThemeContext } from "../../App"


export default function Search(props) {

    const [inputValue, setInputValue] = useState("")

    const { dataFromSearch, setSucsessApi, sucsessApi } = props

    const { theme } = useContext(ThemeContext)


    function handleInputValue(e) {
        const { value } = e.target
        setInputValue(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dataFromSearch(inputValue)
    }

    useEffect(() => {
        if (sucsessApi) {
            setInputValue("")
            setSucsessApi(false)
        }
    }, [sucsessApi, setSucsessApi])


    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input name="search" onChange={handleInputValue} value={inputValue} placeholder="Search recipes" id="search" />
            <button
                type="submit"
                style={theme ? { backgroundColor: "#12343b" } : {}}
            >
                Search
            </button>
        </form>
    )
}