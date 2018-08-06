/**
 *  Zebra_Accordion
 *
 *  A tiny (3KB minified, ~1.3KB gzipped) jQuery accordion plugin
 *
 *  It transforms a basic definition list, without requiring any other specific markup, into a small-footprint, easily
 *  configurable, fully customizable, cross-browser accordion widget, useful for better organizing larger groups of content.
 *
 *  Features:
 *
 *  -   no additional markup required other than a basic definition list;
 *  -   no default style allowing you to fully customize it to suit your needs;
 *  -   works with responsive layouts;
 *  -   allows for a single expanded tab at a time, or for any number of tabs to be expanded/collapsed;
 *  -   allows for tabs to expand on mouse over, not just on click
 *  -   if an expanded tab's content is not in the viewport it automatically scrolls the browser window so that the
 *      content is visible;
 *  -   callback functions can be used for further customization;
 *  -   works in pretty much any browser - Firefox, Chrome, Safari, Edge, Opera and Internet Explorer 6+
 *
 *  Read more {@link https://github.com/stefangabos/Zebra_Accordion/ here}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    1.2.9 (last revision: July 13, 2018)
 *  @copyright  (c) 2011 - 2018 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_Accordion
 */
(function($) {

    'use strict';

    $.Zebra_Accordion = function(el, options) {

        var defaults = {

                animate_opacity:        true,                       //  Should a tab's opacity be also animated?
                                                                    //
                                                                    //  Default is TRUE

                collapsible:            false,                      //  If set to TRUE, an open block can also be collapsed
                                                                    //  - in this case, all blocks can be collapsed;
                                                                    //  if set to FALSE, an open block can be collapsed
                                                                    //  only by opening another block - in this case, only
                                                                    //  a single block is open at any given moment;
                                                                    //  if set to 0, the behavior is the same when set to
                                                                    //  FALSE with the difference that an open tab can
                                                                    //  also be closed.
                                                                    //
                                                                    //  Default is FALSE

                expanded_class:         'Zebra_Accordion_Expanded', //  The name of the class to append to the "title"
                                                                    //  element when its associated tab is expanded.
                                                                    //
                                                                    //  Can be used for customizing the aspect of the opened
                                                                    //  tab to give better visual feedback to the users.
                                                                    //
                                                                    //  Default is "Zebra_Accordion_Expanded"

                hide_speed:             400,                        //  The speed (in milliseconds) to use when collapsing
                                                                    //  tabs.
                                                                    //
                                                                    //  Default is 400

                scroll_speed:           600,                        //  If a tab's content is not entirely visible after
                                                                    //  it is expanded, the window will be scrolled so
                                                                    //  that the entire content of the tab is visible
                                                                    //  (if it is possible).
                                                                    //
                                                                    //  This value represents the speed (in milliseconds) to
                                                                    //  use for scrolling.
                                                                    //
                                                                    //  Default is 600

                show_speed:             400,                        //  The speed (in milliseconds) to use when expanding
                                                                    //  tabs.
                                                                    //
                                                                    //  Default is 400

                show:                   0,                          //  The index (0 based) of the tab to be expanded by
                                                                    //  default.
                                                                    //
                                                                    //  The value of this property can also be boolean FALSE,
                                                                    //  indicating that all tabs should be collapsed by default.
                                                                    //
                                                                    //  If the value of the "collapsible" property is TRUE,
                                                                    //  the value of this property can also be boolean TRUE,
                                                                    //  indicating that all tabs should be expanded by default,
                                                                    //  or an array with the indexes of tabs to be expanded
                                                                    //  by default.
                                                                    //
                                                                    //  Default is 0

                toggle_on_mouseover:    false,                      //  Set this to TRUE if tabs should expanded when
                                                                    //  hovering their associated "titles".
                                                                    //
                                                                    //  If "collapsible" is TRUE then this property will
                                                                    //  always be considered FALSE!
                                                                    //
                                                                    //  Default is FALSE;

                onBeforeClose:          null,                       //  Event fired before a tab is collapsed.
                                                                    //
                                                                    //  The callback function takes as arguments the tab's
                                                                    //  number (0 based), the title element and the tab
                                                                    //  element.
                                                                    //
                onBeforeOpen:           null,                       //  Event fired before a tab is expanded.
                                                                    //
                                                                    //  The callback function takes as arguments the tab's
                                                                    //  number (0 based), the title element and the tab
                                                                    //  element.

                onClose:                null,                       //  Event fired after a tab is collapsed.
                                                                    //
                                                                    //  The callback function takes as arguments the tab's
                                                                    //  number (0 based), the title element and the tab
                                                                    //  element.

                onOpen:                 null                        //  Event fired after a tab is expanded.
                                                                    //
                                                                    //  The callback function takes as arguments the tab's
                                                                    //  number (0 based), the title element and the tab
                                                                    //  element.

            },

            // to avoid confusions, we use "plugin" to reference the current instance of the plugin
            plugin = this,

            // private lookup arrays
            $titles = null,
            $blocks = null,

            $window = $(window),

            titles = [],
            blocks = [],

            /**
             *  Constructor method
             *
             *  @return object  Returns a reference to the plugin
             */
            init = function() {

                // the plugin's final properties are the merged default and user-provided options (if any)
                plugin.settings = $.extend({}, defaults, options);

                var $element = $(el), // reference to the jQuery version of DOM element the plugin is attached to
                    i;

                $titles = $('dt', $element);    // references to the title elements
                $blocks = $('dd', $element);    // references to the tabs

                // iterate through the title elements and get some information about each element
                _get_titles_info();

                // iterate through the tab elements and get some information about each tab
                _get_blocks_info();

                // if a tab is to be shown by default
                if (plugin.settings.show !== false)

                    // if any number of tabs can be expanded/collapsed, and by default we have to expand a certain
                    // set of tabs, or all
                    if (plugin.settings.collapsible && ($.isArray(plugin.settings.show) || plugin.settings.show === true)) {

                        // if we have to expand all tabs
                        if (plugin.settings.show === true)

                            // expand all tabs
                            for (i = 0; i < $titles.length; i++) plugin.show(i, true, true);

                        // if we only have to expand certain tabs
                        else

                            // iterate through the tabs that need to be expanded
                            $.each(plugin.settings.show, function(index) {

                                // expand each tab
                                plugin.show(plugin.settings.show[index], true, true);

                            });

                    // otherwise, show the default tab
                    } else plugin.show(plugin.settings.show, true, true);

                // run a function whenever the browser's window is resized
                $window.on('resize', function() {

                    // by default, we assume that there's no tab opened
                    var open = [];

                    // iterate through the title elements
                    $titles.each(function(index) {

                        // reference to the title element
                        var $this = titles[index].element;

                        // if we find an opened tab, save the tab's index for later
                        if ($this.hasClass(plugin.settings.expanded_class)) open.push(index);

                        // set the title element's "style" attribute back to its original state (before running the plugin)
                        $this.attr('style', titles[index].style);

                    });

                    // iterate through the title elements and get some information about each element
                    // also, make sure we don't re-bind callback functions to events
                    _get_titles_info(false);

                    // iterate through the tab elements
                    $blocks.each(function(index) {

                        // set the content element's "style" attribute back to its original state (before running the plugin)
                        blocks[index].element.attr('style', blocks[index].style || '');

                    });

                    // iterate through the content elements and get some information about each element
                    _get_blocks_info();

                    // if there were open tabs
                    if (open.length > 0)

                        // re-open them now
                        $.each(open, function(index) {

                            plugin.show(open[index], true, true);

                        });

                });

            },

            /**
             *  Gets some CSS properties for the accordion's tabs
             *
             *  @return void
             *
             *  @access private
             */
            _get_blocks_info = function() {

                // reset the lookup array
                blocks = [];

                // iterate through the tabs
                $blocks.each(function(index) {

                    var

                        // reference to the jQuery object
                        $this = $(this),

                        // save element's original style (if any)
                        original_style = {
                            style:  $this.attr('style')
                        };

                    // temporary make set tab's "display" property to "block",
                    // in order to be able to get some of the element's CSS properties
                    $this.css({
                        visibility: 'hidden',
                        display:    'block'
                    });

                    // get some of the element's CSS properties
                    // needed to correctly expand/collapse the block
                    // and add them to our lookup array
                    blocks.push($.extend(original_style, {
                        height:             $this.height(),
                        outerHeight:        $this.outerHeight(),
                        paddingTop:         _int($this.css('paddingTop')),
                        paddingBottom:      _int($this.css('paddingBottom')),
                        marginTop:          _int($this.css('marginTop')),
                        marginBottom:       _int($this.css('marginBottom')),
                        borderTopWidth:     _int($this.css('borderTopWidth')),
                        borderBottomWidth:  _int($this.css('borderBottomWidth')),
                        boxSizing:          $this.css('boxSizing'),
                        element:            $this
                    }));

                    // all blocks are collapsed by default
                    plugin.hide(index, true);

                });

            },

            /**
             *  Gets some CSS properties for the accordion's title blocks
             *
             *  @return void
             *
             *  @access private
             */
            _get_titles_info = function(nobind) {

                // reset the lookup array
                titles = [];

                // iterate through the content titles
                $titles.each(function(index) {

                    var

                        // reference to the jQuery object
                        $this = $(this),

                        // the event that should trigger tabs' expansion/collapse
                        event = !plugin.settings.collapsible && plugin.settings.toggle_on_mouseover ? 'mouseover' : 'click';

                    // get some of the element's CSS properties
                    // needed to correctly expand/collapse the block
                    // and add them to our lookup array
                    titles.push({
                        height:     $this.outerHeight(),    // the title's height, including margins and padding
                        style:      $this.attr('style'),    // the element's original style attribute (if any)
                        element:    $this                   // cache the jQuery object
                    });

                    // if we need to handle the required event
                    // (this method may also be called internally upon resizing of the browser window
                    // case in which we don't need to re-attach the function to the required event)
                    if (undefined === nobind)

                        // handle the required event (click or mouseover - see above)
                        $this.on(event, function() {

                            // show the associated tab
                            plugin.show(index);

                        });

                });

            },

            /**
             *  A wrapper to JavaScript's parseInt() function.
             *
             *  @return int     Returns the integer representation of the string given as argument
             *
             *  @access private
             */
            _int = function(value) {

                // convert value to an integer
                value = parseInt(value, 10);

                // if result is not a number (NaN) return 0, or the converted value otherwise
                return isNaN(value) ? 0 : value;

            };

        /**
         *  Expands a tab.
         *
         *  @param  integer index       The 0-based index of the tab to expand.
         *
         *  @param  boolean noFx        (Optional) If set to TRUE, the tab will be instantly expanded without animation.
         *
         *                              Default is FALSE.
         *
         *  @param  boolean noScroll    (Optional) If set to TRUE, the browser window will not be scrolled to the newly
         *                              expanded tab.
         *
         *                              Default is FALSE.
         *  @return void
         */
        plugin.show = function(index, noFx, noScroll) {

            // if "index" is an integer, greater than 0 and lesser than the total number of items
            if (!isNaN(parseFloat(index)) && index >= 0 && index <= blocks.length - 1) {

                var block = blocks[index],          // get the block's properties
                    $title = titles[index].element, // reference to the title element
                    $block = block.element,         // reference to the tab element
                    collapsed_all = false;

                // if any number of blocks can can be expanded/collapsed
                // and current block is already expanded, collapse it instead
                if (plugin.settings.collapsible && $title.hasClass(plugin.settings.expanded_class)) return plugin.hide(index, noFx);

                // if only a single block can be expanded at a time
                else if (!plugin.settings.collapsible)

                    // iterate through the tabs
                    $titles.each(function(key) {

                        // if we found an expanded tab but it is not the one we're trying to expand or we're closing an opened tab when plugin.settings.collapsible === 0
                        if (titles[key].element.hasClass(plugin.settings.expanded_class) && (key !== index || plugin.settings.collapsible === 0)) {

                            // if we just collapsed all tabs when plugin.settings.collapsible === 0, set a flag
                            if (key === index && plugin.settings.collapsible === 0) collapsed_all = true;

                            // collapse it
                            plugin.hide(key, noFx);

                            // and don't look any further as there's only one expanded block
                            return false;

                        }

                    });

                // if we just collapsed all tabs when plugin.settings.collapsible === 0, don't go further
                if (collapsed_all) return false;

                // if a callback function needs to be called before expanding the tab
                if (plugin.settings.onBeforeOpen && typeof plugin.settings.onBeforeOpen === 'function')

                    // execute the callback function
                    plugin.settings.onBeforeOpen(index, $title, $block);

                // add an extra class to the title element, to indicate that the element is expanded
                // useful for custom styling of the title element, to give a better visual feedback to the users
                $title.addClass(plugin.settings.expanded_class);

                // for the expanded block
                $block

                    // set the "display" property to "block"
                    .css('display', 'block')

                    // stop any ongoing animation on the current tab
                    .stop()

                    // expand the indicated tab
                    .animate({

                        height:         block.boxSizing === 'border-box' ? block.outerHeight : block.height,
                        paddingTop:     block.paddingTop,
                        paddingBottom:  block.paddingBottom,
                        marginTop:      block.marginTop,
                        marginBottom:   block.marginBottom,
                        opacity:        1

                    // using the speed as indicated in the settings
                    }, (noFx ? 0 : plugin.settings.show_speed),

                    // once the animation is complete
                    function() {

                        // if a callback function needs to be called after opening the tab
                        if (plugin.settings.onOpen && typeof plugin.settings.onOpen === 'function')

                            // execute the callback function
                            plugin.settings.onOpen(index, $title, $block);

                        // if scrolling is not explicitly disabled
                        if (!noScroll) {

                            var title_top = Math.round($title.offset().top),            //  the title's "top" position
                                title_height = titles[index].height,                    //  the title's height
                                block_height = block.outerHeight,                       //  the tab's height
                                total_height = title_top + title_height + block_height, //  item's total height
                                viewport_height = $window.height(),                     //  visible area in the browser
                                viewport_scroll = $window.scrollTop(),                  //  how much is the page scrolled down (from the top)
                                offset = null;

                            // if a tab's bottom goes out of the view
                            if (total_height > viewport_height + viewport_scroll) {

                                // this is how much the page needs to be scrolled down (from the top) so that the content is visible
                                offset = total_height - viewport_height;

                                // but, if that would mean that the title would end up above the visible area
                                // better to scroll to the title instead
                                if (offset > title_top) offset = title_top;

                            }

                            // if title is above the visible area, scroll back up, so that the title becomes visible
                            if (title_top < viewport_scroll) offset = title_top;

                            // if we need to scroll the content
                            if (offset)

                                // smoothly scroll the page
                                $('html, body').animate({

                                    scrollTop: offset

                                // using the speed as indicated in the settings
                                }, plugin.settings.scroll_speed);

                        }

                    });

            }

        };

        /**
         *  Collapses a tab.
         *
         *  @param  integer index   The 0-based index of the tab to collapse.
         *
         *  @param  boolean noFx    (Optional) If set to TRUE, the tab will be instantly collapsed without animation.
         *
         *                          Default is FALSE.
         *
         *  @return void
         */
        plugin.hide = function(index, noFx) {

            // if "index" is an integer, greater than 0 and lesser than the total number of items, and the respective block is not already collapsed
            if (!isNaN(parseFloat(index)) && index >= 0 && index <= blocks.length - 1) {

                var $title = titles[index].element, //  the title element to hide
                    block = blocks[index],          //  get the properties of the tab to hide
                    $block = block.element;         //  the tab element to hide

                // if a callback function needs to be called before collapsing the tab
                if (plugin.settings.onBeforeClose && typeof plugin.settings.onBeforeClose === 'function')

                    // execute the callback function
                    plugin.settings.onBeforeClose(index, $title, $block);

                // remove the extra class added when the block was expanded
                $title.removeClass(plugin.settings.expanded_class);

                // for the tab to hide
                $block

                    // stop any ongoing animation
                    .stop()

                    // suppress top and bottom borders
                    .css({
                        borderTopWidth:     0,
                        borderBottomWidth:  0
                    })

                    // hide the element...
                    .animate({

                        height:         0,
                        paddingTop:     0,
                        paddingBottom:  0,
                        marginTop:      0,
                        marginBottom:   0,
                        opacity:        (plugin.settings.animate_opacity ? 0 : 1)

                    // ...using the speed as indicated in the settings
                    }, (noFx ? 0 : plugin.settings.hide_speed),

                    // and once the animation is complete
                    function() {

                        // if a callback function needs to be called after closing the tab
                        if (plugin.settings.onClose && typeof plugin.settings.onClose === 'function')

                            // execute the callback function
                            plugin.settings.onClose(index, $title, $block);

                        // set some of tab element's CSS properties
                        $block.css({
                            display:            'none',
                            visibility:         'visible',
                            borderTopWidth:     block.borderTopWidth,
                            borderBottomWidth:  block.borderBottomWidth
                        });

                    });

            }

        };

        plugin.settings = {};

        // fire it up!
        init();

    };

})(jQuery);
