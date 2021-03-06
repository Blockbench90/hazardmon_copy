import { AbstractPortFactory, PortModel } from "storm-react-diagrams";

export default class SimplePortFactory extends AbstractPortFactory {
	protected cb: (initialConfig?: any) => PortModel;

	constructor(type: string, cb: (initialConfig?: any) => PortModel) {
		super(type);
		this.cb = cb;
	}

	public getNewInstance(initialConfig?: any): PortModel {
		return this.cb(initialConfig);
	}
}
