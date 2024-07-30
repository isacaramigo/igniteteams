import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackButton ,BackIcon } from "./style";

import LogoImg from '@assets/logo.png'

//Criando um componente flexivel.
type Props = {  
    showBackButton?: boolean;
}

export function Header({showBackButton = false } : Props){ //Se o ShowBackButton for false retorna só o logo, se não (definido no index.tsx no Groups) retorna com a stinha tbm
    const naviagtion = useNavigation()
    
    function handleGoBack(){
        naviagtion.navigate('groups'); //Volta pra tela anterior usa o  goBack(), voltar para uma tela especifica coloca: navigate('nomeDaTela')
    }
    
    return(
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handleGoBack}>
                <BackIcon/>

            </BackButton>
            }
            <Logo source={LogoImg}/>
        </Container>
    )
}