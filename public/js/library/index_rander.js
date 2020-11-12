import './jquery.js';
import { baseUrl } from './config.js';


const index_rander = function() {
    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getProducts`,
        dataType: "json",
        success: function(res) {
            // 获得数据后进行字符串拼接
            let tempLi = '';
            eval(res).forEach((elm, i) => {
                let picture = elm.bpic;
                let a = i + 1;
                if (a % 3 == 0) {
                    tempLi += `
                <li class="zero">
                        <div class="lh_wrap">
                            <div class="p-img">
                                <a href="./html/product.html?id=${elm.id}"><img src="${picture}" title="${elm.title}" width="240" height="240"></a>
                                <div class="setcar">
                                </div>
                                <div class="over">
                                    <div class="btns">
                                        <a href="javascript:;" class="add_cart_large btnCart">加入购物车</a>
                                    </div>
                                    <div class="msg">
                                        <p>海外直采 海外价格 闪电发货</p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-name"><a href="#" title="入驻商家测试商品3">药品</a></div>
                            <div class="p-price"><strong>￥${elm.price}</strong><span id="p200"></span></div>

                        </div>
                    </li>
                `
                } else {
                    tempLi += `
                    <li>
                            <div class="lh_wrap">
                                <div class="p-img">
                                    <a href="./html/product.html?id=${elm.id}"><img src="${picture}" title="${elm.title}" width="240" height="240"></a>
                                    <div class="setcar">
                                    </div>
                                    <div class="over">
                                        <div class="btns">
                                            <a href="javascript:;" class="add_cart_large btnCart">加入购物车</a>
                                        </div>
                                        <div class="msg">
                                            <p>海外直采 海外价格 闪电发货</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-name"><a href="#" title="入驻商家测试商品3">药品</a></div>
                                <div class="p-price"><strong>￥${elm.price}</strong><span id="p200"></span></div>
    
                            </div>
                        </li>
                    `
                };
            });

            $('.insert').append(tempLi);
        }
    });
}

export default index_rander;