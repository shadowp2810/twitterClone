import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { TweetType } from '../../../../types';
import styles from './styles';
import { createLike, deleteComment, deleteLike } from '../../../../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';


export type FooterContainerProps = {
    tweet: TweetType,
}

const Footer = ({ tweet }: FooterContainerProps) => {

    const [user, setUser] = useState(null);
    const [myLike, setMyLike] = useState(null);
    const [likesCount, setLikesCount] = useState(tweet.likes.items.length);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);

            const searchedLike = tweet.likes.items.find(
                (like) => like.userID === currentUser.attributes.sub
            );
            setMyLike(searchedLike);

        }
        fetchUser();
    }, [])


    const submitLike = async () => {
        const like = {
            userID: user.attributes.sub,
            tweetID: tweet.id,
        }

        try {
            const res = await API.graphql(graphqlOperation(createLike, { input: like }))
            setMyLike(res.data.createLike);
            setLikesCount(likesCount + 1);
        } catch (e) {
            console.log(e);
        }
    }

    const removeLike = async () => {
        try {
            await API.graphql(graphqlOperation(deleteLike, { input: { id: myLike.id }  }))
            setLikesCount( likesCount - 1 );
            setMyLike( null );
        } catch(e) {
            console.log(e);
        }
    }

    const onLike = async () => {

        if(!user) { return; }

        if (!myLike) {
            await submitLike()
        } else {
            await removeLike();
        }
    }


    const navigation = useNavigation();

    const onComment = async () => {
    
        navigation.navigate('CommentsView', {
            tweetID: tweet.id,
          });

        //console.log(tweet.id);
    }

    return(
        <View style={styles.container}>
            <View style={styles.iconContainer}>  
                <TouchableOpacity onPress={onComment}>
                    <Feather name={"message-circle"} size={20} color={'grey'}/>
                </TouchableOpacity>
                <Text style={styles.number}>{tweet.commentCount}</Text>
            </View>

            <View style={styles.iconContainer}>
                <EvilIcons name={"retweet"} size={32} color={'grey'}/>
                <Text style={styles.number}>{tweet.retweetCount}</Text>
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onLike}>
                    <AntDesign name={!myLike ? "hearto" : "heart" } size={20} color={!myLike ? 'grey' : 'red'}/>
                </TouchableOpacity>
                <Text style={styles.number}>{likesCount}</Text>
            </View>

            <View style={styles.iconContainer}>
                <EvilIcons name={"share-google"} size={28} color={'grey'}/>
            </View>
        </View>
    )
}

export default Footer;