const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

if (isDev) {
	// Enable live reload for all the files inside your project directory
	require("electron-reload")(__dirname);
}

function createLoadWindow() {
	const win = new BrowserWindow({
		width: 450,
		height: 110,
		backgroundColor: "#f4f4f4",
		frame: false,
		transparent: true,
		webPreferences: {
			// Use node modules
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
		},
	});

	win.loadFile("splash.html");
	return win;
}

function createWindow() {
	const win = new BrowserWindow({
		width: 1500,
		height: 800,
		show: false,
		webPreferences: {
			// Use node modules
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// isDev && win.webContents.openDevTools();
	win.loadFile("index.html");
	return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	const splash = createLoadWindow();
	const mainApp = createWindow();

	mainApp.once("ready-to-show", () => {
		setTimeout(() => {
			splash.destroy();
			mainApp.show();
		}, 1000);
	});

	app.on("activate", () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	// Notifications
	ipcMain.on("notify", (e, message) => {
		const notification = new Notification({
			title: "Notification",
			body: message,
		});
		notification.show();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
