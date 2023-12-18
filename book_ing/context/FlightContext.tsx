import React, { createContext, useState, useContext } from "react";

export interface FlightFilter {
  departDate: Date;
  arriveDate: Date;
  departureAirport: string;
  returnAirport: string;
  flightId: string;
  airline: string;
  time: string;
  isReturnFlight: boolean;
}

const defaultFilghtFilterState: FlightFilter = {
  isReturnFlight: false,
  departDate: new Date(2023, 9, 4),
  arriveDate: new Date(),
  departureAirport: "",
  returnAirport: "",
  flightId: "",
  airline: "",
  time: "",
};

export const defaultFlightContext = {
  flightFilter: defaultFilghtFilterState,
  setFlightFilter: (_: FlightFilter) => {},
  selectedFlights: [],
  setSelectedFlights: (_: any) => {},
  bookedFlights: [],
  setBookedFlights: (_: any) => {},
};

const FlightContext = createContext(defaultFlightContext);

const FlightContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [flightFilter, setFlightFilter] = useState(defaultFilghtFilterState);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [bookedFlights, setBookedFlights] = useState([]);

  return (
    <FlightContext.Provider
      value={{
        flightFilter,
        setFlightFilter,
        selectedFlights,
        setSelectedFlights,
        bookedFlights,
        setBookedFlights
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

const useFlightContext = () => {
  return useContext(FlightContext);
};

export { FlightContextProvider, useFlightContext };
