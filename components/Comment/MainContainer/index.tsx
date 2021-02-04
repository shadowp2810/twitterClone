import React from 'react';
import { View, Text, Image } from 'react-native';
import { S3Image } from 'aws-amplify-react-native';

import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import { CommentType } from '../../../types';
import styles from './styles';

import Footer from './Footer'

export type MainContainerProps = {
    comment: CommentType,
}

const MainContainer = ({ comment }: MainContainerProps) => (
    <View style={styles.container}>

        <View style={styles.commentHeaderContainer}>
            <View style={styles.commentHeaderNames}>
                <Text style={styles.name} >{ comment.user.name }</Text>
                <Text style={styles.username} >@{ comment.user.username }</Text>
                <Text style={styles.createdAt} >{moment(comment.createdAt).fromNow()} </Text>
            </View>
            <Entypo name ={"chevron-down"} size={16} color={'grey'}/>
        </View>

        <View>
            <Text style={styles.content}>{ comment.content }</Text>
            {!!comment.image && <S3Image style={styles.image} imgKey={comment.image} />}
        </View>
        <Footer comment={comment} />
    </View>
)

export default MainContainer;