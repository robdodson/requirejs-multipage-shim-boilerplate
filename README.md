# IIDS : Multipage Tutorial
*Getting started with the IIDS and Require.js on a multipage site*

## Table of Contents
- [Introduction](#intro)
- [Responsive Design](#responsive-design)
- [Folder Structure](#folder-structure)
- [The HTML](#the-html)
- [The JavaScript](#the-javascript)
- [The CSS](#the-css)
- [Compiling with r.js](#compiling)

## Introduction <a id="intro"></a>
Hi! I'm going to walk you through the process of setting up and understanding a multipage IIDS/Require.js project. The IIDS is designed to work as effortlessly as possible with [Require.js](http://requirejs.org/) and hopefully after this brief tutorial you'll be comfortably cranking out code in no time.

<hr>

## Responsive Design <a id="responsive-design"></a>
The IIDS was created by the GE UX COE to help teams build responsive web applications. "Responsive" is a term being thrown around a lot these days and in essence it means that your application *responds* to the context in which it's being presented to the user. If the user is viewing your app on a smaller screen, say an iPad for instance, the application responds to this different environment by rearranging its visual parts to provide the user with the best experience possible. What the user needs to see on a mobile application as they walk down the street versus what they need to see when they're on their 21" monitor at work are often different things. Responsive design is all about figuring out what content belongs in which context.

Additionally responsive design emphasizes performance. On the web this often means "lazy loading" scripts and loading only what you need in the moment so the user can start being productive in our app as fast as possible. As more people leave their desks and start relying on mobile devices, tablets and cellular data networks, this emphasis on performance grows even more important.

<hr>

## Folder Structure <a id="folder-structure"></a>
Before we get too ahead of ourselves let's pause for a moment to go over the basic folder structure of this tutorial.

#### tools
The tools folder is where we keep the scripts which help us compile our project when it's ready for release. There are a number of important steps to take if you want your application to run as quickly as possible. These include minifying CSS and JavaScript files, concatenating scripts together and optimizing images. We use a tool called [r.js](http://requirejs.org/docs/optimization.html) which is a companion of [Require.js](http://requirejs.org/) to do most of these tasks. For now don't worry too much about how all of that works, just know that those scripts live in here.

#### www
The `www` folder is the home of our application. It is where all of our HTML, CSS, and JavaScript files live. Any other source files, such as images or fonts, should live in here as well.

#### www/css
The CSS folder contains two subfolders, `app` and `themes`. The `app` folder is where all of your CSS should go. This keeps it separate from the library code of the IIDS. The `themes` folder is where all of the IIDS styles live. The IIDS currently has two themes, classic and inversion, which are both based on [Twitter Bootstrap.](http://twitter.github.com/bootstrap/) It is very important to keep your CSS styles separated from the IIDS and you should never edit the contents of the `themes` folder. Instead if you need to replace a style override it in one of your stylesheets in the `app` folder.

#### www/js
The JS folder contains three subfolders, `app`, `ge` and `vendor`. It also contains a few miscellaneous files used for this tutorial. I'll go over those files more in a later section so for now don't worry about them. Like the CSS section, the `app` folder is for the code you write which is specific to your application. The `ge` folder contains IIDS specific code which you are free to use but you should never. Finally the `vendor` folder contains 3rd party scripts, things like jQuery, Highcharts, D3, etc. Again, you're free to use these but you should definitely not modify them. We'll go over the JavaScript in much greater detail later.

#### www/fonts
Any and all fonts related to the IIDS and your project should live in here.

#### www/img
Any images for your project should live in here. The IIDS is given its own subfolder to keep its images separate and out of your way.

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
<!--
Scripts, with the exception of modernizr, go at the bottom of the page
to improve load time.
-->
<script data-main="js/page1" src="js/vendor/require-jquery.js"></script>
```
This is where we load Require.js and tell it which script to execute for this page. This seems like a good time to transition from talking about the HTML to talking about the JavaScript so let's deviate here and spend some time looking at our setup.

<hr>

## The JavaScript <a id="the-javascript"></a>
Before Require.js you would normally have several script tags at the bottom of the page for including your various libraries and application specific code. You might add jQuery, Highcharts and libraries of your own before kicking things off with a main.js file.

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

## The CSS <a id="the-css"></a>


## Compiling with r.js <a id="compiling"></a>

`node tools/r.js -o tools/build.js`














