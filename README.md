<img src="https://raw.githubusercontent.com/stefangabos/zebrajs/master/docs/images/logo.png" alt="zebrajs" align="right">

# Zebra Accordion &nbsp;[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Zebra_Accordion%20-%20A%20tiny,%20easily%20configurable,%20fully%20customizable,%20cross-browser%20jQuery%20accordion%20plugin&url=https://github.com/stefangabos/Zebra_Accordion&via=stefangabos&hashtags=accordion,collapsible,jquery)

*A tiny (3 KB minified, 1.3KB gzipped), easily configurable, fully customizable, cross-browser jQuery accordion plugin*

[![npm](https://img.shields.io/npm/v/zebra_accordion.svg)](https://www.npmjs.com/package/zebra_accordion) [![Total](https://img.shields.io/npm/dt/zebra_accordion.svg)](https://www.npmjs.com/package/zebra_accordion) [![Monthly](https://img.shields.io/npm/dm/zebra_accordion.svg)](https://www.npmjs.com/package/zebra_accordion) [![](https://data.jsdelivr.com/v1/package/npm/zebra_accordion/badge?style=rounded)](https://www.jsdelivr.com/package/npm/zebra_accordion)  [![License](https://img.shields.io/npm/l/zebra_accordion.svg)](https://github.com/stefangabos/Zebra_Accordion/blob/master/LICENSE.md)

Zebra Accordion is a tiny (3KB minified, ~1.3KB gzipped) jQuery accordion plugin. It transforms a basic definition list,
 without requiring any specific markup, into a small-footprint, easily configurable, fully customizable, cross-browser accordion widget, useful for better organizing larger groups of content.

## Features

 - no additional markup required other than a basic definition list
 - no default style allowing you to fully customize it to suit your needs
 - works with responsive layouts
 - allows for a single expanded tab at a time, or for any number of tabs to be expanded/collapsed
 - allows for tabs to expand on mouse over, not just on click
 - if an expanded tab's content is not in the viewport it automatically scrolls the browser window so that the content is visible
 - callback functions can be used for further customizations
 - works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 6+

## Demo

See the [demos](https://stefangabos.github.io/Zebra_Accordion/)

## Requirements

Zebra Accordion has no dependencies other than jQuery 1.7.0+

## Installation

Zebra Accordion is available as a [npm package](https://www.npmjs.com/package/zebra_accordion). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in packages.json
npm install zebra_accordion --save
```

Zebra Accordion is also available as a [Bower package](http://bower.io/). To install it use:

```bash
# the "--save" argument adds the plugin as a dependency in bower.json
bower install zebra_accordion --save
```

## How to use

First, load jQuery from a CDN and provide a fallback to a local source like:

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>window.jQuery || document.write('<script src="path/to/jquery-3.3.1.js"><\/script>')</script>
```

Load the Zebra Accordion jQuery plugin:

```html
<script src="path/to/zebra_accordion.min.js"></script>
```

Alternatively, you can load Zebra Accordion from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_accordion) like this:

```html
<!-- for the most recent version, not recommended in production -->
<script
  src="https://cdn.jsdelivr.net/npm/zebra_accordion@latest/dist/zebra_accordion.min.js"></script>

<!-- for a specific version -->
<script
  src="https://cdn.jsdelivr.net/npm/zebra_accordion@1.2.8/dist/zebra_accordion.min.js"></script>

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

Load the style sheet file from a local source

```html
<link rel="stylesheet" href="path/to/zebra_accordion.min.css">
```

...or from [JSDelivr CDN](https://www.jsdelivr.com/package/npm/zebra_accordion)

```html
<!-- for the most recent version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/zebra_accordion@latest/dist/zebra_accordion.min.css">

<!-- for a specific version -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/zebra_accordion@1.2.8/dist/zebra_accordion.min.css">

<!-- replacing "min" with "src" will serve you the non-compressed version -->
```

You need a basic definition list for your HTML markup

> Don't forget to add the `Zebra Accordion` class to the list container! If you'll [have a look](https://github.com/stefangabos/Zebra_Accordion/blob/master/dist/zebra_accordion.css) you will see that all it does is to set `display:hidden` the all the tabs and add `cursor:pointer` to titles, so it will not add overweight to your CSS and that you will have to style the accordion to suit your needs.

```html
<dl class="Zebra_Accordion">
    <dt>Lorem ipsum dolor sit amet consectetuer</dt>
    <dd>
        Lorem ipsum dolor sit amet consectetuer facilisis lacinia sapien ac et.
        Quis hendrerit neque congue pretium iaculis justo laoreet orci elit condimentum.
        Eros natoque Curabitur accumsan eget quis porttitor Sed Vestibulum amet sed.
    </dd>
    <dt>Lorem ipsum dolor sit amet consectetuer</dt>
    <dd>
        Lorem ipsum dolor sit amet consectetuer facilisis lacinia sapien ac et.
        Quis hendrerit neque congue pretium iaculis justo laoreet orci elit condimentum.
        Eros natoque Curabitur accumsan eget quis porttitor Sed Vestibulum amet sed.
    </dd>
    <dt>Lorem ipsum dolor sit amet consectetuer</dt>
    <dd>
        Lorem ipsum dolor sit amet consectetuer facilisis lacinia sapien ac et.
        Quis hendrerit neque congue pretium iaculis justo laoreet orci elit condimentum.
        Eros natoque Curabitur accumsan eget quis porttitor Sed Vestibulum amet sed.
    </dd>
    <dt>Lorem ipsum dolor sit amet consectetuer</dt>
    <dd>
        Lorem ipsum dolor sit amet consectetuer facilisis lacinia sapien ac et.
        Quis hendrerit neque congue pretium iaculis justo laoreet orci elit condimentum.
        Eros natoque Curabitur accumsan eget quis porttitor Sed Vestibulum amet sed.
    </dd>
</dl>
```

Now, within the DOM-ready event do

```javascript
$(document).ready(function() {

    new $.Zebra_Accordion($('.Zebra_Accordion'));

});
```

## Configuration options

## Properties

<table width="100%">
    <thead>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>animate_opacity</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">TRUE</td>
        <td valign="top">Should a tab's opacity be also animated when expanding/collapsing?</td>
    </tr>
    <tr>
        <td valign="top"><code>collapsible</code></td>
        <td valign="top"><em>mixed</em></td>
        <td valign="top">FALSE</td>
        <td valign="top">
            	- when set to <code>TRUE</code> it indicates that all tabs can be collapsed<br>
                - if set to <code>FALSE</code>, an expanded tab can be collapsed only by expanding another tab<br>
                - if set to <code>0</code>, the behavior is the same when set to <code>FALSE</code> with the difference that an open tab can also be closed.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>expanded_class</code></td>
        <td valign="top"><em>string</em></td>
        <td valign="top">Zebra_Accordion_Expanded</td>
        <td valign="top">
            The name of the class to append to an expanded tab's associated <em>title</em> element.<br>
            Use it to customize the aspect of expanded tabs.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>hide_speed</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">400</td>
        <td valign="top">
            The speed (in milliseconds) to use when collapsing a tab.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>scroll_speed</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">600</td>
        <td valign="top">
            If an tab's content is not entirely visible once it is expanded, the browser window will be scrolled so that the entire content is visible (if it is possible).<br>
            This value represents the speed (in milliseconds) used for scrolling browser window to the right position.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>show_speed</code></td>
        <td valign="top"><em>integer</em></td>
        <td valign="top">400</td>
        <td valign="top">
            The speed (in milliseconds) to use when expanding a tab.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>show</code></td>
        <td valign="top"><em>mixed</em></td>
        <td valign="top">0</td>
        <td valign="top">
            The index (0 based) of the tab to be expanded by default.<br>
            The value of this property can also be boolean <code>FALSE</code>, indicating that all tabs should be collapsed by default.<br>
            If the value of the <code>collapsible</code> property is <code>TRUE</code>, the value of this property can also be boolean <code>TRUE</code>, indicating that all tabs should be expanded by default. In this case, you can also provide <code>an array</code> of indexes to be expanded by default.
        </td>
    </tr>
    <tr>
        <td valign="top"><code>toggle_on_mouseover</code></td>
        <td valign="top"><em>boolean</em></td>
        <td valign="top">FALSE</td>
        <td valign="top">
            Set this to <code>TRUE</code> if tabs should be expanded when hovering the mouse over their associated <em>titles</em>.<br><br>
            <blockquote>If the <code>collapsible</code> property is <code>TRUE</code>, this property will always be considered as <code>FALSE</code>!</blockquote>
        </td>
    </tr>
    </tbody>
</table>

## Events

<table width="100%">
    <thead>
    <tr>
        <th>Event</th>
        <th width="100%">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td valign="top"><code>onBeforeClose</code></td>
        <td valign="top">
            Event fired <strong>before</strong> a tab is <strong>collapsed</strong><br>
            The callback function takes 3 arguments:
            <ul>
                <li>the tab's position in the accordion (0 based)</li>
                <li>the associated title element, as a jQuery object</li>
                <li>the tab, as a jQuery object</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onBeforeOpen</code></td>
        <td valign="top">
            Event fired <strong>before</strong> a tab is <strong>expanded</strong><br>
            The callback function takes 3 arguments:
            <ul>
                <li>the tab's position in the accordion (0 based)</li>
                <li>the associated title element, as a jQuery object</li>
                <li>the tab, as a jQuery object</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onClose</code></td>
        <td valign="top">
            Event fired <strong>after</strong> a tab is <strong>collapsed</strong><br>
            The callback function takes 3 arguments:
            <ul>
                <li>the tab's position in the accordion (0 based)</li>
                <li>the associated title element, as a jQuery object</li>
                <li>the tab, as a jQuery object</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td valign="top"><code>onOpen</code></td>
        <td valign="top">
            Event fired <strong>after</strong> a tab is <strong>collapsed</strong><br>
            The callback function takes 3 arguments:
            <ul>
                <li>the tab's position in the accordion (0 based)</li>
                <li>the associated title element, as a jQuery object</li>
                <li>the tab, as a jQuery object</li>
            </ul>
        </td>
    </tr>
    </tbody>
</table>

## Methods

### `show(index, [noFx = FALSE], [noScroll = FALSE])`

Expands a tab.

#### Arguments

`index` - the 0-based index of the tab to expand

`noFx` - *(optional)* - if set to <code>TRUE</code>, the tab will be instantly expanded without animation.

Default is FALSE.

`noScroll` - *(optional)* - if set to <code>TRUE</code>, the browser window will not be scrolled to the newly expanded tab.

Default is FALSE.

```javascript
var myAccordion = new $.Zebra_Accordion($('#accordion'));

// expand the third tab
myAccordion.show(2);
```

### `hide(index, [noFx = FALSE])`

Expands a tab.

#### Arguments

`index` - the 0-based index of the tab to collapse

`noFx` - *(optional)* - if set to <code>TRUE</code>, the tab will be instantly collapsed without animation.

Default is FALSE.

```javascript
var myAccordion = new $.Zebra_Accordion($('#accordion'));

// collapse the first tab
myAccordion.hide(0);
```

## Support the development of this project

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NBM9XKB7XAB5L)

## Sponsors

Cross browser/device testing is done with

[![BrowserStack](https://github.com/stefangabos/Zebra_Dialog/raw/master/examples/browserstack.png)](https://www.browserstack.com/)
