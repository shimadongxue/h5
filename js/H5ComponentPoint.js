/**
 * Created by llairen on 2017/9/18.
 */


var H5ComponentPoint = function (name, option) {

    var cfg = option || '';

    if ( cfg === '' ) {
        console.error( 'cfg 的参数不能为空，请配值参数');
        return;
    }

    var component = new H5ComponentBase(name, cfg);


    if ( cfg.data == null )  return;


    var base = cfg.data[0][1];

    for ( var i=0; i<cfg.data.length; i++ ) {

        var item = cfg.data[i];


        var point = $('<div class="point"></div>');

        var w = parseInt( ( item[1]/base)*100 );


        var title = $('<div class="title">');
        var per = $('<div class="per">');

        var t = $('<div>');
        t.text( item[0] );
        per.text( parseInt( parseFloat( item[1] ) *100) +'%'  );


        title.append( per ).append(t);
        point.append( title );

        point.css({
            position: 'absolute',
            top : centerX+'px',
            left: centerY+'px',
            width: w+'%',
            height: w+'%',
            backgroundColor: item[2],
            zIndex: 100-i
        });


        component.append( point );

        var centerX = parseInt(cfg.width*item[1])/2;
        var centerY = parseInt(cfg.height*item[1])/2;

        /* 运动的x, y 值*/

        // debugger;
        if ( item[3] ) {

            point.data('top', item[3]);
            point.data('left', item[4]);
            point.data('centerX', centerX);
            point.data('centerY', centerX);
        }

        point.css('transition','all 1s '+i*.05+'s');

    }


    component.on('onLeave', function () {

        component.removeClass('h5-'+ name+'-onLoad').addClass('h5-'+ name+'-onLeave');
        component.find('.point').each(function (i, item ) {
            $(this).css({
                top : $(this).data('centerX')+'px',
                left : $(this).data('centerY')+'px'
            });
        });
    });

    component.on('onLoad', function () {

        component.removeClass('h5-'+ name+'-onLeave').addClass('h5-'+ name+'-onLoad');

        component.find('.point').each(function (index, item) {
            $(this).css({
                top : $(this).data('top')+'px',
                left : $(this).data('left')+'px'
            });
        });
    });

    return component;
};