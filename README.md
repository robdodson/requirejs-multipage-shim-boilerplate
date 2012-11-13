# IIDS : Multipage Tutorial
*Getting started with the IIDS and Require.js on a multipage site*

## Table of Contents
- [Introduction](#intro)
- [Responsive Design](#responsive-design)
- [Folder Structure](#folder-structure)
- [The HTML](#the-html)
- [The JavaScript](#the-javascript)
- [The CSS/LESS](#the-css)
- [Compiling with Grunt](#compiling)
- [Conclusion](#the-end)

## Introduction <a id="intro"></a>
I'm going to walk you through the process of setting up and understanding a multipage IIDS/Require.js project. The IIDS is designed to work as effortlessly as possible with [Require.js](http://requirejs.org/) an asynchronous JavaScript script loader and dependency manager. Before we get too deep into the code I want to take a moment to explain some of the thinking and decisions that went into the creation of the IIDS. As you gain a deeper understanding of what the IIDS is (and is not) you should be able to assess if it fits into your team's workflow.

<hr>

## Responsive Design <a id="responsive-design"></a>
The IIDS was created by the GE UX COE to help teams build responsive web applications. What is Responsive Design? In essence it means that your application *responds* to the context in which it's being presented to the user. If the user is viewing your app on a smaller screen, say an iPad or netbook, the application responds to this different environment by rearranging its visual parts to provide the user with the best experience possible. What the user needs to see on a mobile application as they walk down the street versus what they need to see when they're on their 27" monitor are often different things. Responsive design is all about figuring out what content belongs in which context.

Additionally responsive design emphasizes performance. On the web this often means "lazy loading" scripts and loading only what you need. As more people leave their desks and start relying on mobile devices, tablets and cellular data networks, this emphasis on performance grows even more important.

The takeaways can be summarized in a few key points:

- Support a consistent UX across devices and touchpoints. Adapt to screen environments appropriately while maintaining consistency and understandability in key areas like nomenclature, status and data representation.

- Designs should work with as little degradation as possible across devices while also targeting information appropriate for the size and use of the device. The design organization and presentation should clearly reflect the same application across platforms.

- Responsive design methods maximize device appropriateness. Rather than designing multiple applications for individual devices, consider responsive designs that present an appropriate version specific to the user’s device.

If you're looking for a comprehensive collection of examples and articles on the subject of Responsive Design we recommend [This is Responsive.](http://bradfrost.github.com/this-is-responsive/)

<hr>

## Folder Structure <a id="folder-structure"></a>
Let's go over the basic folder structure of this tutorial.

#### www
The `www` folder is the home of our application. It is where all of our HTML, CSS, and JavaScript files live. Any other source files, such as images or fonts, should live in here as well.

#### www/css
The CSS folder contains two subfolders, `app` and `themes`. The `app` folder is where all of your CSS should go. This keeps it separate from the library code of the IIDS. The `themes` folder is where all of the IIDS styles live. The IIDS currently has two themes, classic and inversion, which are both based on [Twitter Bootstrap.](http://twitter.github.com/bootstrap/) It is very important to keep your CSS styles separated from the IIDS and you should never edit the contents of the `themes` folder. Instead if you need to replace a style override it in one of your stylesheets in the `app` folder.

#### www/js
The JS folder contains three subfolders, `app`, `ge` and `vendor`. It also contains a few miscellaneous files used for this tutorial. I'll go over those files more in a later section so for now don't worry about them. Like the CSS section, the `app` folder is for the code you write which is specific to your application. The `ge` folder contains IIDS specific code which you are free to use but you should never modify it. Finally the `vendor` folder contains 3rd party scripts, things like jQuery, Highcharts, D3, etc. Again, you're free to use these but you should definitely not modify them. We'll go over the JavaScript in much greater detail later.

#### www/fonts
Any and all fonts related to the IIDS and your project should live in here.

#### www/img
Any images for your project should live in here. The IIDS is given its own subfolder to keep its images separate and out of your way.

### grunt.js, options.js, and package.json
The example project uses [gruntjs](http://gruntjs.com/) to build its distribution. We'll cover these files in greater detail in the [Compiling with Grunt](#compiling) section.

<hr>

## The HTML <a id="the-html"></a>
OK so you know where everything lives, now let's take a tour around the demo. The pages in this project are designed to give you a nice boilerplate to start experimenting with but by no means do they include or encompass all of the features of the IIDS. Be sure to thoroughly read through the IIDS documentation on the [GE SDH](http://www.gesdh.com/) for a deeper understanding of what all is included in the IIDS.

### Modernizr & Respond.js
To start off you can open the `page1.html` file. One of the first things you might notice is this crazy header.

``` html
<!DOCTYPE html>

<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
```
Have no fear, your page hasn't blown up, this is just part of [Modernizr.](http://modernizr.com/) It's used for feature detection so after your page has loaded you can look at the `html` tag to see what browser features are and aren't supported. Be sure to read the Modernizr docs if you're attempting to use something potentially not supported by all browsers (SVG, media queries, etc).

In the `head` tag you'll see that we've included `modernizr-respond.js`, a custom build of modernizr which includes respond.js to shim media query support into Internet Explorer 8. You shouldn't need to mess with this line, just know that it's there.

### Including Minified CSS
You'll also notice that we're using the minified version of our CSS.
``` html
<link href="css/themes/classic/classic.min.css" rel="stylesheet">
```
While the IIDS ships with unminified and minified versions of its CSS it's always best to use the minified version unless you're trying to debug something. The unminified version is included for educational and debugging purposes only and neither should ever need to be editted.

### Dynamic content
Keep scrolling down and you should come across a section that looks like this:

``` html
<!-- Our page header will come from our model. See main1.js -->
<h1 class="voice voice-brand pull-left"></h1>
```
and further down a block that looks like this:

``` html
<!--
The IIDS is loaded with useful components such as this progress bar.
We'll set the width of the bar with our model. See main1.js
-->
<div class="progress progress-success"> 
    <div class="bar"></div>
</div>
```
We're going to use JavaScript loaded with Require.js to populate these items. I'll be covering it in [the JavaScript section](#the-javascript) so you don't need to dive into `main1.js` just yet.

### Bringing in Require.js
Finally take a look at the very bottom of the page.

``` html
<script src="js/vendor/require-jquery.js"></script>
<script type="text/javascript">
// Load common code that includes config,
// then load the app logic for this page.
require(['./js/common'], function (common) {
  // js/common sets the baseUrl to be js/ so
  // can just ask for 'app/main1' here instead
  // of 'js/app/main1'
  require(['app/main1']);
});
</script>
```
This is where we load Require.js and tell it which script to execute for this page. This seems like a good time to transition from talking about the HTML to talking about the JavaScript so let's deviate here and spend some time looking at our setup.

<hr>

## The JavaScript <a id="the-javascript"></a>
If you've developed a web app before you've probably had several script tags at the bottom of the page for including your various libraries and application specific code. You might add jQuery, Highcharts and libraries of your own before kicking things off with a main.js file.

``` html
<script src="js/vendor/jquery.js"></script>
<script src="js/vendor/highcharts.js"></script>
<script src="js/vendor/my.awesome.library.js"></script>
<script src="js/vendor/main.js"></script>
```

### The Problem
When you place script tags on the page like this you're telling the browser to try to load each item in sequence so that `main.js` won't load and start executing until `jquery.js` has loaded. Unfortunately there are a number of problems with this approach:

- Code complexity grows as the site gets bigger
- Assembly gets harder
- Developers want discrete JS files/modules
- Deployment wants optimized code in just one or a few HTTP calls

As we build bigger and more complex web apps we'd like to split our scripts up so they don't all live in one mammoth main.js file. This makes the code more organized and it makes it easier for teams to work on a project. The immediate downside is that the browsers don't offer a built in dependency managment system. Let's say we stick to our previous approach of including multiple script tags on the page but this time we decide to break up main.js into smaller files. Instead of containing all of our code, it now only contains the code to drive two widgets: Widget A and Widget B. We'll take all the code for our widgets and place it into two separate files. That way our team members can work on Widget A and Widget B while we work on something else.

``` html
<script src="js/vendor/jquery.js"></script>
<script src="js/vendor/highcharts.js"></script>
<script src="js/vendor/my.awesome.library.js"></script>
<script src="js/vendor/widget.a.js"></script>
<script src="js/vendor/widget.b.js"></script>
<script src="js/vendor/main.js"></script>
```
This looks ok but when we try to run it everything breaks. It turns out Widget A depends on a piece of Widget B, but Widget B won't load until Widget A has finished downloading. We could extract the code from Widget B and make a new widget (Widget C) which loads before A or B but that means having to mentally manage this dependency chain and any new ones that arise. It also means that we're increasing the number of HTTP requests for each page since it now needs to load all of our 3rd party JavaScript, Widgets A - C and our main.js. Not cool :[

### The Solution
What we need is a tool that can give us the following features:

- Some sort of #include/import/require
- The ability to load nested dependencies
- Easy to use for development but then backed by an optimization tool that helps deployment

Thankfully that tool set exists in [Require.js](http://requirejs.org/) and [r.js.](http://requirejs.org/docs/optimization.html) Before I get too far ahead of myself I want to say that explaining the full breadth of Require.js, r.js and AMD modules is outside the scope of this article so I strongly encourage you to take a moment to [read through the Require.js site](http://requirejs.org/) to augment your understanding of these topics. I'll do my best to explain how we've used these tools in the tutorial but be sure to read the rest of the documentation when you have spare time as it will undoubtedly come in handy.

OK. Introduction's out of the way, let's see how to use Require.js on a multipage site. The structure that we're using in this demo is taken from the [example-multipage-shim project](https://github.com/requirejs/example-multipage-shim) created by James Burke, author of Require.js. Here are the key points to keep in mind:

- Each page uses a mix of common and page-specific modules.
- All pages share the same [requirejs config.](http://requirejs.org/docs/api.html#config)
- After an optimization build, the common items should be in a shared common layer, and the page-specific modules should be in a page-specific layer.
- The HTML page should not have to be changed after doing the build.
- shim config is used to load non-AMD scripts.

### common.js
As a starting point take a look at the `common.js` file and you'll see that it contains configuration options for require.js. If you haven't done so yet take a moment [to read up on how configuration works in require.js.](http://requirejs.org/docs/api.html#config) We've gone ahead and populated this file with configuration settings for every plugin in the IIDS. If you need to add additional libraries this is the place to do it. Feel free to edit this file and add any scripts that your project requires.

#### baseUrl
The `baseUrl` tells require.js where to look when asked to load a module. In our case we tell it to start looking in the `js/` folder.

#### paths
You'll notice that there are several `paths` which tell require.js how to find a particular file. For instance, `require('d3')` translates to `baseUrl + paths['d3']` or `js/vendor/d3.v2`.

#### shim
Not all libraries are written as AMD modules so sometimes we have to [shim](http://requirejs.org/docs/api.html#config-shim) them. Shimming a library ensures that all of its dependencies are loaded before it executes and it can be treated like any other AMD module. This is an amazing feature and allows the mixture of brand new AMD code with legacy scripts that predate the asynchronous module pattern.

When shimming a library you should provide a configuration object which lists any dependencies the module might have and also specifies the name for the global object that require.js should refer to when someone requests the module. If you're loading a jQuery or Backbone plugin which doesn't export a value you can just use an array of dependencies. You'll notice that almost everything in our shim is a jQuery plugin with the exception of d3.js so we only use `deps` and `exports` once. Otherwise we use the array shorthand.

Shimming is an important and tricky concept so [spend some time reading the documentation on it.](http://requirejs.org/docs/api.html#config-shim) Chances are if you're adding third party libraries to your project you'll probably have to shim a few of them.

### Layering our code
Since `common.js` contains all of our configuration settings we want to make sure it's the first thing loaded on any page. Refer back to page1.html and look for this section just below the script that includes require.js.

``` html
<script type="text/javascript">
// Load common code that includes config,
// then load the app logic for this page.
require(['./js/common'], function (common) {
    require(['app/main1']);
});
</script>
```
Now that you know what `common.js` does this should make more sense. We first require `common.js` and then only after it's finished loading do we require the code needed to run our page.

### app/main1.js
`main1.js` is a typical AMD module which uses the `define` syntax to specify its dependencies. Once all of the dependencies are loaded a callback function is executed and passed references to all the loaded modules. Let's talk about those modules for a moment.

``` js
define([
    'jquery',
    'app/models/model1',
    'ge/iids-navbar'
],
function ($, model) {
    ...
});
```

#### jquery
We all (hopefully) know what jQuery is. One thing to note is that we've provided a combined version of require.js and jquery called require-jquery.js. This aids in shimming particularly with jquery-ui. In the `common.js` file we alias a request for `jquery` to this combined file.

``` js
// common.js

paths: {
    'jquery': 'vendor/require-jquery'
}
```

#### app/models/model1
`model1` is a very simple object which provides a two method API for getting the current page title and the user's progress through the tutorial. We'll use it to populate some of the DOM elements on `page1.html`. Take a moment to look at the source for `model1.js` and you'll see that it is actually an instance of another type called `BasicModel` which is defined in `app/models/basicModel.js`.

``` js
// app/models/model1.js

define(['./basicModel'], function (BasicModel) {
    var model1 = new BasicModel('This is the title for Page 1', '50%');
    return model1;
});
```
We use `model1` to provide data for `page1.html` likewise we use `model2.js` to provide data for `page2.html`. Both of these models are instances of the `BasicModel` object. I emphasize this point because it will be important when we move on to compiling our project for production. When we get to that phase we'll compile everything that's common between the pages into one file—this will include BasicModel, Twitter Bootstrap, IIDS plugins, etc—and everything that's page specific into separate files. Don't worry about it too much for now, just keep that knowledge tucked in your back pocket.

#### ge/iids-navbar
The IIDS Navbar is an extension of a few Twitter Bootstrap plugins which provides a responsive, easy to setup navbar that collapses as the user resizes their browser.

#### app/main1.js — continued
Now that you understand our dependencies let's take a look at the code that gets executed when `main1` has loaded.

``` js
define([
    'jquery',
    'app/models/model1',
    'ge/iids-navbar'
],
function ($, model) {
    // jQuery DOM Ready Handler
    $(function() {
        // Set the title for our module with the data
        // from our model
        $('.page-header h1').html(model.getTitle());

        // Set the width of our progress bar with
        // data from our model.
        $('.bar').css({ 'width': model.getPercentComplete() });
    });
});
```
As the dependencies are resolved they're passed into our callback function as arguments. Actually I should point out that only `jQuery` and `model1` are passed in since the `iids-navbar` is a jQuery plugin which doesn't export a value.

We use the jQuery [DOM Ready shorthand](http://api.jquery.com/ready/) to populate a few elements on the page with data from our `model1` object. If you've worked with jQuery before this should all seem pretty familiar to you. Keep in mind that this is just an example of one way to get data on the page and if you prefer to populate your pages with data on the server before sending them to the client that's fine as well.

When you're done exploring this page take a look at `page2.html` and the corresponding `main2.js`. You'll find that the pages and their corresponding JavaScript files are very similar. When you're ready to production you can take a look at the [Compiling with r.js section.](#compiling)

<hr>

## The CSS/LESS <a id="the-css"></a>
### The CSS
The CSS for the IIDS is based on [Twitter Bootstrap](http://twitter.github.com/bootstrap/), a popular framework for writing responsive web apps. Out of the box the IIDS comes with two themes, **classic** and **inversion**. For this tutorial we'll be using the classic theme. Take a look at the `www/css` folder and you should see two subfolders, `app` and `themes`. The `themes` folder contains all of the CSS for the IIDS in both minified and unminified files. We've included the unminifed CSS to help you debug and explore but we recommend that you don't serve unminified code in a production environment. Also you should never edit any of the CSS in the `themes` folder. Instead we recommend that you override styles in your own CSS files. The `app` folder contains CSS specific to our app and it's in this folder that you'll be placing all of your CSS files. In this case we only have one file, `style.css` but it's very possible that you'll need to split your CSS into multiple files. For guidance on how to organize and structure your CSS we recommend the [SMACSS](http://smacss.com/) architecture. SMACSS is part of a new school of CSS design patterns often refered to as [OOCSS.](https://github.com/stubbornella/oocss/wiki/faq) If you've never heard of or used OOCSS definitely take a moment and read through some of the material. It just might change your life ;)

### The LESS
In this release we've included the LESS files that go into the making of the IIDS. Open up the `www/less` folder and you should see three subfolders, `app`, `bootstrap` and `themes`, as well as two standalone files `base.less` and `base.responsive.less`. If you plan to use LESS in your project definitely spend some time exploring the contents of these folders. There are many useful mixins and variables which you can repurpose in your own scripts. Similar to the rules governing the CSS folders, you shouldn't edit any of the LESS files that come with the IIDS. Instead you can override them by creating your own LESS files in the `app` folder.

## Compiling with Grunt <a id="compiling"></a>
For this sample project we're using [grunt.js](http://gruntjs.com/) to compile everything down to a production ready package. Grunt is a wonderful tool written in [Node.js](http://nodejs.org/) which has many of the same features of Rake or ANT.

### Setup
There are a few dependencies you'll need to install before using grunt. If you don't already have Node.js and npm setup you can [download them from the Node.js website.](http://nodejs.org/) NPM is included in the Node.js installer so you shouldn't need to install it separately.

After you've installed both Node and npm it's time to install grunt. NPM makes this extermely easy, just type `npm install -g grunt`

Once you have grunt installed take a moment to read through the [documentation.](https://github.com/gruntjs/grunt/blob/master/docs/toc.md) Unfortunately covering the full range of what grunt can do is outside the scope of this article but you should be able to follow along with the docs and our example gruntfile to get up to speed.

#### grunt.js
This is our **gruntfile** and it drives our entire build process. If you've ever worked with ANT, Rake, Make, Cake, *ake before the idea of a build file should be pretty familiar. In a nutshell we'll use this file to outline a number of build tasks which we then execute from the command line.

#### options.js
This file contains configuration options for r.js, the require.js compiler. Rather than put them all into the gruntfile I've separated them into their own file which is required in grunt.js (look for the line `var opts = require('./options')`). There are a ton of configuration options available for r.js, for a full list [checkout this example build file.](https://github.com/jrburke/r.js/blob/master/build/example.build.js) We've given you everything you need to get up and running but definitely explore the [r.js documentation](http://requirejs.org/docs/optimization.html) and the [multipage-shim example project.](https://github.com/requirejs/example-multipage-shim)

#### package.json
The `package.json` file is used by npm and grunt to identify important information about our project and its dependencies. 

``` js
{
  "name": "multipage-demo",
  "author": "General Electric",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "grunt-contrib-mincss":       "0.3.x",
    "grunt-contrib-requirejs":    "0.3.x",
    "grunt-contrib-clean":        "0.3.x"
  }
}
```
For a comprehensive and interactive list of package.json properties [checkout this helpful cheatsheet.](http://package.json.jit.su/) For our purposes we primarily care about the `dependencies` section which lists all of the files we'll need to accomplish our grunt tasks. To install these dependencies just type `npm install`. If you get a page full of errors telling you to run the command as administrator then you might want update the permissions on your `/usr/local` folder.

```
sudo chown -R $USER /usr/local
```

For a fuller explanation on this process [see this article](http://howtonode.org/introduction-to-npm) by Isaac Schlueter, creator of NPM.

Also note that if you're trying to use NPM and you're on a GE proxy you might need to add the proxy information to your profile. Typically I do this in bash by creating a `.bash_profile` file in my user's directory and adding the following lines:

```
HTTP_PROXY="http://some-GE-proxy.com:80"
export HTTP_PROXY
```
You'll need to restart your session and npm should now pickup on this ENV variable and route its requests properly.

#### node_modules
If all went well with `npm install` you should now have a folder called `node_modules`. This is where npm stores its downloaded packages. You should avoid adding anything to this folder directly as it's primarily for npm.

### Building
Open up `grunt.js`, our *gruntfile*, and take a look around. We've gone ahead and created three tasks to get you started: `clean`, `requirejs` and `mincss`. These tasks are all part of the [grunt-contrib](https://github.com/gruntjs/grunt-contrib) library, a collection of common grunt tasks housed under one roof. If you were following along then you've already installed the necessary files to run these tasks. If not then now is a good time to run `npm install` from the root of the project. If you're impatient and you've got everything installed type `grunt` into the command line from the root of your project...and prepare for the awesomez. Or the fails. Either way you'll learn something :D

Hopefully if all goes well you'll have a shiny new directory called `www-release`. Checkout `www-release/css/app/style.css` to see how it has minified our CSS. Also take a look at `www-release/js/app/main1.js` to see how r.js has combined and minified our page specific js. This last part might be a little confusing but it's important to understand so let's dig into the specifics.

### r.js
*This section is rather advanced and tricky. You might need to read through it a few times and experiment with the sample project. Don't get discouraged! This topic isn't easy to grasp but it's well worth the effort.*

Let's examine the structure of our app. Each page is driven by a model, located in the `js/models` folder. Each model extends an object known as `BasicModel` which is located in `js/models/basicModel.js`. If we want to categorize our models we could say that `BasicModel` is **common** to the entire application and `models/model1.js` and `models/model2.js` are **page-specific**. To effectively use r.js we want to separate the common code from the page-specific code. We'll then compile and concatenate all of the common code into one file, `common.js`, and we'll compile any page specific code into the `main.js` file for that page (`main1.js` for `page1.html` and `main2.js` for `page2.html`). The name `common.js` plays a double role in the world of require.js and r.js so it's easy to get tripped up here.

Take a look at `www/js/common.js`. You'll see it contains all of the configuration options for require.js. It's important that these configuration options get loaded before any other files that require.js uses. And it's also important that this file get loaded on every page. If you refer back to `www/page1.html` you'll notice we're doing this down at the bottom.

``` html
<script src="js/vendor/require-jquery.js"></script>
<script type="text/javascript">
// Load common code that includes config,
// then load the app logic for this page.
require(['./js/common'], function (common) {
  //js/common sets the baseUrl to be js/ so
  //can just ask for 'app/main1' here instead
  //of 'js/app/main1'
  require(['app/main1']);
});
</script>
```

So if we were to take all of the code that is common to our entire application, for instance `BasicModel`, and we wanted to toss it into one file that gets loaded one very single page then `common.js` would be a good place.

Now take a look at `www-release/js/common.js. Although the code is minified you can see that it contains all of our configuration options. But take a look at the very bottom of the file and you'll see something familiar.

``` js
define("app/models/basicModel",[],function(){function e(e,t){this.title=e,this.percentComplete=t}return e.prototype.getTitle=function(){return this.title},e.prototype.getPercentComplete=function(){return this.percentComplete},e})
```
That's `BasicModel` minified and combined into the `common.js` file in our release dir. How did it get there? Remember we created another file called `options.js` which configures r.js. Take a look at `options.js` now. We pass `options.js` to the grunt task which drives r.js. You'll notice in `options.js` there's a `modules` property which details which code is common and which is page-specific. Here you can see that the `common` module includes `app/models/basicModel`. Meanwhile the page-specific modules only include the main files for each page. Since each main file is full of `require` calls, r.js will walk through the list of dependencies and minify/concat them all into each page's main file. This way we can *significantly* cut down on the number of HTTP requests we're using for each page. Play around with the module settings in `options.js` to get a feel for how all of this works. Create a new .js file and add it to the include section of the `common` module. Or try removing the `BasicModel` from your common layer to see how everything blows up. This is one of those concepts that you'll get only through interacting with it so break it, bend it and rearrange the bits till it all makes sense.

## Conclusion
