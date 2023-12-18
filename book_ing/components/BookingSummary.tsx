import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
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
        <Button title="Book" onPress={navToHome}  />
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
    }
  });
  