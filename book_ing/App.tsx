/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";

import { DepartingFlight } from "./components/DepartureFlights";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
  NativeStackNavigationProp
} from "@react-navigation/native-stack";
import { SelectTravel } from "./components/SelectTravel";
import { FlightContextProvider } from "./context/FlightContext";
import { ArrivalFlight } from "./components/ArrivalFlights";
import { BookingSummary } from "./components/BookingSummary";
import { Bookings } from "./components/Bookings";

export type RootStackParamList = {
  SelectTravel: NavigatorScreenParams<{}>;
  Flights: NavigatorScreenParams<{}>;
  FlightDetails: NavigatorScreenParams<{}>;
};

export type SelectTravelProps = NativeStackNavigationProp<
  RootStackParamList,
  "SelectTravel"
>;

export type FlightScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Flights"
>;

// export type Props

export interface IData {
  FlightId: string;
  FromAirport: string;
  FromAirportName: string;
  ToAirport: string;
  ToAirportName: string;
  AirlineName: string;
  ScheduledTimeFull: string;
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <FlightContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={SelectTravel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Flights"
            options={{
              headerShown: false,
            }}
            component={DepartingFlight}
          />

          <Stack.Screen
            name="ReturnTickets"
            options={{
              headerShown: false,
            }}
            component={ArrivalFlight}
          />

          <Stack.Screen
            name="BookingSummary"
            options={{
              headerShown: false,
            }}
            component={BookingSummary}
          />

          <Stack.Screen
            name="Bookings"
            options={{
              headerShown: false,
            }}
            component={Bookings}
          />

          
        </Stack.Navigator>
      </NavigationContainer>
    </FlightContextProvider>
  );
}

export default App;
