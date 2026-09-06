/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 246:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeEmbed = makeEmbed;
async function makeEmbed(inputs) {
    // prepare variables
    let changelog = inputs.changelog;
    if (inputs.changelog_split.length >= 1) {
        changelog = changelog.split(inputs.changelog_split)[0].trim();
    }
    changelog = "```md\n" + changelog + "\n```";
    let pages = `${inputs.github_emoji} [GitHub](${inputs.github})`;
    if (inputs.released) {
        pages += `\n${inputs.curseforge_emoji} [Curseforge](${inputs.curseforge})`;
        pages += `\n${inputs.modrinth_emoji} [Modrinth](${inputs.modrinth})`;
    }
    let loaders = "";
    if (inputs.parsedLoaders.length > 0) {
        loaders = "- " + inputs.parsedLoaders.join("\n- ");
    }
    else {
        loaders = "None";
    }
    // prepare embed
    const embed = {
        color: inputs.color,
        thumbnail: {
            url: inputs.thumbnail
        },
        timestamp: new Date().toISOString(),
        title: `New version for ${inputs.modName} just released!`,
        fields: [
            { name: "Changelog", value: changelog, inline: false },
            { name: "Supported Loaders", value: loaders, inline: true },
            { name: "Project Pages", value: pages, inline: true },
        ]
    };
    // finalize json content
    const message = {
        username: inputs.username,
        avatar_url: inputs.avatar_url,
        content: "",
        embeds: [embed]
    };
    let content = `Version **${inputs.version}** of **${inputs.modName}** is now available!`;
    if (inputs.mention.length > 0 && inputs.released === true) {
        content += " " + inputs.mention;
    }
    if (content.length > 0) {
        message['content'] = content;
    }
    return message;
}


/***/ }),

/***/ 407:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.run = run;
const core = __importStar(__nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const embed_1 = __nccwpck_require__(246);
const util_1 = __nccwpck_require__(527);
async function run() {
    try {
        // read inputs
        const released = core.getBooleanInput("released", { required: true });
        const changelog = core.getInput("changelog", { required: true });
        const changelog_split = core.getInput("changelog-split");
        const version = core.getInput("version", { required: true });
        const color = Number.parseInt(core.getInput("color", { required: true }));
        const modName = core.getInput("mod-name", { required: true });
        const mention = core.getInput("mention");
        const loaders = core.getInput("loaders", { required: true });
        const curseforge = core.getInput("curseforge", { required: true });
        const modrinth = core.getInput("modrinth", { required: true });
        const github = core.getInput("github", { required: true });
        const thumbnail = core.getInput("thumbnail", { required: true });
        const curseforge_emoji = core.getInput("curseforge-emoji");
        const modrinth_emoji = core.getInput("modrinth-emoji");
        const github_emoji = core.getInput("github-emoji");
        const username = core.getInput("username");
        const avatar_url = core.getInput("avatar-url");
        const parsedLoaders = loaders.split(",").map(loader => loader.trim());
        const inputs = { released, changelog, version, color, modName, parsedLoaders, mention, curseforge, modrinth, github, thumbnail, curseforge_emoji, modrinth_emoji, github_emoji, username, avatar_url, changelog_split };
        // call handler
        const message = await (0, embed_1.makeEmbed)(inputs);
        // create github summary
        const codeInputs = core.summary.addCodeBlock(JSON.stringify(inputs, null, "  "), "json").stringify();
        core.summary.emptyBuffer();
        const codeMessage = core.summary.addCodeBlock(JSON.stringify(message, null, "  "), "json").stringify();
        core.summary.emptyBuffer();
        await core.summary
            .addDetails("Inputs", codeInputs)
            .addSeparator()
            .addDetails("Discord Message", codeMessage)
            .write();
        // save message to file
        const filename = core.getInput("filename", { required: true });
        await (0, util_1.saveToFile)(filename, message);
    }
    catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed(JSON.stringify(error));
        }
    }
}
run();


/***/ }),

/***/ 527:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveToFile = saveToFile;
const fs = __importStar(__nccwpck_require__(896));
async function saveToFile(filename, message) {
    const jsonString = JSON.stringify(message, null, "\t");
    fs.writeFileSync(filename, jsonString);
}


/***/ }),

/***/ 896:
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/asset-relocator-loader */
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(407);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;