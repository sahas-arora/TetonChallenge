import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useCallback, useState } from "react";
import { View, Switch, Button, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { FlightContextProvider, useFlightContext } from "../context/FlightContext";

const LOCATIONS = [
  {
    label: "Oslo",
    value: "Oslo",
  },
  {
    label: "Stockholm",
    value: "Stockholm",
  },
  {
    label: "Copenhagen",
    value: "Copenhagen",
  },
];

export const SelectTravel = ({ navigation }: { navigation: any }) => {
  const { flightFilter, setFlightFilter, setSelectedFlights, bookedFlights } = useFlightContext();
  const { returnAirport, departureAirport, isReturnFlight, departDate, arriveDate } = flightFilter;
  const [openStart, setOpenStart] = useState<boolean>(false);
  const [openEnd, setOpenEnd] = useState<boolean>(false);
  
  React.useEffect(() => {
      setSelectedFlights([]);
  }, []);

  const navToFlights = React.useCallback(() => {
    return navigation.navigate("Flights", {
      startingLoc: departureAirport,
      destination: returnAirport,
      isReturn: isReturnFlight,
    });
  }, [returnAirport, isReturnFlight, navigation, departureAirport]);

  const renderSubmit = React.useMemo(() => {
    if (departureAirport && returnAirport) {
      return(
        <TouchableOpacity style={{ backgroundColor: '#9BBEC8', borderRadius: 10, }} onPress={navToFlights}>
          <Text style={styles.text}>
            See Flights
          </Text>
        </TouchableOpacity>
         );
    }
  }, [returnAirport, navToFlights, departureAirport]);

  const handleReturnUpdate = useCallback(
    (value: any) => {
      setFlightFilter({ ...flightFilter, returnAirport: value() });
    },
    [flightFilter]
  );

  const handleDepartUpdate = useCallback(
    (value: any) => {
      setFlightFilter({ ...flightFilter, departureAirport: value() });
    },
    [flightFilter]
  );

  const toggleReturn = useCallback(
    () => setFlightFilter({ ...flightFilter, isReturnFlight: !isReturnFlight }),
    [isReturnFlight, flightFilter]
  );

  const handleDepartureDateUpdate = useCallback((event: DateTimePickerEvent) => {
    setFlightFilter({...flightFilter, departDate: new Date(event.nativeEvent.timestamp)});
  }, [flightFilter]);

  const handleArrivalDateUpdate = useCallback((event: DateTimePickerEvent) => {
    setFlightFilter({...flightFilter, arriveDate: new Date(event.nativeEvent.timestamp)});
  }, [flightFilter]);

  const navToBookings = React.useCallback(() => navigation.navigate('Bookings'), [navigation]);

  return (
    <>
    <FlightContextProvider>
      <View style={styles.pageContainer}>
        <View>
          <Image
            source={require("../assets/airplane.png")}
            style={{ width: 100, height: 50 }}
          />
        </View>

        {bookedFlights.length ? (
        <TouchableOpacity onPress={navToBookings} style={{ backgroundColor: "rgba(221, 242, 253, 0.5)", borderRadius: 10 }}>
          <Text style={{ fontSize: 20, padding: 10 }}>
            Existing Bookings
          </Text>
        </TouchableOpacity>
        ) :
        null
        }

        <View style={styles.inputContainer}>
        <DropDownPicker
          containerStyle={{ flex: 0.4,  }}
          placeholder={'From where?'}
          open={openStart}
          value={departureAirport}
          setOpen={setOpenStart}
          setValue={handleDepartUpdate}
          items={LOCATIONS}
        />

        <DropDownPicker
          containerStyle={{  flex: 0.4, marginLeft: 20 }}
          placeholder={'To where?'}
          open={openEnd}
          value={returnAirport}
          setOpen={setOpenEnd}
          setValue={handleReturnUpdate}
          items={LOCATIONS}
        />
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignContent: 'center', marginVertical: 20 }}>
          <Text>

          </Text>
          <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
            <RNDateTimePicker textColor="#DDF2FD" placeholderText={'Depart'} maximumDate={new Date(2023, 8, 4)} minimumDate={new Date(2023, 8, 1)} mode="date" value={departDate} onChange={handleDepartureDateUpdate} style={{ marginTop: 30}} />
            {
              isReturnFlight &&
              <RNDateTimePicker style={{ marginTop: 30}}  placeholderText={'Return'} maximumDate={new Date(2023, 8, 4)} minimumDate={new Date(2023, 8, 1)} mode="date" value={arriveDate} onChange={handleArrivalDateUpdate} />
            }
          </View>
        </View>

        
        <View>
          <Text style={styles.text}>
            Return 
          </Text>
          <Switch
            style={{ marginVertical: 10, alignSelf: "center" }}
            value={isReturnFlight}
            onValueChange={toggleReturn}
            trackColor={{ false: "#767577", true: "#9BBEC8" }}
            thumbColor={isReturnFlight ? "#DDF2FD" : "#427D9D"}
          />
        </View>
        {renderSubmit}
      </View>
    </FlightContextProvider>
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: "#164863",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around'
  },
  text: {
    color: 'white',
    // fontFamily: 'Coc'
    fontSize: 15,
    padding: 10
  }
});
