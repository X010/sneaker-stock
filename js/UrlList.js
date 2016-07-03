/**
 * API URL
 * @param name
 * @returns {*}
 */
function urlDefault(name) {
    var url = null;
    var READ_SITE_URL = ""; //做一个简单的读写分隔
    var WRITE_SITE_URL = "";
    switch (name) {
        case "READ_MESSAGE_REMIND": //获取提示消息
            //url = SITE_URL + "/read/message_remind";
            url = SITE_URL + "/login/message_remind";
            break;

        case "READ_USER_LIST": //读取公司员工列表(用于输入提示)
            url = SITE_URL + "/read/user";
            break;

        case "READ_USER_BY_ID":
            url = SITE_URL + "/read/user/";//根据ID查询用户信息接口(无权限限制)
            break;

        case "READ_GPS":
            url = SITE_URL + "/read/gps";//根据经纬度查询地理位置
            break;

        //case "READ_USER_GROUP": //读取公司员工组
        //    url = SITE_URL + "/read/user_group";
        //    break;

        case "READ_GOODS_BRAND": //读取系统商品品牌
            url = SITE_URL + "/read/goods_brand";
            break;

        case "READ_USER_GROUP_TREE": //读取公司员工树
            url = SITE_URL + "/read/user_group_tree";
            break;

        case "READ_CUSTOMER_BY_ID": //读取客户详情
            url = SITE_URL + "/read/customer/";
            break;

        case "READ_CUSTOMER_TMP": //读取未审核的客户列表
            url = SITE_URL + "/read/customer_tmp";
            break;

        case "READ_CUSTOMER_TMP_BY_ID": //读取未审核的客户详情
            url = SITE_URL + "/read/customer_tmp/";
            break;

        case "READ_GOODS_INVENTORY": //实盘单商品检索
            url = SITE_URL + "/read/goods_inventory";
            break;

        case "CAR_READ_BY_ID": //获取指定车辆信息
            url = SITE_URL + "/read/car/";
            break;

        case "CARS_READ_LIST": //获取车辆列表
            url = SITE_URL + "/read/car";
            break;

        case "READ_GOODS_OLD"://查询最早批次的库存商品
            url = SITE_URL + "/read/goods_old";
            break;

        case "GOODS_TYPE_TREE_READ"://查询系统全部商品类型树
            url = SITE_URL + "/read/goods_type_tree";
            break;

        case "READ_SUPPLIER_BY_NAME": //通过供应商name获取id
            url = SITE_URL + "/read/get_supplier_by_name";
            break;

        case "READ_CUSTOMER_BY_NAME": //通过客户name获取id
            url = SITE_URL + "/read/get_customer_by_name";
            break;

        case "READ_USER_BY_NAME": //通过员工name获取id
            url = SITE_URL + "/read/get_user_by_name";
            break;

        case "READ_MENU": //获取菜单权限
            url = SITE_URL + "/read/menu";
            break;

        case "RESERVE_READ_TEMP": //临时查询仓库下商品库存
            url = SITE_URL + "/read/reserve";
            break;

        case "CONFIG_BALANCE_READ": //浏览结算形式列表
            url = SITE_URL + "/config_balance/read";
            break;

        case "LOG_READ_LIST": //查询LOG日志接口
            url = SITE_URL + "/operation_log/read";
            break;

        case "LOGIN_OUT": //退出系统
            url = SITE_URL + "/login/out";
            break;

        case "LOGIN_VERIFY": //登录短信接口
            url = SITE_URL + "/login/verify";
            break;

        case "LOGIN_IN": //登录接口
            url = SITE_URL + "/login/in";
            break;

        case "CHECK_ONLINE": //用户登录状态检测
            url = SITE_URL + "/login/check";
            break;

        case "ROLE_READ_LIST": //读取角色列表接口
            //url = SITE_URL + "/role/read";
            url = SITE_URL + "/read/role";
            break;

        case "ROLE_READ_BY_ID": //读取角色列表接口
            //url = SITE_URL + "/role/read/";
            url = SITE_URL + "/read/role/";
            break;

        case "ROLE_DELETE": //册除角色接口
            url = SITE_URL + "/role/delete/";
            break;

        case "ROLE_READ_LIKE": //模糊查询角色列表
            url = SITE_URL + "/role/like";
            break;

        case "ROLE_ADD": //添加角色
            url = SITE_URL + "/role/create";
            break;

        case "ROLE_EDIT": //修改角色
            url = SITE_URL + "/role/update/";
            break;

        case "MODULE_READ_LIST": //读取权限模块列表
            url = SITE_URL + "/config_module/read";
            break;

        case "USER_READ_LIST": //读取公司员工列表
            url = SITE_URL + "/user/read";
            break;

        case "USER_EDIT_PASSWORD": //修攺名称
            //url = SITE_URL + "/user/chgpwd";
            url = SITE_URL + "/read/chg_password";
            break;

        case "COMPANY_READ": //读取公司信息
            //url = SITE_URL + "/company/read/";
            url = SITE_URL + "/read/company/";
            break;

        case "COMPANY_ALL_READ": //读取公司列表
            //url = SITE_URL + "/company/read";
            url = SITE_URL + "/read/company";
            break;

        case "COMPANY_SAVE": //保存公司信息
            url = SITE_URL + "/company/update/";
            break;

        case "COMPANY_RESET_PASSWORD": //重置公司默认用户密码
            url = SITE_URL + "/company/reset_password/";
            break;

        case "COMPANY_SET_PRINT_TPL": //设置公司打印模版
            url = SITE_URL + "/company/update_print_tpl";
            break;

        case "STORE_READ_LIST": //读取仓库列表
            //url = SITE_URL + "/store/read";
            url = SITE_URL + "/read/store";
            break;

        case "STORE_READ_BY_ID": //读取仓库详情
            //url = SITE_URL + "/store/read/";
            url = SITE_URL + "/read/store/";
            break;

        case "STORE_ADD": //添加仓库
            url = SITE_URL + "/store/create";
            break;

        case "STORE_DELETE": //删除仓库
            url = SITE_URL + "/store/delete/";
            break;

        case "STORE_UPDATE": //更新仓库
            url = SITE_URL + "/store/update/";
            break;

        case  "STORE_MINE"://只读自己仓库
            //url = SITE_URL + "/store/read_mine";
            //url = SITE_URL + "/read/store";
            url = SITE_URL + "/read/store_mine";
            break;

        case "STORE_LIKE": //仓库DSL查询
            url = SITE_URL + "/store/like";
            break;

        case "USER_DELETE": //删除用户
            url = SITE_URL + "/user/delete/";
            break;

        case "USER_ADD": //添加用户
            url = SITE_URL + "/user/create";
            break;

        case "USER_UPDATE"://修改用户
            url = SITE_URL + "/user/update/";
            break;

        case "USER_UPDATE_SELF"://修改个人资料
            url = SITE_URL + "/read/chg_self/";
            break;

        case "USER_READ_BY_ID":
            url = SITE_URL + "/user/read/";//根据ID查询用户信息接口
            break;

        case "USER_LIKE": //DSL查询用户
            url = SITE_URL + "/user/like";
            break;

        case "USER_MOVE_CUSTOMER": //业务员批量移交客户
            url = SITE_URL + "/user/move_customer";
            break;

        //员工树管理 BEGIN

        case "USER_ROOT_GROUP_CREATE": //创建根员工组
            url = SITE_URL + "/user_group/create";
            break;

        case "USER_SUB_GROUP_CREATE": //创建子员工组
            url = SITE_URL + "/user_group/create/";
            break;

        case "USER_GROUP_UPDATE": //更新员工组
            url = SITE_URL + "/user_group/update/";
            break;

        case "USER_GROUP_DELETE": //删除员工组
            url = SITE_URL + "/user_group/delete/";
            break;

        //员工树管理 END

        //车辆管理 BEGIN

        case "CAR_ADD": //添加车辆
            url = SITE_URL + "/car/create";
            break;

        case "CAR_DELETE": //删除车辆
            url = SITE_URL + "/car/delete/";
            break;

        case "CAR_UPDATE": //编辑车辆信息
            url = SITE_URL + "/car/update/";
            break;

        //车辆管理 END

        case "GOODS_READ_LIST": //读取商品列表;
            //url = SITE_URL + "/goods/read";
            url = SITE_URL + "/read/goods";
            break;

        case "GOODS_SUPPLIER_DELETE": //删除商品供应商
            url = SITE_URL + "/goods_supplier/delete/";
            break;

        case "GOODS_SUPPLIER_ADD": //添加商品供应商
            url = SITE_URL + "/goods_supplier/create";
            break;

        case "GOODS_READ_BY_ID": //根据商品ID读取
            //url = SITE_URL + "/goods/read/";
            url = SITE_URL + "/read/goods/";
            break;

        case "GOODS_ADD": //添加商品
            url = SITE_URL + "/goods/create";
            break;

        case "GOODS_UPDATE": //更新商品
            url = SITE_URL + "/goods/update/";
            break;

        case "GOODS_DELETE": //删除商品
            url = SITE_URL + "/goods/delete/";
            break;

        case "GOODS_LIKE": //DSL查询商品
            url = SITE_URL + "/goods/like";
            break;

        case "GOODS_TYPE_READ": //读取商品类型列表
            //url = SITE_URL + "/goods_type/read";
            url = SITE_URL + "/read/goods_type";
            break;

        case "GOODS_SUB_TYPE_READ_BY_ID": //读取商品二级类型列表
            //url = SITE_URL + "/goods_type/read/";
            url = SITE_URL + "/read/goods_type/";
            break;

        case "ORDER_ADD": //创建采购订单
            url = SITE_URL + "/order/create";
            break;

        case "ORDER_UPDATE": //更新采购订单
            url = SITE_URL + "/order/update/";
            break;

        case "ORDER_SPLIT": //客户订单拆单
            url = SITE_URL + "/order/split/";
            break;

        case "ORDER_OF_CUSTOMER_UPDATE": //更新客户订单
            url = SITE_URL + "/order/update_cs/";
            break;

        case "SAVE_REVISIT_FOR_CUSTOM_ORDER": //保存客户订单回访结果
            url = SITE_URL + "/order/update_visit/";
            break;

        case "ORDER_CHECK": //审核采购订单
            url = SITE_URL + "/order/check/";
            break;

        case "ORDER_READE_BY_ID": //浏览订单详情
            url = SITE_URL + "/order/read_in/";
            break;

        case "ORDER_READE_BY_ID_FOR_REVISIT"://读取订单详情for客服回访
            url = SITE_URL + "/order/read_out_visit/";
            break;

        case "ORDER_DELETE": //取消订单,审核不通过
            url = SITE_URL + "/order/delete/";
            break;

        case "ORDER_CUSTOM_DELETE": //取消客户订单
            url = SITE_URL + "/order/delete_out/";
            break;

        case "ORDER_LIST": //读取订单列表
            url = SITE_URL + "/order/read_in";
            break;

        case "ORDER_LIST_OUT"://读取出货订单列表
            url = SITE_URL + "/order/read_out";
            break;

        case "ORDER_LIST_OUT_FOR_CUSTOMER_SERVICE"://读取出货订单列表for客服分配
            url = SITE_URL + "/order/read_out_cs";
            break;

        case "ORDER_LIST_OUT_FOR_CUSTOMER_REVISIT"://读取出货订单列表for客服回访
            url = SITE_URL + "/order/read_out_visit";
            break;


        case "ORDER_READ_OUT_BY_ID"://读取出货单详情
            url = SITE_URL + "/order/read_out/";
            break;

        case "STOCKOUT_ADD"://生成出库单
            url = SITE_URL + "/stock_out/create";
            break;

        case  "STOCKOUT_PRECHECK"://创建并预库单
            url = SITE_URL + "/stock_out/precheck";
            break;

        case "STOCKOUT_EDIT_PRECHECK"://修改并预审订单
            url = SITE_URL + "/stock_out/precheck/";
            break;

        case "STOCKOUT_DRIECT"://自定义出库单
            //url = SITE_URL + "/stock_out/dircreate";
            url = SITE_URL + "/stock_out/precheck";
            break;

        case "STOCKOUT_READ"://出库单列表
            url = SITE_URL + "/stock_out/read";
            break;

        case "STOCK_UPDATE"://更新出库单
            url = SITE_URL + "/stock_out/update/";
            break;

        case  "STOCKOUT_CHECK"://审核出库单
            url = SITE_URL + "/stock_out/check/";
            break;


        case "STOCKOUT_READ_BY_ID"://查看出库单详情
            url = SITE_URL + "/stock_out/read/";
            break;

        case "STOCKOUT_DELETE"://取消出库单
            url = SITE_URL + "/stock_out/delete/";
            break;

        case "STOCKOUT_ADD_CHECK": //创建并审核出库单
            url = SITE_URL + "/stock_out/check";
            break;

        case "STOCKOUT_UPDATE_CHECK"://修改并复核出库单
            url = SITE_URL + "/stock_out/recheck/";
            break;

        case "STOCKIN_ADD": //创建入库单
            url = SITE_URL + "/stock_in/create";
            break;

        case "STOCKIN_DRIECT"://自定义入库单
            //url = SITE_URL + "/stock_in/dircreate";
            url = SITE_URL + "/stock_in/create";
            break;

        case "STOCKIN_READ"://入库单列表
            url = SITE_URL + "/stock_in/read";
            break;

        case  "STOCKIN_CHECK": //审核入库单
            url = SITE_URL + "/stock_in/check/";
            break;

        case "STOCKIN_READ_BY_ID"://入库单详情
            url = SITE_URL + "/stock_in/read/";
            break;

        case "STOCKIN_UPDATE"://更新入库单
            url = SITE_URL + "/stock_in/update/";
            break;

        case "STOCKIN_DELETE"://取消入库单
            url = SITE_URL + "/stock_in/delete/";
            break;

        case "STOCKIN_ADD_CHECK"://创建并审核入库单
            url = SITE_URL + "/stock_in/check";
            break;

        case "STOCKIN_UPDATE_CHECK"://修攺并复核入库单
            url = SITE_URL + "/stock_in/recheck/";
            break;

        case  "SUPPLIER_READ": //读取供应商列表
            //url = SITE_URL + "/supplier/read";
            url = SITE_URL + "/read/supplier";
            break;

        case  "READ_SUPPLIER_BY_ID": //读取供应商详情
            url = SITE_URL + "/read/supplier/";
            break;

        case "SUPPLIER_ADD": //添加供应商列表
            url = SITE_URL + "/supplier/create";
            break;

        case "SUPPLIER_EDIT": //修改供应商信息
            url = SITE_URL + "/supplier/update/";
            break;

        case "SUPPLIER_DELETE": //删除供应商关系
            url = SITE_URL + "/supplier/delete/";
            break;

        case "SUPPLIER_ADD_BATCH"://批量添加供应商
            url = SITE_URL + "/supplier/create_batch";
            break;

        case "SUPPLIER_READ_BY_RECOMMEND"://推荐供应商列表
            //url = SITE_URL + "/supplier/recommend";
            url = SITE_URL + "/read/supplier_recommend";
            break;

        case "SUPPLIER_REGISTER"://供应商注册
            url = SITE_URL + "/supplier/register";
            break;

        case  "READ_VIP_BY_ID": //读取会员
            url = SITE_URL + "/read/vip/";
            break;

        case  "VIP_READ": //读取会员列表
            url = SITE_URL + "/read/vip";
            break;

        case  "CUSTOMER_READ": //读取客户列表
            //url = SITE_URL + "/customer/read";
            url = SITE_URL + "/read/customer";
            break;

        case "CUSTOMER_ADD": //添加客户列表
            url = SITE_URL + "/customer/create";
            break;

        case "CUSTOMER_EDIT": //修改客户信息
            url = SITE_URL + "/customer/update/";
            break;

        case "CUSTOMER_DELETE": //删除客户关系
            url = SITE_URL + "/customer/delete/";
            break;

        case "CUSTOMER_ADD_BATCH"://批量添加
            url = SITE_URL + "/customer/create_batch";
            break;

        case "CUSTOMER_READ_BY_RECOMMEND"://推荐客户列表
            //url = SITE_URL + "/customer/recommend";
            url = SITE_URL + "/read/customer_recommend";
            break;

        case "CUSTOMER_REGISTER"://客户注册
            url = SITE_URL + "/customer/register";
            break;

        case "CUSTOMER_CHECK_PASS"://审核客户通过
            url = SITE_URL + "/customer/check_pass/";
            break;

        case "CUSTOMER_CHECK_UNPASS"://审核客户不通过
            url = SITE_URL + "/customer/check_unpass/";
            break;

        case "CUSTOMER_ADD_SALESMAN"://给客户添加业务员
            url = SITE_URL + "/customer/add_salesman";
            break;

        case "CUSTOMER_DELETE_SALESMAN"://移除客户业务员
            url = SITE_URL + "/customer/delete_salesman/";
            break;

        case "CUSTOMER_DEFAULT_SALESMAN"://设置客户默认业务员
            url = SITE_URL + "/customer/default_salesman/";
            break;

        case "VIP_REGISTER"://会员注册
            url = SITE_URL + "/vip/register";
            break;

        case "VIP_UPDATE"://会员更新
            url = SITE_URL + "/vip/update/";
            break;

        case "VIP_DELETE"://会员停用 1:正常 9:删除
            url = SITE_URL + "/vip/delete/";
            break;

        case "VIP_RECOVER"://会员恢复
            url = SITE_URL + "/vip/recover/";
            break;

        //case  "GOODSPRICE_ADD"://创建商品价格
        //    url = SITE_URL + "/store_goods/create";
        //    break;

        case "GOODSPRICE_READ"://读取商品价格信息
            url = SITE_URL + "/store_goods/read";
            break;

        case "GOODSPRICE_READ_BY_ID"://读取商品价格信息
            url = SITE_URL + "/store_goods/read/";
            break;

        case "COMPANYGOODS_DELETE"://取消仓库商品
            url = SITE_URL + "/company_goods/delete/";
            break;

        case "COMPANYGOODS_UPDATE"://修改公司商品
            url = SITE_URL + "/company_goods/update/";
            break;

        case "STOREGOODS_READIN"://查询进货仓库的商品
            //url = SITE_URL + "/store_goods/read_in";
            url = SITE_URL + "/read/goods_in";
            break;

        case "STOREGOODS_READOUT"://查询出货仓库商品
            //url = SITE_URL + "/store_goods/read_out";
            url = SITE_URL + "/read/goods_out";
            break;

        case "TRANSFER_UPDATE_CHECK"://修改并审核调拔单
            url = SITE_URL + "/transfer/check/";
            break;

        case "TRANSFER_ADD_CHECK"://创建并审核调拔单
            url = SITE_URL + "/transfer/check";
            break;

        case "TRANSFER_REVICE"://调拔入货
            url = SITE_URL + "/transfer/receive/";
            break;

        case  "TRANSFER_DELETE"://取消调拔单
            url = SITE_URL + "/transfer/delete/";
            break;

        case  "TRANSFER_FLUSH"://冲单调出单
            url = SITE_URL + "/transfer/flush/";
            break;

        case "TRANSFER_UPDATE"://更新调拔单
            url = SITE_URL + "/transfer/update/";
            break;

        case "TRANSFER_READ_BY_ID"://查询调拔单详情
            url = SITE_URL + "/transfer/read/";
            break;

        case "TRANSFER_ADD": //生成调拔单
            url = SITE_URL + "/transfer/create";
            break;

        case "TRANSFER_READ": //读取调拔单
            url = SITE_URL + "/transfer/read";
            break;

        //报损、报溢 单
        case  "LOSS_EDIT_CHECK"://创建打损单
            url = SITE_URL + "/loss/check/";
            break;

        case  "LOSS_ADD_CHECK"://创建并审核报损单
            url = SITE_URL + "/loss/check";
            break;

        case  "LOSS_DELETE"://取消报损单
            url = SITE_URL + "/loss/delete/";
            break;

        case "LOSS_EDIT"://更新报损单
            url = SITE_URL + "/loss/update/";
            break;

        case  "LOSS_READ_BY_ID": //根据ID查询报损单
            url = SITE_URL + "/loss/read/";
            break;

        case "LOSS_READ": //浏览报损单列表
            url = SITE_URL + "/loss/read";
            break;

        case "LOSS_ADD": //生成报损单
            url = SITE_URL + "/loss/create";
            break;

        case "OVERFLOW_EDIT_CHECK"://修改并审核报溢单
            url = SITE_URL + "/overflow/check/";
            break;

        case  "OVERFLOW_ADD_CHECK"://创建并审核报溢单
            url = SITE_URL + "/overflow/check";
            break;

        case "OVERFLOW_DELETE"://取消报溢单
            url = SITE_URL + "/overflow/delete/";
            break;

        case "OVERFLOW_UPDATE": //更新报溢单信息
            url = SITE_URL + "/overflow/update/";
            break;

        case "OVERFLOW_READ_BY_ID"://根据ID查询报溢单
            url = SITE_URL + "/overflow/read/";
            break;

        case "OVERFLOW_ADD"://添加报溢单
            url = SITE_URL + "/overflow/create";
            break;

        case "OVERFLOW_READ": //读取报溢单列表
            url = SITE_URL + "/overflow/read";
            break;

        case "RETURNIN_UPDATE_CHECK"://修改并审核退货入库
            url = SITE_URL + "/return_in/check/";
            break;

        case  "RETURNIN_DIRECT"://自定退货入库单
            //url = SITE_URL + "/return_in/dircreate";
            url = SITE_URL + "/return_in/create";
            break;

        case "RETURNIN_ADD_CHECK"://创建并审核退货入库单
            url = SITE_URL + "/return_in/check";
            break;

        case  "RETURNIN_DELETE"://取消入库单
            url = SITE_URL + "/return_in/delete/";
            break;

        case  "RETURNIN_UPDATE"://更新退货单
            url = SITE_URL + "/return_in/update/";
            break;

        case "RETURNIN_READ_BY_ID"://查询退货入库
            url = SITE_URL + "/return_in/read/";
            break;

        case "RETURNIN_READ": //浏览退货入库单
            url = SITE_URL + "/return_in/read";
            break;

        case "RETURNIN_REPAIRE"://修正退货入库单
            url = SITE_URL + "/return_in/repaire/";
            break;

        case "RETURNIN_FLUSH"://冲单退货入库单
            url = SITE_URL + "/return_in/flush/";
            break;

        case "RETURNIN_ADD"://生成退货入库单
            url = SITE_URL + "/return_in/create";
            break;

        case "RETURNOUT_UPDATE_CHECK"://修改并审核退货单
            url = SITE_URL + "/return_out/check/";
            break;

        case "RETURNOUT_ADD_CHECK"://创建并审核退货单
            url = SITE_URL + "/return_out/check";
            break;

        case "RETURNOUT_DELETE"://取消退货单
            url = SITE_URL + "/return_out/delete/";
            break;

        case "RETURNOUT_UPDATE"://更新退货单信息
            url = SITE_URL + "/return_out/update/";
            break;

        case  "RETURNOUT_READ_BY_ID_IN"://查询退货单详情
            url = SITE_URL + "/return_out/read_in/";
            break;

        case  "RETURNOUT_READ_BY_ID_OUT"://查询退货单详情
            url = SITE_URL + "/return_out/read_out/";
            break;

        case "RETURNOUT_READ_IN"://浏览退货单列表
            url = SITE_URL + "/return_out/read_in";
            break;

        case "RETURNOUT_READ_OUT"://浏览退货单列表
            url = SITE_URL + "/return_out/read_out";
            break;

        case "RETURNOUT_ADD"://生成退货单
            url = SITE_URL + "/return_out/create";
            break;

        case "RETURNOUT_REPAIRE"://修正退货单
            url = SITE_URL + "/return_out/repaire/";
            break;

        case "RETURNOUT_FLUSH"://冲单退货单
            url = SITE_URL + "/return_out/flush/";
            break;

        case  "STOCKOUT_REPAIRE"://对出库单进行修改正
            url = SITE_URL + "/stock_out/repaire/";
            break;

        case  "STOCKOUT_FLUSH"://对出库单进行冲单
            url = SITE_URL + "/stock_out/flush/";
            break;

        case "STOCKIN_REAIRE"://修正入库单
            url = SITE_URL + "/stock_in/repaire/";
            break;

        case  "STOCKIN_FLUSH"://对入库单进行冲单
            url = SITE_URL + "/stock_in/flush/";
            break;

        case  "RESERVE_READ_GOODS"://查询库存商品列表
            url = SITE_URL + "/f_reserve/read_goods";
            break;

        case  "RESERVE_READ"://查询批次库存
            url = SITE_URL + "/f_reserve/read";
            break;

        case  "RESERVE_WARNING_READ"://库存预警报表
            url = SITE_URL + "/f_reserve/reserve_warning";
            break;




        case "STORE_GOODS_EXISTS"://判断仓库商品是否存在
            url = SITE_URL + "/exists/store_goods";
            break;

        case "COMPANY_GOODS_EXISTS"://判断公司商品是否存在
            url = SITE_URL + "/exists/company_goods";
            break;

        case "CUSTOM_EXISTS"://判断客户是否存在
            url = SITE_URL + "/exists/customer";
            break;

        case "SUPPLIER_EXISTS"://判断供应商商是否存在
            url = SITE_URL + "/exists/supplier";
            break;

        case "USER_USERNAME_CHECK": //判断账号是否可用
            url = SITE_URL + "/exists/user_name";
            break;

        case "USER_REALNAME_CHECK": //判断真实姓名是否可用
            url = SITE_URL + "/exists/true_name";
            break;

        case "COMPANY_NAME_EXISTS"://判断公司名称是否存在
            url = SITE_URL + "/exists/company_name";
            break;

        case "USER_INFO_READ"://查询用户是否在线
            url = SITE_URL + "/exists/getuser";
            break;


        case "COMPANYGOODS_READ"://查询公司的商品
            //url = SITE_URL + "/company_goods/read";
            url = SITE_URL + "/read/company_goods";
            break;

        case "COMPANYGOODS_READ_BY_ID"://查询公司的商品详情
            //url = SITE_URL + "/company_goods/read/";
            url = SITE_URL + "/read/company_goods/";
            break;

        case "COMPANYGOODS_ADD"://添加公司商品
            url = SITE_URL + "/company_goods/create";
            break;

        case "COMPANYGOODS_BUY_OFF"://停用商品采购功能
            url = SITE_URL + "/company_goods/buy_off/";
            break;

        case "COMPANYGOODS_BUY_ON"://启用商品采购功能
            url = SITE_URL + "/company_goods/buy_on/";
            break;

        case "PRICE_READ_LIST"://读取价格列表
            url = SITE_URL + "/price/read";
            break;

        case "PRICE_CREATE_IN"://创建进价调价单
            url = SITE_URL + "/price/create_in";
            break;

        case "PRICE_CREATE_OUT"://创建出价调价单
            url = SITE_URL + "/price/create_out";
            break;

        case "PRICE_CHECK_IN"://审核进价调价单
            url = SITE_URL + "/price/check_in";
            break;

        case "PRICE_EDIT_CHECK_IN":// 修改并审核入货价调价单
            url = SITE_URL + "/price/check_in/";
            break;

        case "PRICE_EDIT_CHECK_OUT":// 修改并审核出货价调价单
            url = SITE_URL + "/price/check_out/";
            break;

        case "PRICE_CHECK_OUT"://审核出价调价单
            url = SITE_URL + "/price/check_out";
            break;

        case "PRICE_DELETE"://取消调价单
            url = SITE_URL + "/price/delete/";
            break;

        case "PRICE_READ_IN"://读取进价调价单列表
            url = SITE_URL + "/price/read_in";
            break;

        case "PRICE_READ_IN_BY_ID"://读取进价调价单明细
            url = SITE_URL + "/price/read_in/";
            break;

        case "PRICE_READ_OUT"://读取出价调价单列表
            url = SITE_URL + "/price/read_out";
            break;

        case "PRICE_READ_OUT_BY_ID"://读取出价调价单明细
            url = SITE_URL + "/price/read_out/";
            break;

        case "PRICE_IN_ALL_STORE_READ"://查询所有仓库商品价格
            //url = SITE_URL + "/price/read_all";
            url = SITE_URL + "/read/price_all";
            break;


        case "PRICE_SALES_DELETE": //取消调价单
            url = SITE_URL + "/price_temp/delete/";
            break;

        case "PRICE_READ_SALES_IN": //读取进货促俏调价单列表
            url = SITE_URL + "/price_temp/read_in";
            break;

        case "PRICE_EDIT_CHECK_SALES_IN":// 修改并审核进货促销调价单
            url = SITE_URL + "/price_temp/check_in/";
            break;

        case "PRICE_CREATE_SALES_IN": //创建进货促销调价单
            url = SITE_URL + "/price_temp/create_in";
            break;

        case "PRICE_CHECK_SALES_IN": //创建并审核进货促销调价单
            url = SITE_URL + "/price_temp/check_in";
            break;

        case  "PRICE_READ_SALES_IN_BY_ID": //读取进货促销价详情
            url = SITE_URL + "/price_temp/read_in/";
            break;

        case  "VIEW_SALES_PROMOTION_BY_GID_SID_STATUS"://查询单个商品的促销进货详情
            url = SITE_URL + "/price_temp/read";
            break;


        case "ACCOUNTSET_CREATE"://新建帐盘
            url = SITE_URL + "/inventory_sys/create";
            break;

        case "ACCOUNTSET_CHECK"://审核帐盘
            url = SITE_URL + "/inventory_sys/check/";
            break;

        case "FRIMOFFER_CREATE"://新建实盘
            url = SITE_URL + "/inventory_phy/create";
            break;

        case "FRIMOFFER_CREATE_AND_CHECK"://保存并审核实盘
            url = SITE_URL + "/inventory_phy/check";
            break;

        case "FRIMOFFER_CHECK"://审核实盘
            url = SITE_URL + "/inventory_phy/check/";
            break;

        case "ACCOUNTSET_READ_LIST"://读取帐盘列表
            url = SITE_URL + "/inventory_sys/read";
            break;

        case "ACCOUNTSET_READ_BY_ID"://根据ID读取帐盘详情
            url = SITE_URL + "/inventory_sys/read/";
            break;

        case  "FRIMOFFER_READ_LIST"://读取实盘列表
            url = SITE_URL + "/inventory_phy/read";
            break;

        case "FRIMOFFER_READ_BY_ID"://根据ID读取实盘详情
            url = SITE_URL + "/inventory_phy/read/";
            break;

        case "ACCOUNTSET_CHECK_FOR_STORE"://根据仓库检测帐盘是否存在
            //url = SITE_URL + "/inventory_sys/check_store";
            url = SITE_URL + "/read/inventory_sys";
            break;

        //供应商结算单 BEGIN
        case "SUPSETLEMENT_CREATE"://创建供应商结算单
            url = SITE_URL + "/settle_supplier/create";
            break;

        case "SETLEMENT_READ_STOCKINANDOUT"://根据条件读取出入库单
            url = SITE_URL + "/settle_customer/read_stock";
            break;

        case "SUPSETLEMENT_CHECK"://审核供应商结算
            url = SITE_URL + "/settle_supplier/check/";
            break;

        case "SUPSETLEMENT_XD"://供应商结算单红冲
            url = SITE_URL + "/settle_supplier/flush/";
            break;

        case "SUPSETLEMENT_READ_LIST"://读取供应商结算单列表
            url = SITE_URL + "/settle_supplier/read";
            break;

        case "SUPSETLEMENT_READ_BY_ID"://读取供应商结算单详情
            url = SITE_URL + "/settle_supplier/read/";
            break;

        case "SUPSETLEMENT_GOODS_READ_BY_ID"://读取供应商结算单商品明细
            url = SITE_URL + "/settle_supplier/read_detail/";
            break;

        case "SUPSETLEMENT_DELETE_BY_ID"://删除供应商结算单
            url = SITE_URL + "/settle_supplier/delete/";
            break;
        //供应商结算单 END

        //代销结算 BEGIN
        case "PROXYSETLEMENT_GOODS_READ"://查询代销结算商品
            url = SITE_URL + "/settle_proxy_supplier/read_proxy_goods";
            break;

        case "PROXYSETLEMENT_CREATE"://创建代销结算单
            url = SITE_URL + "/settle_proxy_supplier/create";
            break;

        case "PROXYSETLEMENT_READ"://浏览代销结算单列表
            url = SITE_URL + "/settle_proxy_supplier/read";
            break;

        case "PROXYSETLEMENT_READ_BY_ID"://读取代销结算单详情
            url = SITE_URL + "/settle_proxy_supplier/read/";
            break;

        case "PROXYSETLEMENT_CHECK"://审核代销结算单
            url = SITE_URL + "/settle_proxy_supplier/check/";
            break;

        case "PROXYSETLEMENT_DELETE"://作废代销结算单
            url = SITE_URL + "/settle_proxy_supplier/delete/";
            break;

        case "PROXYSETLEMENT_FLUSH"://冲单代销结算单
            url = SITE_URL + "/settle_proxy_supplier/flush/";
            break;

        //代销结算 END

        case "CUSSETLEMENT_CREATE"://创建客户结算单
            url = SITE_URL + "/settle_customer/create";
            break;

        case "CUSSETLEMENT_CHECK"://审核客户结算单
            url = SITE_URL + "/settle_customer/check/";
            break;

        case "CUSSETLEMENT_XD"://客户结算单红冲
            url = SITE_URL + "/settle_customer/flush/";
            break;

        case "CUSSETLEMENT_READ_LIST"://读取客户结算列表
            url = SITE_URL + "/settle_customer/read";
            break;

        case "CUSSETLEMENT_READ_BY_ID"://读取客户结算单详情
            url = SITE_URL + "/settle_customer/read/";
            break;

        case "CUSSETLEMENT_GOODS_READ_BY_ID"://读取客户结算单商品明细
            url = SITE_URL + "/settle_customer/read_detail/";
            break;

        case "CUSSETLEMENT_DELETE_BY_ID"://读取客户结算单详情
            url = SITE_URL + "/settle_customer/delete/";
            break;


        case "GATHERING_CREATE"://创建收款单
            url = SITE_URL + "/debit_note/create";
            break;

        case "GATHERING_CHECK"://审核收款单
            url = SITE_URL + "/debit_note/check/";
            break;

        case "GATHERING_READ_LIST"://读取收款单列表
            url = SITE_URL + "/debit_note/read";
            break;

        case "GATHERING_READ_BY_ID"://读取收款单详情
            url = SITE_URL + "/debit_note/read/";
            break;

        case "GATHERING_XD_BY_ID"://读取收款单详情
            url = SITE_URL + "/debit_note/flush/";
            break;

        case "GATHERING_DELETE_BY_ID"://删除收款单
            url = SITE_URL + "/debit_note/delete/";
            break;

        case "PAYMENT_CREATE"://创建付款单
            url = SITE_URL + "/payment_note/create";
            break;

        case "PAYMENT_CHECK"://审核付款单
            url = SITE_URL + "/payment_note/check/";
            break;

        case "PAYMENT_READ_LIST"://读取付款单列表
            url = SITE_URL + "/payment_note/read";
            break;

        case "PAYMENT_READ_BY_ID"://读取付款单详情
            url = SITE_URL + "/payment_note/read/";
            break;

        case "PAYMENT_XD_BY_ID"://付款单冲单
            url = SITE_URL + "/payment_note/flush/";
            break;

        case "PAYMENT_DELETE_BY_ID"://删除付款单
            url = SITE_URL + "/payment_note/delete/";
            break;

        case "SUPSETLEMENT_READ_STOCK_IN_AND_OUT"://根据参数读取供应商相关的出入库单
            url = SITE_URL + "/settle_supplier/read_stock";
            break;


        //业务员结算单 BEGIN
        case "COMMISSION_READ_STOCK"://获取要结算的出货单信息
            url = SITE_URL + "/commission/read_stock";
            break;

        case "COMMISSION_CREATE"://创建业务员结算单
            url = SITE_URL + "/commission/create";
            break;

        case "COMMISSION_CHECK"://审核业务员结算单
            url = SITE_URL + "/commission/check/";
            break;

        case "COMMISSION_CREATE_CHECK"://创建并审核业务员结算单
            url = SITE_URL + "/commission/check";
            break;

        case "COMMISSION_DELETE"://取消业务员结算单
            url = SITE_URL + "/commission/delete/";
            break;

        case "COMMISSION_FLUSH"://红冲业务员结算单
            url = SITE_URL + "/commission/flush/";
            break;

        case "COMMISSION_READ_BY_ID"://读取业务员结算单
            url = SITE_URL + "/commission/read/";
            break;

        case "COMMISSION_READ"://读取业务员结算单(列表)
            url = SITE_URL + "/commission/read";
            break;

        //业务员结算单 END


        //报表:公司商品分类 BEGIN
        case "COMPANY_GOODS_TYPE_COPY_SYSTEM"://复制系统商品类型
            url = SITE_URL + "/company_goods_type/copy_system";
            break;

        case "COMPANY_GOODS_TYPE_CREATE"://新增根级商品类型
            url = SITE_URL + "/company_goods_type/create";
            break;

        case "COMPANY_GOODS_SUB_TYPE_CREATE"://新增子级商品类型
            url = SITE_URL + "/company_goods_type/create/";
            break;

        case "COMPANY_GOODS_TYPE_UPDATE"://修改商品类型
            url = SITE_URL + "/company_goods_type/update/";
            break;

        case "COMPANY_GOODS_TYPE_DELETE"://删除商品类型
            url = SITE_URL + "/company_goods_type/delete/";
            break;

        case "COMPANY_GOODS_TYPE_READ"://查询根级商品类型
            //url = SITE_URL + "/company_goods_type/read";
            url = SITE_URL + "/read/company_goods_type";
            break;

        case "COMPANY_GOODS_SUB_TYPE_READ"://查询子级商品类型
            //url = SITE_URL + "/company_goods_type/read/";
            url = SITE_URL + "/read/company_goods_type/";
            break;

        case "COMPANY_GOODS_TYPE_TREE_READ"://查询全部商品类型树
            //url = SITE_URL + "/company_goods_type/read_tree";
            url = SITE_URL + "/read/company_goods_type_tree";
            break;

        case "COMPANY_GOODS_TYPE_FLUSH"://清空商品分类
            url = SITE_URL + "/company_goods_type/flush";
            break;
        //报表:公司商品分类 END

        //报表:基础资料 BEGIN
        case "REPORTS_BASE_GOODS_READ"://查看商品报表
            url = SITE_URL + "/f_base/goods";
            break;

        case "REPORTS_BASE_GOODS_PRICE_IN_READ"://查看商品进货价格报表
            url = SITE_URL + "/f_base/goods_price_in";
            break;

        case "REPORTS_BASE_GOODS_PRICE_OUT_READ"://查看商品出货价格报表
            url = SITE_URL + "/f_base/goods_price_out";
            break;

        case "REPORTS_BASE_SUPPLIER_READ"://查看供应商报表
            url = SITE_URL + "/f_base/supplier";
            break;

        case "REPORTS_BASE_CUSTOMER_READ"://查看客户报表
            url = SITE_URL + "/f_base/customer";
            break;

        case "REPORTS_BASE_SALESMAN_TOP_CUSTOM_READ"://客户业务员排行
            url = SITE_URL + "/f_base/salesman";
            break;
        //报表:基础资料 END

        //报表:库存 BEGIN
        case "REPORTS_RESERVE_SNAPSHOT_READ"://查看库存快照
            url = SITE_URL + "/f_reserve/snapshot";
            break;

        case "REPORTS_RESERVE_ERP_READ"://查看进销存日报
            url = SITE_URL + "/f_reserve/erp";
            break;

        case "REPORTS_RESERVE_BOOK_READ"://查看台账
            url = SITE_URL + "/f_reserve/book";
            break;

        case "REPORTS_RESERVE_EXPDATE_WARNING_READ"://保质期预警
            url = SITE_URL + "/f_reserve/expdate_warning";
            break;

        case "REPORTS_RESERVE_STOCK_OUT_READ"://出库单报表
            url = SITE_URL + "/f_reserve/stock_out";
            break;

        case "REPORTS_RESERVE_STOCK_IN_READ"://入库单报表
            url = SITE_URL + "/f_reserve/stock_in";
            break;
        //报表:库存 END

        //报表:销售 BEGIN
        case "REPORTS_SALESMAN_TOP_READ"://查看业务员业绩
            url = SITE_URL + "/f_sell/salesman";
            break;

        case "REPORTS_SALESMAN_GOODS_CUSTOM_READ"://查看业务员单品铺货
            url = SITE_URL + "/f_sell/salesman_goods";
            break;

        case "REPORTS_FORM_SUPPLIER_TOP_READ"://查看供应商报表
            url = SITE_URL + "/f_sell/form_supplier";
            break;

        case "REPORTS_CUSTOM_TOP_READ"://查看客户查询
            url = SITE_URL + "/f_sell/customer";
            break;

        case "REPORTS_FORM_CUSTOM_TOP_READ"://查看客户报表
            url = SITE_URL + "/f_sell/form_customer";
            break;

        case "REPORTS_GOODS_TOP_READ"://查看商品查询
            url = SITE_URL + "/f_sell/goods";
            break;

        case "REPORTS_FORM_GOODS_TOP_READ"://查看商品报表
            url = SITE_URL + "/f_sell/form_goods";
            break;

        case "REPORTS_FORM_SUPPLIER_GOODS_TOP_READ"://查看供应商商品销售报表
            url = SITE_URL + "/f_sell/form_supplier_goods";
            break;

        case "REPORTS_FORM_CUSTOMER_GOODS_TOP_READ"://查看客户商品销售报表
            url = SITE_URL + "/f_sell/form_customer_goods";
            break;

        case "REPORTS_BALANCE_READ"://查看日对账查询
            url = SITE_URL + "/f_sell/balance";
            break;

        case "REPORTS_FORM_BALANCE_READ"://查看日对账报表
            url = SITE_URL + "/f_sell/form_balance";
            break;
        //报表:销售 END

        //报表:业务员 BEGIN
        case "REPORTS_SALESMAN_GOODS_READ"://业务员单品订量查询
            url = SITE_URL + "/f_sell/goods_salesman";
            break;

        case "REPORTS_SALESMAN_GOODS_REAL_READ"://业务员单品销量查询
            url = SITE_URL + "/f_salesman/goods_salesman_sell";
            break;

        case "REPORTS_SALESMAN_ORDER_RATE_READ"://业务员订单达成率
            url = SITE_URL + "/f_salesman/order_rate";
            break;

        case "REPORTS_SALESMAN_GOODS_CUSTOM_BY_ORDER_READ"://业务员单品铺货(订单)
            url = SITE_URL + "/f_salesman/goods";
            break;

        case "REPORTS_SALESMAN_ACHIEVEMENT_READ"://业务员业绩查询
            url = SITE_URL + "/f_salesman/task_rate";
            break;

        case "REPORTS_SALESMAN_TASK_READ"://业务员销售任务报表
            url = SITE_URL + "/f_salesman/task";
            break;

        case "REPORTS_SALESMAN_GEO_READ"://业务员客户维护记录
            url = SITE_URL + "/f_salesman/geo";
            break;

        //报表:业务员END

        //报表:财务 BEGIN
        case "REPORTS_FINANCE_PAYMENT_READ"://应付款查询
            url = SITE_URL + "/f_finance/payment";
            break;

        case "REPORTS_FINANCE_DEBIT_READ"://应收款查询
            url = SITE_URL + "/f_finance/debit";
            break;

        case "REPORTS_FINANCE_PREPAYMENT_READ"://预应付款查询
            url = SITE_URL + "/f_finance/pre_payment";
            break;

        case "REPORTS_FINANCE_PREDEBIT_READ"://预应收款查询
            url = SITE_URL + "/f_finance/pre_debit";
            break;

        case "REPORTS_FINANCE_SETTLE_READ"://结算日对账查询
            url = SITE_URL + "/f_finance/settle";
            break;

        case "REPORTS_FINANCE_STOCK_OUT_READ"://出货单结算状态查询
            url = SITE_URL + "/f_finance/stock_out";
            break;

        case "REPORTS_FINANCE_COMMISSION"://提成结算报表
            url = SITE_URL + "/f_finance/commission";
            break;

        case "REPORTS_FINANCE_COMMISSION_GOODS"://提成结算报表
            url = SITE_URL + "/f_finance/commission_goods";
            break;

        case "REPORTS_FINANCE_REAL_BACK"://实际回款明细报表
            url = SITE_URL + "/f_finance/real_back";
            break;

        //报表:财务 END

        //拣货派车 BEGIN
        case "PICKING_CART_GOODS_READ"://检索商品
            //url = SITE_URL + "/sorting/read_stock";
            url = SITE_URL + "/read/sorting_stock";
            break;

        case "PICKING_CART_CREATE"://新建拣货派车单
            url = SITE_URL + "/sorting/create";
            break;

        case "PICKING_CART_READ"://浏览拣货派车单列表
            url = SITE_URL + "/sorting/read";
            break;

        case "PICKING_CART_READ_BY_ID"://读取拣货派车单详情
            url = SITE_URL + "/sorting/read/";
            break;

        case "PICKING_CART_DELETE"://删除拣货派车单
            url = SITE_URL + "/sorting/delete/";
            break;
        //拣货派车 END


        //销售任务单 BEGIN
        case "SALE_TASK_CREATE"://新建
            url = SITE_URL + "/task/create";
            break;

        case "SALE_TASK_UPDATE"://修改
            url = SITE_URL + "/task/update/";
            break;

        case "SALE_TASK_READ"://浏览列表
            url = SITE_URL + "/task/read";
            break;

        case "SALE_TASK_READ_BY_ID"://读取详情
            url = SITE_URL + "/task/read/";
            break;

        case "SALE_TASK_DELETE"://删除
            url = SITE_URL + "/task/delete/";
            break;
        //销售任务单 END


        //客服回访记录 BEGIN
        case "VISIT_CREATE"://新建
            url = SITE_URL + "/visit/create";
            break;

        case "VISIT_UPDATE"://修改
            url = SITE_URL + "/visit/update/";
            break;

        case "VISIT_READ"://浏览列表
            url = SITE_URL + "/visit/read";
            break;

        case "VISIT_READ_BY_ID"://读取详情
            url = SITE_URL + "/visit/read/";
            break;

        case "VISIT_DELETE"://删除
            url = SITE_URL + "/visit/delete/";
            break;
        //客服回访记录 END

        //库存预警 BEGIN
        case "GOODS_WARNING_SAVE"://保存设置
            url = SITE_URL + "/goods_warning/create";
            break;

        case "GOODS_WARNING_READ"://读取设置
            url = SITE_URL + "/goods_warning/read";
            break;

        //库存预警 END

    }
    return url;
}
