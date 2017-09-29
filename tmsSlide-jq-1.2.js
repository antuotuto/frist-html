;(function(){
    //var defaultVel = {
    //    slideSpeed : 200
    //};
    //
    //var maskStyle = {
    //
    //};

    //var x = 0;
    //var y = 0;
    //var outX = 0;
    //var outY = 0;

    //function TmsSlide(options,maskOption){
    //    this.option = $.extend({},defaultVel,options);
    //}



    //////////////////////////////////////////////////////////////////

window.onload = function(){
    var con = $('[data-role=tms-slideContainer]');
    var mask = $('[data-role=tms-slideMask]');
    var x = 0;
    var y = 0;
    var imgWidth = Math.ceil(parseFloat(con.css('width')));
    var imgHeight = Math.ceil(parseFloat(con.css('height')));
    var centerX = parseInt(imgWidth)/2;
    var centerY = parseInt(imgHeight)/2;
    var outX = 0;
    var outY = 0;
    var slideSpeed = 200;
    var deg = Math.atan((centerY/2)/(centerX/2)) * (180/Math.PI);


    initCreate();

    con.on('mouseenter',conIn);
    con.on('mouseleave',conOut);
    con.on('mousemove',conMove);

    function initCreate(){
        if(con.css('position') == 'static'){
            con.css('position',' relative');
        }
        con.css('overflow',' hidden');

        mask.css({
            width:parseInt(imgWidth)+'px',
            height:parseInt(imgHeight)+'px',
            position:'absolute',
            background:'#fff',
            display:'block'
        });

    }


    function conMove(e){
        outX = e.pageX - parseInt($(this).offset().left)-centerX;
        outY = - (e.pageY - parseInt($(this).offset().top)-centerY);
    }

    function getInMouseCoordinate(e,_this){
        x = e.pageX - parseInt(_this.offset().left)-centerX;
        y = - (e.pageY - parseInt(_this.offset().top)-centerY);
    }

    function conIn(e){
        getInMouseCoordinate(e,$(this));
        if(x >= 0 && y >= 0){
            if(Math.atan(y/x) *(180/Math.PI) >= deg){
                topIn($(this));
            }else{
                rightIn($(this));
            }
        }

        if(x > 0 && y < 0){
            if(Math.atan(y/x) *(180/Math.PI) >= -deg ){
                rightIn($(this));
            }else{
                bottomIn($(this));
            }
        }

        if(x <= 0 && y <= 0){
            if(Math.atan(y/x) *(180/Math.PI) >= deg){
                bottomIn($(this));
            }else{
                leftIn($(this));
            }
        }

        if(x < 0 && y > 0){
            if(Math.atan(y/x) *(180/Math.PI) >= -deg){
                leftIn($(this));
            }else{
                topIn($(this));
            }
        }
    }


    function topIn(_this){
        _this.find('[data-role=tms-slideMask]').css({

            top:-parseInt(imgHeight)+"px",
            left:0
        }).stop().animate({
            top:0
        },slideSpeed);
    }

    function rightIn(_this){
        _this.find('[data-role=tms-slideMask]').css({

            left:parseInt(imgWidth)+"px",
            top:0
        }).stop().animate({
            left:0
        },slideSpeed);
    }

    function bottomIn(_this){
        _this.find('[data-role=tms-slideMask]').css({

            top:parseInt(imgHeight)+"px",
            left:0
        }).stop().animate({
            top:0
        },slideSpeed);
    }

    function leftIn(_this){
        _this.find('[data-role=tms-slideMask]').css({

            left:-parseInt(imgWidth)+"px",
            top:0
        }).stop().animate({
            left:0
        },slideSpeed);
    }

    function conOut(){
        if(outX >= 0 && outY >= 0){
            if(Math.atan(outY/outX) *(180/Math.PI) >= deg){
                outTop($(this));
            }else{
                outRight($(this));
            }
        }

        if(outX > 0 && outY < 0){
            if(Math.atan(outY/outX) *(180/Math.PI) >= -deg ){
                outRight($(this));
            }else{
                outBottom($(this));
            }
        }

        if(outX <= 0 && outY <= 0){
            if(Math.atan(outY/outX) *(180/Math.PI) >= deg){
                outBottom($(this));
            }else{
                outLeft($(this));
            }
        }

        if(outX < 0 && outY > 0){
            if(Math.atan(outY/outX) *(180/Math.PI) >= -deg){
                outLeft($(this));
            }else{
                outTop($(this));
            }
        }
    }

    function outTop(_this){
        _this.find('[data-role=tms-slideMask]').stop().animate({
            top:-parseInt(imgHeight)+"px",
            left:0
        },slideSpeed);
    }

    function outRight(_this){
        _this.find('[data-role=tms-slideMask]').stop().animate({
            left:parseInt(imgWidth)+"px",
            top:0
        },slideSpeed);

    }

    function outBottom(_this){
        _this.find('[data-role=tms-slideMask]').stop().animate({
            left:0,
            top:parseInt(imgHeight)+"px"
        },slideSpeed);
    }

    function outLeft(_this){
        _this.find('[data-role=tms-slideMask]').stop().animate({
            left:-parseInt(imgWidth)+"px",
            top:0
        },slideSpeed);
    }


};

})();