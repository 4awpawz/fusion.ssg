import { delimitMarkerContent } from "./delimitMarkerContent.js";

// TODO: 22/09/22 10:43:57 - jeffreyschwartz : This probably belongs in "services/composition" folder.
export const markerFindAndReplaceContent = function(content: string, marker: Marker | string, value: string): string {
    const _marker = delimitMarkerContent(marker);
    return content.replace(new RegExp(_marker, "g"), `${value}`);
};
