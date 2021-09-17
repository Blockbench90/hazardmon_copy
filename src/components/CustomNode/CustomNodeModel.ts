import { NodeModel } from "storm-react-diagrams";
import CustomPortModel from "./CustomPortModel";

export default class CustomNodeModel extends NodeModel {
    constructor(anchorPoints?: any) {
        super("custom");
        if (anchorPoints) {
            anchorPoints.map((point: any) => this.addPort(new CustomPortModel({
                name: `anchor_point_${point.id}`,
                portId: point.id,
                xPosition: point.x_coord,
                yPosition: point.y_coord
            })))
        }
    }
}
