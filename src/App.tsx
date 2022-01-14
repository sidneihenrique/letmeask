//Importações relativas a navegação de telas
import { BrowserRouter, Routes, Route, }     from 'react-router-dom'
 
//Importação dos componentes
import { Home }                              from './pages/Home';
import { NewRoom }                           from './pages/NewRoom';
 
import { AuthContextProvider }               from './contexts/AuthContext';

import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Routes>
            <Route path= "/"          element={<Home/>}/>
            <Route path= "/rooms/new" element={<NewRoom/>}/>
          </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
