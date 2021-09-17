import { NodeModel } from "storm-react-diagrams";

import {DEFAULT_EXTRAS, SHAPE_TYPES} from './ShapesNodeConstants';
import {ShapeExtras} from './shapesNodeInterfaces';

export default class ShapesNodeModel extends NodeModel {
    constructor(shape: string = SHAPE_TYPES.DEFAULT) {
        super("shapes");

        switch (shape) {
            case SHAPE_TYPES.LINE: {
                this.extras = DEFAULT_EXTRAS.LINE;
                break;
            }
            default: {
                this.extras = DEFAULT_EXTRAS.COMMON;
            }
        }
    }

    public updateExtras(extras: ShapeExtras) {
        this.extras = {...this.extras, ...extras}
    }
}
