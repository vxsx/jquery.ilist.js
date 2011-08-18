jquery.ilist.js
===============

Plugin that makes lists with floating separators, like iPod.app, [see for
yourself](http://vxsx.github.com/jquery.ilist.js/)
  
Requires
--------

*  jquery 1.6.2 or higher (not tested on lower versions, but should
   work)

Default options 
----------------

``` javascript
separatorClass : 'ilist__item_separator',
dummyClass     : 'ilist__item_dummy',
pinnedClass    : 'ilist__item_pinned'
```

Usage:
------

HTML:<br>

``` html
<div class="ilist-wrapper"><!-- div with position:relative -->
    <ul class="ilist"><!-- "ilist" - list with overflow: scroll -->
        <li class="ilist__item ilist__item_separator">A</li><!-- separator -->
        <li class="ilist__item">A Lorem ipsum...</li><!-- actual content -->
        <li class="ilist__item">A Lorem ipsum...</li>
        <li class="ilist__item">A Lorem ipsum...</li>
        <li class="ilist__item">A Lorem ipsum...</li>
        <li class="ilist__item ilist__item_separator">B<br>with a second line</li>
        <li class="ilist__item">B Lorem ipsum...</li>
        <li class="ilist__item">B Lorem ipsum...</li>
        <li class="ilist__item">B Lorem ipsum...</li>
        ...
    </ul>
</div>
```

Required portion of CSS:<br>

``` css
.ilist-wrapper {
    position: relative;
}
    .ilist {
        overflow-y: scroll;
    }

        .ilist__item_dummy {
            display: none;
            height: 0px;
            position: relative;
        }
            .ilist__item_dummy .ilist__item {
                position: absolute;
            }
        .ilist__item_pinned {
            position: absolute;
            top: 0;
        }
```

And Javascript:<br>

``` javascript	
$('.list').ilist();
```

Compatibility
-------------

Tested in latest webkits, ff, opera - works okay.<br>
No IE _so far_, but hey, graceful degradation, anyone?
