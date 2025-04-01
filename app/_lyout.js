import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import AppBar from "../components/appbar";
import Main from "../components/Main";

export default function layout() {
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Distribuir el espacio verticalmente
    backgroundColor: "#F8F9FA",
  },
});