/**
 * Created by Administrator on 2016/11/8.
 */
;(function ($, window, document) {
    "use strict"
    function LinkSelect(context, options, data) {
        var self = this;
        this.defaults = {
            secondId: 's2',      // second selectbox id
            thirdId: 's3',       // third selectbox id
            fourthId: 's4',     // fourth selectbox id
            number: 3           // linkage selectbox number
        }
        this.firstSelectBox = context;
        this.options = $.extend({}, this.defaults, options);
        this.secondSelectBox = $("#" + this.options.secondId);
        this.thirdSelectBox = $("#" + this.options.thirdId);
        this.fourthSelectBox = $("#" + this.options.fourthId);
        this.ajaxData = data;
        this.init();
    }

    function getChildData(id,data) {
        var childArray = new Array();
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].parentId == id) {
                childArray.push(data[i]);
            }
        }
        return childArray;
    }
    LinkSelect.prototype = {
        constructor: LinkSelect,
        init: function () {
            //给第一个selectBox赋值
            var firstArray = [];
            var self = this;
            for (var i = 0; i < self.ajaxData.length; i++) {
                if (self.ajaxData[i].deep == 1) {
                    firstArray.push(self.ajaxData[i]);
                }
            }
            for (var i = 0; i < firstArray.length; i++) {
                (function (i) {
                    var id = firstArray[i].id;
                    $('<option value=' + firstArray[i].id + '>' + firstArray[i].name + '</option>').appendTo(self.firstSelectBox);
                })(i);
            }
            self.firstSelectBox.selectBox().change(function () {
                self.refreshSecondData(this.value);
            });
            new SelectBox(self.firstSelectBox).refresh();
            i = null;
        },
        // 点击第一个selectBox,为第二个selectBox中的赋值
        refreshSecondData: function (id) {
            var self = this;
            var secondArray = getChildData(id,self.ajaxData);
            self.secondSelectBox.find("option:not(:first)").remove();
            self.thirdSelectBox.find("option:not(:first)").remove();
            if(self.options.number == 4){
                self.fourthSelectBox.find("option:not(:first)").remove();
            }
            for (var i = 0; i < secondArray.length; i++) {
                (function (i) {
                    var id = secondArray[i].id;
                    $('<option value=' + secondArray[i].id + '>' + secondArray[i].name + '</option>').appendTo(self.secondSelectBox);
                })(i);
            }
            self.secondSelectBox.selectBox().change(function () {
                //console.log(this.value);
                self.refreshThirdData(this.value);
            });
            new SelectBox(self.secondSelectBox).refresh();
            new SelectBox(self.thirdSelectBox).refresh();
            if(self.options.number == 4){
                new SelectBox(self.fourthSelectBox).refresh();
            }
            i = null;
        },
        // 点击第二个selectBox,为第三个selectBox中的赋值
        refreshThirdData: function (id) {
            var self = this;
            var thirdArray = getChildData(id,self.ajaxData);
            self.thirdSelectBox.find("option:not(:first)").remove();
            if(self.options.number == 4){
                self.fourthSelectBox.find("option:not(:first)").remove();
            }
            for (var i = 0; i < thirdArray.length; i++) {
                (function (i) {
                    var id = thirdArray[i].id;
                    $('<option value=' + thirdArray[i].id + '>' + thirdArray[i].name + '</option>').appendTo(self.thirdSelectBox);
                })(i);
            }
            self.thirdSelectBox.selectBox().change(function () {
                //console.log(self.value);
                    if(self.options.number == 4){
                        self.refreshFourthData(this.value);
                    }
            });
            new SelectBox(self.thirdSelectBox).refresh();
            if(self.options.number == 4){
                new SelectBox(self.fourthSelectBox).refresh();
            }
            i = null;
        },
        refreshFourthData: function (id) {
            var self = this;
            var fourthArray = getChildData(id, self.ajaxData);
            self.fourthSelectBox.find("option:not(:first)").remove();
            for (var i = 0; i < fourthArray.length; i++) {
                var id = fourthArray[i].id;
                $('<option value=' + fourthArray[i].id + '>' + fourthArray[i].name + '</option>').appendTo(self.fourthSelectBox)

            }
            new SelectBox(self.fourthSelectBox).refresh();
        }

    }
    $.fn.linkSelect = function (options, data) {
        var $this = $(this);
        return $this.each(function () {
            new LinkSelect($this, options, data);
        })
    }


})(jQuery, window, document)