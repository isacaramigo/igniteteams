import { createNativeStackNavigator } from "@react-navigation/native-stack"; //Importação do tiopo de navegação que estamos usadno

import { Groups } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";

const { Navigator, Screen } = createNativeStackNavigator() //desestruturando o createNativeStackNavigator() e selecionando o q vai ser usado, nesse caso será usado a navegação e as telas.

export function AppRoutes(){
    return(
        // Criando uma navegação pelas seguintes telas: 
        <Navigator screenOptions={{headerShown: false}}> 

            <Screen
                name="groups" //Nome da rota
                component={Groups} //Quando essa rota for chamada o componente acionado será o Groups
            />
            <Screen
                name="new"
                component={NewGroup}
            />

            <Screen
                name="players"
                component={Players}
            />

        </Navigator>
    );
}