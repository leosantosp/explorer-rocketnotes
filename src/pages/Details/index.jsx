import { Container, Links, Content } from './styles';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';




export function Details(){

    return(
        <Container>
            <Header/>
            <main>
                <Content>

                    <ButtonText title="Excluir nota"></ButtonText>

                    <h1>Introdução ao React</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                       A corrupti alias adipisci soluta odit. Iusto ut rem nostrum magnam, 
                       unde consequuntur accusamus minima incidunt? Voluptate dolor optio repudiandae omnis quos!
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                       A corrupti alias adipisci soluta odit. Iusto ut rem nostrum magnam, 
                       unde consequuntur accusamus minima incidunt? Voluptate dolor optio repudiandae omnis quos!</p>
                    
                    <Section title="Links úteis">
                        <Links>
                            <li>
                                <a href="#">https://www.rocketseat.com.br/</a>
                            </li>
                            <li>
                                <a href="#">https://www.rocketseat.com.br/</a>
                            </li>
                            <li>
                                <a href="#">https://www.rocketseat.com.br/</a>
                            </li>
                        </Links>
                    </Section>

                    <Section title="Marcadores">
                        <Tag title="express"/>
                        <Tag title="nodejs"/>
                    </Section>

                    <Button title="Voltar"></Button>
                </Content>
            </main>
        </Container>
    )
}

/* Dentro do 'Section' que nós passamos o children */