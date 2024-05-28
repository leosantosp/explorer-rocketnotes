import { createContext, useContext, useState, useEffect } from "react";
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

            // trabalha com chave > valor
            // padrão recomendado @nomeDaAplicação:nomedachave
            // No localStorage só armazena em formato de texto (string)
            // Posso usar função do JSON, e usar o stringify que vai pegar o json e transformar em texto
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token", token); // Token já é um texto

            //Qual a sacada, eu buscar as informações no localStorage quando ele recarregar a página e preencher o estado

            // A partir do momento que o usuário se autentica, ele deve seguir para as proximas requisições
            // api.defaults.headers.authorization = `Bearer ${token}`;
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;



            setData({ user, token });
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


    function signOut(){
        // Remover do localStorage as informações
        localStorage.removeItem("@rocketnotes:token");
        localStorage.removeItem("@rocketnotes:user");

        setData({});
    }

    async function updateProfile({ user, avatarFile }){
        try {

            if(avatarFile){
                const fileUploadForm = new FormData(); // enviar como arquivo
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                // me devolver usuário com conteúdo atualizado
                user.avatar = response.data.avatar;
            }
            
            await api.put("/users", user); // Preciso atualizar as informações no storage e no state
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // Serve para inserir e atualizar
            setData({ user, token: data.token });
            alert("Perfil atualizado");

        } catch(error){
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert("Não foi possível atualizar o perfil");
            }
        }
    }

    // O que vc quer que executa? Ele sempre vai executar após a renderização do componente
    // Vetor que pode colocar o estado que quiser, só que quando ele mudar, dispara o useEffect novamente. Como não queremos colocar estado dependente, cvamos deixar com o vetor vazio, ou seja,
    // ele vai ser carregado uma vez após a renderização.  
    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token");
        const user = localStorage.getItem("@rocketnotes:user");

        // If para garantir que token e user foram informados
        // se for informado, insere o token e user no cabeçalho
        if(token && user){
            // Se estiver informado
            // api.defaults.headers.authorization = `Bearer ${token}`; // Inserir o token no cabeçalho
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;


            // Salvar dentro do setData, o token e o user e utilizar o JSON.parse() para converter para json. 
            setData({
                token,
                user: JSON.parse(user)
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={ { 
            signIn, 
            signOut,
            updateProfile,
            user: data.user
             } }>
            {children} 
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    return context
}

export { AuthProvider, useAuth };