import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    commentHeaderContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentHeaderNames: {
        flexDirection: 'row',
    },
    name: {
        marginRight: 5,
        color: 'white',
        fontWeight: 'bold',
    },
    username: {
        marginRight: 5,
        color: 'grey',
    },
    createdAt: {
        color: 'white',
        marginRight: 5,

    },
    content: {
        marginTop: 7,
        color: 'white',
        lineHeight: 21,

    },
    image: {
        marginVertical: 10,
        width: "100%",
        aspectRatio: 4/3,
        //height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
    },
});

export default styles;