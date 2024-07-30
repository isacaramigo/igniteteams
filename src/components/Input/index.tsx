import {TextInput, TextInputProps} from "react-native";

import { Container } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
    inputRef? : React.RefObject<TextInput>;
}

export function Input({inputRef, ...rest} : Props){
    const { COLORS } = useTheme(); //Desestruturando o theme para pegar só as cores dele.

    return (
        <Container
        ref={inputRef}
        placeholderTextColor= {COLORS.GRAY_300}
            {...rest}
        />
    );
}