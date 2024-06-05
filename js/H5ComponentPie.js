/**
 * Created by llairen on 2017/9/18.
 */


var H5ComponentPie = function (name, option) {

    var cfg = option || '';
    var component = new H5ComponentBase(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = w;
    canvas.height = h;
    $(canvas).css('zIndex', 1);


    var r = w/2;


    var initAngle = -90;
    var angle = Math.PI/180;

    for ( var i=0; i<cfg.data.length; i++ ) {

        ctx.beginPath();
        var item = cfg.data[i];

        var v = item[1]*360;

        var start = initAngle * angle;
        var end   = (initAngle+v) * angle;

        initAngle += v;

        ctx.moveTo( r, r );
        ctx.arc( r, r, r, start, end);

        ctx.fillStyle = item[2];
        ctx.closePath();
        ctx.fill();
    }
    component.append( canvas );



    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = cfg.width;
    canvas.height = cfg.height;
    $(canvas).css('zIndex', 2);

    ctx.lineWidth = 1;
    ctx.fillStyle = '#f2f2f2';

    component.append( canvas );

    function draw( per ) {

        ctx.clearRect(0,0,w,h);

        ctx.beginPath();
        ctx.moveTo( r, r );

         if ( per <= 0 ) {
             ctx.arc( r, r, r, 0,2*Math.PI );
         } else {
             ctx.arc(r, r, r, -90*angle, -90*angle +2*Math.PI*per , true );
         }

        ctx.closePath();
        ctx.fill();

        if ( per >= 1 ) {
            ctx.clearRect(0,0,w,h);
        }
    }

    draw( 0 );

    component.on('onLeave', function () {

        var num = 1;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function () {
                num -=0.01;
                draw( num );
            }, 10*i+500);
        }

    });

    component.on('onLoad', function () {

        var num = 0;
        for ( var i=0; i<100; i++ ){
            setTimeout(function () {
                num +=0.01;
                draw( num );
            }, 10*i+500);
        }
    });


    return component;
};