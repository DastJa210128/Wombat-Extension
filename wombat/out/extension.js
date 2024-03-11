"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs_1 = require("fs");
const SidebarProvider_1 = require("./SidebarProvider");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("wombat-sidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('wombat.Upload', () => {
        // The command has been defined in the package.json file
        // Now provide the implementation of the command with registerCommand
        // The commandId parameter must match the command field in package.json
        const panel = vscode.window.createWebviewPanel('wombat', // Identifies the type of the webview. Used internally
        'Wombat', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {});
        panel.webview.html = getHomeSite();
    }));
}
exports.activate = activate;
function getHomeSite() {
    return fs_1.default.readFileSync(fs.readFileSync("C:\\_repos\\Botball\\Wombat-Extension\\wombat\\src\\webview\\wombat-config.html", "utf-8"), "utf-8");
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
