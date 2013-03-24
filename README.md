##Zebra_Accordion

A tiny accordion jQuery plugin

Zebra_Accordion is a tiny (2KB minified) accordion jQuery plugin. It transforms a basic definition list, without requiring any other specific markup, into a small-footprint, easily configurable, fully customizable, cross-browser accordion widget, useful for better organizing larger groups of content.

###Features:

 - no additional markup required other than a basic definition list;
 - appearance is easily customizable through CSS;
 - works with both fixed and fluid (responsive) layouts;
 - can be configured so that only a single tab can be expanded at a time, or so that all tabs may be expanded/collapsed;
 - can be configured so that tabs expand on mouse over;
 - when, after expanding a tab, part of its content is outside the viewport, it automatically scrolls the browser’s window so that the tab’s content is visible;
 - callback functions can be used for further customizations;
 - works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 6+)

## Usage

First, load the latest version of jQuery either from a local source or from a CDN.

Load the Zebra_Accordion plugin

    <script type="text/javascript" src="path/to/zebra_accordion.js"></script>

Load the plugin’s CSS file

    <link rel="stylesheet" href="path/to/zebra_accordion.css" type="text/css">

Now, within the DOM-ready event do

    $(document).ready(function() {
        new $.Zebra_Accordion($('.Zebra_Accordion'));
    });

###The HTML

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Zebra_Accordion Demo</title>
        <link rel="stylesheet" href="path/to/zebra_accordion.css" type="text/css">
        <script type="text/javascript" src="path/to/jquery-1.6.2.js"></script>
        <script type="text/javascript" src="path/to/zebra_accordion.js"></script>
    </head>
    <body>
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
    </body>
    </html>

###The CSS

    dl.Zebra_Accordion { width: 400px; font-family: Arial, sans-serif; font-size: 12px }
    dl.Zebra_Accordion dt { background: #000; color: #FFF; font-weight: bold; padding: 5px }
    dl.Zebra_Accordion dd { background: #EFEFEF; padding: 15px; margin: 1px 0 }
    dl.Zebra_Accordion dt.Zebra_Accordion_Expanded { background: #C40000 }

## Links

For demos, configuration options, events and methods, see the **[project's homepage](http://stefangabos.ro/jquery/zebra_accordion/)**