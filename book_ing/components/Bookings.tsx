import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useFlightContext } from "../context/FlightContext"
import { FlightList } from "./FlightList"

export const Bookings = () => {
    const { bookedFlights } = useFlightContext();
    const navigation = useNavigation();

    const goBack = React.useCallback(() => navigation.goBack(), []);

    return (
        <View style={styles.pageContainer}>
            <FlightList title={'Bookings'} data={bookedFlights} onContinue={goBack} />
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: "#164863",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        flex: 1
      }
})