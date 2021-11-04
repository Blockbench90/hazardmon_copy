import * as _ from 'lodash';
import * as SRD from "storm-react-diagrams";

import CustomNodeFactory from '../../../components/CustomNode/CustomNodeFactory';
import CustomNodeModel from "../../../components/CustomNode/CustomNodeModel";
import CustomPortModel from '../../../components/CustomNode/CustomPortModel';
import SimplePortFactory from '../../../components/CustomNode/SimplePortFactory';
import {Connector, ConnectorAdditionalPoint} from "../../../interfaces/schemasReducer";

import ShapesNodeFactory from '../../../components/ShapesNode/ShapesNodeFactory';
import ShapesNodeModel from '../../../components/ShapesNode/ShapesNodeModel';

import LabelNodeFactory from '../../../components/LabelNode/LabelNodeFactory';
import LabelNodeModel from "../../../components/LabelNode/LabelNodeModel";

export class Application {
    protected activeModel: SRD.DiagramModel;
    protected diagramEngine: SRD.DiagramEngine;
    protected tabDetails: any;

    constructor(tabDetails?: any) {
        this.diagramEngine = new SRD.DiagramEngine();
        this.diagramEngine.installDefaultFactories();

        this.diagramEngine?.registerPortFactory(new SimplePortFactory("custom", () => new CustomPortModel()));
        this.diagramEngine?.registerNodeFactory(new CustomNodeFactory());
        this.diagramEngine?.registerNodeFactory(new ShapesNodeFactory());
        this.diagramEngine?.registerNodeFactory(new LabelNodeFactory());

        this.tabDetails = tabDetails;

        this.newModel();
    }

    public newModel() {
        this.activeModel = new SRD.DiagramModel();

        const machines: any = [];
        const connectors: any = [];
        const shapes: any = [];
        const labels: any = [];

        if (this.tabDetails) {
            if (this.tabDetails.machines) {
                this.tabDetails.machines.forEach((machine: any) => {
                    const node = new CustomNodeModel(machine.type_of_machine.anchor_points);
                    node.extras = {
                        ...machine.type_of_machine,
                        flip: machine.flip,
                        machineId: machine.id,
                        machineName: machine.name,
                        scale: machine.scale,
                        sensors: machine.sensors,
                        system_state_sensor: machine.system_state_sensor
                    };
                    node.setPosition(machine.x_coord, machine.y_coord);
                    machines.push(node);
                });
            }

            if (this.tabDetails.connectors) {
                this.tabDetails.connectors.forEach((connector: Connector) => {
                    const targetPort = connector.end_machine && this.findPortById(machines, connector.end_machine, connector.end_anchor_point);
                    const link = this.findPortById(machines, connector.start_machine, connector.start_anchor_point).link(targetPort);
                    const anchorPoints = connector.additional_points.slice().reverse();
                    anchorPoints.forEach((point: ConnectorAdditionalPoint) => {
                        link.point(point.x_coord, point.y_coord);
                    });

                    if (!targetPort) {
                        link.removePoint(link.getLastPoint());
                    }

                    connectors.push(link);
                });
            }

            if (this.tabDetails.shapes) {
                this.tabDetails.shapes.forEach((shape: any) => {
                    const shapeObj = new ShapesNodeModel();
                    shapeObj.deSerialize(shape, this.diagramEngine);
                    shapes.push(shapeObj);
                });
            }

            if (this.tabDetails.text_elements) {
                this.tabDetails.text_elements.forEach((label: any) => {
                    const labelObj = new LabelNodeModel();
                    labelObj.deSerialize(label, this.diagramEngine);
                    labels.push(labelObj);
                });
            }
            this.activeModel.setZoomLevel(this.tabDetails.zoom);
            this.activeModel.setOffset(this.tabDetails.offset_x, this.tabDetails.offset_y);
        }

        this.activeModel.addAll(...machines, ...shapes, ...labels, ...connectors);

        this.diagramEngine.setDiagramModel(this.activeModel);
    }

    public getActiveDiagram(): SRD.DiagramModel {
        return this.activeModel;
    }

    public getDiagramEngine(): SRD.DiagramEngine {
        return this.diagramEngine;
    }

    public recalculatePortsVisually() {
        this.diagramEngine.recalculatePortsVisually();
        this.diagramEngine.repaintCanvas();
    }

    public serialize() {
        return this.activeModel.serializeDiagram();
    }

    public deSerialize(data: any) {
        return this.activeModel.deSerializeDiagram(data, this.diagramEngine);
    }

    public clearSelection() {
        this.activeModel.clearSelection();
    }

    public removeNode(node: any) {
        this.activeModel.removeNode(node);
        const links = _.filter(this.activeModel.links, (link: any) => {
            return link?.sourcePort?.parent?.id === node?.id || link?.targetPort?.parent?.id === node?.id;
        });
        links.forEach((link: any) => {
            this.activeModel.removeLink(link);
        });
    }

    public removePortLinks(port: any) {
        const links = _.filter(this.activeModel.links, (link: any) => {
            return link.sourcePort.id === port.id || (link.targetPort && link.targetPort.id === port.id);
        });
        links.forEach((link: any) => {
            link.sourcePort.removeAllLinks();
            if (link.targetPort) {
                link.targetPort.removeAllLinks();
            }
            this.activeModel.removeLink(link);
        });
    }

    private findPortById(machines: any, machineId: number, anchorPointId: number) {
        const machine = machines.find((machineObj: any) => machineObj.extras.machineId === machineId);

        return machine.getPort(`anchor_point_${anchorPointId}`);
    }
}
