// Importar 
import { Routes, Route, Navigate } from 'react-router-dom';

// Importar as páginas
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp'; 


export function AuthRoutes(){
    const user = localStorage.getItem("@rocketnotes:user");

    return(
        // Ele vai envolver todas as minhas rotas
        // Para cada rota eu digo o endereço (path) e quero exibir minha home

        // Recuperar parametro passado pela rota com o /:id
        // Se o usuário não esta logado, aí ele executa essa rota. 
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp/>}/>
            {!user && <Route path="*" element={<Navigate to="/"/>} />}
        </Routes>
    );
}

