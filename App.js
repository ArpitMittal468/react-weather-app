import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Constants from 'expo-constants';

let mainPageSetter;

function FinalScreen(props) {
  let [region, setRegion] = useState('');
  let [status, setStatus] = useState('Cloudy');
  let [temp, setTemp] = useState('33 C');
  let [windSpeed, setWindSpeed] = useState('');
  let [humidity, setHumidity] = useState('');

  let api = `https://api.weatherapi.com/v1/current.json?key=3aa7eeb8a04f473bb45152638212907&q=${props.loc}&aqi=no`;
  let data = fetch(api)
    .then((x) => x.json())
    .then((data) => {
      // console.log(JSON.stringify(data));
      setRegion(data.location.region + ', ' + data.location.country);
      setStatus(data.current.condition.text);
      setTemp(data.current['temp_c'] + ' °C');
     setWindSpeed('Wind: ' + data.current['wind_kph'] + ' km/h');
      setHumidity('Humidity: ' + data.current.humidity +"%")
    });
  return (
    <>
      <ImageBackground
        source={require('./assets/bg1.png')}
        style={{
          height: '100%',
          width: '100%',
          // opacity: 0.4,
        }}>
        <View
          style={{
            borderWidth: 1,
            height: '100%',
            display: 'flex',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: 20,
            paddingTop: Constants.statusBarHeight,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => mainPageSetter(<CityScreen />)}>
            <Text
              style={{
                fontSize: 40,
                color: 'white',
                textTransform: 'capitalize',
                marginBottom: 20,
              }}>
              ←
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 70,
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {props.loc}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {region}
          </Text>
          <Text
            style={{
              marginTop: 100,
              fontSize: 50,
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {status}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 40,
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {temp}
          </Text>
          <Text
            style={{
              marginTop: 30,
              fontSize: 20,
              color: 'white',
            }}>
            {windSpeed}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              color: 'white',
            }}>
            {humidity}
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}

function CityScreen() {
  let [location, setLocation] = useState('Las Vegas');

  return (
    <>
      <ImageBackground
        source={require('./assets/bg1.png')}
        style={{
          height: '100%',
          width: '100%',
          // opacity: 0.4,
        }}>
        <View
          style={{
            borderWidth: 1,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <Text
            style={{
              fontSize: 40,
              color: 'white',
              marginBottom: 40,
            }}>
            City Name
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              padding: 10,
              width: '50%',
              color: 'black',
              borderRadius: 5,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              textTransform: 'capitalize',
              marginBottom: 40,
            }}
            onChangeText={setLocation}
            value={location}
          />
          <Button
            title="      Show      "
            onPress={() => {
              mainPageSetter(<FinalScreen loc={location} />);
            }}></Button>
        </View>
      </ImageBackground>
    </>
  );
}

function InitalScreen() {
  return (
    <>
      <ImageBackground
        source={require('./assets/bg1.png')}
        style={{
          height: '100%',
          width: '100%',
          // opacity: 0.4,
        }}>
        <View
          style={{
            borderWidth: 1,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <Image
            source={{
              uri:
                'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/109368f632c5dafab6cbf47ec386f8d0',
            }}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 40,
            }}>
            Weather App
          </Text>
          <Button
            title="      Next      "
            onPress={() => {
              mainPageSetter(<CityScreen />);
            }}></Button>
        </View>
      </ImageBackground>
    </>
  );
}

export default function App() {
  let [mainPage, setMainPage] = useState(<InitalScreen />);
  mainPageSetter = setMainPage;
  return (
    <>
      <StatusBar barStyle="light-content" />
      {mainPage}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
