/**
 *  Zebra_Accordion
 *
 *  A tiny (3KB minified) accordion plugin for jQuery.
 *
 *  It transforms a basic definition list, without requiring any other specific markup, into a small-footprint, easily
 *  configurable, fully customizable, cross-browser accordion widget, useful for better organizing larger groups of content.
 *
 *  Features:
 *
 *  -   no additional markup required other than a basic definition list;
 *  -   easily customizable through CSS;
 *  -   works with both fixed and fluid (responsive) layouts;
 *  -   can be configured to work so that only a single can be expanded at a time, or so that all tabs may be
 *      expanded/collapsed;
 *  -   can be configured to work so tabs expand on mouse over;
 *  -   when, after expanding a tab, part of its content is outside the viewport, it automatically scrolls the browser's
 *      window so that the tab's content is visible;
 *  -   callback functions can be used for further customizations;
 *  -   works in all major browsers (Firefox, Opera, Safari, Chrome, Internet Explorer 6, 7, 8, 9)
 *
 *  Visit {@link http://stefangabos.ro/jquery/zebra-accordion/} for more information.
 *
 *  For more resources visit {@link http://stefangabos.ro/}
 *
 *  @author     Stefan Gabos <contact@stefangabos.ro>
 *  @version    1.2.2 (last revision: November 28, 2013)
 *  @copyright  (c) 2011 - 2013 Stefan Gabos
 *  @license    http://www.gnu.org/licenses/lgpl-3.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 *  @package    Zebra_Accordion
 */
