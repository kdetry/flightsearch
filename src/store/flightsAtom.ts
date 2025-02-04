import { atom } from 'jotai';

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: {
    id: string;
    origin: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
    };
    destination: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
    };
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
      marketing: {
        id: number;
        alternateId: string;
        logoUrl: string;
        name: string;
      }[];
      operationType: string;
    };
    segments: {
      id: string;
      origin: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
          flightPlaceId: string;
          displayCode: string;
          name: string;
          type: string;
        };
        name: string;
        type: string;
        country: string;
      };
      destination: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
          flightPlaceId: string;
          displayCode: string;
          name: string;
          type: string;
        };
        name: string;
        type: string;
        country: string;
      };
      departure: string;
      arrival: string;
      durationInMinutes: number;
      flightNumber: string;
      marketingCarrier: {
        id: number;
        name: string;
        alternateId: string;
        allianceId: number;
        displayCode: string;
      };
      operatingCarrier: {
        id: number;
        name: string;
        alternateId: string;
        allianceId: number;
        displayCode: string;
      };
    }[];
  }[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface SearchResponse {
  context: {
    status: string;
    totalResults: number;
  };
  itineraries: FlightItinerary[];
  messages: string[];
  filterStats: {
    duration: {
      min: number;
      max: number;
      multiCityMin: number;
      multiCityMax: number;
    };
    airports: {
      city: string;
      airports: {
        id: string;
        entityId: string;
        name: string;
      }[];
    }[];
    carriers: {
      id: number;
      alternateId: string;
      logoUrl: string;
      name: string;
    }[];
    stopPrices: {
      direct: {
        isPresent: boolean;
        formattedPrice: string;
      };
      one: {
        isPresent: boolean;
        formattedPrice: string;
      };
      twoOrMore: {
        isPresent: boolean;
        formattedPrice: string;
      };
    };
  };
  flightsSessionId: string;
  destinationImageUrl: string;
}

export const flightsAtom = atom<SearchResponse | null>(null);