import powerbiVisualsApi from "powerbi-visuals-api";
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
export declare class Visual implements IVisual {
    private target;
    private svg;
    private textGroup;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
}
