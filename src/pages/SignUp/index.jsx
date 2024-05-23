import { useState } from "react";
import { api } from "../../services/api";

import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Form, Background } from './styles';
import { Link, useNavigate } from 'react-router-dom';



export function SignUp(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); // 

    // Agora o que preciso fazer, saber se deu certo ou errado. Então tenho duas possibilidades, ou usar uma função assíncrona e usar o await e fazer todas as tratativas

    function handleSignUp(){
        // Primeiro quero garantir que nome, email e senha foram devidamente preenchidos antes de prosseguir
        if(!name || !email || !password){
            return alert("Preencha todos os campos!"); // Quando a função encontra um return ali em uma função, ela para. 
        }
        // acessar a api, criar um post acessando a rota /users, e o segundo parametro é um objeto com os valores que foram preenchidos.
        api.post("/users", { name, email, password}).then(() => {
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        }).catch(error => {
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert("Não foi possível cadastrar");
            }
        }); // then() se deu certo, catch() se deu errado
    }


    return(
        <Container>
            <Background/>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>
                
                <h2>Crie sua conta</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={ FiUser }
                    onChange={e => setName(e.target.value)} // O onChange é uma função que toda vez que o valor dentro do input muda, ele aciona a função
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={ FiMail }
                    onChange={e => setEmail(e.target.value)} // O onChange é uma função que toda vez que o valor dentro do input muda, ele aciona a função

                />

                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={ FiLock }
                    onChange={e => setPassword(e.target.value)} // O onChange é uma função que toda vez que o valor dentro do input muda, ele aciona a função

                />

                <Button title="Cadastrar" onClick={handleSignUp}></Button>

                <Link to="/">Voltar para o login</Link>

            </Form>
        </Container>
    );
}