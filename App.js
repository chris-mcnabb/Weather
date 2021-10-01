import 'core-js';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles.js';
import {
    Alert,
    Modal,
    Text,
    Pressable,
    View,
    ImageBackground,
    ScrollView,
    Animated,

} from 'react-native';
const thunder=(require('./assets/pexels-takenbytablo-680940.jpg'))
const rain=(require('./assets/fotografierende-3ENfnnjbdJs-unsplash.jpg'))
const sunny=(require('./assets/pexels-pixabay-301599.jpg'))
const foggy=(require('./assets/pexels-eberhard-grossgasteiger-4406662.jpg'))
const cloudy=(require('./assets/pexels-miguel-á-padriñán-19670.jpg'))
const snow=(require('./assets/pexels-freestocksorg-839462.jpg'))
const clear= '☀️';
const clouds = '☁️';
const lightning = '⚡️';
const showers = '🌧';
const mist = '🌫';
const blizzard = '❄️';
function App() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [photo, setPhoto] = useState(sunny)
    const [text, setText] = useState('black')
    const [currentTemp, setCurrentTemp] = useState(22)
    const [hiTemp, setHiTemp] = useState(22);
    const [conditions, setConditions] = useState('sunny')
    const [lowTemp, setLowTemp] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState([]);
    const [locale, setLocale] = useState([]);
    const [search, setSearch] = useState(false);
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [forecast, setForecast] = useState([])
    const [isReady, setReady] = useState(false)
    const image = photo;



    useEffect(() => {
        (async () => {

            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let temp = []
            let location = await Location.getCurrentPositionAsync({});
            temp = {
                lat: location.coords.latitude,
                long: location.coords.longitude,
                time: location.timestamp
            }
            setLat(temp.lat);
            setLong(temp.long);
            renderCurrentCity(temp)
            localWeather(temp)


        })()

    }, [])
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    };

    const renderCurrentCity = async (value) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${value.lat},${value.long}&result_type=${key}`)

            .then((response) => {
                let location = (response.data.results[0].formatted_address)
                let res = location.split(' ');
                setCity(res.splice(0, 1));
                setLocale(res);

            })
            .catch((e) => {
                console.log(e)
            })
    }
    const localWeather = async (value) => {
        let background = [];
        let temp=[];
        let pretty=[]
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${value.lat}&lon=${value.long}&units=metric&exclude=minutely,hourly,alerts&appid=be699a2b94da1e88fe4ea25d04bb6eb7`)

            .then((response) => {
                setCurrentTemp(response.data.current.temp);
                setHiTemp(response.data.daily[0].temp.max);
                setLowTemp(response.data.daily[0].temp.min);
                background = response.data.daily[0].weather[0].description
               let outlook=response.data.daily;
                setConditions(background)
                renderScreen(background)
                outlook.map((fore, idx) => {
                    fore.weather.map((cond, idx) => {
                    if(cond.description.includes('clear')){
                        pretty=clear;
                    }else if(cond.description.includes('rain')){
                        pretty=showers;
                    }else if(cond.description.includes('thunderstorm')){
                        pretty=lightning;
                    }else if(cond.description.includes('clouds')){
                        pretty=clouds;
                    }else if(cond.description.includes('mist')){
                        pretty=mist;
                    }else{
                        pretty=blizzard;
                    }
                        temp.push({
                            day: fore.dt,
                            max: fore.temp.max,
                            min: fore.temp.min,
                            outlook: pretty
                        })
                    })
                })
                setForecast([...temp])
                setTimeout(()=>{setReady(true)}, 1000)
            })
            .catch((e) => {
                console.log(e)
            })
    };
    const renderScreen = (value) => {
        if (value.includes('clear')) {
            setPhoto(sunny)
            setText('black')
        } else if (value.includes('rain')) {
            setPhoto(rain)
            setText('white')
        } else if (value.includes('thunderstorm')) {
            setPhoto(thunder)
            setText('white')
        } else if (value.includes('clouds')) {
            setPhoto(cloudy)
            setText('black')
        } else if (value.includes('mist')) {
            setPhoto(foggy)
            setText('black')
        } else {
            setPhoto(snow)
            setText('black')
        }
    }

    const getAxis = async (value)=>{
        let temp = []
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${key}`)

            .then((response) => {
                temp = {
                    lat: response.data.results[0].geometry.location.lat,
                    long:  response.data.results[0].geometry.location.lng
                };
                setLat(temp.lat);
                setLong(temp.long)
                localWeather(temp)

            })
            .catch((e) => {
                console.log(e)
            })
    }

    let convertDate;
    let newDate;
    const renderForecast = () => (

        <View>
            <View style={styles.forecast}>
                <Text style={[styles.text, {color: text}]}>Day</Text>
                <Text style={[styles.text, {color: text}]}>Hi</Text>
                <Text style={[styles.text, {color: text}]}>Lo</Text>
                <Text style={[styles.text, {color: text}]}>Fcst</Text>
            </View>

            {
                forecast.map((fore, idx) => (
                     convertDate = new Date(fore.day * 1000),
                     newDate = convertDate.toLocaleString("en-US", {weekday: "short"}),

                        <View style={styles.forecast} key={idx}>
                            <Text style={[styles.text, {color: text}]}>{newDate}</Text>
                            <Text style={[styles.text, {color: text}]}>{Math.round(fore.max)}°</Text>
                            <Text style={[styles.text, {color: text}]}>{Math.round(fore.min)}°</Text>
                            <Text style={[styles.text, {color: text}]}>{fore.outlook}</Text>
                        </View>


                ))
            }
        </View>

    );
   const Weather =()=>{
        if(!isReady){
            return(
                 <View style={styles.splashScreen}>
                    <ImageBackground source={image} style={styles.image}>
                    </ImageBackground>
                </View>
            )
        }
        if(isReady){
            fadeIn()
         return(
           //  <View style={styles.container_1}>
             <Animated.View
                 style={[
                     styles.fadingContainer,
                     {
                         // Bind opacity to animated value
                         opacity: fadeAnim
                     }
                 ]}
             >
        <ImageBackground source={image} style={styles.image}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}

                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <GooglePlacesAutocomplete

                            styles={{

                                textInputContainer: {

                                    width: "100%",
                                    margin: "auto",

                                },
                                textInput: {
                                    height: 38,
                                    color: "#5d5d5d",
                                    textAlign: 'center'
                                },
                            }}
                            placeholder="Search"
                            query={{
                                key: `${key}`,
                                language: 'en', // language of the results
                            }}

                            onPress={(data, details = null) => {
                                let temp= data.description
                                setSearch(true)
                                setCity(data.structured_formatting.main_text)
                                setLocale(data.structured_formatting.secondary_text)
                                setLocation(data.description)
                                getAxis(temp)


                                setModalVisible(!modalVisible);
                            }}

                            onFail={(error) => console.error(error)}
                            requestUrl={{
                                url:
                                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                                useOnPlatform: 'web',
                            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                        />


                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)

                            }}
                        >
                            <Text style={styles.searchtextStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Pressable

                style={styles.button_1}
                onPress={() => {
                    setModalVisible(true)
                    setSearch(!search)
                }}
            >
                <Text style={[styles.choice, {color: text}]}>Choose Your City↩</Text>
            </Pressable>


            <StatusBar style='auto'/>
            <ScrollView style={styles.flex}>
                <Text style={[styles.city, {color: text}]}>{city}</Text>
                <Text style={[styles.country, {color: text}]}>{locale}</Text>
                <Text style={[styles.current, {color: text}]}>Current Temp:</Text>
                <Text style={[styles.tempNow, {color: text}]}>{Math.round(currentTemp)}°</Text>
                <Text style={[styles.temp2, {color: text}]}>Hi: {Math.round(hiTemp)}°| Lo: {Math.round(lowTemp)}°</Text>
                <Text style={[styles.degree, {color: text}]}>Celsius</Text>
                <Text style={[styles.cond, {color: text}]}>Current Weather: {conditions.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}</Text>



                {renderForecast()}


            </ScrollView>

        </ImageBackground>
             </Animated.View>
    //</View>
             )

        }
    }



    return (
        <View style={styles.container}>
        {Weather()}
        </View>
    )
}
export default App;




