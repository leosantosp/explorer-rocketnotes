import { createContext, useContext, useState } from "react";
// Bem nos precisamos enviar essas informações para nosso back-end, para isso, vamos importar a api
import { api } from "../services/api";


// posso passar o valor default 
export const AuthContext = createContext({});

// Esta função AuthProvider irá receber um objeto filho
// A ideia é que o children seja as rotas da minha aplicação que será encapsulada
function AuthProvider({ children }){
    const [data, setData] = useState({});

    // Dentro do authprovider, vamos criar uma função assíncrona chamada de signIn
    // ela receberá os dois parametros e-mail e password. Sempre é interessante passar como um objeto para idenpendente da ordem, ele acionar as propriedades
    async function signIn({email, password}){

        try {
            const response = await api.post("/sessions", {email, password});
            const { user, token } = response.data; // Desestruturar do objeto de resposta

            // A partir do momento que o usuário se autentica, ele deve seguir para as proximas requisições
            api.defaults.headers.authorization = `Bearer ${token}`;
            setData({user, token});
            /** Eu vou passar o texto Bearer, estou inserindo um token do tipo Bearer, no cabeçalho por padrão em todas as requisições do usuário 
             * E precisamos guardar essas informações em um estado
            */
        } catch(error){
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert("Não foi possível entrar");
            }
        }
        
    }


    return (
        <AuthContext.Provider value={ { signIn, user: data.user } }>
            {children} 
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context
}

export { AuthProvider, useAuth };