import * as RNFS from '@dr.pogodin/react-native-fs'; // Biblioteca para ler arquivos
import Tts from 'react-native-tts';
import Pdf from 'react-native-pdf';
import { Alert, Button, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PDFDocument } from 'pdf-lib';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { TextBox } from '../components/text-box';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PAGE_SIZE = 1500;


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export function HomeScreen(){
    const [ page, setPage ] = useState<number>(0);
    const [ textPage, setTextPage ] = useState<string>();
    const [ fileOpened, setFileOpened ] = useState<DocumentPickerResponse>();
  
    const handleFileSelection = async () => {
      try {
        // Abre o seletor de arquivos
        const res: DocumentPickerResponse[] = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
  
        // Checa se há pelo menos um arquivo selecionado
        if (res.length > 0) {
          // Acessa o primeiro arquivo selecionado
          const file = res[0];
          setFileOpened(file);
          // Desestruturando as propriedades do arquivo
          const { uri, name, type } = file;
  
          // Exibe informações do arquivo selecionado
          Alert.alert('Arquivo Selecionado', `Nome: ${name}\nTipo: ${type}\nURI: ${uri}`);
  
          // Exemplo de leitura do conteúdo do arquivo usando react-native-fs
          if (uri) {
            const pageContent = await RNFS.read(uri, PAGE_SIZE, page);
            setTextPage(pageContent);
            // const fileContent = await RNFS.readFile(uri);
            // console.log('Conteúdo do Arquivo:', pageContent.length);
            // console.log('Conteúdo do Arquivo:', pageContent.substring(0, 1000));
          }
        }
      } catch (err: any) {
        if (DocumentPicker.isCancel(err)) {
          Alert.alert('Seleção de Arquivo Cancelada');
        } else {
          Alert.alert('Erro', `Erro ao selecionar arquivo: ${err.message}`);
        }
      }
    };

    const handlePage = async (pageParam: number) => {
        if(fileOpened){
            console.log('fileOpened:', fileOpened);
            console.log('pageParam:', pageParam);
            
            const { uri, name, type } = fileOpened;
            const pageContent = await RNFS.read(uri, PAGE_SIZE, pageParam * PAGE_SIZE);
            setTextPage(pageContent);
            setPage(pageParam);
        }
    }

    const handleTextToSpeech = async (play: boolean) => {
        if(textPage && play) Tts.speak(textPage);
        if(textPage && !play) Tts.stop();
    }

    return(
        <View style={styles.container}>
            {/* <Button title="Selecionar Arquivo" onPress={handleFileSelection} />
            <View style={styles.circle}><Icon name='volume-high' size={20}/></View> */}
            <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
                <TouchableOpacity 
                    onPress={() => {
                        handleFileSelection();
                    }}
                >
                    <View style={styles.circleTop}><Icon name='file-document-outline' size={20}/></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        handleTextToSpeech(true);
                    }}
                >
                <View style={[styles.circleTop, { marginHorizontal: 20 }]}><Icon name='volume-high' size={20}/></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        handleTextToSpeech(false);
                    }}
                >
                    <View style={styles.circleTop}><Icon name='volume-off' size={20}/></View>
                </TouchableOpacity>
            </View>
            <TextBox text={textPage}/>
            <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
                <TouchableOpacity 
                    onPress={() => {
                        if(page > 0) handlePage(page-1);
                    }}
                >
                    <View style={styles.circleBottom}><Icon name='menu-left-outline' size={30}/></View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        handlePage(page+1);
                    }}
                >
                <View style={[styles.circleBottom, { marginHorizontal: 20 }]}><Icon name='menu-right-outline' size={30}/></View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor: '#4a2574',
        backgroundColor: '#15011a',
        width,
        height
    },
    circleTop:{
        paddingTop: 10,
        backgroundColor: '#9e72c3',
        borderWidth: 3,
        borderColor: '#4a2574',
        height: 50,
        width: 50,
        borderRadius: 35,
        alignItems: 'center',
        top: 20,
        zIndex: 100
    },
    circleBottom:{
        paddingTop: 6,
        backgroundColor: '#9e72c3',
        borderWidth: 3,
        borderColor: '#4a2574',
        height: 50,
        width: 50,
        borderRadius: 35,
        alignItems: 'center',
        bottom: -20,
        zIndex: 100
    }
});