import React, { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { StyleSheet, 
        TouchableOpacity, 
        SafeAreaView, 
        StatusBar,
        TextInput,
        Platform,
        Image,
        Button,
       } from 'react-native';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { v4 as uuidv4 } from 'uuid'; 
//import { nanoid } from 'nanoid/async/index.native'
import * as ImageManipulator from 'expo-image-manipulator';







import { Text, View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import ProfilePicture from '../components/ProfilePicture';
import { createTweet } from '../src/graphql/mutations' 


export default function ProfileViewScreen() {

  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  async function signOut() {
        try {
          await Auth.signOut();
        } catch (error) {
          console.log('Error signing out: ', error);
        }
      }



    //   <TouchableOpacity style={styles.button} >
    //   <Text style={styles.buttonText}>Logout</Text>
    // </TouchableOpacity> 

  //   <View style={styles.button}>
  //   <Button title="Sign Out" color={Colors.light.tint} onPress={signOut} />
  // </View>

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={signOut} >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity> 

      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop:StatusBar.currentHeight,
    //backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
    

  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 16,
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    color: 'white',
    height: 100,
    maxHeight: 300,
    fontSize: 21,
    
  },
  pickImage: {
    fontSize: 18,
    color: Colors.light.tint,
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
  },

});


