// Type definitions for Google Maps JavaScript API
declare global {
    interface Window {
        google: typeof google;
    }
}

declare namespace google.maps {
    export class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
    }

    export namespace places {
        export class Autocomplete {
            constructor(
                inputField: HTMLInputElement,
                opts?: AutocompleteOptions
            );
            addListener(eventName: string, handler: () => void): void;
            getPlace(): PlaceResult;
        }

        export interface AutocompleteOptions {
            types?: string[];
            componentRestrictions?: ComponentRestrictions;
            fields?: string[];
        }

        export interface ComponentRestrictions {
            country?: string | string[];
        }

        export interface PlaceResult {
            address_components?: AddressComponent[];
            formatted_address?: string;
            geometry?: {
                location: LatLng;
            };
            name?: string;
            place_id?: string;
        }

        export interface AddressComponent {
            long_name: string;
            short_name: string;
            types: string[];
        }
    }
}

export { };
