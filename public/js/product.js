import './library/jquery.js';
import { baseUrl } from './library/config.js';
import cookie from './library/cookie.js';

(function() {
    let id = location.search.split('=')[1]; // 获得商品id

    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getItem`,
        data: { id: id },
        dataType: "json",
        success: function(res) {
            res = res[0];
            let template1 = `
            <div class="deal_main clearfix">
                <div class="deal_left">
                    <div class="deal_titles">
                        <p class="long_title">
                            <!-- 标题渲染位置 -->
                            <strong>${res.title}</strong>
                            <span class="single_price"></span> </p>
                    </div>
                    <!--倒计时start-->
                    <div class="preview_product btn_time">
                        <div class="numtimer_box time">
                            <span class="tips">距特卖结束</span>
                            <span class="recom_time_box time_box" diff="0" data-type=""></span>
                        </div>
                        <!--倒计时end-->
                        <div class="preview_product_id">
                            <div class="detail_sold_out"></div>
                            <!-- 图片渲染位置 -->
                            <img src="${res.bpic}" class="ImageStd_1000" id="deal_img" />
                        </div>
                    </div>
                    <!-- JiaThis Button BEGIN -->
                    <div class="product_info">
                        <div class="product_info_list fl">
                            <a target="_blank" href="http://search.jumei.com/?filter=0-11-1&search=保湿&from=home_deal_detail_sidebar_functions">保湿</a>
                        </div>
                        <div class="jiathis_style fr">
                            <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico_jiathis" target="_blank">分享到 ></a>
                        </div>
                    </div>
                    <!-- JiaThis Button END -->
                </div>
                <div class="deal_right">
                    <div class="r_first clearfix">
                        <a href="http://search.jumei.com/?filter=0-0-0-0-11-1&search=雅漾(Avene)&from=home_deal_top_brandlogo_null_null" target="_blank" rel="nofollow"></a>
                        <div class="flag_box_main clearfix fr">
                            <img src="http://p1.global.jmstatic.com/banner/area/000/000/048_flag.jpg?v2" class="p_img_lg fl" alt="flag" onerror="this.parentNode.style.display='none'" />
                            <ul class="fl">
                                <li class="area_code_b">法国</li>
                                <li class="deal_en">France</li>
                            </ul>
                        </div>
                    </div>
                    <div class="r_second">
                        <ul class="price_module clearfix">
                            <!-- 价格渲染位置 -->
                            <li class="jumei_price"><em class="jp_cur">¥${res.price}</em></li>
                            <li class="sh_mark sh_mark_price" id="sh_mark_price">
                                <span class="rmb_tax"></span>
                                <div class="mark_layer" style="display:none;">
                                    <b class="caret_out"></b>
                                    <b class="caret_in"></b>
                                    <div class="mark_hover">

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="people clearfix">
                        <!--秒杀不显示心愿 购买人数-->
                        <div class="num fl">
                            <!-- 数量渲染位置 -->
                            <em>${res.num}</em>人已购买
                        </div>
                        <div class="comments fr"></div>
                    </div>
                    <div class="r_third">
                        <!--包邮-->
                        <dl class="mail_policy clearfix">
                            <dt class="fl">包邮政策：</dt>
                            <dd class="global_mail fl">
                                本商品单件包邮 （新疆部分区域除外） </dd>
                        </dl>
                        <!--服务政策-->
                        <dl class="mail_policy clearfix">
                            <dt class="fl">服务政策：</dt>
                            <dd class="global_mail">
                                <a style="color: #ea1d5d"></a>
                                <span class="day"></span>本商品不支持退货
                            </dd>
                        </dl>
                        <!--食品警示-->
                        <!--食品警示-->
                        <!--药监局提示-->
                        <!--药监局提示-->
                        <dl class="deal_sku clearfix">
                            <dt><span class="r_third_spacing">型</span>号:</dt>
                            <dt class="dt_relative">
                    <div class="deal_sku_input">请选择型号</div>
                    <i class="new_detail_btn"></i>
                    <div class="warningtip">请选择型号</div>
                    <ul class="sku_select" id="sku_select"></ul>
                    </dt>
                        </dl>
                    </div>
                    <div class="r_fourth">
                        <div class="add">
                        <button>-</button>
                        <button class="input">1</button>
                        <button>+</button>
                        </div>
                        <a href="javascript:;" class="detail_btn_fom btn_fom_add buy_local" id="shop_cart"><span>加入购物车</span><i></i></a>
                    </div>

                </div>
            </div>
            `;

            // 渲染页面
            $('.detail_wrap').prepend(template1);
            //详情渲染
            $('.deal_detail').after($(res.details));


            // 购物车数量加减
            $('.add button:nth-child(3)').on('click', function() {
                // i += 1;
                $('.add button:nth-child(2)').text(+$('.add button:nth-child(2)').text() + 1)
            });
            $('.add button:nth-child(1)').on('click', function() {
                if ($('.add button:nth-child(2)').text() == 1) {
                    alert('不能再少了')
                } else {
                    $('.add button:nth-child(2)').text($('.add button:nth-child(2)').text() - 1)
                }
            })

            //缓存数量
            $('body').find('#shop_cart').on('click', function() {
                addItem(res.id, $('.add button:nth-child(2)').text());
            });
        }
    });

    // cookie还未写入
    function addItem(id, num) {
        let shop = cookie.get('shop'); // 从cookie中获得shop数据

        let product = {
            id: id,
            num: num
        }

        if (shop) { // 判断是否存有购物车数据
            shop = JSON.parse(shop); // 将取出的cookie数据转成对象

            // 判断cookie中的购物车数据 是否已存在本条数据的id
            // 如果本条数据的id已存在 修改数量
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(el => {
                    el.id === id ? el.num = num : null;
                });
            } else {
                shop.push(product);
            }

        } else { // cookie中不存在shop数据
            shop = []; // 设置一个数组
            shop.push(product); // 将当前商品存入数组
        }

        cookie.set('shop', JSON.stringify(shop), 1);
    }

})();