import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto"; //importando as fontes

import { Loading } from "@components/Loading";

import theme from "./src/theme";

import { Routes } from "src/routes";

export default function App() {
  const[fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold}); //Carregametno dos estilos de fontes


  return ( 
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content' //Cor dos icones
        backgroundColor='tranparent' //Cor de fundo 
        translucent //Define que o copo do site começa no topo 
      />
      {fontsLoaded ? <Routes/> : <Loading/>}  
      </ThemeProvider>
  );
}
