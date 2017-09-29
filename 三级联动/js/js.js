//注意一下基本都是jQuery的内容，
//使用jQuery命名空间，会对每一个实例都有效
$.fn.ProvinceCity = function() {
    //^_^river是我的名字，原谅我这么任性
    var river = this;
    //-----------------------------初始化工作-------------------------
    //初始化三个下拉框默认值
    //data() 方法向被选元素附加数据，或者从被选元素获取数据。
    river.data("province", [ "请选择", "choose" ]);
    river.data("city", [ "请选择", "choose" ]);
    river.data("area", [ "请选择", "choose" ]);
    //插入三个空的下拉框
    //append()方法，文档操作，就是往html中写
    river.append("<select></select>");
    river.append("<select></select>");
    river.append("<select></select>");
    //分别获取三个下拉框,通过select标签获取，eq选择
    var selectPro = river.find("select").eq(0);
    var selectCity = river.find("select").eq(1);
    var selectArea = river.find("select").eq(2);
    //默认省级下拉
    //如果province所代表的数组不为空
    if (river.data("province")) {
        //追加option，其实就是添加第一行：”请选择“
        selectPro.append("<option value='" + river.data("province")[1]
            + ">" + river.data("province")[0] + "</option>");
    }
    $.each(PRO, function(index, data) {
        selectPro.append("<option value='"+data+"'>" + data + "</option>");
    });
    //默认市级下拉
    //如果city所代表的数组不为空
    if (river.data("city")) {
        //追加option，其实就是添加第一行：”请选择“
        selectCity.append("<option value='" + river.data("city")[1] + ">"
            + river.data("city")[0] + "</option>");
    }
    //默认区级下拉
    //如果area所代表的数组不为空
    if (river.data("area")) {
        //追加option，其实就是添加第一行：”请选择“
        selectArea.append("<option value='" + river.data("area")[1] + ">"
            + river.data("area")[0] + "</option>");
    }

    //-----------------------------开始设置联动-------------------------
    //省级联动控制
    var index1 = "";
    selectPro.change(
        function() {
            //清空其它2个下拉框
            selectCity[0].options.length = 0;
            selectArea[0].options.length = 0;
            //然后判断点击的是哪个option
            index1 = this.selectedIndex;
            //如果选择的事”请选择“选项
            if (index1 == 0) {
                //保持其它两个下拉框他仍然显示”请选择“
                //如果city所代表的数组不为空
                if (river.data("city")) {
                    //追加option，其实就是添加第一行：”请选择“
                    selectCity.append("<option value='"
                        + river.data("city")[1] + "' id='choose'>"
                        + river.data("city")[0] + "</option>");
                }
                //默认省级下拉
                //如果area所代表的数组不为空
                if (river.data("area")) {
                    //追加option，其实就是添加第一行：”请选择“
                    selectArea.append("<option value='"
                        + river.data("area")[1] + "' id='choose'>"
                        + river.data("area")[0] + "</option>");
                }
            } else {
                //使用调用jQuery的each()函数依次追加<option>
                $.each(CITY[index1 - 1], function(index, data) {
                    selectCity.append("<option value='"+data+"'>"
                        + data + "</option>");
                });
                $.each(AREA[index1 - 1][0], function(index, data) {
                    selectArea.append("<option value='"+data+"'>"
                        + data + "</option>");
                });
            }
        }).change();
    //设置city的级联
    var index2 = "";
    selectCity.change(function() {
        selectArea[0].options.length = 0;
        index2 = this.selectedIndex;
        $.each(AREA[index1 - 1][index2], function(index, data) {
            selectArea.append("<option value='"+data+"'>" + data
                + "</option>");
        });

    });
    //返回经jQuery操作完的div标签内部的文档对象
    return river;
};