## version 1.2.11 (May 07, 2024)

- minor maintenance update

## version 1.2.10 (May 02, 2024)

- minor maintenance update

## version 1.2.9 (July 14, 2018)

- updated examples and examples page layout

## version 1.2.8 (October 13, 2017)

- fixed a bug where clicking on an already opened tab when the `collapsible` property is set to `false` would trigger the `onBeforeClose` event. See [#4](https://github.com/stefangabos/Zebra_Accordion/issues/4)
- `collapsible` property can now also be `0` which works the same as when set to `FALSE` except that all tabs can be collapsed. See [#5](https://github.com/stefangabos/Zebra_Accordion/issues/5)

## version 1.2.7 (May 30, 2017)

- performance improvements and source code tweaks
- new folder structure
- the home of the library is now exclusively on GitHub
- files required in the build process are not included anymore when installing via npm nor when downloading from GitHub

## version 1.2.4 (January 24, 2016)

- the library is now available as a [npm package](https://www.npmjs.com/) and as a [Bower package](http://bower.io/)
- added [Grunt](http://gruntjs.com/) integration to streamline development process
- updated jQuery to version 1.12.0 in the example file

## version 1.2.2 (November 28, 2013)

- added 2 new events - onBeforeClose and onBeforeOpen; thanks to **paul** for suggesting this a while ago
- minor updates to keep [JSHint](jshint.com) happy

## version 1.2 (March 24, 2013)

- if the "collapsible" property is set to TRUE, the "show" property can now also be an array of values representing tabs to be expanded by default, or boolean TRUE indicating that all tabs should be expanded by default
- fixed a bug where when resizing the browser window, all tabs would be collapsed, except for the first one
- better error handling for the "show" and "hide" methods
- fixed some small issues in the code
- the plugin is now available on [GitHub](https://github.com/stefangabos/Zebra_Accordion)!

## version 1.1 (November 20, 2011)

- the plugin now also works with fluid (responsive) layouts; previously, if the browser window was re-sized, the plugin did not resize accordingly (in the case where the accordion did not have a fixed width, that is); thanks to **Hulisz Oliver** for reporting

## version 1.0 (September 25, 2011)

- initial release
