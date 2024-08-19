import powerbiVisualsApi from "powerbi-visuals-api";
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import VisualObjectInstance = powerbiVisualsApi.VisualObjectInstance;
export declare class Visual implements IVisual {
    private target;
    private svg;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    enumerateObjectInstances(options: powerbiVisualsApi.EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | powerbiVisualsApi.VisualObjectInstanceEnumerationObject;
    private getDefaultFontSize;
    private getDefaultColor;
    private getDefaultFontFamily;
}
