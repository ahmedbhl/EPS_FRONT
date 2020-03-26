## EPS_FRONT

Plateforme ouverte à l'enseignement à distance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Steps Setting up the development environment front-end 

Install latest version of nodeJs you can download from this link 10.13.0 not 11

`https://nodejs.org/dist/v10.13.0/node-v10.13.0-x64.msi`

2 - Download and install VsCode IDE with last version if installed download the last update this link

`https://vscode-update.azurewebsites.net/1.28.2/win32-x64-user/stable`

3 - Create new forlder with the name of your new project (EPS) 

4 – Open vsCode and tap the keys (ctrl + shift + ù) and select powershell or gitbash, Else you can tap keys (ctrl + shift + P) and write « terminal » and select « Terminal : select Default Shell ».

5 – Go to the terminal tab of the vscode and select your cmd line runner (powershel, cmd or Gitbash)

6 – Install or update the angular Cli if exist :  run this commends line

`npm uninstall -g angular-cli`

`npm cache clean`   or  `npm cache verify`    (if npm > 5)

`npm install -g @angular/cli@latest`

 Else another case if the project exist but not for us, most likely you want to also update your local project version, because inside your project directory it will be selected with higher priority than the global one :

`rm -rf node_modules`

`npm uninstall --save-dev angular-cli`

`npm install --save-dev @angular/cli@latest`

`npm install`

7 – Install or Update RxJS (depends on RxJS 6.3)

`npm install -g rxjs-tslint`

8 – Install the tool for unit test (Karma jasmine)

`npm install karma --save-dev`

9 - Install plugins that your project needs:

`npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev`

10 – Install angular material for create designe front-end 

Step 1 : Install Angular Material and Angular CDK

`npm install --save @angular/material @angular/cdk ` Or  `npm install --save angular/material2-builds angular/cdk-builds`  (for the last version)

Step 2 : Animations

`npm install --save @angular/animations`

11– In the terminal vsCode change your branch from master to develop 

`git checkout -b develop`

12 - To connect for the first time from local to the remot repository you need to run this commande line : 

`git remote add origin https://github.com/ahmedbhl/EPS_FRONT`

13 – Clone the project from bitbuket remote repository 

`git clone https://github.com/ahmedbhl/EPS_FRONT`

cd sfr_front

##  II.	Setting up a new front-end application

Fo create new project your need just run this commande line :

`ng new projectName`

## III. Unit Test 

For testing your project you can using karma jamine adn run this commande line : 

`ng test `

You can run unit tests as well as create code coverage reports, Code coverage reports allow us to see any parts of our code base that may not be properly tested by our unit tests. To generate a coverage report run the following command in the root of your project

`ng test --watch=false --code-coverage`

##  IV.	Run application

For run the application run this commande line and go to `localhost :4200` : 

`ng serve` 
