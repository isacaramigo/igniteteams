import { playersGetByGroup } from "./playersGetByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string){
    try {
        const storage = await playersGetByGroup(group) //Buscando os jogadores pelo grupo

        const players = storage.filter(player => player.team == team)//Verifica qm é do time que eu vou selecionar

        return players
    } 
    catch (error) {
        throw (error)
    }
}