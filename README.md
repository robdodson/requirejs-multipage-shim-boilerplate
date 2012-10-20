# IIDS : Multipage Tutorial
*Getting started with the IIDS and Require.js on a multipage site*

## Table of Contents
- [Introduction](#intro)
- [Responsive Design](#responsive-design)
- [Folder Structure](#folder-structure)
- [The HTML](#the-html)
- [The CSS](#the-css)
- [The JavaScript](#the-javascript)

## Introduction <a id="intro"></a>
Hi! I'm going to walk you through the process of setting up and understanding a multipage IIDS/Require.js project. The IIDS is designed to work as effortlessly as possible with Require.js and hopefully after this brief tutorial you'll be comfortably cranking out code in no time.

<hr>

## Responsive Design <a id="responsive-design"></a>
The IIDS was created by the GE UX COE to help teams build responsive web applications. "Responsive" is a term being thrown around a lot these days and in essence it means that your application *responds* to the context in which it's being presented to the user. If the user is viewing your app on a smaller screen, say an iPad for instance, the application responds to this different environment by rearranging its visual parts to provide the user with the best experience possible. What the user needs to see on a mobile application as they walk down the street versus what they need to see when they're on their 21" monitor at work are often different things. Responsive design is all about figuring out what content belongs in which context.

Additionally responsive design emphasizes performance. On the web this often means "lazy loading" scripts and loading only what you need in the moment so the user can start being productive in our app as fast as possible. As more people leave their desks and start relying on mobile devices, tablets and cellular data networks, this emphasis on performance grows even more important.

<hr>

## Folder Structure <a id="folder-structure"></a>
Before we get too ahead of ourselves let's pause for a moment to go over the basic folder structure of this tutorial.

#### tools
The tools folder is where we keep the scripts which help us compile our project when it's ready for release. There are a number of important steps to take if you want your application to run as quickly as possible. These include minifying CSS and JavaScript files, concatenating scripts together and optimizing images. We use a tool called `r.js` which is a companion of Require.js to do most of these tasks. For now don't worry too much about how all of that works, just know that those scripts live in here.

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


## The CSS <a id="the-css"></a>

<hr>

## The JavaScript <a id="the-javascript"></a>
