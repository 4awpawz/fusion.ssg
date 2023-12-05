/**
 * discover - Creates assets for files found in user's src
 * that participates in page compostion. Resolves to an array of assets.
 */

import path from "path";
import matter from "gray-matter";
import { markdownToHTML } from "../../lib/markdownToHTML.js";
import { _readFile } from "../../lib/io/_readFile.js";
import { fileModifiedTime } from "../../lib/io/fileModifiedTime.js";
import { getFiles } from "./getFiles.js";
import { getAssetType } from "./getAssetType.js";
import type { Asset, Assets, PostProfile } from "../../../types/types";
import * as metrics from "../../lib/metrics.js";
import { normalizeOutPath } from "./normalizeOutPath.js";
import { getPostOutPath } from "./getPostOutPath.js";
import { getCategoryPath } from "./getCategoryPath.js";
import { isPost } from "./isPost.js";
import { isAssetPostLandingPage } from "./isAssetPostLandingPage.js";
import { config } from "../configuration/configuration.js";
import chalk from "chalk";
import { templateIsWIP } from "./templateIsWIP.js";
import { getPostTimeStampFromPostPath } from "./getPostTimeStampFromPostPath.js";
import { _filter, _forEach } from "../../lib/functional.js";
import { getPostName } from "./getPostName.js";
import { includeIsConditional } from "./includeIsConditional.js";

const processInclude = async function(asset: Asset): Promise<Asset> {
    let buffer = await _readFile(asset.filePath);
    buffer = typeof buffer === "undefined" ? "" : path.parse(asset.filePath).ext === ".md" ? markdownToHTML(buffer) : buffer;
    asset.content = includeIsConditional(asset.filePath) ? "" : buffer;
    return asset;
};

const processPage = async function(asset: Asset): Promise<Asset> {
    const buffer = await _readFile(asset.filePath);
    asset.content = typeof buffer === "undefined" ? "" : buffer;
    return asset;
};

const processPost = async function(asset: Asset): Promise<Asset> {
    asset.isPost = true;
    asset.postTimeStamp = getPostTimeStampFromPostPath(asset.filePath);
    asset.postDate = new Date(asset.postTimeStamp as number).toLocaleDateString();
    const postProfile: PostProfile = asset?.fm?.data["post"];
    const postCategoryPath = typeof postProfile !== "undefined"
        && typeof postProfile.categories !== "undefined" ? getCategoryPath(postProfile.categories) : undefined;
    const oPath = await getPostOutPath(asset.filePath, postCategoryPath);
    const postName = getPostName(asset.filePath);
    // asset.htmlDocumentName = path.join(oPath as string, path.parse(asset.filePath.split("-").pop() as string).name, "index.html");
    asset.htmlDocumentName = path.join(oPath as string, postName, "index.html");
    asset.url = path.parse(asset.htmlDocumentName).dir + "/";
    return asset;
};

const processPostLandingPage = function(asset: Asset): Asset {
    const oPath = config.userConfig.postsFolder;
    const oName = "index.html";
    asset.htmlDocumentName = path.join(oPath, oName);
    asset.url = path.parse(asset.htmlDocumentName).dir + "/";
    return asset;
};

let has404 = false;

const process404 = function(asset: Asset): Asset {
    const oPath = normalizeOutPath(path.parse(asset.filePath).dir);
    const oName = "404.html";
    asset.htmlDocumentName = path.join(oPath, oName);
    asset.url = path.parse(asset.htmlDocumentName).dir + "/";
    has404 = true;
    return asset;
};

const processTemplate = async function(asset: Asset): Promise<Asset> {
    const buffer = await _readFile(asset.filePath);
    try {
        // Using the default "---" excerpt separator can cause issues when
        // markdown is converted to HTML. For an explanation of this, please
        // see https://github.github.com/gfm/#example-73.
        asset.fm = matter(buffer as string, { excerpt: true, excerpt_separator: '<!-- end -->' });
    } catch (error) {
        console.log(chalk.red(`there was an error: Can't compile front matter in ${asset.filePath}.`));
        throw error;
    }
    asset.content = path.parse(asset.filePath).ext === ".md" && markdownToHTML(asset.fm.content) || asset.fm.content;
    asset.isWip = templateIsWIP(asset.filePath);
    asset.associatedPage = typeof asset.fm.data["page"] === "undefined" ? "src/pages/default.html" : `src/pages/${asset.fm.data["page"]}.html`;
    if (isPost(asset.filePath)) return processPost(asset);
    if (isAssetPostLandingPage(asset.filePath)) return processPostLandingPage(asset);
    if (path.parse(asset.filePath).name === "404") return process404(asset);
    const oPath = normalizeOutPath(path.parse(asset.filePath).dir);
    const oName = path.parse(asset.filePath).name === "index" ? "index.html" : path.join(path.parse(asset.filePath).name, "/index.html");
    asset.htmlDocumentName = path.join(oPath, oName);
    asset.url = path.parse(asset.htmlDocumentName).dir + "/";
    return asset;
};

const reportWIPS = function(assets: Assets): void {
    if (process.env["BUILD_STRATEGY"] !== "RELEASE") return;
    const wips = _filter(assets, asset => typeof asset["isWip"] !== "undefined" && asset["isWip"] === true);
    if (!wips.length) return;
    console.log(chalk.black.bgYellow("Warning! The following templates are WIPS and their corresponding HTML documents have not been generated:"));
    _forEach(wips, function(wip) {
        console.log(chalk.black.bgYellow(`  template: ${wip.filePath}`));
    });
};

export const discover = async function(): Promise<Assets> {
    metrics.startTimer("discovery");
    const pathsToAssets = await getFiles();
    let assets = await Promise.all(pathsToAssets.map(async (assetPath: string) => {
        const fileInfo = path.parse(assetPath);
        const filePath = assetPath;
        const fileType = fileInfo.ext;
        const timestamp = await fileModifiedTime(assetPath);
        const assetType = getAssetType(assetPath);

        // All assets have these properties.
        const asset: Asset = {
            timestamp,
            assetType,
            filePath,
            fileType,
        };

        // If the asset doesn't contribute markup (html or markdown)
        // to the document then we're done with it.
        if (["data", "component"].includes(assetType)) return asset;

        // At this point the asset is either an include, a page, or a template.

        if (assetType === "include") return await processInclude(asset);
        if (assetType === "page") return await processPage(asset);
        if (assetType === "template") return await processTemplate(asset);

        return asset;
    }));
    reportWIPS(assets);
    // When building for release, wips are not included in metadata.
    assets = process.env["BUILD_STRATEGY"] === "RELEASE" ? _filter(assets, asset => !asset.isWip) : assets;
    // Warn if there's no 404.html document.
    if (!has404) console.log(chalk.yellowBright("Warning: this site is missing a 404.html file."));
    metrics.stopTimer("discovery");
    return assets;
};
