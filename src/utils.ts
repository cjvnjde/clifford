import {Point} from './Point';

export const transformPath = function transformPath(point: Point): [number, number][] {
    if (!point) {
        return [];
    }

    if (point.from) {
        return [[point.x, point.y], ...transformPath(point.from)];
    }

    return [[point.x, point.y]];
};
