var Cryption = (() => {
    const config = {"info":{"name":"Cryption","authors":[{"name":"Lorelai","discord_id":"335154420239171596","github_username":"balefireblaze",}],"version":"0.0.3","description":"No desc"},"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {window.BdApi.alert("Library Missing",`The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
    const {Patcher, WebpackModules} = Api;

    return class Cryption extends Plugin {
        onStart() {
            const Analytics = WebpackModules.getByProps("AnalyticEventConfigs");
            Patcher.instead(Analytics.default, "track", () => {});
    
            const Warning = WebpackModules.getByProps("consoleWarning");
            Patcher.instead(Warning, "consoleWarning", () => {});
    
            const MethodWrapper = WebpackModules.getByProps("wrapMethod");
            Patcher.instead(MethodWrapper, "wrapMethod", () => {});
    
            const Sentry = WebpackModules.getByProps("_originalConsoleMethods", "_wrappedBuiltIns");
            Sentry.uninstall();
            Patcher.instead(Sentry, "_breadcrumbEventHandler", () => () => {});
            Patcher.instead(Sentry, "captureBreadcrumb", () => {});
            Patcher.instead(Sentry, "_makeRequest", () => {});
            Patcher.instead(Sentry, "_sendProcessedPayload", () => {});
            Patcher.instead(Sentry, "_send", () => {});
            Object.assign(window.console, Sentry._originalConsoleMethods);
        }
        
        onStop() {
            Patcher.unpatchAll();
        }

    };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
