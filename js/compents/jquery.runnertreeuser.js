/**
 * 员工分组树
 */

var newCount = 1; //构造临时名称用
var GTR;


(function ($) {

    //默认设置
    var defaults = {
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
        },
        edit: {
            enable: true, //是否允许编辑
            editNameSelectAll: true,
            showRemoveBtn: showRemoveBtn,
            removeTitle: "删除",
            showRenameBtn: showRenameBtn,
            renameTitle: "改名"

        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeDrag: beforeDrag,
            beforeRemove: beforeRemove, //删除确认
            beforeRename: beforeRename, //改名
            //onClick: zTreeOnClick //外部自定义
        }
    };

    /**
     * 按指定内容和顺序输出搜索块
     *
     * @param opts zTree配置
     * @param open 默认展开的节点路径ids,如:'["1","4","13"]'
     */
    $.fn.treeUser = function (opts, open) {
        //整理参数
        open = open ? open : [];
        var setting = $.extend(true, defaults, opts || []);
        //console.log(setting);

        //取数据
        var root_type;
        GTR = new restUserRepository();
        root_type = GTR.readTypeTree();
        var zNodes = root_type ? root_type : [];
        zNodes.unshift({ id:0, pId:-1, name:"公司", open:true}); //添加个超级根

        //默认展开
        if (open){
            for (var k in zNodes){
                if ($.inArray(zNodes[k].id, open) != -1){
                    //console.log(zNodes[k].name);
                    zNodes[k].open = true;
                }
            }
        }

        //创建树
        return $.fn.zTree.init($(this), setting, zNodes);

    };

})(jQuery);


/* ------------------------------------------------- 一条华丽丽的分割线儿 --------------------------------------------------- */

function showRemoveBtn(treeId, treeNode){
    return parseInt(treeNode.id) != 0;
}
function showRenameBtn(treeId, treeNode){
    return parseInt(treeNode.id) != 0;
}
function beforeDrag(treeId, treeNode) {
    return false;
}

function beforeRemove(treeId, treeNode) {
    //console.log(treeId, treeNode);
    var flag_delete_type = confirm("确定删除分组 [" + treeNode.name + "] 吗？");
    if (!flag_delete_type){ //取消删除
        return false;
    }
    var res = GTR.deleteType(treeNode.id);
    if (res){
        return true;
    } else {
        return false;
    }

}

/**
 * 改名
 * @param treeId
 * @param treeNode
 * @param newName
 * @param isCancel
 * @returns {boolean}
 */
function beforeRename(treeId, treeNode, newName, isCancel) {
    //console.log(treeId, treeNode, newName, isCancel);
    var name = $.trim(newName);
    if (name == '') {
        runnerAlert("操作提示", "请填写分组名称");
        return false;
    } else {
        treeNode.name = name;
    }
    var res = GTR.updateType(treeNode.id, treeNode.name);
    //console.log(res);
    if (res){
        return true;
    } else {
        //alert('修改分类名称失败,请重试!');
        return false;
    }
}


/**
 * 鼠标移上(新建)
 * @param treeId
 * @param treeNode
 */
function addHoverDom(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    if (!zTree.setting.edit.enable){
        return false;
    }
    var btn; //按钮
    //新建
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#"+treeNode.tId+"_add").length>0) return;
    var addStr = "<span class='button add' id='" + treeNode.tId + '_add' + "' title='新建子分组' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    btn = $("#"+treeNode.tId+"_add");
    if (btn) btn.bind("click", function(){
        var id;
        var name = '新分组' + (newCount++); //临时名称
        var pId = treeNode.id;
        var res = pId ? GTR.addSubType(pId, name) : GTR.addType(name);
        if (res){
            id = res.id;
        }
        if (id){
            var zTree = $.fn.zTree.getZTreeObj(treeId);
            var newNode = zTree.addNodes(treeNode, {id:id, pId:pId, name:name});
            /* 不起效,why?
            zTree.selectNode(newNode);
            zTree.editName(newNode);
            */
        }
        return false;
    });

}

/**
 * 鼠标移走
 * @param treeId
 * @param treeNode
 */
function removeHoverDom(treeId, treeNode) {
    $("#"+treeNode.tId+"_add").unbind().remove(); //移除之前绑定的事件
}








