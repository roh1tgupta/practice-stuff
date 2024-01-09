import { useContext, createContext, useState } from 'react';


const ThemeContext = createContext();

export default function UseContextComp() {
  const [theme, setTheme] = useState('');
  return (
  <ThemeContext.Provider value={{
    theme,
    updateTheme: setTheme
  }}>
    <div style={{minWidth: 100, minHeight: 100}}>
      <ChangeThemComp />
    </div>
    
  </ThemeContext.Provider>)
}

function ChangeThemComp() {
  const { theme, updateTheme } = useContext(ThemeContext);
  return (<div style={{width: 80, height: 80, margin: 10, padding:10, backgroundColor: theme}}>
    <button onClick={() => updateTheme(theme === 'darkgrey' ? 'white' : 'darkgrey')}>Change theme</button>
  </div>)
}