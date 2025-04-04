import Layout from "./components/Layout/Layout"
// import AddEvento from "./pages/AddEvento/AddEvento"
import DelEvento from "./pages/DelEvento/DelEvento"
import Inicio from "./pages/Inicio/Inicio"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Salir from "./pages/Salir/Salir"
import ThemeConfig from "./theme/ThemeProvider"
import Login from "./pages/Login/Login"
import Calendario from "./pages/Calendario/Calendario"



const App = () => {
  return (

    <ThemeConfig>
      <BrowserRouter>
           <Routes>
                 <Route path="/" element ={ <Login />} />
                 <Route path="/inicio" element ={ <Layout children={ <Inicio/>} /> } />
                 <Route path="/calendario" element ={ <Layout children={ <Calendario />} /> } />
                 <Route path="/addevento"   element={<Layout children={null} />} />
                 <Route path="/delevento" element={ <Layout children={ <DelEvento /> }/>} />
                 <Route path="/salir"  element={ <Layout children={ <Salir/> }/>} />
           </Routes>
      </BrowserRouter>
    </ThemeConfig>
      
  )
}

export default App