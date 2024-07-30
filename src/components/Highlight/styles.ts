import styled, {css} from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    margin: 32px 0;
`;

export const Title = styled.Text`
    text-align: center;

    ${({theme}) => css `
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.xl}px;
        color: ${theme.COLORS.WHITE};
    `};

    
`;

export const Subtitle = styled.Text`
    text-align: center;

     ${({theme}) => css `
         font-size: ${theme.FONT_SIZE.md}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLORS.GRAY_300};
     `};
   
`;