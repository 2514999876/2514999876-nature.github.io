window.onload = function () {
    // 1.获取需要的标签
    var slider = $('slider');
    var slider_main = $('slider_main');
    var slider_main_img = slider_main.children;
    var slider_ctl = $('slider_ctl');
    var prev = $('prev');
    var next = $('next');
    var iNow = 0;

    // 2.动态创建指示器
    for (var i = 0; i < slider_main_img.length; i++) {
        var span = document.createElement('span');
        span.className = 'slider-ctl-icon';
        // slider_ctl.appendChild(span)
        // span.innerText = i;
        span.innerText = slider_main_img.length - i - 1;

        slider_ctl.insertBefore(span, slider_ctl.children[0])

    }
    // 3.让第一个选择
    slider_ctl.children[0].className = 'slider-ctl-icon current';
    // 4.让滚动的内容归位
    var scroll_w = slider.offsetWidth;
    for (var j = 1; j < slider_main_img.length; j++) {
        slider_main_img[j].style.left = scroll_w + 'px'
    }

    // 5.遍历监听操作
    var slider_ctl_child = slider_ctl.children;
    for (var m = 0; m < slider_ctl_child.length; m++) {
        // 5.1监听点击
        slider_ctl_child[m].onmousedown = function () {
            /*// 5.2判断*/
            /*
            1.用当前点击的索引和选择索引对比
             2.点击 ＞ 选中的，相当于点击了右边的按钮
             3.点击 ＜ 选中的，相当于点击了左边的按钮
             */
            //获取索引
            var index = parseInt(this.innerText);
            //对比
            if (index > iNow) {
                buffer(slider_main_img[iNow], {left: -scroll_w});
                slider_main_img[index].style.left = scroll_w + 'px';

            } else if (index < iNow) {
                buffer(slider_main_img[iNow], {left: scroll_w});
                slider_main_img[index].style.left = -scroll_w + 'px';

            }
            // else {
            iNow = index;
            buffer(slider_main_img[iNow], {left: 0});
            // }
            changeIndex()
        };


    }
    //左右按钮点击
    /**
     * 1.当前可视区域图片右移
     * 2.上一张图片快速出现在可视区域左边
     * 3.让这张图片做动画进入
     */
    prev.onclick = function () {
        buffer(slider_main_img[iNow], {left: scroll_w});
        iNow--;
        //判断
        if (iNow < 0) {
            iNow = slider_main_img.length - 1;
            changeIndex();
        }
        changeIndex();
        slider_main_img[iNow].style.left = -scroll_w + 'px';
        buffer(slider_main_img[iNow], {left: 0});
    };
    /**
     * 1.当前可视区域图片快速左移
     * 2.上一张图片快速出现在可视区域右边
     * 3.让这张图片做动画进入
     */
    next.onclick = function () {

        /* iNow++;
         //判断
         if(iNow >slider_main_img.length-1){
             iNow = 0;
         }
         slider_main_img[iNow].style.left = scroll_w + 'px';
         buffer(slider_main_img[iNow],{left:0});*/
        autoPlay();
    };

    // 6.切换索引
    function changeIndex() {
        for (var i = 0; i < slider_ctl_child.length; i++) {
            slider_ctl_child[i].className = 'slider-ctl-icon';
        }
        slider_ctl_child[iNow].className = 'slider-ctl-icon current';
    }

    // 7.自动播放
    var timer = setInterval(autoPlay, 3000);

    function autoPlay() {

        buffer(slider_main_img[iNow], {left: -scroll_w});
        iNow++;
        //判断
        if (iNow > slider_main_img.length - 1) {
            iNow = 0;
        }
        slider_main_img[iNow].style.left = scroll_w + 'px';
        buffer(slider_main_img[iNow], {left: 0});

        changeIndex()
    }

    // 8.设置和清楚定时器
    slider.onmouseover = function () {
        clearInterval(timer);
        /*prev.style.display = 'block';
        next.style.display = 'block';*/
    };
    slider.onmouseout = function () {
        timer = setInterval(autoPlay, 3000);
        /* prev.style.display = 'none';
         next.style.display = 'none';*/
    }
};