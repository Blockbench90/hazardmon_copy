import * as React from "react";
import * as SRD from "storm-react-diagrams";
import CustomNodeModel from "./CustomNodeModel";
import CustomNodeWidget from "./CustomNodeWidget";

export default class CustomNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("custom");
    }

    public generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel): JSX.Element {
        return <CustomNodeWidget node={node} />;
    }

    public getNewInstance(params: any) {
        return new CustomNodeModel();
    }
}
