import React from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IData } from "../App";
import { defaultFlightContext, useFlightContext } from "../context/FlightContext";
import { FlightList } from "./FlightList";


export const BookingSummary = ({ navigation }: { navigation: any }) => {
    const { selectedFlights, setFlightFilter, setBookedFlights, bookedFlights, setSelectedFlights } = useFlightContext();

    const navToHome = React.useCallback(() => {
        setBookedFlights([...selectedFlights, ...bookedFlights]);
        setSelectedFlights([]);
        setFlightFilter({
            isReturnFlight: false,
            departDate: new Date(2023, 9, 4),
            arriveDate: new Date(),
            departureAirport: "",
            returnAirport: "",
            flightId: "",
            airline: "",
            time: "",       
        });
        navigation.navigate('Home');
    }, [setBookedFlights, bookedFlights, navigation, selectedFlights]);

    return (
    <View style={styles.pageContainer}>
        <FlightList title={'Summary'} data={selectedFlights} onContinue={() => {}} />
        <TouchableOpacity style={{ width: 100, height: 40, alignItems: "center",alignSelf: 'center', backgroundColor: '#9BBEC8', borderRadius: 10, }} onPress={navToHome}>
            <Text style={styles.text}>
                Book
            </Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
      backgroundColor: "#164863",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      flex: 1
    },
    text: {
        color: 'white',
        // fontFamily: 'Coc'
        fontSize: 15,
        padding: 10
    }
  });
  