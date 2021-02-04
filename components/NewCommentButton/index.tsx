import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 


import styles from './styles';

const NewCommentButton = ({tweetID}) => { 

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('NewComment', {
            tweetID: tweetID,
          });
    }
    //<Feather name={"message-circle"} size={20} color={'grey'}/>

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.button} 
            onPress={onPress}>
                <EvilIcons name="comment" size={35} color="gold"  />
        </TouchableOpacity>
    )
}

export default NewCommentButton;