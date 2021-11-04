import * as _ from "lodash";
import {DefaultLinkModel, DiagramEngine, LinkModel, PortModel} from "storm-react-diagrams";

export default class CustomPortModel extends PortModel {
    constructor(pos?: any) {
        super(pos?.name, "custom");
        if (pos) {
            this.positionName = pos?.name;
            this.portId = pos?.portId;
            this.xPosition = pos?.xPosition;
            this.yPosition = pos?.yPosition;
        }
    }

    protected positionName: string;
    protected portId: number;
    protected xPosition: number;
    protected yPosition: number;

    public serialize() {
        return _.merge(super.serialize(), {
            portId: this.portId,
            positionName: this.positionName,
            xPosition: this.xPosition,
            yPosition: this.yPosition,
        });
    }

    public deSerialize(data: any, engine: DiagramEngine) {
        super.deSerialize(data, engine);
        this.portId = data.portId;
        this.positionName = data.positionName;
        this.xPosition = data.xPosition;
        this.yPosition = data.yPosition;
        this.links = {};
    }

    public createLinkModel(): LinkModel {
        const link = super.createLinkModel();
        return link || new DefaultLinkModel();
    }

    public link(port: PortModel): LinkModel {
        const link = this.createLinkModel();
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }

    public removeAllLinks() {
        this.links = {};
    }
}
