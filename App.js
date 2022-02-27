import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, working, setWorking } from 'react-native';
import { theme } from "./colors";

export default function App() {
  const [working, setWorking]=useState(true);
  const travel = () =>setWorking(false);
  const work = () => setWorking(true);    
  return (
    <View style={styles.container}>
     <StatusBar style="auto" />
      <View style={styles.header}>
       <TouchableOpacity onPress={work}> 
         <Text style={styles.btnText}>Work</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={travel}>
         <Text style={styles.btnText}>Travel</Text>
       </TouchableOpacity>
    </View>
   </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header:{
   justifyContent: "space-between",
   flexDirection:"row",
   marginTop:100,

  },
  btnText:{
    fontSize:38,
    fontWeight:"600",
    color: "white",
  },
});
