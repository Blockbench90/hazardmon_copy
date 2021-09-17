import * as React from 'react';
import { Rnd } from 'react-rnd';

import { 
    BASE_FONT_SIZE,
    DEFAULT_VALUE,
    FONT_UNIT
} from './LabelNodeConstants';
import { selectElementContents } from './LabelNodeUtils';

import './LabelNodeWidget.css';

export interface LabelNodeWidgetProps {
    node: any;
}

interface LabelNodeWidgetState {
    containerHeight: string;
    containerWidth: string;
    editActive: boolean;
    fontSize: number;
    value: string;
}

class LabelNodeWidget extends React.Component<LabelNodeWidgetProps, LabelNodeWidgetState> {
    protected labelRef: any;
    protected initialWidth: number;
    protected initialFontSize: number;

    constructor(props: LabelNodeWidgetProps) {
        super(props);

        this.state = {
            containerHeight: '',
            containerWidth: '',
            editActive: false,
            fontSize: null,
            value: ''
        };
    }

    public componentDidMount() {
        const { node } = this.props;
        const initialValue = node.extras.value || DEFAULT_VALUE;

        this.labelRef.innerHTML = initialValue;

        this.setState({
            fontSize: node.extras.fontSize || BASE_FONT_SIZE,
            value: initialValue,
        }, () => {
            this.calculateScalingData(); 
            this.updateContainerSize();
        });
    }

    public componentDidUpdate(
        prevProps: LabelNodeWidgetProps, 
        prevState: LabelNodeWidgetState
    ) {
        const { node } = this.props;

        if (prevState.value !== this.state.value) {
            node.extras.value = this.state.value;
        } 

        if (prevState.fontSize !== this.state.fontSize) {
            node.extras.fontSize = this.state.fontSize;
        }

        if (prevState.editActive !== this.state.editActive) {
            if (this.state.editActive) {
                this.labelRef.style.cursor = 'text';
                selectElementContents(this.labelRef);
            } else {
                this.labelRef.style.cursor = 'grab';
            }
        }
    }

    public render() {
        const { containerHeight, containerWidth, editActive, fontSize} = this.state;

        return (
            <Rnd
                className="custom-node"
                onResize={this.onResize}
                onResizeStop={this.onResizeStop}
                size={{
                    height: containerHeight,
                    width: containerWidth
                }}
                lockAspectRatio={true}
                disableDragging={true}
                enableResizing={{
                    bottom: false,
                    bottomLeft: true,
                    bottomRight: true,
                    left: false,
                    right: false,
                    top: false,
                    topLeft: true,
                    topRight: true,
                }}
            >
                <span 
                    ref={(ref:any)=>(this.labelRef = ref)}
                    className="vd-label"
                    style={{
                        fontSize: fontSize + FONT_UNIT
                    }}
                    contentEditable={editActive}
                    spellCheck={false}
                    onInput={this.onInput}
                    onDoubleClick={this.onDoubleClick}
                    onBlur={this.onBlur}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onKeyUp={this.onKeyUp}
                />
            </Rnd>
        );
    }

    public onResize = (e: any, direction: any, ref: any) => {
        const scaledSize = (parseInt(ref.style.width, 10) / this.initialWidth) * this.initialFontSize;

        this.setState({
            fontSize: scaledSize,
        });
    }

    public onResizeStop = (e: any, direction: any, ref: any) => {
        this.calculateScalingData();
        this.updateContainerSize();
    }

    public onKeyUp = (e: any) => {
        if (this.state.editActive) {
            // Prevent node removing on the delete/backspace button click
            e.stopPropagation();
        }
    }

    public onMouseDown = (e: any) => {
        if (!this.state.editActive) {
            e.currentTarget.style.cursor = 'grabbing';
        }
    }

    public onMouseUp = (e: any) => {
        if (!this.state.editActive) {
            e.currentTarget.style.cursor = 'grab';
        }
    }

    public onDoubleClick = (e: any) => {        
        this.setState({
            editActive: true
        });
    }

    public onBlur = () => {
        this.setState({
            editActive: false
        });
    }

    public onInput = (e: any) => {
        this.setState({
            value: e.target.textContent,
        },
        () => {
            this.calculateScalingData();
            this.updateContainerSize();
        });
    }

    public calculateScalingData = () => {
        const rect = this.labelRef.getBoundingClientRect();

        this.initialWidth = rect.width;
        this.initialFontSize = parseInt(this.labelRef.style.fontSize, 10);
    }

    public updateContainerSize = () => {
        const rect = this.labelRef.getBoundingClientRect();
        
        this.setState({
            containerHeight: rect.height + 'px',
            containerWidth: rect.width + 'px'
        });
    }
}

export default LabelNodeWidget;
