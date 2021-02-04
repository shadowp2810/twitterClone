import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


import styles from './styles';

const NewTweetButton = () => { 

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('NewTweet');
    }

    //<MaterialCommunityIcons name={"feather"} size={30} />


    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.button} 
            onPress={onPress}>
                <Feather name="plus" size={30} color="gold" />
        </TouchableOpacity>
    )

    }

export default NewTweetButton;