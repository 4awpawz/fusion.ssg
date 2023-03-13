import type { GrayMatterFile } from "gray-matter";

export interface PromiseResultGlob {
    success: boolean,
    value: string[] | Error,
}

export type AssetType = "page" | "template" | "include" | "component" | "data" | "*"

export interface Asset {
    timestamp: number,
    assetType: AssetType
    filePath: string,
    fileType: string,
    collection?: Asset[],
    content?: string,
    fm?: GrayMatterFile<string>
    associatedPage?: string | undefined,
    htmlDocumentName?: string | undefined,
}

export interface CollectionPageProfile {
    content: string,
    title: string,
    htmlDocumentName: string
}

export type Assets = Asset[]

export interface Tokens {
    tokens: object
}

export type DataSource = string

export interface ComponentProfile {
    componentTag: string,
    componentName: string,
    componentDataSources: DataSource[],
    componentProperties: string[],
    componentIsCollection: boolean
}

export interface BuffersMap {
    [key: string]: any
}

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
    dataFolder: string,
    cssFolder: string,
    scriptsFolder: string,
    mediaFolder: string,
    etcFolder: string,
    userConfig?: UserConfig
}

export interface ComponentIdentifier {
    moduleName: string
}

export interface ComponentsMap {
    [key: string]: ComponentIdentifier
}

export type Component = ((buffersMap: BuffersMap | void) => Promise<string>) | undefined;

export type CollectionComponent = ((index: number, buffersMap: BuffersMap | void) => Promise<CollectionPageProfile>) | undefined;

export type Components = Components[];

export type TokenValidator = (matches: RegExpMatchArray) => boolean;

export interface TokenValidators {
    [key: string]: TokenValidator
}
