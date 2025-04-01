import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native"
import { Button } from "react-native-elements";

const Main =()=>{
    return(
        <View style ={styles.container} >    
        <ImageBackground source={require('../assets/imagen1.jpg')} style={styles.box}>
            <Button buttonStyle = {{margin: 10}}
               title={
                <Link href="Diagnosticar" style={{ color: 'white', textDecoration: 'none' }}> 
                Diagnosticar
          </Link>          
        } 
        />
            
            </ImageBackground>

            <ImageBackground source={require('../assets/imagen1.jpg')} style={styles.box}>
            <Button buttonStyle = {{margin: 10}}
               title={
                <Link href="Nuevo_caso" style={{ color: 'white', textDecoration: 'none' }}> 
                Nuevo caso 
          </Link>          
        } 
        />
            
            </ImageBackground>

         
          
      
     
    
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: 'white',
  },
  boxL: {
    
   
    margin: 5,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 160
  },
  box: {
    height: 160,
    margin: 5,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'flex-start',
    
    
  },
});

export default Main