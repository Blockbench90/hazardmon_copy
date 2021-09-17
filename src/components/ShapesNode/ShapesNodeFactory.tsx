import * as React from 'react';
import * as SRD from 'storm-react-diagrams';
import ShapesNodeModel from './ShapesNodeModel';
import ShapesNodeWidget from './ShapesNodeWidget';

export default class ShapesNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("shapes");
    }

    public generateReactWidget(diagramEngine: SRD.DiagramEngine, node: ShapesNodeModel): JSX.Element {
        return <ShapesNodeWidget node={node} />;
    }

    public getNewInstance(params: any) {
        return new ShapesNodeModel();
    }
}
