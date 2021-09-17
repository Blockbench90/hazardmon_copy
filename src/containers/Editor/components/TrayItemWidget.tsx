import * as React from "react";

export interface TrayItemWidgetProps {
    model: any;
    name: string;
}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps, {}> {
    constructor(props: TrayItemWidgetProps) {
        super(props);
        this.state = {};
        this.onDragStart = this.onDragStart.bind(this);
    }

    public render() {
        const { name, model } = this.props;
        return (
            <div
                draggable={true}
                onDragStart={this.onDragStart}
                className="machine-type"
            >
                <div>{name}</div>
                <div className="machine-type__image-container">
                    {
                        model.type === 'custom' &&
                        <img src={model.left_side_img_thumbs.small} alt={name}/>
                    }
                    {
                        model.type === 'shape' &&
                        <div className={model.shape} />
                    }
                    {
                        model.type === 'label' &&
                        <span className='label'>Text</span>
                    }
                </div>
            </div>
        );
    }

    private onDragStart(event: any) {
        event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model));
    }
}
