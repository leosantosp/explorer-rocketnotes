import { useParams, useNavigate } from "react-router-dom"; // Serve para buscar pelos parâmetros que existe na rota. 
import { useState, useEffect } from "react";
import { api } from "../../services/api";

import { Container, Links, Content } from './styles';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';




export function Details(){

    const params = useParams(); // Criando a função
    const navigate = useNavigate();
    // Criar useEffect para buscar os dados da nota toda vez que ela for buscada e um estado para armazenar os dados da nota

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchNote(){
            const response = await api.get(`/notes/${params.id}`);
            setData(response.data);
        }

        fetchNote();
    }, []);

    function handleBack(){
        navigate("/");
    }

    async function handleRemove(){
        const confirm = window.confirm("Deseja realmente remover a nota?");

        if(confirm){
          await api.delete(`/notes/${params.id}`); 
          navigate("/"); 
        }
    }


    return(
        <Container>
            <Header/>
            {
                data && // Se tem conteúdo, mostra o data
                <main>
                    <Content>

                        <ButtonText 
                            title="Excluir nota"
                            onClick={handleRemove}
                        ></ButtonText>

                        <h1>{data.title}</h1>
                        <p>{data.description}</p>
                        
                        {
                            data.links &&
                            <Section title="Links úteis">
                                <Links>
                                    {             
                                        data.links.map(link => (
                                            <li key={String(link.id)}>
                                                <a href={link.url} target="_blank">
                                                    {link.url}
                                                </a>
                                            </li>
                                        ))  
                                    }
                                </Links>
                            </Section>
                        }

                        {
                            data.tags &&
                            <Section title="Marcadores">
                                {
                                    data.tags.map(tag => (
                                        <Tag
                                            key={String(tag.id)} 
                                            title={tag.name}
                                            />
                                    ))
                                }
                                
                            </Section>
                        }

                        <Button 
                            title="Voltar"
                            onClick={handleBack}
                        ></Button>
                    </Content>
                </main>
            }
        </Container>
    )
}

/* Dentro do 'Section' que nós passamos o children */