/**
 * Created by llairen on 2017/9/18.
 */


var H5ComponentBar = function (name, option) {

    var cfg = option || '';

    if ( cfg === '' ) {
        console.error( 'cfg 的参数不能为空，请配值参数');
        return;
    }

    var component = new H5ComponentBase(name, cfg);


    if ( cfg.data == null )  return;

    for ( var i=0; i<cfg.data.length; i++ ) {


        var item = cfg.data[i];

        var rateNum = parseInt( item[1]*100 );

        var line  = $('<div class="line">');
        var title = $('<span class="title">');
        var rate  = $('<div class="rate">');
        var bg    = $('<div class="bg">');
        var per   = $('<span class="per">');    // 倍率数

        title.text( item[0] );

        per.text( rateNum + '%').css('color',item[2]);

        rate.css('width', rateNum+'%');

        bg.css('background', item[2]);

        rate.append( bg );
        line.append(title).append(rate).append( per );

        component.append( line );

    }


    return component;
};