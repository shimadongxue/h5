/**
 * Created by llairen on 2017/7/10.
 */


var H5ComponentGridline = function (name, cfg) {

    var cfg = cfg || '';


    var w = cfg.width;
    var h = cfg.height;

    var componect = new H5ComponentBase(name, cfg);
    componect.css('background','#f1f1f1');


    var canvas = document.createElement('canvas');
    var ctx    = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;



    var can = document.createElement('canvas');
    var cx    = can.getContext('2d');
    can.width = cx.width = w;
    can.height = cx.height = h;

    var step = cfg.data.length+1;
    var x = 0;
    var y = 0;
    //背景层部分     横线
    for ( var i=0; i<11; i++ ) {

        var line = $('<div class="line">');

        line.css( {
            top: h/10*i,
            left: 0
        });

        componect.append( line );
        // cx.beginPath();
        // cx.lineWidth = 0.1;
        //
        // x = 0;
        // y = h/10*i;
        //
        //
        // cx.moveTo(0-0.05, y-0.05);
        // cx.lineTo(w-0.05, y-0.05);
        //
        // cx.stroke();
        // cx.closePath();

    }

    //背景层部分     竖线
    for ( var j=0; j<step+1; j++ ) {

        var col = $('<div class="col">');

        col.css( {
            top: 0,
            left: w/step*j
        });

        componect.append( col );

        // cx.beginPath();
        // cx.lineWidth = 0.1;
        //
        //
        // x = w/step*j;
        // y = 0;
        // cx.moveTo(x-0.05, 0-0.05);
        // cx.lineTo(x-0.05, h-0.05);
        // cx.stroke();
        // cx.closePath();
    }
    componect.append( can );


    for ( var s=0; s<cfg.data.length; s++ ) {

        // debugger;
        var item = cfg.data[s];

        var per = $('<div class="per">');
        x = ( w/step )*s +w/step;
        y = h-item[1]*h;

       per.text( item[1]*100 +'%' );
       per.css({
           top: y+'px',
           left: x+'px',
           color: item[2]
       });

    componect.append( per );

    }


    function draw( per ) {

       // 数据 圆点层
       ctx.clearRect(0,0,w, h);
       ctx.beginPath();
       for ( var s=0; s<cfg.data.length; s++ ) {
           var item = cfg.data[s];
           x = ( w/step )*s +w/step;
           y = h-( item[1] )*h * per;
           ctx.fillStyle = '#fff';
           ctx.moveTo(x,y);
           ctx.arc(x,y,2,0,2*Math.PI);

       }
       ctx.fill();
       ctx.stroke();
       ctx.closePath();

       // 数据 连线层
       ctx.beginPath();
       ctx.lineWidth = .5;
       ctx.strokeStyle = 'blue';
       ctx.moveTo(0,h);
       for ( var r=0; r<cfg.data.length; r++ ) {
           var data = cfg.data[r];
           x = ( w/step )*r + w/step;
           y = h-data[1]*h*per;
           ctx.lineTo(x, y);

           if ( r == cfg.data.length-1 ) {
               ctx.lineTo(w, h);
           }

       }
       ctx.closePath();
       ctx.fillStyle = 'rgba(177,35,35,0.1)';
       ctx.fill();
   }



    componect.append( canvas );
    draw(0);

    // 离开事件
    componect.on('onLeave', function () {
        var num = 1;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function () {
                num -=0.01;
                draw( num );
            }, 10*i+500);
        }

    });

    // 加载事件
    componect.on('onLoad', function () {
        var num = 0;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function () {
                num +=0.01;
                draw( num );
            }, 10*i+500);
        }
    });



    return componect;
};