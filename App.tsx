
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Dimensions,

} from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import * as RNFS from '@dr.pogodin/react-native-fs';
import { HomeScreen } from './src/home-screen';


const purple1 = '#1d0124';
const purple2 = '#4a2574';
const purple3 = '#26012f';


function App(): React.JSX.Element {



  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={purple3} />
      <HomeScreen/>
      {/* <ScrollView>
        <Text style={{ marginLeft: 'auto', marginRight: 'auto', height: Dimensions.get('screen').height, verticalAlign: 'middle' }}>{textPage ? textPage : 'N/A'}</Text>

      </ScrollView> */}
    </View>
  );
}
export default App;
