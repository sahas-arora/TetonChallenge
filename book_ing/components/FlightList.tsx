import { faArrowRight, faPlaneArrival, faPlaneDeparture, faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { format } from "date-fns";
import React, { FC, ReactNode } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IData } from "../App";

export interface IFlightListProps {
    onContinue: (item: any) => void,
    data: any[],
    title: string
} 

export const FlightList: FC<IFlightListProps> = ({ onContinue, data, title }) => {

    const renderFlight = React.useCallback(
        ({ item }: { item: IData }) => {
            const formattedScheduledDate = format(new Date(`${item.ScheduledTimeFull.slice(0, 4)}-${item.ScheduledTimeFull.slice(4, 6)}-${item.ScheduledTimeFull.slice(6, 8)}T${item.ScheduledTimeFull.slice(8, 10)}:${item.ScheduledTimeFull.slice(10, 12)}:00.000Z`), 'd LLL, yyyy');
            const formattedScheduledTime = format(new Date(`${item.ScheduledTimeFull.slice(0, 4)}-${item.ScheduledTimeFull.slice(4, 6)}-${item.ScheduledTimeFull.slice(6, 8)}T${item.ScheduledTimeFull.slice(8, 10)}:${item.ScheduledTimeFull.slice(10, 12)}:00.000Z`), 'k:mm aaaa');
            const planeIcon = title === "Departing Flight" ? faPlaneDeparture : title === "Return Flight" ? faPlaneArrival : faPlaneUp;
            return (
            item && (
              <TouchableOpacity
                onPress={() => onContinue(item)}
                style={styles.flightCard}
              >
                <Text>Flight number : {item.FlightId}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>From : {item.FromAirport}</Text>
                    <FontAwesomeIcon icon= {faArrowRight} />
                    <Text>To : {item.ToAirport}</Text>
                </View>
                <Text>Time: {formattedScheduledTime}</Text>
                <Text>Date : {formattedScheduledDate}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <FontAwesomeIcon icon= {planeIcon} />
                    <Text style={{ marginHorizontal: 10 }}>{item.AirlineName}</Text>
                </View>
            
              </TouchableOpacity>
            )
          );
        },
        [onContinue]
      );
    return data.length ? (
        <View style={styles.pageContainer}>
            <Text style={{ fontSize: 25, alignSelf: 'flex-start', fontFamily: 'lucida grande', color: 'white', padding: 10}}>{title}</Text>
            <FlatList contentContainerStyle={styles.pageContainer} data={data} renderItem={renderFlight} showsVerticalScrollIndicator={false} />
        </View>
    ) : 
    <View style={[styles.pageContainer, { flex: 1, alignItems: 'center' }]}>
        <Text style={styles.text}>No flights available for the selected destinations or time..please try again</Text>
    </View>
}


const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: "#164863",
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-around',
    },  
    flightCard: {
        display: 'flex',
        backgroundColor: "#DDF2FD",
        margin: 20,
        alignSelf: 'center',
        padding: 15,
        borderRadius: 10,
        width: 300,
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
  });
  