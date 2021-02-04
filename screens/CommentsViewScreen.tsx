import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import CommentsFeed from '../components/CommentsFeed';
import NewCommentButton from '../components/NewCommentButton';
import Colors from '../constants/Colors';



export default function CommentsViewScreen() {
  
  const navigation = useNavigation();


  //From Tweet Footer when commments is pressed
  const route = useRoute();
  const { tweetID } = route.params;

  //console.log(tweetID);
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <AntDesign name="close" size={30} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.newCommentContainer}>
          <CommentsFeed tweetID={tweetID} />
        </View>
        
        <NewCommentButton tweetID={tweetID} />

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({


  headerContainer: {
    width: '100%',
    //flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom:0,
  },

  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop:StatusBar.currentHeight,
    //backgroundColor: 'white',
  },
  newCommentContainer: {
    width:'100%',
    flexDirection: 'row',
    //padding: 5,
    flex: 1,
  },
  newCommentButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

});
