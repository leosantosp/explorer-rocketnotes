import { FiPlus, FiX } from 'react-icons/fi';
import { Container } from './styles';

                        // isNew -> saber se é pra adicionar novo item
                        // value -> valor
                        // onClick -> funções
export function NoteItem({ isNew, value, onClick, ...rest}){
    return(
        // Se receber a propriedade isNew, significa que é um novo link
        <Container isNew={isNew}>
            <input
                type="text"
                value={value}
                readOnly={!isNew} // Receberá a propriedade readOnly se não for um isNew
                {...rest} 
            />

            <button 
                type="button"
                onClick={onClick}
                className={isNew ? 'button-add' : 'button-delete'}
            >
                { isNew ? <FiPlus/> : <FiX/> }
            </button>
        </Container>
    );
}