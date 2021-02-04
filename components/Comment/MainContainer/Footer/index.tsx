import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { CommentType, TweetType } from '../../../../types';
import styles from './styles';
import { createCommentLike, deleteCommentLike } from '../../../../src/graphql/mutations';


export type FooterContainerProps = {
    comment: CommentType
}

const Footer = ({ comment }: FooterContainerProps) => {

    const [user, setUser] = useState(null);
    const [myCommentLike, setMyCommentLike] = useState(null);
    const [likesCount, setCommentLikesCount] = useState(comment.likes.items.length);



    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);

            const searchedLike = comment.likes.items.find(
                (like) => like.userID === currentUser.attributes.sub
            );
            setMyCommentLike(searchedLike);

        }
        fetchUser();
    }, [])

    const submitCommentLike = async () => {
        const like = {
            userID: user.attributes.sub,
            commentID: comment.id,
        }

        try {
            const res = await API.graphql(graphqlOperation(createCommentLike, { input: like }))
            setMyCommentLike(res.data.createCommentLike);
            setCommentLikesCount(likesCount + 1);
        } catch (e) {
            console.log(e);
        }
    }

    const removeCommentLike = async () => {
        try {
            await API.graphql(graphqlOperation(deleteCommentLike, { input: { id: myCommentLike.id }  }))
            setCommentLikesCount( likesCount - 1 );
            setMyCommentLike( null );
        } catch(e) {
            console.log(e);
        }
    }

    const onCommentLike = async () => {

        if(!user) { return; }

        if (!myCommentLike) {
            await submitCommentLike()
        } else {
            await removeCommentLike();
        }

       
    }

    return(
        <View style={styles.container}>

            <View style={styles.iconContainer}>
                <EvilIcons name={"retweet"} size={32} color={'grey'}/>
                <Text style={styles.number}>{comment.retweetCount}</Text>
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onCommentLike}>
                    <AntDesign name={!myCommentLike ? "hearto" : "heart" } size={20} color={!myCommentLike ? 'grey' : 'red'}/>
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