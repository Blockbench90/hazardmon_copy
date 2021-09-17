import {ShapeExtras} from './shapesNodeInterfaces';

export const SHAPE_TYPES: {[key:string]: string} = {
    CIRCLE: 'circle',
    DEFAULT: 'default',
    LINE: 'line',
    RECTANGLE: 'rectangle'
};

export const DEFAULT_EXTRAS: { [key: string]: ShapeExtras } = {
    COMMON: {
        height: 78, // px
        offsetLeft: 0, // px
        offsetTop: 0, // px
        rotateAngle: 0, // deg
        width: 78, // px
    },
    LINE: {
        height: 3,
        offsetLeft: 0,
        offsetTop: 0,
        rotateAngle: 0,
        width: 78,
    }
};

export const MIN_WIDTH = 10; // px
export const MIN_HEIGHT = 10; // px
