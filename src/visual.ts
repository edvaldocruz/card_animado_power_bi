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

export class Visual implements IVisual {
    private target: HTMLElement;
    private svg: d3.Selection<SVGElement, unknown, null, undefined>;
    private textGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.svg = d3.select(this.target)
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        this.textGroup = this.svg.append("g")
            .attr("class", "text-group");
    } 

    public update(options: VisualUpdateOptions) {
        // Limpar o conteúdo anterior
        this.svg.selectAll("*").remove();
        this.textGroup.remove();

        // Adicionar SVG
        const svgContent = `
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#b3cde0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#6497b1;stop-opacity:1" />
                </linearGradient>

                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#03396c;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#011f4b;stop-opacity:1" />
                </linearGradient>

                <path id="wave" d="M 0 50 Q 150 0, 300 50 T 600 50 T 900 50 T 1200 50 L 1200 100 L 0 100 Z" />
            </defs>
            <g>
                <use xlink:href="#wave" fill="url(#grad1)" x="0">
                    <animate attributeName="x" from="0" to="100" dur="5s" repeatCount="indefinite" />
                </use>
                <use xlink:href="#wave" fill="url(#grad2)" x="-100">
                    <animate attributeName="x" from="-100" to="0" dur="5s" repeatCount="indefinite" />
                </use>
            </g>
        `;

        this.svg.html(svgContent);

        // Adicionar o texto da medida
        if (options.dataViews && options.dataViews[0]) {
            const dataView = options.dataViews[0];
            const measure = dataView.categorical?.values[0] as DataViewValueColumn;
            if (measure && measure.values.length > 0) {
                const value = measure.values[0];

                this.textGroup = this.svg.append("g")
                    .attr("class", "text-group");

                this.textGroup.append("rect")  // Fundo temporário
                    .attr("x", options.viewport.width / 2 - 50)
                    .attr("y", options.viewport.height / 2 - 20)
                    .attr("width", 100)
                    .attr("height", 40)
                    .attr("fill", "white")
                    .attr("stroke", "black");

                this.textGroup.append("text")
                    .attr("x", options.viewport.width / 2)
                    .attr("y", options.viewport.height / 2)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "24px")
                    .attr("fill", "#000000")
                    .text(value.toString());
            }
        }
    }
}
