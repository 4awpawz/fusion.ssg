import type { GrayMatterFile } from "gray-matter";

export interface PromiseResultGlob {
    success: boolean,
    value: string[] | Error,
}

export type AssetType = "page" | "template" | "include"

export interface Asset {
    assetType: AssetType
    fileName: string,
    fileType: string,
    content: string,
    htmlDocumentName?: string | undefined,
    associatedPage?: string | undefined,
    fm: GrayMatterFile<string>
}

export type Assets = Asset[]

export type IncludeMarker = string

export type IncludeFileName = string

export type IncludeContent = string

export interface Include {
    includeMakrer: IncludeMarker,
    includeFileName: IncludeFileName,
    includeContent: IncludeContent,
}

export type Includes = Include[]

export type IncludeMatchResult = { matched: string, fileName: string }

export type IncludeMatchesResults = [IncludeMatchResult] | []

export type MarkerLeftDelimeter = "{"

export type MarkerContent = string

export type MarkerRightDelimeter = "}"

export type Marker = `${MarkerLeftDelimeter}${MarkerContent}${MarkerRightDelimeter}`

export interface Configuration {
    projectStructure: {
        srcFolder: string,
        buildFolder: string,
        postsFolder: string
    }
}
