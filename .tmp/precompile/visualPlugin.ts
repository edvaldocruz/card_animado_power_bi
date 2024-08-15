import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var multipleorganizationalcharts8F75BCC5F95D4FE6B080F13EC68EAEA4: IVisualPlugin = {
    name: 'multipleorganizationalcharts8F75BCC5F95D4FE6B080F13EC68EAEA4',
    displayName: 'multiple organizational charts',
    class: 'Visual',
    apiVersion: '5.3.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["multipleorganizationalcharts8F75BCC5F95D4FE6B080F13EC68EAEA4"] = multipleorganizationalcharts8F75BCC5F95D4FE6B080F13EC68EAEA4;
}
export default multipleorganizationalcharts8F75BCC5F95D4FE6B080F13EC68EAEA4;