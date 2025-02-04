import { atom } from 'jotai';
import { PaletteMode } from '@mui/material';

export type SeatType = 'economy' | 'premiumEconomy' | 'business' | 'first';

export interface LocationValue {
  code: string;
  skyId: string;
}

// Theme mode atom
export const themeModeAtom = atom<PaletteMode>('light');

export interface PassengerCounts {
  adults: number;
  children: number;
  infantsInSeat: number;
}

export interface FlightSearch {
  tripType: 'roundTrip' | 'oneWay';
  from: LocationValue;
  to: LocationValue;
  departureDate: Date | null;
  returnDate: Date | null;
  passengers: PassengerCounts;
  seatType: SeatType;
}

const defaultFlightSearch: FlightSearch = {
  tripType: 'roundTrip',
  from: { code: '', skyId: '' },
  to: { code: '', skyId: '' },
  departureDate: null,
  returnDate: null,
  passengers: {
    adults: 1,
    children: 0,
    infantsInSeat: 0,
  },
  seatType: 'economy',
};

export const flightSearchAtom = atom<FlightSearch>(defaultFlightSearch);

// Derived atoms for individual fields
export const tripTypeAtom = atom(
  (get) => get(flightSearchAtom).tripType,
  (get, set, newTripType: FlightSearch['tripType']) =>
    set(flightSearchAtom, {
      ...get(flightSearchAtom),
      tripType: newTripType,
      returnDate: newTripType === 'oneWay' ? null : get(flightSearchAtom).returnDate,
    }),
);

export const fromAtom = atom(
  (get) => get(flightSearchAtom).from,
  (get, set, newFrom: LocationValue) =>
    set(flightSearchAtom, { ...get(flightSearchAtom), from: newFrom }),
);

export const toAtom = atom(
  (get) => get(flightSearchAtom).to,
  (get, set, newTo: LocationValue) =>
    set(flightSearchAtom, { ...get(flightSearchAtom), to: newTo }),
);

export const departureDateAtom = atom(
  (get) => get(flightSearchAtom).departureDate,
  (get, set, newDate: Date | null) =>
    set(flightSearchAtom, { ...get(flightSearchAtom), departureDate: newDate }),
);

export const returnDateAtom = atom(
  (get) => get(flightSearchAtom).returnDate,
  (get, set, newDate: Date | null) =>
    set(flightSearchAtom, { ...get(flightSearchAtom), returnDate: newDate }),
);

export const passengersAtom = atom(
  (get) => get(flightSearchAtom).passengers,
  (get, set, newPassengers: PassengerCounts) =>
    set(flightSearchAtom, { ...get(flightSearchAtom), passengers: newPassengers }),
);

export const seatTypeAtom = atom(
  (get) => get(flightSearchAtom).seatType,
  (get, set, newSeatType: SeatType) =>
    set(flightSearchAtom, { ...get(flightSearchAtom), seatType: newSeatType }),
); 