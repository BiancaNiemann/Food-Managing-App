import React, { useState } from 'react'


export default function Search(props) {

    const [inputValue, setInputValue] = useState('')

    const { dataFromSearch } = props

    function handleInputValue(e) {
        const { value } = e.target
        setInputValue(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dataFromSearch(inputValue)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="search" onChange={handleInputValue} valaue={inputValue} placeholder="Search recipes" id="search" />
            <button type="submit">Search</button>
        </form>
    )
}