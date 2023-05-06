/**
 * getComponentProfiles - returns ComponentProfile[].
 */

import type { ComponentProfile, ComponentProperty, DataSource } from "../../../types/types";
import { _filter } from "../../lib/functional.js";

const getDataSourcesFromTagProperties = function(properties: string[]): DataSource[] {
    const componentDataSourcesProperty = _filter(properties, property => property.startsWith("dataSources"))[0] as string; // dataSources="dataSource,..."
    if (typeof componentDataSourcesProperty === "undefined") return [];
    let dataSources = componentDataSourcesProperty.split("=").slice(1);
    dataSources = dataSources.map(dataSource => dataSource.replaceAll("'", "").replaceAll("\"", ""));
    return dataSources;
};

const getOtherPropertiesFromTagProperties = function(properties: string[]) {
    let props = {};
    for (const prop of properties) {
        const tProp: ComponentProperty = {};
        if (prop.startsWith("dataSources") || prop.includes("<") || prop.includes("/>")) continue;
        const propParts = prop.split("=");
        const key: string = propParts[0] as string;
        const value = propParts.length === 2 ? (propParts[1] as string).replace("'", "") as string : true;
        tProp[key] = typeof value === "string" && value.replaceAll("\"", "") || value;
        props = { ...props, ...tProp };
    }
    return props;
};

export const getComponentProfiles = function(assetContent: string): ComponentProfile[] {
    const matches = [...assetContent.matchAll(/<([A-Z][a-zA-Z0-9]*)\s+[^>]*?(?<!<code>)\/?>/g)];
    if (matches.length === 0) return [];
    const componentProfiles: ComponentProfile[] = [];
    for (const match of matches) {
        // Get the component path and its data sources.
        const tagParts = match[0].split(" ");
        let tagProperties = tagParts.slice(1);
        const componentIsCollection = tagProperties.includes("isCollection");
        tagProperties = componentIsCollection && _filter(tagProperties, tagProperty =>
            tagProperty !== "isCollection") || tagProperties;
        const componentDataSources = getDataSourcesFromTagProperties(tagProperties);
        tagProperties = tagProperties.includes("dataSources") && _filter(tagProperties, tagProperty =>
            tagProperty !== "dataSources") || tagProperties;
        const componentProperties = getOtherPropertiesFromTagProperties(tagProperties);
        const componentProfile = {
            componentTag: match[0],
            componentName: match[1] + ".tsx" as string,
            componentDataSources,
            componentProperties,
            componentIsCollection
        };
        componentProfiles.push(componentProfile);
    }
    return componentProfiles;
};
