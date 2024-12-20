import type { GrayMatterFile } from "gray-matter";
import type { VNode } from "preact";

export interface PromiseResultGlob {
    success: boolean,
    value: string[] | Error,
}

export type AssetType = "page" | "template" | "include" | "component" | "data" | "css" | "*"

export interface Asset {
    timestamp: number,
    assetType: AssetType
    filePath: string,
    fileType: string,
    isCollection?: boolean;
    isWip?: boolean,
    isPost?: boolean,
    memberOf?: string,
    content?: string,
    fm?: GrayMatterFile<string>
    associatedPage?: string,
    htmlDocumentName?: string,
    cssDocumentName?: string,
    url?: string,
    postTimeStamp?: number,
    postDate?: string
}

export interface PostProfile {
    categories?: string,
    tags?: string
}

export interface CollectionPageProfile {
    content: VNode,
    title: string,
    htmlDocumentName: string
}

export type Assets = Asset[]

export type Tokens = object;

export type DataSource = string

export interface ComponentProfile {
    componentTag: string,
    componentName: string,
    componentDataSources: DataSource[],
    componentProperties: Record<string, unknown>,
    componentIsCollection: boolean
}

export interface BuffersMap {
    [key: string]: unknown
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

export interface ConditionalIncludes { developmentOnly?: string[], releaseOnly?: string[] }

export interface UserConfig {
    postsFolder: string,
    baseURL: string,
    wips: string[],
    tokens: object,
    conditionalIncludes: ConditionalIncludes
}

export interface Configuration {
    srcFolder: string,
    postsFolder: string,
    metaFolder: string,
    buildFolder: string,
    libFolder: string
    componentsFolder: string,
    dataFolder: string,
    cssFolder: string,
    cssLibsFolder: string,
    scriptsFolder: string,
    mediaFolder: string,
    etcFolder: string,
    userConfig: UserConfig
}

export interface ComponentProperty {
    [key: string]: string | boolean;
}

export interface ComponentIdentifier {
    moduleName: string
}

export interface ComponentsMap {
    [key: string]: ComponentIdentifier
}

export type Component = ((buffersMap: BuffersMap) => Promise<VNode>) | undefined;

export type CollectionComponent = ((buffersMap: BuffersMap) => Promise<CollectionPageProfile>) | undefined;

export type Components = Components[];

export type TokenValidator = (matches: RegExpMatchArray) => boolean;

export interface TokenValidators {
    [key: string]: TokenValidator
}

export type BuildStrategy = "DEVELOPMENT" | "RELEASE";

export interface BuildStrategyOptions {
    buildStrategy: BuildStrategy,
    cacheBust: boolean,
    verbose: boolean
}

export interface Meta {
    url: string
}

export interface UnresolvedToken {
    token: string,
    file: string
}

export interface Timer {
    name: string,
    precision: number,
    started: [number, number],
    elapsed?: string
}
