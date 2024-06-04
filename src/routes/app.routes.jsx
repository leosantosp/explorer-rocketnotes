// Importar 
import { Routes, Route, Navigate } from 'react-router-dom';

// Importar as páginas
import { New } from '../pages/New';
import { Home } from '../pages/Home'; 
import { Profile } from '../pages/Profile'; 
import { Details } from '../pages/Details'; 

export function AppRoutes(){
    return(
        // Ele vai envolver todas as minhas rotas
        // Para cada rota eu digo o endereço (path) e quero exibir minha home

        // Recuperar parametro passado pela rota com o /:id
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new" element={<New/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}

