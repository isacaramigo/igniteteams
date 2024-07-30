import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string ){
    try {
        const storage = await playersGetByGroup(group);

        const filtered = storage.filter(player => player.name !== playerName) //Filta os nomes para ver se é diferente no nome que eu quero remover
        const players = JSON.stringify(filtered) //Armazenando todos os nomes que não são iguais ao nome selecionado

        await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, players) //
    } catch (error) {
        throw error;
    }
}