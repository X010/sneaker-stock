//Store基础资料管理

var storeRes = new restStoreRepository();

//var isEdit = false;
//var editId = 0;
var currentPage;

/**
 * 页面初始数据
 */
$(function () {
    var currentPage = getUrlParam("page");
    if (currentPage == null || option == 'undefined') currentPage = 1;

    //新建按钮
    if (!checkPower(466)){
        $('#btn-create').remove();
    } else {
        $('#btn-create').click(function(){
            openParentForFrame('新建仓库', "/mainframe/baseinfo/saveStore.html?iframeid=466&iframename=" + encodeURI("新建仓库"), 466);
        });
    }

    refrush(currentPage);

    //支持表格排序
    $("#store").tablesorter({
        headers: {
            0: {sorter: true},
            1: {sorter: true},
            2: {sorter: false},
            3: {sorter: false},
            4: {sorter: false},
            5: {sorter: false},
            6: {sorter: false},
            7: {sorter: false},
        }
    });

    fixTables();
});

function refrush(page) {
    currentPage = page ? page : defaultPage;
    var params = buildParams();
    if (1){
        var data = storeRes.findAllStores(currentPage, defaultPageNum, params);//加载数据
        fullTable(data);
        if (data && data.count > defaultPageNum) {
            //需要进行分页
            var args = params;
            pageSplitCompent(window.location.pathname, currentPage, defaultPageNum, data.count, args);
        } else {
            $("#split").html("");
        }
    }
    tableHover();
}

function buildParams(){
    var status = $("#statusNumber").val();
    var params = {
        'status': status,
    };
    //console.log(params);
    return params;
}

//将数据填充到Table
function fullTable(res) {
    //$("#store tr:gt(0)").remove();
    $("#store tbody").empty();
    $("#table-empty").hide();
    if (res.data && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
            var href = "openParentForFrame('仓库:" + fieldNull(res.data[i].name) + "','/mainframe/baseinfo/saveStore.html?page=" + currentPage + "&id=" + res.data[i].id + "', '" + buildTabId('base', 46, res.data[i].id) + "');";
            var tableContent = '<tr ondblclick="' + href + '">';
            //var tableContent = '<tr ondblclick="window.location.href=\'/mainframe/baseinfo/saveStore.html?id='+res.data[i].id+'\'">';
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].code) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].name) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].contactor) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + fieldNull(res.data[i].phone) + "</div></td>";
            tableContent += "<td class='w280 align-left'><div class='td-wrap'>" + fieldNull(res.data[i].address) + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (res.data[i].isreserve == "1" ? "<span class='status-yes'>已启用</span>" : "<span class='status-no'>已禁用</span>") + "</div></td>";
            tableContent += "<td class=''><div class='td-wrap'>" + (res.data[i].status == "1" ? "<span class='status-normal'>正常</span>" : "<span class='status-locked'>停用</span>") + "</div></td>";
            //tableContent += "<td><button class='btn-small btn-op' onclick='updateStore(" + res.data[i].id + "," + i + ")' >修改资料</button></td>";
            tableContent += "</tr>";
            //$("#store tr:last").after(tableContent);
            // !importent: fixed for table sorting
            $("#store tbody").append(tableContent);
        }
    } else {
        $("#store tbody").empty();
        $("#table-empty").empty().append("没有记录").show();
    }
    formatTDOfRMB();//格式化金额列
}


