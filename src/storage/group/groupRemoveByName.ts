import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLECTION, GROUP_COLECTION } from "@storage/storageConfig";  

import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupDeleted: string ){
    try {
        const storageGroups = await groupsGetAll();

        const groups = storageGroups.filter(group => group !== groupDeleted); //Percorre todos os grupos menos o grupo selecionado
    
        await AsyncStorage.setItem(GROUP_COLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLECTION}-${groupDeleted}`)
    
    } catch (error) {
        throw error;
    }
}