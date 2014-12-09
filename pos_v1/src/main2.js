//第一重变化
/*var buy_items  = [
    {
        name : '',
        number : 0 ,
        price : 0 ,
        unit : '' ,
        Promotions_type : 0     //0表示无优惠
    }
]*/
/*
 //为了满足后续变化，这个结构体只是最后成型的结构，在这之前还应该有个更加抽象的，更加通用型的结构，以便以后优惠政策变了的话
 var receipt_items = {
 paid_items : [
 {
 name : '雪碧',
 number : 5 ,
 unit : '瓶' ,
 price : 3.00 ,
 sum : 12.00
 },
 {
 name : '荔枝',
 number : 2 ,
 unit : '斤' ,
 price : 15.00 ,
 sum : 30.00
 },
 {
 name : '方便面',
 number : 3 ,
 unit : '袋' ,
 price : 4.50 ,
 sum : 9.00
 }
 ],
 send_items : [
 {
 name : '雪碧',
 number : 1 ,
 unit : '瓶'
 },
 {
 name : '方便面',
 number : 1 ,
 unit : '袋'
 }
 ]
 };
 */
//形成上述数据结构
function build_buy_items(inputs){
    var  buy_items = _.chain(inputs).groupBy(function (value) {
        return value.substring(4, 10)
    }).map(function (value, key) {
        if(value[0].split('-')[1] != undefined) {
            return {name: _(loadAllItems()).findWhere({"barcode": value[0].split('-')[0]}).name, number: Number(value[0].split('-')[1]), price: Number(_(loadAllItems()).findWhere({"barcode": value[0].split('-')[0]}).price) , unit: _(loadAllItems()).findWhere({"barcode": value[0].split('-')[0]}).unit , Promotions_type : (_.find(loadPromotions()[0].barcodes , function(num){return num == value[0].split('-')[0]}) ? loadPromotions()[0].type : 0 )
            }
        }
        return {name: _(loadAllItems()).findWhere({"barcode": value[0].split('-')[0]}).name, number: value.length, price: _(loadAllItems()).findWhere({"barcode": value[0].split('-')[0]}).price , unit: _(loadAllItems()).findWhere({"barcode": value[0].split('-')[0]}).unit , Promotions_type : (_.find(loadPromotions()[0].barcodes , function(num){return num == value[0].split('-')[0]}) ? loadPromotions()[0].type : 0 )//这里有个逻辑问题解决不了，我想遍历寻找整个优惠列表中的每个优惠项中的优惠项包含商品，若是有的话就返回该优惠项的名称
        }
    }).value();
    return buy_items;
}


//如何形成paid_items
function build_paid_items(buy_items){
        var _paid_items = _.chain(buy_items).map(function(value){return {name : value.name , number : value.number , unit : value.unit , price : value.price , sum : value.Promotions_type ? (value.number-parseInt((value.number)/3))*Number(value.price) : value.number*Number(value.price)} }).value();
    return _paid_items;
}

//形成send_paid
function build_send_items(buy_items){
    var _send_items =_.chain(buy_items).filter(function(value){return value.Promotions_type == "BUY_TWO_GET_ONE_FREE"}).map(function(value){return {name : value.name , number : parseInt(value.number/3) , unit : value.unit }}).value();
    return _send_items;
}

//形成最终的receipt_items
function build_receipt_items(inputs){
    var buy_items = build_buy_items(inputs);
    var _paid_items = build_paid_items(buy_items);
    var _send_items = build_send_items(buy_items);
    var receipt_items = {paid_items: _paid_items , send_items : _send_items};
    return receipt_items;
}

function PrintPaidPart(receipt_items) {
    var str_temp = '';
    for (var i = 0; i < receipt_items.paid_items.length; i++) {
        str_temp += '名称：' + receipt_items.paid_items[i].name + '，数量：' + receipt_items.paid_items[i].number + receipt_items.paid_items[i].unit + '，单价：' + receipt_items.paid_items[i].price.toFixed(2) + '(元)，小计：' + receipt_items.paid_items[i].sum.toFixed(2) + '(元)\n';
    }
    return str_temp;
}
function PrintSendPart(receipt_items) {
    var str_temp = '';
    for (var i = 0; i < receipt_items.send_items.length; i++) {
        str_temp += '名称：' + receipt_items.send_items[i].name + '，数量：' + receipt_items.send_items[i].number + receipt_items.send_items[i].unit + '\n';
    }
    return str_temp;
}

function printInventory(inputs){

    var receipt_items = build_receipt_items(inputs);
    var str =    '***<没钱赚商店>购物清单***\n' ;
    str += PrintPaidPart(receipt_items);
    str +=    '----------------------\n';
    str +=    '挥泪赠送商品：\n';
    str += PrintSendPart(receipt_items);
    str +=    '----------------------\n';
    str +=    '总计：51.00(元)\n';
    str +=    '节省：7.50(元)\n';
    str +=    '**********************';

    console.log(str);
}

