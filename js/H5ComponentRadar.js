/**
 * Created by llairen on 2017/7/10.
 */


var H5ComponentRadar = function (name, cfg) {

    var cfg = cfg || {};

    var componect = new H5ComponentBase(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    var x = w/2;
    var y = h/2;
    var r =  cfg.width/2;

    var canvas = document.createElement('canvas');
    var ctx    = canvas.getContext('2d');


    canvas.width = cfg.width;
    canvas.height = cfg.height;


    /**
     *
     *  圆心坐标 为(a, b) 半径为r
     *  x = a + Math.sin( rad ) * r;
     *  y = b + Math.cos( rad ) * r;
     *
     *  rad = ( 2* Math.Pi/360 )*( 360/2)* ?;
     *
     */
    var length = cfg.data.length;
    var isRed = false;
    for ( var a=10; a>0; a-- ) {
        ctx.beginPath();
        for ( var i=0; i<length; i++ ) {

            var rad = ( 2* Math.PI/360 )*( 360/length )* i;
            var  x0 = x + Math.sin( rad ) * r * (a/10);
            var  y0 = y + Math.cos( rad ) * r * (a/10);
            ctx.lineTo(x0, y0);
        }

        ctx.fillStyle = ( isRed = !isRed ) ? '#d4d6ea' : '#fff';
        ctx.closePath();
        ctx.fill();

    }


    ctx.fillStyle = ( isRed = !isRed ) ? '#d4d6ea' : '#fff';
    ctx.closePath();
    ctx.fill();

    // 骨状线
    for ( var s=0; s<length; s++ ) {
        ctx.beginPath();
        var rad0 = ( 2* Math.PI/360 )*( 360/length )* s;
        var  x1 = x + Math.sin( rad0 ) * r;
        var  y1 = y + Math.cos( rad0 ) * r;

        ctx.moveTo( x, y);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = 'rgba(0,0,0,0.05)';
        ctx.closePath();
        ctx.stroke();

        var $div = $('<div class="title">');
        var item = cfg.data[s];
        $div.text( item[0] );


        if ( x1 > w/2 ) {
            $div.css({ left: x1 });
        } else {
            $div.css({ right: w-x1});
        }

        if ( y1 < h/2 ) {
            $div.css({ bottom: h-y1 });
        } else {
            $div.css({ top: y1 });
        }

        if ( item[2] ) {
            $div.css( 'color', item[2] );
        }
        $div.css('transition','all 1s '+(i*0.05)+1+'s');

        componect.append( $div );
    }

    componect.append( canvas );

    var canvas = document.createElement('canvas');
    var ctx    = canvas.getContext('2d');

    canvas.width = cfg.width;
    canvas.height = cfg.height;

    function draw ( per ) {

        ctx.clearRect(0,0, w, h);
        ctx.beginPath();
        for ( var j=0; j<length; j++ ) {

            var item = cfg.data[j];

            var rad_j = ( 2* Math.PI/360 )*( 360/length )* j;
            var  xj = x + Math.sin( rad_j ) * r * item[1] * per;
            var  yj = y + Math.cos( rad_j ) * r * item[1] * per;

            ctx.arc( xj, yj, 2, 0 , 2* Math.PI );

            ctx.lineTo( xj, yj);


        }
        ctx.strokeStyle = 'red';
        ctx.closePath();
        ctx.stroke();

    }

    draw(0);

    componect.append( canvas );

    componect.on('onLeave', function () {

        componect.removeClass('h5-'+ name+'-onLoad').addClass('h5-'+ name+'-onLeave');

        var num = 1;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function () {
                num -=0.01;
                draw( num );
            }, 10*i+500);
        }

    });

    componect.on('onLoad', function () {


        componect.removeClass('h5-'+ name+'-onLeave').addClass('h5-'+ name+'-onLoad');

        var num = 0;

        for ( var i=0; i<100; i++ ){
            setTimeout(function () {
                num +=0.01;
                draw( num );
            }, 10*i+500);
        }
    });

    return componect;
};