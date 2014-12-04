//TODO: Please write code in this file.

/*函数说明
*function CountItems(inputs)                        //形成购买商品的结构体数组
*       ==》function WhetherPromotions(barcode)     //判定是否是优惠产品
*function Settle_Account(Items_buy)                 //打印总表
*       ==》function Printfirstpart(Items_buy)      //打印第一部分
*       ==》function PrintSecondpart(Items_buy)     //打印第一部分
*       ==》function Printthirdpart(Items_buy)      //打印第一部分
*function DeleteItems_buy(Items_buy)                //清除数据结构（未用到）
* */

//这是一个结构体数组
var Items_buy = [{
    barcodes:  undefined,
    number :    undefined,
    Promotions : false
}]
Items_buy[0] = undefined;

//全局
var i , str , sum = 0 , Promotions =0;

//获取总表中的地址
//loadAllItems()[Number(Items_buy[0].barcodes.substring(4,10))];

//存储数量与是否优惠
function CountItems(inputs){
    var i;
    for(i = 0 ; i < inputs.length ; i++){
        if(inputs[i].split('-')[1] != undefined){
            Items_buy[Number(inputs[i].split('-')[0].substring(4,10))] = {barcodes : inputs[i].split('-')[0] , number : Number(inputs[i].split('-')[1]) , Promotions:WhetherPromotions(inputs[i].split('-')[0]) }
            continue;
        }
        if(!(Items_buy[Number(inputs[i].substring(4,10))])){
            Items_buy[Number(inputs[i].substring(4,10))] = {barcodes : inputs[i] , number : 1 , Promotions :  WhetherPromotions( inputs[i])};
            continue;
        }
        Items_buy[Number(inputs[i].substring(4,10))].number++;
    }
    return Items_buy
}

//是否优惠
function WhetherPromotions(barcode){
    var i;
    for( i = 0 ; i < loadPromotions()[0].barcodes.length ; i++){
        if(barcode == loadPromotions()[0].barcodes[i]){
            return true;
        }
    }
    return false;
}

//清除数组
function DeleteItems_buy(Items_buy){
    for(var i = 0 ; i < Items_buy.length ; i++){
        Items_buy[i] = undefined;
    }
}

function Printfirstpart(Items_buy){
    for(i = 0 ; i < Items_buy.length ; i++){
        if(!(Items_buy[i]))
            continue;
        if((Items_buy[i].Promotions) == true ){ //如果Items_buys是优惠物品
            str = str + '名称：'+loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].name+'，'+'数量：'+ Items_buy[i].number + loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].unit+'，'+'单价：'+(loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price).toFixed(2)+'(元)，'+'小计：'+((Items_buy[i].number - parseInt(Items_buy[i].number/3)) * loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price).toFixed(2)+'(元)\n';
            sum = sum + ((Items_buy[i].number - parseInt(Items_buy[i].number/3)) * loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price)
            continue;
        }
        if(Items_buy[i].Promotions == false){//如果Items_buys不是是优惠物品
            str = str + '名称：'+loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].name+'，'+'数量：'+ Items_buy[i].number + loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].unit+'，'+'单价：'+(loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price).toFixed(2)+'(元)，'+'小计：'+ ((Items_buy[i].number) * loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price).toFixed(2)+'(元)\n';
            sum = sum + ((Items_buy[i].number) * loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price);
            continue;
        }
    }
}

function PrintSecondpart(Items_buy){
    for(i = 0 ; i < Items_buy.length ; i++){
        if(!(Items_buy[i]))
            continue;
        if(Items_buy[i].Promotions){
            str = str + '名称：'+loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].name+'，数量：'+parseInt(Items_buy[i].number/3)+ loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].unit +'\n'
            Promotions = Promotions + parseInt(Items_buy[i].number/3)*(loadAllItems()[Number(Items_buy[i].barcodes.substring(4,10))].price)
        }
    }
}

function Printthirdpart(Items_buy){
    str = str + '总计：'+ sum.toFixed(2) +'(元)'+'\n'
    str = str + '节省：'+ Promotions.toFixed(2)+'(元)'+'\n'
}

function Settle_Account(Items_buy){
    str = '***<没钱赚商店>购物清单***\n';
    Printfirstpart(Items_buy);
    str = str + '----------------------\n'
    str = str + '挥泪赠送商品：\n'
    PrintSecondpart(Items_buy);
    str = str + '----------------------\n'
    Printthirdpart(Items_buy);
    str = str + '**********************'
    console.log(str);
}

//主函数
function  printInventory(inputs) {
    //计算单个商品个数，形成新的输入表
    var Items_buy = CountItems(inputs);
    //结算
    Settle_Account(Items_buy);
}