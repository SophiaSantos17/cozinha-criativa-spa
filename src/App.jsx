import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ConfigProfile from './pages/config-profile';
import Perfil from "./pages/profile";
import Home from "./pages/home";
import InfoReceita from "./pages/info-receita";
import EditarReceita from "./pages/editar-receita"
import NovaReceita from './pages/nova-receita';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home/> }></Route>
        <Route path='/gerenciar-perfil' element={ <ConfigProfile/> }></Route>
        <Route path='/perfil' element={ <Perfil/> }></Route>
        <Route path='/nova-receita' element={ <NovaReceita/> }></Route>
        <Route path='/info-receita/:id' element={ <InfoReceita/> }></Route>
        <Route path='/editar-receita/:id' element={ <EditarReceita/> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
