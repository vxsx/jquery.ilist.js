/**
*  @author Vadim Sikora ( http://vxsx.ru )
*  NO COPYRIGHTS, DO WHAT YOU WANT
*  @requires jquery 1.4.4 or higher
*/

(function($){
    $.fn.ilist = function(options) {
        var settings = $.extend({
            separatorClass : 'ilist__item_separator',
            dummyClass     : 'ilist__item_dummy',
            pinnedClass    : 'ilist__item_pinned'
        }, options);

        settings.separatorSelector = '.' + settings.separatorClass,
        settings.dummySelector     = '.' + settings.dummyClass

        return this.each(function(){

            var $this = $(this).scrollTop(0); //firefox saves scrolltop position after page reload

            var $separators = $(settings.separatorSelector, this),
                separators = [], dummys = [],
                w = $(settings.separatorSelector+':first', this).width(); //width without scroll

            //getting info on separators
            //and making that into a function just in case
            var updatePositions = function() {
                //cleaning separators array
                //TODO: here i need to recalc width without scroll
                //and maybe make plugin method to recalc positions if width of the list changes
                separators = [];
                $(settings.dummySelector, this).remove();
                for (var i = 0; i < $separators.size(); i++) {
                    var $el = $($separators.toArray()[i]);
                    separators.push({
                        $el    : $el,
                        top    : $el.position().top,
                        height : $el.height()
                                  + parseInt( $el.css('padding-top')         )
                                  + parseInt( $el.css('padding-bottom')      )
                                  + parseInt( $el.css('border-top-width')    )
                                  + parseInt( $el.css('border-bottom-width') )
                    })
                }

                //cleaning dummys array
                dummys = [];
                //creating clones of needed separators
                //we don't need last one
                for (var i = 0; i < separators.length - 1; i++ ) {
                    //cloning separator into a dummy and saving dummy in collection for further access
                    dummys.push(
                        $('<li />').addClass(settings.dummyClass).append(
                            separators[i].$el.clone().css({'top': -separators[i].height, 'width': w})
                        ).insertBefore(separators[i+1].$el)
                    )

                }
            }

            updatePositions();

            $this.scroll(function() {

            var $this = $(this),
                scrolltop = $this.scrollTop();

                for (var i = 0; i < separators.length; i++) {
                    if (separators[i].top <= scrolltop) {
                        separators[i].$el.show()
                                      .addClass(settings.pinnedClass).width(w)
                                      .next().css('margin-top', separators[i].height);
                    }

                    if (separators[i].top > scrolltop) {
                        separators[i].$el.removeClass(settings.pinnedClass)
                                      .next().css('margin-top', '0px');
                    }

                    if (i != separators.length - 1) {
                        if (scrolltop + separators[i].height >= separators[i+1].top) {
                            $(dummys[i]).show();
                            separators[i].$el.hide();
                        }

                        if (scrolltop + separators[i].height < separators[i+1].top) {
                            separators[i].$el.show();
                            $(dummys[i]).hide();
                        }
                    }

                }
            }).trigger('scroll');
        })
    }
})(jQuery)



$(function() {
    $('.ilist').ilist();
})
