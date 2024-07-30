import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLECTION } from "@storage/storageConfig"; //importação da chave da nossa aplicação

//Criando uma função para converter o valor armazenado no Async Storage para um objeto novamente.
export async function  groupsGetAll(){
    const storage = await  AsyncStorage.getItem(GROUP_COLECTION) // Buscar informações armazenadas no dispositivo dentro da chave GROUP_COLECTION, essa informação pdoe ser uma string ou nula

    const groups: string [] = storage ? JSON.parse(storage) : [] // Se o valor armazenado no storage foi verdadeiro (se tiver uam string dentro) irá pegar o conteudo do storage e transforma-lo em objeto, senao retorna uma array vazia

    return groups
}