import { SearchResponse } from '../store/flightsAtom';

export type ApiResponse<T> = {
  status: boolean;
  data: T;
  message: string;
};

export interface Airport {
  code: string;
  skyId: string;
  name: string;
}

export interface SearchFlightsParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass: 'economy' | 'premiumEconomy' | 'business' | 'first';
  adults: number;
  children?: number;
  infantsInSeat?: number;
  sortBy?: 'best' | 'price' | 'duration';
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface Flight {
  id: string;
  price: {
    amount: number;
    currency: string;
  };
  segments: {
    departure: {
      airport: {
        code: string;
        name: string;
      };
      time: string;
    };
    arrival: {
      airport: {
        code: string;
        name: string;
      };
      time: string;
    };
    duration: number;
    carrier: {
      code: string;
      name: string;
    };
    flightNumber: string;
  }[];
  totalDuration: number;
}

export async function searchAirports(query: string): Promise<ApiResponse<Airport[]>> {
  if (!query || query.length < 2) return { status: false, data: [], message: 'Query must be at least 2 characters long' };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.status === true) {
      return {
        status: true, data: data.data.map((item: any) => {
          console.log(item);
          const title = `${item.navigation.localizedName}${item.navigation.relevantFlightParams?.flightPlaceType === "CITY" ? " - ALL" : ""}`;
          return {
            code: item.entityId,
            skyId: item.navigation.relevantFlightParams?.skyId,
            name: title
          }
        }), message: 'Airports found'
      };
    } else {
      return { status: false, data: [], message: 'Error searching airports' };
    }
  } catch (error) {
    console.error('Error searching airports:', error);
    return { status: false, data: [], message: 'Error searching airports' };
  }
}

export async function searchFlights(params: SearchFlightsParams): Promise<ApiResponse<SearchResponse>> {
  try {
    const searchParams = new URLSearchParams({
      originSkyId: params.originSkyId,
      destinationSkyId: params.destinationSkyId,
      originEntityId: params.originEntityId,
      destinationEntityId: params.destinationEntityId,
      date: params.date,
      ...(params.returnDate && { returnDate: params.returnDate }),
      cabinClass: params.cabinClass,
      adults: params.adults.toString(),
      ...(params.children && { children: params.children.toString() }),
      ...(params.infantsInSeat && { infantsInSeat: params.infantsInSeat.toString() }),
      sortBy: params.sortBy || 'best',
      currency: params.currency || 'USD',
      market: params.market || 'en-US',
      countryCode: params.countryCode || 'US'
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/flights/searchFlights?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching flights:', error);
    return {
      status: false,
      data: {
        context: { status: 'error', totalResults: 0 },
        itineraries: [],
        messages: [],
        filterStats: {
          duration: { min: 0, max: 0, multiCityMin: 0, multiCityMax: 0 },
          airports: [],
          carriers: [],
          stopPrices: {
            direct: { isPresent: false, formattedPrice: '$0' },
            one: { isPresent: false, formattedPrice: '$0' },
            twoOrMore: { isPresent: false, formattedPrice: '$0' }
          }
        },
        flightsSessionId: '',
        destinationImageUrl: ''
      },
      message: 'Error searching flights'
    };
  }
} 