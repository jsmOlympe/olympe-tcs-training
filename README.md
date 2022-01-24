# What is Olympe Yeoman project generator ?
Olympe Yeoman project generator helps you to quickly setup [CODE and DRAW](https://olympe.support/), the Olympe development environment.

This [Yeoman](https://yeoman.io/) generator provides you will all the dependencies and configuration files needed to start, develop, and run Olympe applications or build a library.

# Getting started

Please refer to Olympe support page to learn how to [install CODE and DRAW](https://olympe.support/doc/docs/getting_started/DRAW_CODE_install).

# npm commands overview

Here is an overview of the npm commands that the Olympe generator wrote to your project's `package.json`.

Run `npm run` to see a list of available commands. To run any command, run
```
npm run <command>
```

| Command | Description |
| --- | --- |
| add | Add a new npm dependency. This command will also import the dependency in your sources main, unlike the native `npm install` command. |
| reset | Reinitialise your local data cloud with DRAW and your project. **Warning** This will erase the data cloud content. Make sure you have saved your work with command `snapshot`. |
| reset:debug | Same as `reset`, but with activated debug mode on the data cloud. This means that the data cloud will check the consistency of your project. |
| snapshot | Back up the work you have been doing in DRAW to your local drive, in the `snapshot/` directory of your project. The files generated by this command are used to reinitialise the data cloud later (see command `reset`). |

*NB* You should always `snapshot` your work before running a `build` command. Otherwise the build output will not include the data cloud initialisation files of your project.

## Build and serve commands

### For runnable applications

If your project is an application, Olympe generator provided you with the following commands to build and serve your project:

| Command | Description |
| --- | --- |
| build:draw | Same as `serve`, but build only, without serving. Use this command to get development artefacts that contain DRAW in addition to Olympe runtime. The output will be available in the `dist/` directory of your project. |
| build:node | Build Olympe node runtime environment and your project. Use this command when you want to build a service app. The output will be available in the `dist/` directory of your project. You can then run any of your service apps with `node main.js -- hc.app=sc.runtime sc.app=<your service app tag>`. |
| build:web | Same as `serve:web`, but build only, without serving. Use this command when you want to build a UI app. The output will be available in the `dist/` directory of your project. |
| serve | Build DRAW and your project and serve them. Visit http://localhost:8888/ to start working in DRAW. |
| serve:web | Build Olympe web runtime environment (without DRAW) and your project and serve them to run a UI app. You can run any of your soft-coded UI app by visiting `http://localhost:8888/?hc.app=sc.runtime&sc.app=<your UI app tag>`. |

### For a library

If your project is a library, Olympe generator provided you with the following commands to build and serve your project:

| Command | Description |
| --- | --- |
| build | Build your project as a library, i.e. without Olympe runtime. See [how to build and use a library](https://olympe.support/doc/docs/guides/code/first_library) with Olympe. The output of this command is not runnable, it is only meant to be imported in another project. |

# Advanced usage

## Olympe Dev-Tools Gulp tasks
Your project ships with [Olympe Dev-Tools](https://www.npmjs.com/package/@olympeio/dev-tools), a set of [Gulp](https://gulpjs.com/) tasks, to help you to backup and to restore your work.
See that project's documentation for more details about the provided tasks and configuration options.

## Webpack configuration
Your project relies on [Webpack](https://webpack.js.org/) to be built and served. You are provided with a default configuration file `webpack.config.js`, which you can tailor to your needs.

## Running a service application
If you need a service app, add the following configuration to your project's `package.json` `build` block:
```json
    "nodeTargets": [
        {"name": "api-node","tag": "<your-app-tag>"},
        ...
    ]
```
This will add a service that is capable of running your Olympe service app when you run the bundle : `npm run bundle`.


## DDL of the olympe postgres database 
```
CREATE TABLE public.sap_user (
	id varchar NOT NULL,
	description varchar NULL,
	CONSTRAINT sap_user_pk PRIMARY KEY (id)
);
```