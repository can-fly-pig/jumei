import './library/jquery.js';
import cookie from './library/cookie.js';
import { baseUrl } from './library/config.js';

(function() {
    let shop = cookie.get('shop');

    if (shop) { // 有cookie数据才发请求
        shop = eval(shop);

        let idList = shop.map(elm => elm.id).join();

        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                let template = '';

                eval(res).forEach((elm, i) => {
                    // 现在遍历数据时是按照数据库查询得到的结果遍历
                    // cookie中存放的数据 的顺序  和 查询结果的顺序不同
                    // 需要让cookie中的id和查询结果的id 一一对应
                    // 索引不同
                    let arr = shop.filter(val => val.id === elm.id);
                    let picture = elm.smpic;

                    template += `
                    <li class="item" style="margin-top:0">
                    <div class="p-box same">
                        <input type="checkbox" class="p1">
                    </div>
                    <div class="p-img">
                        <img src="${picture}" alt="">
                    </div>
                    <div class="p-title same">
                        ${elm.title}
                    </div>
                    <div class="p-num same" style="width:74px;">
                        <span style="float: left;width: 20px;height: 20px;line-height: 20px;text-align: center;font-size: 16px;color: #666;border: 1px solid #e0e0e0;cursor: pointer;background: #eee" class="subself">-</span> 
                        <input type="text" value="${arr[0].num}" style="width: 30px;height: 20px;border: none;border-top: 1px solid;border-bottom: 1px solid;border-color: #e0e0e0; text-align:center" class="goodsnum">
                        <span style="float: right;width: 20px;height: 20px;line-height: 20px;text-align: center;font-size: 16px;color: #666;border: 1px solid #e0e0e0;cursor: pointer;background: #eee" class="addself">+</span>
                    </div>
                    <div class="p-price same">单价:${(elm.price).toFixed(2)}</div>
                    <div class="p-sum same">
                        总价:<i>${(elm.price*arr[0].num).toFixed(2)}</i><span>元</span>
                    </div>
                    <div class="p-del same" value="${elm.id}">
                        <a href="javascript:;">删除</a>
                    </div>
                </li>
                `;
                });


                $('.allcheck').after(template);

                //数量加减
                // 购物车数量加减
                //增加商品数量
                $('.addself').on('click', function() {
                    // i += 1;
                    let a = $(this).parent('.p-num').next('.p-price').html();
                    let b = a.substring(3, 5);
                    let str = $('.p-sum i').text();
                    let c = str.replace(/.00/g, ',');
                    let d = c.slice(0, -1);
                    let arr2 = d.split(",");
                    let e = eval(arr2.join('+'));
                    let f = $(this).parents('.item').siblings('.item').find('.p-sum').children('i').text();
                    let g = f.replace(/.00/g, ',');
                    let h = g.slice(0, -1);
                    let arr3 = h.split(",");
                    let i = eval(arr3.join('+'));
                    $('#payoff').text(e.toFixed(2));
                    $(this).prev('.goodsnum').val(+$(this).prev('.goodsnum').val() + 1);
                    // 单个商品总价
                    $(this).parent('.p-num').siblings('.p-sum').children('i').text(($(this).prev('.goodsnum').val() * b).toFixed(2));
                    // 总价
                    $('#payoff').text((parseInt($(this).parent('.p-num').siblings('.p-sum').children('i').text()) + i).toFixed(2))
                });

                // 减少商品数量
                $('.subself').on('click', function() {
                    let a = $(this).parent('.p-num').next('.p-price').html();
                    let b = a.substring(3, 5);
                    let f = $(this).parents('.item').siblings('.item').find('.p-sum').children('i').text();
                    let g = f.replace(/.00/g, ',');
                    let h = g.slice(0, -1);
                    let arr3 = h.split(",");
                    let i = eval(arr3.join('+'));
                    if ($(this).next('.goodsnum').val() == 1) {
                        alert('不能再少了')
                    } else {
                        $(this).next('.goodsnum').val($(this).next('.goodsnum').val() - 1);
                        // 单个商品总价
                        $(this).parent('.p-num').siblings('.p-sum').children('i').text(($(this).next('.goodsnum').val() * b).toFixed(2));
                        // 总价
                        $('#payoff').text((parseInt($(this).parent('.p-num').siblings('.p-sum').children('i').text()) + i).toFixed(2));
                    }
                });




                //全选功能
                ! function($) {
                    const all = $('.all'); //全选按钮
                    const inputs = $(':checkbox').not('.all') //除了全选按钮之外的input
                        //1.点击全选按钮
                    all.on('click', function() {
                        inputs.prop('checked', $(this).prop('checked'));
                        all.prop('checked', $(this).prop('checked'));
                    });
                    //2.下面所有的复选框选中，全选对应的选择
                    inputs.on('click', function() {
                        // let p = $(this).parent('.p-box').siblings('.p-sum').children('i').text();
                        if ($('input:checked').not('.all').length === inputs.length) {
                            all.prop('checked', true);
                        } else {
                            all.prop('checked', false);
                            // $('#payoff').text(p)
                        }
                    });

                }(jQuery);

                //删除功能
                $('.p-del a').on('click', function() {
                    let a = cookie.get('shop');
                    //对应需要删除的cookie的id值
                    let b = $(this).parent('.p-del').attr('value');
                    let arr3 = JSON.parse(a);
                    console.log(arr3);
                    cookie.set()
                        // 删除网页中的对应商品
                    $(this).parents('.item').remove();
                    //删除缓存中的cookie
                })

                //商品初始总价
                $('#payoff').text(0);
            }
        });
    }


})();