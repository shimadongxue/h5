/**
 * Created by llairen on 2017/9/18.
 */


var H5Component = function () {

    this.el = $('<div class="wp-inner">').hide();

    this.page = [];

    $('.wp').append( this.el );

    this.addPage = function (name, text) {

        var page = $('<div class="page">');

        if ( name != undefined ) {
            page.addClass( 'page-'+name);
        }

        if ( text != undefined ) {
            page.text( text );
        }

        this.el.append( page );
        this.page.push( page );

        return this;
    };

    this.addComponent = function (name, option) {

        var cfg = option || '';

        if ( cfg === '' ) {
            console.error( '请传入配值参数');
            return;
        }

        cfg = $.extend({
            type: 'base'
        }, cfg);


        var component;

        var page = this.page.slice(-1)[0];

        switch ( cfg.type) {

            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'rank':
                component = new H5ComponentRank(name, cfg);
                break;
            case 'gridline':
                component = new H5ComponentGridline(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'pie':
                component = new H5ComponentPie(name, cfg);
                break;

            default :
                component = new H5ComponentBase(name, cfg);
                break;

        }

        page.append( component );

        return this;

    };

    this.loader = function () {
       this.el.fullpage({

           beforeChange: function ( e ) {

               $('.page').eq(e.cur).find('.h5-component').trigger('onLeave');
           },
           afterChange: function ( e ) {

               $('.page').eq(e.cur).find('.h5-component').trigger('onLoad');
           }
           // start: 8
       });

        $(this.page[0]).find('.h5-component').trigger('onLoad');
        this.el.show();

        $('.h5-component-back').on('click', function (e) {
            e.preventDefault();
            $.fn.fullpage.moveTo(0);
        });
    };

    return this;
};