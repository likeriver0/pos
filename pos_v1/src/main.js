//TODO: Please write code in this file.

function GetItemIndex(barcode){
    var index = 0;
    return index;
}

function CountItems(inputs){
    var inputs_new = [
        'ITEM000001-5',
        'ITEM000003-2',
        'ITEM000005-3'
    ];

    return inputs_new;

}

function WhetherPromotions(barcode){
    return 'YES';
}

function WhetherAchieve(barcode){
    return 'YES';
}

function Settle_Account(inputs_new){
    //获取当前商品号对应的在列表中的位置
    var i;
    for(i = 0 ; i < inputs_new.length ; i++){
        var index = GetItemIndex(inputs_new[i].barcode);

        //检测是否属于优惠商品
        if( WhetherPromotions( inputs_new[i].barcode) ) {
            //检测是否满足优惠条件
            if (WhetherAchieve( loadAllItems()[index].barcode )) {
                //打折时,记录打折商品以及优惠多少
            }
           
        }
        //不打折时
        
    }
}
//主函数
function  printInventory(inputs) {

    //计算单个商品个数，形成新的输入表
    var inputs_new = CountItems(inputs);
    //结算
    Settle_Account(inputs_new);

}
printInventory()
