export const delimitMarkerContent = function(markerContent: Marker | string): Marker {
    // const testMarker: Marker = `{${markerContent.substring(1, markerContent.length)}}`;
    let _markerContent = markerContent;
    _markerContent = _markerContent.startsWith("{") ? _markerContent : `{${_markerContent}`;
    _markerContent = _markerContent.endsWith("}") ? _markerContent : `${_markerContent}}`;
    return _markerContent as Marker;
};
