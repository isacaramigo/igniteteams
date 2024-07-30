import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { PLAYER_COLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

//Criando uma função para adicionar um jogador
export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group:string){
    try {
        const storedPlayers = await playersGetByGroup(group) //Armazena um jogador em cada grupo para n permitir que um jogador faça parte de mais de um grupo.

        const playersAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name) //Verifica se o ja tem cadastrado no time um jogador com o mesmo nome e armazena ela no playersAlreadyExists
        
        if (playersAlreadyExists.length > 0){ //Se playersAlreadyExists for maior que 0, essa pessoa ja esta cadastrada em algum time.
            throw new AppError('Essa pessoa já esta cadastrada em algum time aqui.')
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]); //Converte todos os jogadores incluindo o novo no Storage
        
        /*
        CHAVE:
            @ignite-teams: players-NomeDoGrupo: [] ( ${PLAYER_COLECTION}-${group} ) 
        VALOR:

        */

        await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, storage) //Armazenando o jogador no grupo
    } 
    catch (error) {
        throw (error);
    }
}