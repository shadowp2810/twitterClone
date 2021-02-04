import React from 'react';
import { Image } from 'react-native';

import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


//import styles from './styles';

export type ProfilePictureProps = {
    image?: string,
    size?: number,
}

const ProfilePicture2 = ({image, size = 50}: ProfilePictureProps) => (
    <Image 
        source={{ uri: image || '' }} 
        style={{ width: size, 
                height: size, 
                borderRadius: size}}
    />
)


const ProfilePicture = ({image, size = 50}: ProfilePictureProps) => { 

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('ProfileView');
    }
    

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            //style={styles.button} 
            onPress={onPress}>
                    <Image 
                        source={{ uri: image || '' }} 
                        style={{ width: size, 
                                height: size, 
                                borderRadius: size}}
                    />
        </TouchableOpacity>
    )

    }

export default ProfilePicture;