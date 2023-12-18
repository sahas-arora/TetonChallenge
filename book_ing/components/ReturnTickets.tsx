import { format } from "date-fns";
import React from "react"
import { View, Text } from "react-native";
import { IData } from "../App";
import { useFlightContext } from "../context/FlightContext"

import data from "../data.json";
import { FlightList } from "./FlightList";


export const ReturnTickets = ({ navigation }: { navigation: any }): JSX.Element => {
    const { flightFilter, selectedFlights, setFlightFilter, setSelectedFlights} = useFlightContext();
    const { airline, arriveDate, departureAirport, departDate, flightId, returnAirport } = flightFilter;

    const proceed = React.useCallback((item: IData) => {
        setSelectedFlights([...selectedFlights, item]);
        navigation.navigate('BookingSummary');
    }, [selectedFlights, selectedFlights, navigation]);

    const memoizedFlights = React.useMemo(() => {
        const flights = data.filter(
            (item: IData) =>
              { 
               const flightDate = format(new Date(`${item.ScheduledTimeFull.slice(0, 4)}-${item.ScheduledTimeFull.slice(4, 6)}-${item.ScheduledTimeFull.slice(6, 8)}T${item.ScheduledTimeFull.slice(8, 10)}:${item.ScheduledTimeFull.slice(10, 12)}:00.000Z`), 'd');
               return item.FromAirportName === returnAirport &&
                item.ToAirportName === departureAirport 
                && flightDate === format(arriveDate, 'd')
             }
            );
        
            return flights;    
    }, [returnAirport, departureAirport, arriveDate]);

    return memoizedFlights ? 
    <FlightList title={'Return Flight'} data={memoizedFlights} onContinue={proceed} />
    :
    <View>
    <Text>Loading flights...</Text>
  </View>
}