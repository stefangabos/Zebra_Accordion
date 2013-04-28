##Zebra_Accordion

####A small-footprint (3 KB minified), easily configurable, fully customizable, cross-browser accordion jQuery plugin

Zebra_Accordion is a tiny (3KB minified) accordion jQuery plugin. It transforms a basic definition list, without requiring any other specific markup, into a small-footprint, easily configurable, fully customizable, cross-browser accordion widget, useful for better organizing larger groups of content.

##Features

 - no additional markup required other than a basic definition list;
 - appearance is easily customizable through CSS;
 - works with both fixed and fluid (responsive) layouts;
 - can be configured so that only a single tab can be expanded at a time, or so that all tabs may be expanded/collapsed;
 - can be configured so that tabs expand on mouse over;
 - when, after expanding a tab, part of its content is outside the viewport, it automatically scrolls the browser’s window so that the tab’s content is visible;
 - callback functions can be used for further customizations;
 - works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 6+)

##Requirements

**Zebra_Accordion** has no dependencies other than jQuery 1.5.2+

##How to use

First, load the latest version of jQuery from a CDN and provide a fallback to a local source, like:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="public/javascript/jquery-1.9.1.js"><\/script>')</script>
```

Load the Zebra_Accordion plugin

```html
<script type="text/javascript" src="path/to/zebra_accordion.js"></script>
```

Load the plugin’s stylesheet file

```html
<link rel="stylesheet" href="path/to/zebra_accordion.css" type="text/css">
```

Now, within the DOM-ready event do

```javascript
$(document).ready(function() {

    new $.Zebra_Accordion($('.Zebra_Accordion'));

});
```
Configuration options and demos on the **[project's homepage](http://stefangabos.ro/jquery/zebra-accordion/)**
