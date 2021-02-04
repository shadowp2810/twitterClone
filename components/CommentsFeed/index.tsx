import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { listComments, listTweets } from '../../src/graphql/queries';
import { TweetType } from '../../types';
import Tweet from '../Tweet';
import Comment from '../Comment';


const CommentsFeed = ({tweetID}) => {

    const[tweet, setTweet] = useState();
    const[comments, setComments] = useState( [] );
    const [loading, setLoading] = useState( false );

    const fetchTweet = async () => {
        setLoading( true );
        try{
            const tweetData = await API.graphql(graphqlOperation(listTweets, {filter: {id: {contains: tweetID}}}));

            setTweet(tweetData.data.listTweets.items);

        } catch(e) {
            console.log(e);
        } finally {
            setLoading( false );
        }
    }

    const fetchComments = async () => {
        setLoading( true );
        try{
            const commentsData = await API.graphql(graphqlOperation(listComments, {filter: {tweetID: {contains: tweetID}}}));
            setComments(commentsData.data.listComments.items);

        } catch(e) {
            console.log(e);
        } finally {
            setLoading( false );
        }
    }

    useEffect( () => {
        fetchTweet();
        fetchComments();
    }, [])



    return (
        <SafeAreaView style={{ width: '100%', flex: 1, }}>
            <View style={styles.container}>
                <FlatList
                        data={tweet} 
                        renderItem={({item}) => <Tweet tweet={item} />} 
                        keyExtractor={(item) => item.id } 
                        refreshing={loading}
                        onRefresh={fetchTweet}
                    />
            </View>

            <FlatList 
                    data={comments.sort((b, a) => a.createdAt.localeCompare(b.createdAt))}
                    renderItem={({item}) => <Comment comment={item} />} 
                    keyExtractor={(item) => item.id } 
                    refreshing={loading}
                    onRefresh={fetchComments}
            />




        </SafeAreaView>
    )
}

export default CommentsFeed;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        //                    data={comments} 
        //justifyContent: 'center',
        //flexDirection: 'column',
        //borderBottomWidth: 0.5,
        borderColor: 'grey',

    },
    container2: {
        flexGrow: 1,
        //width: '100%',
        //justifyContent: 'center',
        //flexDirection: 'row',
        //borderBottomWidth: 0.5,
        //borderColor: 'grey',

    },
  });