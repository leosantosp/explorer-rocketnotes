import { useState } from "react";


import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';


import { Container, Form } from './styles';

export function New(){
    const [links, setLinks] = useState([]); // Guarda todos os links
    const [newLink, setNewLink] = useState(""); // Estado começa com uma string vazia

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]); // Acessar o conteúdo anterior, monta um novo array com tudo que tinha antes e o novo array
        setNewLink(""); // Limpar ele para ter meu estado resetado
    }

    // handle é interessante de ser opção que é executada em função de uma ação do usuário
    function handleRemoveLink(deleted){ // Vou receber qual link quero deletar
        setLinks(prevState => prevState.filter(link => link !== deleted)) 
        /* 
            Retornar nova lista com base no que vou aplicar aqui. 
            Quero remover um link? Quero retornar todos os links da coleção, 
            exceto o link que quero deletar e tenho uma lista nova 
        */

    }



    return(
        <Container>
             <Header/>

             <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">Voltar</Link>
                    </header>

                    <Input placeholder="Titulo"/>
                    <Textarea placeholder="Observações"></Textarea>

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)} // Sempre que tenho componente que vai ser renderizado por lista
                                    value={link}
                                    onClick={() => handleRemoveLink(link)} // quando tem parâmetro, faz assim
                                />
                            )) // Percorrer cada um que existe dentro
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e=>setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            <NoteItem value="React" />
                            <NoteItem isNew placeholder="Nova tag"/>
                        </div>
                    </Section>

                    <Button title="Salvar"/>
                </Form>
             </main>
        </Container>
    );
}