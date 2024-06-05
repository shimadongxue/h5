/**
 * Created by llairen on 2017/9/18.
 */


var H5ComponentBase = function (name, option) {

    var cfg = option || '';

    if ( cfg === '' ) {
        console.error( 'cfg 的参数不能为空，请配值参数');
        return;
    }

    var id          = 'h5_'+parseInt( Math.random() * 1000);
    var cls         = 'h5-component-'+ cfg.type;
    var cls_name    = 'h5-component-'+ name;

    var component = $('<div class="h5-component ' + cls+ ' ' + cls_name+ '" id="'+ id+'">');


    cfg.width && component.width( cfg.width + 'px');
    cfg.height && component.height( cfg.height + 'px');
    cfg.text && component.text( cfg.text );


    if ( cfg.center ) {
        component.css({
            position: 'absolute',
            left: '50%',
            marginLeft: -1*( cfg.width/2)
        });
    }


    if ( cfg.bg ) {
        component.css( {
            'background-image':'url('+cfg.bg +')',
            'backgroundSize' : '100%',
            'background-repeat': 'no-repeat'
        });
    }

    cfg.css && component.css( cfg.css );


    component.on('onLeave', function () {

        component.removeClass('h5-'+ name+'-onLoad').addClass('h5-'+ name+'-onLeave');

        setTimeout(function () {
            cfg.animationOut && component.animate( cfg.animationOut );
        }, cfg.delay || 0 );
    });

    component.on('onLoad', function () {

        component.removeClass('h5-'+ name+'-onLeave').addClass('h5-'+ name+'-onLoad');

        setTimeout(function () {
            cfg.animationIn && component.animate( cfg.animationIn );
        }, cfg.delay || 0 );
    });

    return component;
};