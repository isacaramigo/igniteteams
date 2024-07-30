import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter"
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";


import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParms = {
    groups: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    
    const navigation = useNavigation()

    const rout = useRoute()
    const {group} = rout.params as RouteParms;

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer( ) {
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar') 
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur() //Tira o foco do input, tirar a barrinha q fica piscando no input e fecha o teclado do input depois que adiciona o jogador
            //Keyboard.dismiss(), também fecha o teclado do input depois que adiciona o jogador

            setNewPlayerName('') //Limpa input depois de adicionar um jogador
            fetchPlayersByTeam()
        } 
        
        catch (error) {
            if (error instanceof AppError){
                Alert.alert('Nova Pessoa', error.message)
            }
            else{
                console.log(error);
                Alert.alert('Nova Pessoa', 'Não foi pessível adicionar.');
            }
        }
    }

    //Funçaõ para fiktar as pessoas pelos times (A ou B)
    async function fetchPlayersByTeam( ) {
        try {
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        }
        catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessaos filtradas do time selecionado.')
        }
        finally{
            setIsLoading(false);
        }
        
    }

    async function handlePlayerRemove (playerName: string){
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam();
        } catch (error) {
            console.log(error)
            Alert.alert('Remover Pessoa', 'Não foi possivel remover essa pessoa do time.')
        }
    }

    async function groupRemove(){

        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch (error) {
            console.log(error)
            Alert.alert('Remocer Grupo', 'Não fpoi possivel remover o grupo')
        }
    }

    async function handleGroupRemove(){
        Alert.alert(
            'Remover', 
            'Deseja remover Grupo?',
            [
                {text:'Não', style:'cancel'},
                {text: 'Sim', onPress: () => groupRemove() }
            ]

        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return(
        <Container>
            <Header showBackButton/>

            <Highlight
                title= {group}
                subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input
                    inputRef = {newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Nome da pessoa"
                    autoCorrect= {false}
                    onSubmitEditing={handleAddPlayer} //Deixa o usuario adicionar mais uma pessoa apertando o "retorno" do teclado
                    returnKeyType="done" //Muda o "Retorno" para "Concluido".
                />

                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>

            {
                isLoading ? <Loading/> :
                <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name) }
                    />
                )}
                ListEmptyComponent= {() => (
                    <ListEmpty 
                      message="Não há pessoas nesse time."
                    />
                  )}
                showsHorizontalScrollIndicator={false} //Tira a barrinha de rolagem da fletList

                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}

                ]}
            />}

            <Button
                title="Remover turma"
                type="SECUNDARY"
                onPress={handleGroupRemove}
            />
            
        </Container>
    );
}