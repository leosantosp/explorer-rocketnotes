import { Container } from './styles';

                        // Converte para primeira letra maiúscula
                        // Só exibe se o ícone existir
export function Input({icon: Icon, ...rest}){
    
    return(
        <Container>
            {Icon && <Icon size={20}/>}
            <input {...rest} />
        </Container>
    );
}