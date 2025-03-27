import Layout from "./components/Layout/Layout"
import AddEvento from "./pages/AddEvento/AddEvento"
import DelEvento from "./pages/DelEvento/DelEvento"
import Inicio from "./pages/Inicio/Inicio"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Salir from "./pages/Salir/Salir"
import ThemeConfig from "./theme/ThemeProvider"


const App = () => {
  return (

    <ThemeConfig>
      <BrowserRouter>
           <Routes>
                 <Route path="/" element ={ <Layout children={ <Inicio/>} /> } />
                 <Route path="/addevento" element={ <Layout children={ <AddEvento /> }/>} />
                 <Route path="/delevento" element={ <Layout children={ <DelEvento /> }/>} />
                 <Route path="/salir"  element={ <Layout children={ <Salir/> }/>} />
           </Routes>
      </BrowserRouter>
    </ThemeConfig>
      
  )
}

export default App