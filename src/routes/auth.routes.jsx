// Importar 
import { Routes, Route } from 'react-router-dom';

// Importar as páginas
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp'; 


export function AuthRoutes(){
    return(
        // Ele vai envolver todas as minhas rotas
        // Para cada rota eu digo o endereço (path) e quero exibir minha home

        // Recuperar parametro passado pela rota com o /:id
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>
        </Routes>
    );
}

