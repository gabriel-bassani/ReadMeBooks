import { Dimensions, StyleSheet, View, Text, ScrollView } from "react-native"


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

interface TextBoxProps{
    text: string | undefined;
}

export function TextBox(props: TextBoxProps){

    return(
        <View style={styles.box}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.text}>
                    {props.text ? props.text : 'Selecione um arquivo válido.'}
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        height: '70%',
        // backgroundColor: '#0f0529'
        backgroundColor: '#4a2574',
        borderRadius: 20,
        padding: 10,
    },
    scrollView: {
      flexGrow: 1,             // Permite rolagem se o conteúdo for maior que a caixa
      alignItems: 'center',     // Centraliza horizontalmente o conteúdo dentro da rolagem
      justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16
    }

})