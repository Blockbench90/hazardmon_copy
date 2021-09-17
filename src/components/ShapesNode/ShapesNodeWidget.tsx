import * as React from 'react';
import ResizableRect from 'react-resizable-rotatable-draggable';

import {MIN_HEIGHT, MIN_WIDTH, SHAPE_TYPES} from './ShapesNodeConstants';
import ShapesNodeModel from './ShapesNodeModel';

import './ShapesNodeWidget.css';

export interface ShapesNodeWidgetProps {
    node: ShapesNodeModel;
}

interface ShapesNodeWidgetState {
    height: number,
    offsetLeft: number,
    offsetTop: number,
    rotateAngle: number,
    width: number
}

class ShapesNodeWidget extends React.Component<ShapesNodeWidgetProps, ShapesNodeWidgetState> {
    protected resizeAreaPadding: number;

    constructor(props: ShapesNodeWidgetProps) {
        super(props);

        const {width, height, offsetTop, offsetLeft, rotateAngle} = props.node.extras;
        
        this.state = {
            height,
            offsetLeft,
            offsetTop,
            rotateAngle,
            width,
        };

        // Padding of the resizer element
        this.resizeAreaPadding = 4; // px
    }

    public render() {
        const {width, height, offsetTop, offsetLeft, rotateAngle} = this.state;
        const {node: {extras}} = this.props;
        const isLine: boolean = extras.shape === SHAPE_TYPES.LINE;

        return (
            <React.Fragment>
                <ResizableRect
                    left={offsetLeft - this.resizeAreaPadding}
                    top={offsetTop - this.resizeAreaPadding}
                    width={width + this.resizeAreaPadding * 2}
                    height={height + this.resizeAreaPadding * 2}
                    rotateAngle={rotateAngle}
                    minWidth={MIN_WIDTH}
                    minHeight={MIN_HEIGHT}
                    onRotate={this.onRotate}
                    onRotateEnd={this.onRotateEnd}
                    onResize={this.onResize}
                    onResizeEnd={this.onResizeEnd}
                    zoomable={(isLine && 'e, w') || 'n, w, s, e, nw, ne, se, sw'}
                />
                <div
                    className={`vd-shape ${extras.shape}`}
                    style={{
                        height,
                        left: offsetLeft,
                        top: offsetTop,
                        transform: `rotate(${rotateAngle}deg)`,
                        width,
                    }}
                />
            </React.Fragment>
        );
    }

    public onResize = (style: any) => {
        let {width, height} = style;
        const {top, left} = style;

        const offsetLeft = left + this.resizeAreaPadding;
        const offsetTop = top + this.resizeAreaPadding;

        height = height - this.resizeAreaPadding * 2;
        width = width - this.resizeAreaPadding * 2;

        this.setState({
            height,
            offsetLeft,
            offsetTop,
            width
        })
    }

    public onResizeEnd = () => {
        const {node} = this.props;
        const {width, height, offsetLeft, offsetTop} = this.state;

        node.updateExtras({
            height,
            offsetLeft,
            offsetTop,
            width
        });
    };

    public onRotate = (rotateAngle: any) => {
        this.setState({
            rotateAngle
        })
    }

    public onRotateEnd = () => {
        const { node } = this.props;
        const {rotateAngle} = this.state;

        node.updateExtras({
            rotateAngle
        });
    }
}

export default ShapesNodeWidget;
