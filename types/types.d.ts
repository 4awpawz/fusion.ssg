interface PromiseResultGlob {
    success: boolean,
    value: string[] | Error,
}

type AssetType = "page" | "template" | "include"

interface Asset {
    assetType: AssetType
    fileName: string,
    fileType: string,
    content: string,
    htmlDocumentName?: string | undefined,
    associatedTemplate?: string | undefined,
    fm: GrayMatterFile
}

type Assets = Asset[]

type IncludeMarker = string

type IncludeFileName = string

type IncludeContent = string

interface Include {
    includeMakrer: IncludeMarker,
    includeFileName: IncudeFileName,
    includeContent: IncludeContent,
}

type Includes = Include[]

type IncludeMatchResult = { matched: string, fileName: string }

type IncludeMatchesResults = [IncludeMatchResult] | []

type MarkerLeftDelimeter = "{"

type MarkerContent = string

type MarkerRightDelimeter = "}"

type Marker = `${MarkerLeftDelimeter}${MarkerContent}${MarkerRightDelimeter}`
