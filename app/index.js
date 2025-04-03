
import { View,Image, StyleSheet, Text } from "react-native";

import AppBar from "../components/appbar";
import Main from "../components/main";

export default function Index(){

    return(        

          <View >
         
            <AppBar></AppBar>
           <Main></Main>
                
          </View>    
        
               
    ) 

}
const styles = StyleSheet.create({
    image: {
      width: 400, // Ancho de la imagen
      height: 300, // Alto de la imagen
    },
  });