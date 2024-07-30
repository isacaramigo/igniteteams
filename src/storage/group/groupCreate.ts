import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';
import { AppError } from '@utils/AppError';

// Criando uma função assíncrona (async) para armazenar os valeores no dispositivo do usuário
export async function groupCreate ( newGroup: string ){
    try {
        const storedGroups = await groupsGetAll()
        const groupsAlreadyExist = storedGroups.includes(newGroup) //Verificando se o grupo ja existe
        const storage = JSON.stringify([...storedGroups, newGroup]) //Transfromando em string

        if(groupsAlreadyExist){
            throw new AppError("Já existe um grupo cadastrado com esse nome.")
        }
        
        await AsyncStorage.setItem(GROUP_COLECTION, storage ) //Chave= Group_COLECTION Valor= storage
    } 
    catch (error) {
        throw error; //Lança qual foi o erro
    }
}