;(function($) {

    $.Zebra_Accordion = function(el, options) {

        var defaults = {

            animate_opacity:        true,                       //  Should the content block's opacity be also animated?
                                                                //
                                                                //  Default is TRUE

            collapsible:            false,                      //  If set to TRUE, an open block can also be collapsed
                                                                //  - in this case, all blocks can be collapsed; if set
                                                                //  to FALSE, an open block can be collapsed only by
                                                                //  opening another block - in this case, only a single
                                                                //  block is open at any given moment;
                                                                //
                                                                //  Default is FALSE

            expanded_class:         'Zebra_Accordion_Expanded', //  The name of the class to append to the "title"
                                                                //  element when its associated content block is
                                                                //  expanded.
                                                                //
                                                                //  Can be used for customizing the aspect of the opened
                                                                //  tab to give better visual feedback to the users.
                                                                //
                                                                //  Default is "Zebra_Accordion_Expanded"

            hide_speed:             400,                        //  The speed (in milliseconds) to use when collapsing
                                                                //  content blocks.
                                                                //
                                                                //  Default is 400

            scroll_speed:           600,                        //  If a content block's content is not entirely visible
                                                                //  after it is expanded, the window will be scrolled so
                                                                //  so that the entire content of the content block is
                                                                //  visible (if it is possible).
                                                                //
                                                                //  This value represents the speed (in milliseconds) to
                                                                //  use for scrolling.
                                                                //
                                                                //  Default is 600

            show_speed:             400,                        //  The speed (in milliseconds) to use when expanding
                                                                //  content blocks.
                                                                //
                                                                //  Default is 400

            show:                   0,                          //  The index (0 based) of the content block to be
                                                                //  expanded by default.
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

            toggle_on_mouseover:    false,                      //  Set this to TRUE if content blocks should be expanded
                                                                //  when hovering their associated "titles".
                                                                //
                                                                //  If "collapsible" is TRUE then this property will
                                                                //  always be FALSE!
                                                                //
                                                                //  Default is FALSE;

            onBeforeClose:          null,                       //  Event fired before a content block is collapsed.
                                                                //
                                                                //  The callback function (if any) receives as arguments
                                                                //  the closed item's number (0 based), the title element
                                                                //  and the content block element.
                                                                //
            onBeforeOpen:           null,                       //  Event fired before a content block is expanded.
                                                                //
                                                                //  The callback function (if any) receives as arguments
                                                                //  the closed item's number (0 based), the title element
                                                                //  and the content block element.

            onClose:                null,                       //  Event fired after a content block is collapsed.
                                                                //
                                                                //  The callback function (if any) receives as arguments
                                                                //  the closed item's number (0 based), the title element
                                                                //  and the content block element.

            onOpen:                 null                        //  Event fired after a content block is expanded.
                                                                //
                                                                //  The callback function (if any) receives as arguments
                                                                //  the opened item's number (0 based), the title element
                                                                //  and the content block element.

        };

        var

            // to avoid confusions, we use "plugin" to reference the current instance of the plugin
            plugin = this,

            // private lookup arrays
            $titles = null,
            $blocks = null,

            titles = [],
            blocks = [];

        plugin.settings = {};

        /**
         *  Constructor method
         *
         *  @return object  Returns a reference to the plugin
         */
        var init = function() {

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            var $element =  $(el);  // reference to the jQuery version of DOM element the plugin is attached to

            $titles = $('dt', $element);    // references to the title elements
            $blocks = $('dd', $element);    // references to the content blocks

            // iterate through the title elements and get some information about each element
            _get_titles_info();

            // iterate through the content block elements and get some information about each element
            _get_blocks_info();

            // if a content block is to be shown by default
            if (plugin.settings.show !== false) {

                // if any number of content blocks can be expanded/collapsed, and by default we have to expand a certain
                // set of content blocks, or all
                if (plugin.settings.collapsible && ($.isArray(plugin.settings.show) || plugin.settings.show === true)) {

                    // if we have to expand all content blocks
                    if (plugin.settings.show === true)

                        // expand all content blocks
                        for (var i = 0; i < $titles.length; i++) plugin.show(i, true, true);

                    // if we only have to expand certain content blocks
                    else

                        // iterate through the content blocks that need to be expanded
                        $.each(plugin.settings.show, function(index) {

                            // expand each content block
                            plugin.show(plugin.settings.show[index], true, true);

                        });

                // otherwise, show the default content block
                } else plugin.show(plugin.settings.show, true, true);

            }

            // run a function whenever the browser's window is resized
            $(window).bind('resize', function() {

                // by default, we assume that there's no tab opened
                var open = [];

                // iterate through the title elements
                $titles.each(function(index) {

                    // reference to the title element
                    var $title = $(this);

                    // if we find an opened tab, save the tab's number for later
                    if ($title.hasClass(plugin.settings.expanded_class)) open.push(index);

                    // set the title element's "style" attribute back to its original state (before running the plugin)
                    $title.attr('style', titles[index].style);

                });

                // iterate through the title elements and get some information about each element
                // also, make sure we don't re-bind callback functions to events
                _get_titles_info(false);

                // iterate through the content block elements
                $blocks.each(function(index) {

                    // set the content element's "style" attribute back to its original state (before running the plugin)
                    $(this).attr('style', blocks[index].style);

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

        };

        /**
         *  Expands a content block.
         *
         *  @param  integer index       The 0-based index of the content block to expand.
         *
         *  @param  boolean noFx        (Optional) If set to TRUE, the content block will be instantly expanded without
         *                              animation.
         *
         *                              Default is FALSE.
         *
         *  @param  boolean noScroll    (Optional) If set to TRUE, the browser window will not be scrolled to the newly
         *                              expanded content block.
         *
         *                              Default is FALSE.
         *  @return void
         */
        plugin.show = function(index, noFx, noScroll) {

            // if "index" is an integer, greater than 0 and lesser than the total number of items
            if (null !== new String(index).match(/^[0-9]+$/) && index >= 0 && index <= blocks.length - 1) {

                var $title = $($titles[index]), // reference to the title element
                    $block = $($blocks[index]), // reference to the content block element
                    block = blocks[index];      // get the block's properties

                // if a callback function needs to be called before expanding the content block
                if (plugin.settings.onBeforeOpen && typeof plugin.settings.onBeforeOpen == 'function')

                    // execute the callback function
                    plugin.settings.onBeforeOpen(index, $title, $block);

                // if any block can can be expanded/collapsed at any time
                // and current block is already expanded, collapse it instead
                if (plugin.settings.collapsible && $block.height() > 0) return plugin.hide(index, noFx);

                // if only a single block can be expanded at a time
                else if (!plugin.settings.collapsible)

                    // iterate through the content blocks
                    $blocks.each(function(key) {

                        // if not the block that we are about to expand
                        // collapse the content block
                        if (key != index) plugin.hide(key, noFx);

                    });

                // add an extra class to the title element, to indicate that the element is expanded
                // useful for custom styling of the title element, to give a better visual feedback to the users
                $title.addClass(plugin.settings.expanded_class);

                // set the content block's "display" property to "block"
                $block.css('display', 'block');

                // stop any ongoing animation on the current content block
                $block.stop();

                // expand the indicated content block
                $block.animate({

                    'height':               block.height,
                    'paddingTop':           block.paddingTop,
                    'paddingBottom':        block.paddingBottom,
                    'marginTop':            block.marginTop,
                    'marginBottom':         block.marginBottom,
                    'opacity':              1

                // using the speed as indicated in the settings
                }, (noFx ? 0 : plugin.settings.show_speed),

                // once the animation is complete
                function() {

                    // if a callback function needs to be called after opening the content block
                    if (plugin.settings.onOpen && typeof plugin.settings.onOpen == 'function')

                        // execute the callback function
                        plugin.settings.onOpen(index, $title, $block);

                    // if scrolling is not explicitly disabled
                    if (!noScroll) {

                        var title_top = Math.round($title.offset().top),                //  the title's "top" position
                            title_height = titles[index].height,                        //  the title's height
                            block_height = block.outerHeight,                           //  the content block's height
                            total_height = title_top + title_height + block_height,     //  item's total height
                            viewport_height = $(window).height(),                       //  visible area in the browser
                            viewport_scroll = $(window).scrollTop(),                    //  how much is the page scrolled down (from the top)
                            offset = null;

                        // if a content block's bottom goes out of the view
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
         *  Collapses a content block.
         *
         *  @param  integer index   The 0-based index of the content block to collapse.
         *
         *  @param  boolean noFx    (Optional) If set to TRUE, the content block will be instantly collapsed without
         *                          animation.
         *
         *                          Default is FALSE.
         *
         *  @return void
         */
        plugin.hide = function(index, noFx) {

            // if "index" is an integer, greater than 0 and lesser than the total number of items, and the respective block is not already collapsed
            if (null !== new String(index).match(/^[0-9]+$/) && index >= 0 && index <= blocks.length - 1) {

                var $title = $($titles[index]), //  reference to the title element
                    $block = $($blocks[index]), //  reference to the content block element
                    block = blocks[index];      //  get the block's properties

                // if a callback function needs to be called before collapsing the content block
                if (plugin.settings.onBeforeClose && typeof plugin.settings.onBeforeClose == 'function')

                    // execute the callback function
                    plugin.settings.onBeforeClose(index, $title, $block);

                // remove the extra class added to the title element when the associated block was expanded
                $title.removeClass(plugin.settings.expanded_class);

                // stop any ongoing animation for the current content block
                $block.stop();

                // supress top and bottom borders
                $block.css({
                    'borderTopWidth':       0,
                    'borderBottomWidth':    0
                });

                // hide the element
                $block.animate({

                    'height':           0,
                    'paddingTop':       0,
                    'paddingBottom':    0,
                    'marginTop':        0,
                    'marginBottom':     0,
                    'opacity':          (plugin.settings.animate_opacity ? 0 : 1)

                // using the speed as indicated in the settings
                }, (noFx ? 0 : plugin.settings.hide_speed),

                // once the animation is complete
                function() {

                    // if a callback function needs to be called after closing the content block
                    if (plugin.settings.onClose && typeof plugin.settings.onClose == 'function')

                        // execute the callback function
                        plugin.settings.onClose(index, $title, $block);

                    // set some of content block element's CSS properties
                    $(this).css({
                        'display':              'none',
                        'visibility':           'visible',
                        'borderTopWidth':       block.borderTopWidth,
                        'borderBottomWidth':    block.borderBottomWidth
                    });

                });

            }

        };

        /**
         *  Gets some CSS properties for the accordion's content blocks
         *
         *  @return void
         *
         *  @access private
         */
        var _get_blocks_info = function() {

            // reset the lookup array
            blocks = [];

            // iterate through the content blocks
            $blocks.each(function(index) {

                // reference to the content block jQuery object
                var $block = $(this);

                // temporary make set content block's "display" property to "block",
                // in order to be able to get some of the element's CSS properties
                $block.css({
                    'visibility':   'hidden',
                    'display':      'block'
                });

                // get some of the element's CSS properties
                // needed to correctly expand/collapse the block
                // and add them to our lookup array
                blocks.push({
                    'height':               $block.height(),
                    'outerHeight':          $block.outerHeight(),
                    'paddingTop':           _int($block.css('paddingTop')),
                    'paddingBottom':        _int($block.css('paddingBottom')),
                    'marginTop':            _int($block.css('marginTop')),
                    'marginBottom':         _int($block.css('marginBottom')),
                    'borderTopWidth':       _int($block.css('borderTopWidth')),
                    'borderBottomWidth':    _int($block.css('borderBottomWidth')),
                    'style':                $block.attr('style')                    // element's original style (if any)
                });

                // all blocks are collapsed by default
                plugin.hide(index, true);

            });

        };

        /**
         *  Gets some CSS properties for the accordion's title blocks
         *
         *  @return void
         *
         *  @access private
         */
        var _get_titles_info = function(nobind) {

            // reset the lookup array
            titles = [];

            // iterate through the content titles
            $titles.each(function(index) {

                var

                    // reference to the element
                    $title = $(this),

                    // the event that should trigger content blocks expansion/collapse
                    event = !plugin.settings.collapsible && plugin.settings.toggle_on_mouseover ?
                                'mouseover' :
                                'click';

                // get some of the element's CSS properties
                // needed to correctly expand/collapse the block
                // and add them to our lookup array
                titles.push({
                    'height':   $title.outerHeight(),   // the title's height, including margins and padding
                    'style':    $title.attr('style')    // the element's original style attribute (if any)
                });

                // if we need to handle the required event
                // (this method may also be called internally upon resizing of the browser window
                // case in which we don't need to re-attach the function to the required event)
                if (undefined === nobind)

                    // handle the required event (click or mouseover - see above)
                    $title.bind(event, function() {

                        // show the associated content block
                        plugin.show(index);

                    });

            });

        };

        /**
         *  A wrapper to JavaScript's parseInt() function.
         *
         *  @return int     Returns the integer representation of the string given as argument
         *
         *  @access private
         */
        var _int = function(value) {

            // convert value to an integer
            value = parseInt(value, 10);

            // if result is not a number (NaN) return 0, or the converted value otherwise
            return isNaN(value) ? 0 : value;

        };

        // fire it up!
        init();

    };

})(jQuery);