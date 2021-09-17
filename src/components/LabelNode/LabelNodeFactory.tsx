import * as React from "react";
import * as SRD from "storm-react-diagrams";
import LabelNodeWidget from "./LabelNodeWidget";

export default class LabelNodeFactory extends SRD.NodeModel {
    constructor() {
        super("label");
    }

    public generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
        return <LabelNodeWidget node={node} />;
    }

    public getNewInstance(params: any) {
        return new SRD.NodeModel();
    }
}