/**
 * 新增记录Store

function addStore() {
    //在表格中动态添加一条
    var content = "<tr>";
    content += "<td>" + "<input class='disabled' disabled type='text' id='newcode' />" + "</td>";
    content += "<td>" + "<input type='text' id='newname' />" + "</td>";
    content += "<td>" + "<input type='text' id='newContr' />" + "</td>";
    content += "<td>" + "<input type='text' id='newphone' />" + "</td>";
    content += "<td>" + "<input type='text' id='newaddress' />" + "</td>";
    content += "<td>" + "<select id='isreserve'><option value='1' selected> 启用</option><option value='0'> 禁用</option></select>" + "</td>";
    content += "<td>" + "<select id='newstatus'><option value='1' selected> 正常</option><option value='0'> 停用</option></select>" + "</td>";
    content += "<td>" + "<button class='btn-small btn-save' onclick='saveStore();'>保存</button><button class='btn-small btn-op'  onclick='window.location.href=\"store.html\"'>取消</button>" + "</td>";
    content += "</tr>";
    $(".table-body div").remove();
    $("#store tbody").append(content);
    //$("#store tbody tr:last").after(content);
    isEdit = false;
}


function saveStore() {
    var isreserve = $("#isreserve").val();
    var status = $("#newstatus").val();
    if (isEdit && editId > 0) {
        //更新信息
        //var code = $("#td0").val();
        var name = $("#td1").val();

        if (name == null || name == 'undefined' || name.length <= 0) {
            runnerAlert("操作提示", "请填写仓库名称");
            return false;
        }
        var contr = $("#td2").val();
        var phone = $("#td3").val();
        var address = $("#td4").val();
        var postData = {
            //  "code": code,
            "name": name,
            "address": address,
            "phone": phone,
            "contactor": contr,
            "isreserve": isreserve,
            "status": status,
            "memo": "_"
        };

        var sres = storeRes.edit(editId, postData);
        if (sres != null)
            window.location.reload();
    } else {
        var code = $("#newcode").val();
        var name = $("#newname").val();
        var contr = $("#newContr").val();
        var phone = $("#newphone").val();
        var address = $("#newaddress").val();
        if (name == null || name == 'undefined' || name.length <= 0) {
            runnerAlert("操作提示", "请填写仓库名称");
            return false;
        }
        //新增信息
        var postData = {
            "code": code,
            "name": name,
            "address": address,
            "phone": phone,
            "contactor": contr,
            "isreserve": isreserve,
            "status": status,
            "memo": "_"
        };

        var sres = storeRes.add(postData); //发送添加请求
        if (sres != null)
            window.location.reload();
    }
}
 */
/**
 * 删除记录Store

function deleteStore() {

}
 */


/**
 * 更新Store数据

function updateStore(id, rowid) {
    isEdit = true;
    editId = id;
    var i = 0;
    //禁用其它行修改按钮
    $("#store tr").each(function () {
        if (rowid + 1 != $(this).index() || rowid != $(this).index()) {
            $(this).find("button").attr("disabled", true);
        }
    });
    $("#store tr:gt(0):eq(" + rowid + ")").find("td").each(function () {
        var oldText;
        if (i == 5) {
            oldText = $(this).html();
            if (oldText == '已启用') {
                $(this).html("<select id='isreserve'><option value='1' selected> 启用</option><option value='0'> 禁用</option></select>");
            } else {
                $(this).html("<select id='isreserve'><option value='1'> 启用</option><option value='0' selected> 禁用</option></select>");
            }
        } else if(i==6){
            oldText = $(this).html();
            if (oldText == '正常') {
                $(this).html("<select id='newstatus'><option value='1' selected> 正常</option><option value='0'> 停用</option></select>");
            } else {
                $(this).html("<select id='newstatus'><option value='1'> 正常</option><option value='0' selected> 停用</option></select>");
            }
        } else if (i == 7) {
            $(this).html("<button class='btn-small btn-save'  onclick='saveStore();'>保存</button><button class='btn-small btn-op'  onclick='window.location.reload();'>取消</button>");
        } else {
            if (i == 0) {
                var oldText = $(this).html();
                $(this).html("<input type='text' class='disabled' disabled  value='" + oldText + "' id='td" + i + "'>");
            } else {
                var oldText = $(this).html();
                $(this).html("<input type='text' value='" + oldText + "' id='td" + i + "'>");
            }
        }
        i++;
    })

}
 */


