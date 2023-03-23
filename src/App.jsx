import React, { createContext, useState } from "react"
import HomePage from "./pages/homepage"
import ThemeButton from "./components/theme-button"

export const ThemeContext= createContext(null)

function App() {

  const [theme, setTheme ] = useState(false)

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }
    }>
      <div 
        className="App" 
        style={theme ? {backgroundColor: "#feb300"} : {}}
      >
        <ThemeButton />
        <HomePage />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
