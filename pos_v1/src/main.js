//TODO: Please write code in this file.



function GetItemIndex(barcode){
    var index = 0;
    return index;
}

function CountItems(inputs){
    var i;
    var j = 1;
    var x =0;
    var inputs_new = new Array();
    for(i = 0 ; i < inputs.length ; i++){
        if(inputs[i].split('-')[1] != undefined){
            inputs_new[x] = inputs[i];
            x++
            continue;
        }
        if(inputs[i] == inputs[i+1]){
            j++;
        }
        else{
            inputs_new[x] = inputs[i]+'-'+j;
            x++;
            j = 1;
        }
    }
    return inputs_new;
}
CountItems(inputs);

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

