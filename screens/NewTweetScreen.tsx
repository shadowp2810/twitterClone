import React, { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { StyleSheet, 
        TouchableOpacity, 
        SafeAreaView, 
        StatusBar,
        TextInput,
        Platform,
        Image,
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


export default function NewTweetScreen() {

  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {

          let manipResult = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 640, height: 480 } }],
            { format: ImageManipulator.SaveFormat.JPEG }
          );

          //setImageUrl(result.uri);
          setImageUrl(manipResult.uri);
        }
    } catch(E) {
        console.log(E);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();

      const urlParts = imageUrl.split('.');
      const extension = urlParts[urlParts.length - 1];

      const key = `${uuidv4()}.${extension}`;
      //const key = `${nanoid()}.${extension}`;

      await Storage.put(key, blob);

      return key;

    } catch (e) {
        console.log(e);
    }
    return '';
  }


  const onPostTweet = async () => {

    let image;
    if (!!imageUrl) {
      image = await uploadImage();
    }

    try {

      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });

      const newTweet = {
        content: tweet,
        image, 
        userID: currentUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity> 
      </View>
      
      <View style={styles.newTweetContainer}>
        <ProfilePicture image={'https://react.semantic-ui.com/images/avatar/large/matthew.png'}/>
        <View style={styles.inputsContainer}>
          <TextInput 
            style={styles.tweetInput}
            value={tweet}
            //onChange={(e) => setTweet(e.target.value)}
            onChangeText={(value) => setTweet(value)}
            numberOfLines={3}
            multiline={true}
            placeholderTextColor='grey'
            placeholder={"What's happening?"}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.pickImage}> Pick an image </Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
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
