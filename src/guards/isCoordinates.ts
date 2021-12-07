import {Coordinates} from '../interfaces/Coordinates';

export function isCoordinates(pet: Coordinates | any): pet is Coordinates {
    return (pet as Coordinates)?.x !== undefined;
}
