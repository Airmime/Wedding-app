# Wedding App

📺 This nodeJS application allows guests to publish photos on a screen from their mobile phone during a ceremony such as a wedding (also works for other events).

## Requirement

 - Node ([Install node.js](https://nodejs.org/en/download/package-manager/))
 - npm ([Install npm](https://www.npmjs.com/get-npm))
 - [minstyle.io](https://minstyle.io) (CSS file is already included)

## How to setup ? 

To start, **clone** the repository :

    git clone https://github.com/Airmime/Wedding-app.git

 Installs all **npm packages** :

    npm install

If the application is launched on a remote server, you must modify the server URL/IP in the app.js file (line 2). This will allow the websocket protocol to communicate with the different pages of the application :

    var serverIP = 'ws://195.168.10.10:8080';

That's it :)

## How to use ?

The application contains two essential pages:

 - **index** : This page allows to send an picture on the server, it must therefore be communicated to the guests.

> URL : http://localhost:8080/

 - **Screen** : This page must be displayed on the screen.
 
> URL : http://localhost:8080/screen

