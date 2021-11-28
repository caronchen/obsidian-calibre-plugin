![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/caronchen/obsidian-calibre-plugin) ![GitHub all releases](https://img.shields.io/github/downloads/caronchen/obsidian-calibre-plugin/total) ![GitHub Release Date](https://img.shields.io/github/release-date/caronchen/obsidian-calibre-plugin) ![GitHub last commit](https://img.shields.io/github/last-commit/caronchen/obsidian-calibre-plugin)

# Obsidian Calibre Plugin

This is a calibre Content server plugin for [Obsidian](https://obsidian.md). Allow you to access your calibre libraries and read books directly in Obsidian. Rearrange a comfortable layout of the workspace, you can take notes while reading, and read more books at the same time by opening more panes.

- [Obsidian Calibre Plugin](#obsidian-calibre-plugin)
	- [How it Works](#how-it-works)
	- [How to use](#how-to-use)
		- [Start quickly](#start-quickly)
			- [STEP 1: Start Content Server](#step-1-start-content-server)
			- [STEP 2: Install Calibre Plugin](#step-2-install-calibre-plugin)
			- [STEP 3: Open Calibre Container](#step-3-open-calibre-container)
		- [How to Change Content Server Port](#how-to-change-content-server-port)
			- [Change in Calibre Application](#change-in-calibre-application)
			- [Change in Calibre Plugin](#change-in-calibre-plugin)
	- [Manually installing the plugin](#manually-installing-the-plugin)
	- [The calibre Content server](#the-calibre-content-server)

## How it Works
Calibre plugin will create a `@CALIBRE.Container.md` file in your vault root when you click Calibre ribbon icon or change the server address in plugin settings. So, it is important to note that you cannot create a file with the same name (case insensitive). If you do, the plugin will not work properly.

`@CALIBRE.Container.md` is hidden by CSS rules in File explorer. `@CALIBRE.Container.md` file contains an iframe to connect to the content server. You can change the server address in plugin settings.

## How to use

### Start quickly
#### STEP 1: Start Content Server
To start the server, click the Connect/share button and choose Start Content server.

![image](https://user-images.githubusercontent.com/150803/143490663-afc3b418-a36e-422a-bab7-97b09237b507.png)


#### STEP 2: Install Calibre Plugin
Just do it.

#### STEP 3: Open Calibre Container
Click the ribbon icon to open Calibre Container.

![image](https://user-images.githubusercontent.com/150803/143490701-b7eedf79-b555-49e7-ad67-1a55da714c46.png)

![image](https://user-images.githubusercontent.com/150803/143516737-05d428df-88fc-40a9-a26b-cd163683d607.png)


### How to Change Content Server Port

#### Change in Calibre Application
![image](https://user-images.githubusercontent.com/150803/143490820-094fd57d-8150-4b82-a678-a81e3f15614e.png)

![image](https://user-images.githubusercontent.com/150803/143490891-58dcb930-c0c6-40ee-9256-ab25164a77ec.png)


#### Change in Calibre Plugin
![image](https://user-images.githubusercontent.com/150803/143490977-89e98839-0861-44c5-a002-b855a26f00ae.png)

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` from [Releases](https://github.com/caronchen/obsidian-calibre-plugin/releases) to your vault `VaultFolder/.obsidian/plugins/obsidian-calibre-plugin/`.

## The calibre Content server

See https://manual.calibre-ebook.com/server.html
