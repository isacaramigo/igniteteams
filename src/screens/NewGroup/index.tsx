import { Button } from "@components/Button";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Alert } from "react-native";

import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup(){
    const [group, setGroup] = useState('')

    const navigation = useNavigation()

    async function handleNew(){
        try {

            if(group.trim( ).length === 0){ //O trim() ignora os espaços no length
                return Alert.alert('Novo Grupo', 'Informe o nome da turma.') //Se o nome da turma não for digitado aparecerá um alerta de erro
            }


            await groupCreate(group); //Armazenando o conteundo
            navigation.navigate('players', { group });
            
        } catch (error) {
            if(error instanceof AppError){ //Verificando se o erro não é uma insatncia da nossa classe, verificando se ja existe um time com esse nome por exemplo
                Alert.alert('Novo Grupo', error.message)
            } 
            else{
                Alert.alert('Novo Grupo', 'Não foi posível criar um novo grupo')
            }
            console.log(error)
        }
    }

    return (
        <Container>
            <Header showBackButton />

            <Content>
                <Icon/>

                <Highlight
                    title="Nova Turma"
                    subtitle="crie a turma para adcionar pessoas"
                />

                <Input
                    placeholder="Nome da Turma"
                    onChangeText={setGroup}
                />

                <Button
                    title="Criar"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />

            </Content>
        </Container>
    )
}