import { useState, useEffect } from "react";
import { api } from "../../services/api";

import { FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { Note } from '../../components/Note';


export function Home(){
    const [tags, setTags] = useState([]);

    


    // useEffect é executada quando nosso componente é carregado, e o segundo valor é o state de dependência, pode deixar vazio para ser apenas quando o componente é renderizado
    useEffect(() => {
        // Quando vc tem função que quer reaproveitá-la, você pode fazer desta forma
        async function fetchTags(){
            // Ela vai buscar pelas tags. Se colocar aqui, ela vai ser possível ser utilizada em todo o escopo. 
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        isActive 

                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                                title={tag.name}
                            />
                        </li>        
                    ))   
                }
                
            </Menu>

            <Search>
                <Input placeholder="Pesquisar pelo título" icon={ FiSearch }/>
            </Search>

            <Content>
                <Section title="Minhas notas">
                    <Note data={{
                            title: 'React', 
                            tags: [
                                {id: '1', name: 'react'},
                                {id: '2', name: 'rocketseat'}
                            ]
                        }}/>
                </Section>

            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}