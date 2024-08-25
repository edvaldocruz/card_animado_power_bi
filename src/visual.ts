/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import * as d3 from "d3";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualHost = powerbiVisualsApi.extensibility.visual.IVisualHost;
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import DataView = powerbiVisualsApi.DataView;
import DataViewValueColumn = powerbiVisualsApi.DataViewValueColumn;
import VisualObjectInstance = powerbiVisualsApi.VisualObjectInstance;

export class Visual implements IVisual {
    private target: HTMLElement;
    private svg: d3.Selection<SVGElement, unknown, null, undefined>;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.svg = d3.select(this.target)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");
    }

    public update(options: VisualUpdateOptions) {
        // Limpar o conteúdo anterior
        this.svg.selectAll("*").remove();

        // Dimensões dinâmicas
        const width = options.viewport.width;
        const height = options.viewport.height;

        // Obter o valor da medida
        let measureValue = "";
        if (options.dataViews && options.dataViews[0]) {
            const dataView = options.dataViews[0];
            const measure = dataView.categorical?.values[0] as DataViewValueColumn;
            if (measure && measure.values.length > 0) {
                measureValue = measure.values[0].toString();
            }
        }

        // Acessar as propriedades de formatação do objeto measureFormat
        const settings = {
            fontSize: this.getDefaultFontSize(),
            color: this.getDefaultColor(),
            fontFamily: this.getDefaultFontFamily()
        };

        if (options.dataViews[0].metadata.objects) {
            const measureFormat = options.dataViews[0].metadata.objects["measureFormat"];

            if (measureFormat) {
                settings.fontSize = measureFormat["fontSize"] ? `${measureFormat["fontSize"]}px` : settings.fontSize;
                settings.color = measureFormat["color"] ? (measureFormat["color"] as any).solid.color : settings.color;
                settings.fontFamily = (measureFormat["fontFamily"] as string) || settings.fontFamily;
            }
        }

        // Adicionar SVG com o valor da medida embutido
        const svgContent = `

            <g>
                <!-- Primeiro Círculo -->
                <circle cx="76.4%" cy="50%" r="15.8%" stroke="#a3ecff" stroke-width="4.5%" fill="none">
                    <animateTransform attributeName="transform" type="translate" from="0,0" to="-5.86%,-9.77%" dur="5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="r" from="9.8%" to="19.5%" dur="5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="5s" begin="0s" repeatCount="indefinite" />
                </circle>

                <!-- Segundo Círculo -->
                <circle cx="88.7%" cy="59.4%" r="17.8%" stroke="#a4e3ff" stroke-width="3.1%" fill="none">
                    <animateTransform attributeName="transform" type="translate" from="0,0" to="7.8%,-11.7%" dur="5s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="r" from="9.8%" to="23.4%" dur="5s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="5s" begin="1s" repeatCount="indefinite" />
                </circle>

                <!-- Terceiro Círculo -->
                <circle cx="84.4%" cy="57.2%" r="13.8%" stroke="#a3f9ff" stroke-width="2.8%" opacity="0.3433" fill="none">
                    <animateTransform attributeName="transform" type="translate" from="0,0" to="-3.9%,-7.8%" dur="5s" begin="2s" repeatCount="indefinite" />
                    <animate attributeName="r" from="7.8%" to="17.6%" dur="5s" begin="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="5s" begin="2s" repeatCount="indefinite" />
                </circle>
            </g>
        `;

        this.svg.html(svgContent);

        // Adicionar o texto da medida com as propriedades de formatação
        this.svg.append("text")
            .attr("x", "20%")
            .attr("y", "28%")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", settings.fontSize)
            .attr("fill", settings.color)
            .attr("font-family", settings.fontFamily)
            .text(measureValue);
    }

    public enumerateObjectInstances(options: powerbiVisualsApi.EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | powerbiVisualsApi.VisualObjectInstanceEnumerationObject {
        const instances: VisualObjectInstance[] = [];

        switch (options.objectName) {
            case "measureFormat":
                instances.push({
                    objectName: "measureFormat",
                    displayName: "Measure Format",
                    properties: {
                        fontSize: this.getDefaultFontSize(),
                        color: this.getDefaultColor(),
                        fontFamily: this.getDefaultFontFamily()
                    },
                    selector: null
                });
                break;
        }

        return instances;
    }

    private getDefaultFontSize(): string {
        return "24px";
    }

    private getDefaultColor(): string {
        return "#000000";
    }

    private getDefaultFontFamily(): string {
        return "sans-serif";
    }
}
