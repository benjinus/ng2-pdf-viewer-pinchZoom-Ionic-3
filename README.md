# ng2-pdf-viewer-pinchZoom-Ionic-3
This solutioon is for pinch zoom  whit ng2-pdf in ionic 3 it works very well 
Dont forget to  add `overflow-x: scroll;` and `overflow-y: scroll;` on your scroll-content class
If you are having trouble with this one try this new gist with hammer js -> [Gist Repo] (https://gist.github.com/hitmacreed/eed5d061c473c745702244b481aa5dfe)
 
![](gifs.gif)

## Setup

Requirements to use this project:

##### Node.js (https://nodejs.org/download/)

##### npm (Node Package Manager, it comes with node.js installation)
In case you're not with the latest version of npm:
```sh
$ sudo npm install npm -g
```

##### Cordova & Ionic Cli
To install both of them on your system just launch this command:
```sh
$ sudo npm install cordova ionic -g
```

## Install NPM Dependencies
Once you clone this repository, run this command on your terminal to install all needed dependencies:
```sh
$ npm install
```

## Install cordova plugin Dependencies
Run this command on your terminal to add a platform and install all needed puglins:

iOS:
```sh
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Android:
```sh
$ ionic cordova platform add android
$ ionic cordova run android
```
## Launching the App
After installing the needed dependencies you are done, launch your app with a simple
```sh
$ ionic serve
```
