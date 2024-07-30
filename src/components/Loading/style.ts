import styled from "styled-components/native";
import theme from "@theme/index";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: ${({theme}) => theme.COLORS.GRAY_600};
`
 

export const LoadIndicator = styled.ActivityIndicator.attrs(({theme}) => ({ //Definindo a identidade visual da bolinha que gira
    color: theme.COLORS.GREEN_700
}))``;