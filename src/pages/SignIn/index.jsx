import { useAuth } from "../../hooks/auth.jsx";
import { useState } from "react"; // Para criar estados para então armazenar essas informações

import { FiMail, FiLock } from 'react-icons/fi';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Form, Background } from './styles';
import { Link } from 'react-router-dom';




export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { signIn } = useAuth();

    // Gosto de utilizar essa nomenclatura handle quando o usuario precisa interagir
    function handleSignIn(){
        signIn({ email, password })
    }
    

    return(
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>
                
                <h2>Faça seu login</h2>

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={ FiMail }
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={ FiLock }
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Entrar" onClick={handleSignIn}></Button>

                <Link to="/register">Criar conta</Link>

            </Form>
            <Background/>
        </Container>
    );
}