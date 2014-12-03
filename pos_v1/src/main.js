//TODO: Please write code in this file.



function GetItemIndex(barcode){
    var index , i ;
    for(i = 0 ; i < loadAllItems().length ; i++){
        if(barcode == loadAllItems()[i].barcode){
            index = i;
            break;
        }
    }

    return index;
}

function CountItems(inputs){
    var i , j = 1 , x =0;
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

function WhetherPromotions(barcode){
    var i;
    for( i = 0 ; i < loadPromotions()[0].barcodes.length ; i++){
        if(barcode == loadPromotions()[0].barcodes[i]){
            return true;
        }
    }
    return false;
}


function Settle_Account(inputs_new){
    //获取当前商品号对应的在列表中的位置
    var i , j = 0, zongyouhui = 0 ,zongjia = 0 ;
    var youhuiwuping = new Array();

    console.log('***<没钱赚商店>购物清单***');

    for(i = 0 ; i < inputs_new.length ; i++){
        var index = GetItemIndex(inputs_new[i].split('-')[0]);

        //检测是否属于优惠商品
        if( WhetherPromotions( inputs_new[i].split('-')[0]) ) {
            //商品数量除以3就是优惠数量
            console.log('名称：'+loadAllItems()[index].name+','+'数量：'+Number(inputs_new[i].split('-')[1])+loadAllItems()[index].unit+','+'单价：'+(loadAllItems()[index].price).toFixed(2)+'（元），'+'小计：'+((inputs_new[i].split('-')[1] - parseInt(Number(inputs_new[i].split('-')[1])/3)) * loadAllItems()[index].price).toFixed(2)+'(元)')
            zongyouhui = zongyouhui + Number(inputs_new[i].split('-')[1])/3 * loadAllItems()[index].price;
            zongjia = zongjia + ((inputs_new[i].split('-')[1] - parseInt(Number(inputs_new[i].split('-')[1])/3)) * loadAllItems()[index].price);
            youhuiwuping[j] = loadAllItems()[index].name+'-'+parseInt(Number(inputs_new[i].split('-')[1])/3)+'-'+loadAllItems()[index].unit;
            j++
        }
        //不打折时
        else{
            console.log('名称：'+loadAllItems()[index].name+','+'数量：'+Number(inputs_new[i].split('-')[1])+loadAllItems()[index].unit+','+'单价：'+(loadAllItems()[index].price).toFixed(2)+'（元），'+'小计：'+((inputs_new[i].split('-')[1] - parseInt(Number(inputs_new[i].split('-')[1])/3)) * loadAllItems()[index].price).toFixed(2)+'(元)')
            zongjia = zongjia + ((inputs_new[i].split('-')[1] - parseInt(Number(inputs_new[i].split('-')[1])/3)) * loadAllItems()[index].price);
        }

    }

    console.log('----------------------')
    console.log('挥泪送的商品:')
    for(i = 0 ; i < j ; i++ ){
        console.log('名称：'+youhuiwuping[i].split('-')[0]+',数量：'+youhuiwuping[i].split('-')[1]+youhuiwuping[i].split('-')[2]);
    }
    console.log('----------------------')
    console.log('总计：'+ zongjia);
    console.log('节省：'+ zongyouhui);
    console.log('**********************');

}
//主函数
function  printInventory(inputs) {

    //计算单个商品个数，形成新的输入表
    var inputs_new = CountItems(inputs);
    //结算
    Settle_Account(inputs_new);

}

