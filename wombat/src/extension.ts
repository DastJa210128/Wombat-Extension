// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from "fs";
import path from "path";
import { getNonce } from "getNonce";
import { SidebarProvider } from "./SidebarProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"wombat-sidebar",
		sidebarProvider
	  )
	);

	context.subscriptions.push(
	vscode.commands.registerCommand('wombat.Upload', () => {

		// The command has been defined in the package.json file
		// Now provide the implementation of the command with registerCommand
		// The commandId parameter must match the command field in package.json
		const panel = vscode.window.createWebviewPanel(
			'wombat', // Identifies the type of the webview. Used internally
			'Wombat', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{}
		);
		panel.webview.html = getHomeSite();
	})
	);
}

function getHomeSite(){
	return fs.readFileSync("/home/prime/wombat/src/webview/wombat-config.html", "utf-8");
}

// This method is called when your extension is deactivated
export function deactivate() {}
