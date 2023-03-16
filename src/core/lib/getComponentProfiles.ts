/**
 * getComponentProfiles - returns ComponentProfile[].
 */

import type { ComponentProfile, DataSource } from "../../types/types";

const getDataSourcesFromTagProperties = function(properties: string[]): DataSource[] {
    const componentDataSourcesProperty = properties.filter(property => property.startsWith("dataSources"))[0] as string; // dataSources="dataSource,..."
    if (typeof componentDataSourcesProperty === "undefined") return [];
    let dataSources = componentDataSourcesProperty.split("=").slice(1);
    dataSources = dataSources.map(dataSource => dataSource.replaceAll("'", "").replaceAll("\"", ""));
    return dataSources;
};

const getOtherPropertiesFromTagProperties = function(properties: string[]) {
    return properties.filter(propertiy => !propertiy.startsWith("dataSources"));
};

export const getComponentProfiles = function(assetContent: string): ComponentProfile[] {
    const matches = [...assetContent.matchAll(/<([A-Z][a-zA-Z0-9]*)\s+[^>]*?(?<!<code>)\/?>/g)];
    if (matches.length === 0) return [];
    const componentProfiles: ComponentProfile[] = [];
    for (const match of matches) {
        // Get the component path and its data sources.
        const tagParts = match[0].split(" ");
        let tagProperties = tagParts.slice(1);
        const isCollectionComponent = tagProperties.includes("isCollection");
        tagProperties = isCollectionComponent && tagProperties.filter(tagProperty => tagProperty !== "isCollection") || tagProperties;
        const componentDataSources = getDataSourcesFromTagProperties(tagProperties);
        const componentProperties = getOtherPropertiesFromTagProperties(tagProperties);
        const componentProfile = {
            componentTag: match[0],
            componentName: match[1] + ".tsx" as string,
            componentDataSources,
            componentProperties,
            componentIsCollection: isCollectionComponent
        };
        componentProfiles.push(componentProfile);
    }
    return componentProfiles;
};
