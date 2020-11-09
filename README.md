This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Learning-Platform-React

## Github-Repositorys

* react: github.com/nicofreundt/lp1
* express: github.com/nicofreundt/lp2

## Notwendige Installationen

* NodeJS
* MySQL

## Installations-Anleitung

### MySQL Authentication Method muss der Option 'Use Legacy Authentication Method' entsprechen

### Datenbank mit folgendem Skript initialisieren
```
CREATE DATABASE Lernplattform;
USE Lernplattform;
CREATE TABLE users (
	user_id int NOT NULL AUTO_INCREMENT,
	username varchar(16) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id)
);
CREATE TABLE tasks (
	task_id int NOT NULL AUTO_INCREMENT,
	Thema varchar(45) NOT NULL,
	Level varchar(45) NOT NULL,
	Text text NOT NULL,
	Titel varchar(45) NOT NULL,
	PRIMARY KEY (task_id)
);
CREATE TABLE status (
	taskID int NOT NULL,
	userID int NOT NULL,
	status tinyint(1),
	PRIMARY KEY (taskID, userID), 
	FOREIGN KEY (taskID) REFERENCES tasks (task_id),
	FOREIGN KEY (userID) REFERENCES users (user_id),
)
```
### Repositorys von Github klonen
'git clone' für beide Repositories ausführen
### Node Modules installieren
'npm install' in den Root-Ordnern der Repositories ausführen
### MySQL Login-Daten
In den Dateien tasks.js und users.js im Ordner Routes vom Backend müssen am Anfang der Datei die Zugangsdaten für MySQL angegeben werden

## Start-Anleitung

### 'npm start'
Diesen Befehl in beiden Repositories ausführen, um Frontend und Backend zu starten.
Die Applikation wird sich daraufhin direkt im Browser öffnen.

