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

export type IncludeToken = string

export type IncludeFileName = string

export type IncludeContent = string

export interface Include {
    includeMakrer: IncludeToken,
    includeFileName: IncludeFileName,
    includeContent: IncludeContent,
}

export type Includes = Include[]

export type IncludeMatchResult = { matched: string, fileName: string }

export type IncludeMatchesResults = [IncludeMatchResult] | []

export type TokenLeftDelimeter = "{"

export type TokenContent = string

export type TokenRightDelimeter = "}"

export type Token = `${TokenLeftDelimeter}${TokenContent}${TokenRightDelimeter}`

export interface UserConfig {
    postsFolder?: string,
}

export interface Configuration {
    srcFolder: string,
    buildFolder: string,
    libFolder: string
    componentsFolder: string,
    userConfig?: UserConfig
}

export interface ComponentIdentifier {
    modulePath: string,
    moduleName: string
}

export interface ComponentsMap {
    [key: string]: ComponentIdentifier
}

export type Component = (() => string) | undefined;

export type Components = Components[];
