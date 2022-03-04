import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";

const STORAGE_KEY="@toDos"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] =useState("");
  const [toDos, setToDos] =useState({});
  useEffect(() => {loadToDos();},[]);
  const travel = () =>setWorking(false);
  const work = () => setWorking(true);    
  const onChangeText = (payload)=> setText(payload);
  const saveToDos = async (toSave)=> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos =async() => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if(s){
      setToDos(JSON.parse(s));
    }   
  };

   const addToDo = async()=>{
    if(text ===""){
      return;
    }
    
    //const newToDos=Object.assign({}, toDos, {
    //[Date.now()]: {text, work:working}}); *Object.assign으로 기존 객체에 새로운 객체 추가하기
    const newToDos ={...toDos, [Date.now()]: {text, working},
  };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    if(Platform.OS === "web") {
      const ok=confirm("Do you want to delete this To Do?");
      if(ok){
        const newToDos = {...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      }
    }else {Alert.alert(
        "Delete To Do",
        "Are You sure?", [
        {text: "Cancel"},
        {text: "I'm Sure", 
        onPress: async()=> {
        const newToDos = {...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        await saveToDos(newToDos);  
      },
    },     
  ]);
}
   };
  return (
    <View style={styles.container}>
     <StatusBar style="auto" />
      <View style={styles.header}>
       <TouchableOpacity onPress={work}> 
         <Text style={{  fontSize:38,
    fontWeight:"600", color: working ? "white": theme.grey}}>Work</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={travel}>
         <Text style={{  fontSize:38,
    fontWeight:"600", color: !working ? "white": theme.grey}}>Travel</Text>
       </TouchableOpacity>
    </View>
      <TextInput 
      onSubmitEditing={addToDo}
      onChangeText={onChangeText}
      returnKeyType="done"
      value={text}
      placeholder={working ? "Add a To Do" : "where do you want to go?"} style={styles.input} />
     <ScrollView>{
       Object.keys(toDos).map(key=>
       toDos[key].working === working ?( <View style={styles.toDo} key={key}>
        <Text style={styles.toDoText}>{toDos[key].text}</Text>
        <TouchableOpacity onPress={() =>deleteToDo(key)}>
        <FontAwesome name="trash" size={18} color="white" />
        </TouchableOpacity>
       </View> 
        ) : null
       )}
       </ScrollView> 
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
  input: {
    backgroundColor: "white",
    paddingVertical:8,
    paddingHorizontal:20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 15,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
 
