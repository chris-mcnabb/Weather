import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },

    modalView: {
        flex: 1,
        marginTop: 50,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 400,
        backgroundColor: 'grey',
        opacity: .8,
        borderRadius: 20,
        padding: 25,
        width: 330,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50
    },
    button: {
        marginTop: 25,
        borderRadius: 20,
        padding: 5,
        elevation: 2
    },
    button_1: {
        flex: .05,
        marginTop: 75,
        alignItems: 'center',


    },

    buttonOpen: {
        backgroundColor: "green",
    },
    buttonClose: {
        backgroundColor: "transparent",
    },
    textStyle: {


        fontWeight: "bold",
        textAlign: "justify"
    },
    searchtextStyle: {
        marginTop: 140,
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        opacity: 1,
        marginBottom: 90,
        textAlign: "center"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        justifyContent: "center"
    },
    test_text: {
        marginBottom: 20,

        flex: 1,
        textAlign: 'center',
        fontSize: 80,
        color: 'orange',
        fontWeight: 'bold',
        alignItems: 'center',
        zIndex: 1
    },
    choice: {

        fontWeight: 'bold'
    },
    tempNow: {
        paddingTop: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 90,


    },
    city: {
        textAlign: 'center',
        fontSize: 50,
    },
    country: {
        textAlign: 'center',
        fontSize: 30,
    },
    temp2: {
        textAlign: 'center',
        fontSize: 25,
    },
    cond: {
        textAlign: 'center',
        fontSize: 15,
    },
    degree: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    current: {
        marginTop: 15,
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    google: {
        width: '100%',
        margin: 'auto',
        paddingBottom: 180,
    },
    test_text3: {


        flex: 1,
        textAlign: 'center',
        fontSize: 40,
        color: 'orange',
        fontWeight: 'bold',
        alignItems: 'center',
        paddingTop: 10,
    },
    flex: {
        flex: 1,
        paddingTop: 10
    },
    forecast: {

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%'
    },
    text: {
        fontSize: 30,

        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 40

    },
    forecast_text: {
        fontSize: 10,

        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 40

    },
    splashScreen:{
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',



        width: '100%',
        height: '100%'
    },
    container_1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    fadingContainer: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',



        width: '100%',
        height: '100%'


    },
});
module.exports = styles;
