/**
 * Created by llairen on 2017/9/18.
 */


var H5ComponentRank = function (name, option) {

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

        var col = $('<div class="col">');

        var title = $('<div class="title">');

        var rate = $('<div class="rate">');

        var bg = $('<div class="bg">');

        var per = $('<span class="per">');

        title.text( item[0] );

        rate.css('height', rateNum+'%');

        rate.append( bg );

        bg.css('background', item[2]);
        per.css( 'bottom' , rateNum + '%').text( rateNum + '%' );

        col.width( 100/(cfg.data.length)+'%' );
        col.append( title).append( rate ).append( per );

        component.append( col );

    }


    return component;
};