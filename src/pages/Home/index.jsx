import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();
    

    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    function handleTagSelected(tagName){

        if(tagName === "all"){
            return setTagsSelected([]);
        }
        
        const alreadySelected = tagsSelected.includes(tagName);

        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }

    }

    function handleDetails(id){
        navigate(`/details/${id}`);
    }
    


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

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagsSelected, search]); // Todos os estados que você colocar, quando mudar o conteúdo de um dos dois, ele executará novamente o useEffect

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
                      onClick={() => handleTagSelected("all")}
                      $isactive={tagsSelected.length === 0} //pegar esse estado e verificar o tamanho
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                $isactive={tagsSelected.includes(tag.name)}
                            />
                        </li>        
                    ))   
                }
                
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    icon={ FiSearch }
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                             key={String(note.id)}
                             data={note}
                             onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar nota
            </NewNote>
        </Container>
    );
}