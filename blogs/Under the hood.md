# Under the hood

This blog will break down the whole system and show you the framework, technical details and some tricks.

## React, expressjs and mongo

Firstly, as a javascript developer who is obsessed with nodejs, I decided to build the project on expressjs, a simple and easy framework which save me a lot of time to build a robust web application.

Then, mongo, a popular document database which provides a useful and fully-tested node api. If I were you, I will not miss it.

Last but not least, reactjs. Before facebook brought us react, I was trying to find a solution to render pages on broswer and node, which is useful for doing SEO and sharing scripts between server side and client side. [Browserify](http://browserify.org) used to be my handy choice, but I still have a lot of server side rendering codes to write. Then react emerged, those rendering stuffs become easy and efficient. SEO,  code sharing, preformance optimization and other aspects I'm considing become clear and simple.

## Rendering

To render on server(node) side, two steps: prepare a layout.ejs and set the content field of the model with `React.renderToString(React.createFactory(Root)())`.

To render on client(broswer) side, one step: include bundle.js (Introduced latterly), done.

Tips: If your node version is under 4, to make .jsx file recognized, you have to use `node-jsx` or use harmony mode of node in version 0.11 or latter.

## Router

There is a great third part library called [react-router](https://github.com/rackt/react-router) handling routes in react so delicately that I highly recommend you have a try. In this project, to simplify router and make it independent, I wrote a `RouteManager.js` to deal with the routes and a `Root.jsx` to bridge it with react components.


## Store

TO DO

## Build

[Webpack](http://webpack.github.io), a module bundler also developed by facebook, is simple but powerful tool for you to bundle the web resources. [Gulp](https://github.com/gulpjs/gulp) and [Grunt](https://github.com/gruntjs/grunt) are also great choices, but you still have to config tasks like concat, compress, clean, etc when you start to use them (they are task runner). Webpack treat css as a resource which you can require them as dependence. With a `css-loader`, the style can be used as a module (see the usage of backward.css), which is every useful sometimes. With the `extract-text-webpack-plugin`, the css files can be bundled into a seperate file.