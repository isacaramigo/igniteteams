import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playersGetByGroup(group: string){

    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLECTION}-${group}`); //Buscando coleção de jogadores pelo grupo que estão
        const players : PlayerStorageDTO[] = storage ? JSON.parse(storage) : []; //Criando uma const com o tio PlayerStorageDTO, se tiver conteudo no storage retorna o parce, caso contrario retorna uma array vazia

        return players;
    } 
    catch (error) {
        throw (error)
    }

}