// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from "fs";
import path from "path";
import { getNonce } from "./getNonce";
import { SidebarProvider } from "./SidebarProvider";
import { Memento } from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const storage = context.globalState;

	 const json = storage.get("mydata") as string;
	if(json !== null){
		console.log(json)

		fs.writeFile("C:\\_repos\\Botball\\Wombat-Extension\\wombat\\log\\wombat.config.json", json, { encoding: "utf-8" }, () => {
			console.log("File wrote")
		})
	}
	
		
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
	console.log(fs.readFileSync(path.resolve("C:\\_repos\\Botball\\Wombat-Extension\\wombat\\src\\webview\\wombat-config.html"), "utf-8"));

	return fs.readFileSync(path.resolve("C:\\_repos\\Botball\\Wombat-Extension\\wombat\\src\\webview\\wombat-config.html"), "utf-8");
}

// This method is called when your extension is deactivated
export function deactivate() {}
