import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { format, parse, parseISO } from "date-fns";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlightScreenProps, IData, RootStackParamList } from "../App";
import { useFlightContext } from "../context/FlightContext";

import data from "../data.json";
import { FlightList } from "./FlightList";

export const Flights = ({ navigation }: { navigation: any}) => {
  const { flightFilter, setSelectedFlights, selectedFlights} = useFlightContext();
  const { returnAirport, departureAirport, isReturnFlight, departDate } = flightFilter;


  const bookReturnOrProceed = React.useCallback(
    (item: IData) => {
      setSelectedFlights([...selectedFlights, item]);
      if (isReturnFlight) {
        return navigation.navigate("ReturnTickets");
      }
      
      return navigation.navigate("BookingSummary")
    },
    [
      returnAirport,
      departureAirport,
      navigation,
      isReturnFlight,
    ]
  );

  const memoizedFlights = React.useMemo(() => {
    const flights = data.filter(
      (item: IData) => {
        const flightDate = format(new Date(`${item.ScheduledTimeFull.slice(0, 4)}-${item.ScheduledTimeFull.slice(4, 6)}-${item.ScheduledTimeFull.slice(6, 8)}T${item.ScheduledTimeFull.slice(8, 10)}:${item.ScheduledTimeFull.slice(10, 12)}:00.000Z`), 'd');
        return item.FromAirportName === departureAirport &&
        item.ToAirportName === returnAirport 
        &&
        flightDate === format(departDate, 'd')
      }
    );

    return flights;
  }, [returnAirport, departureAirport]);

  return memoizedFlights ? (
    <FlightList title={'Departing Flight'} data={memoizedFlights} onContinue={bookReturnOrProceed} />
  ) : (
    <View>
      <Text>Loading flights...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: "#164863",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  }
});
