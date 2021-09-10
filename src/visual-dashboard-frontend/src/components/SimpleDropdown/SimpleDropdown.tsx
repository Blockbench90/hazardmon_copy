import * as React from 'react';

import './SimpleDropdown.scss';

interface SimpleDropdownProps {
    trigger: any
    children: any
}

interface SimpleDropdownState {
    showDropdown: boolean
}

class SimpleDropdown extends React.Component<SimpleDropdownProps, SimpleDropdownState> {
    protected elementRef: any;

    constructor(props: SimpleDropdownProps) {
        super(props);

        this.state = {
            showDropdown: false
        };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.checkClicks = this.checkClicks.bind(this);
    }

    public componentWillUnmount() {
        document.removeEventListener('click', this.checkClicks);
    }

    public render() {
        const { trigger, children } = this.props;
        const { showDropdown } = this.state;

        const getElementRef = (elementRef: any) => this.elementRef = elementRef;

        return (
            <div className="simple-dropdown" ref={getElementRef}>
                <button onClick={this.toggleDropdown} className="simple-dropdown__trigger">{trigger}</button>
                <div className="simple-dropdown__value">
                    {showDropdown && children}
                </div>
            </div>
        )
    }

    private checkClicks(e: any) {
        if (!e.path.includes(this.elementRef)) {
            this.toggleDropdown();
        }
    }

    private toggleDropdown() {
        const { showDropdown } = this.state;
        this.setState({showDropdown: !showDropdown});

        if (!showDropdown) {
            document.addEventListener('click', this.checkClicks);
        } else {
            document.removeEventListener('click', this.checkClicks);
        }
    }
}

export default SimpleDropdown;