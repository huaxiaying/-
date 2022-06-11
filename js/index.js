$(function () {
    // tab栏更改颜色显示
    $('.fisrstnav ul>li').click(function () {
        $(this).addClass('active').siblings(this).removeClass('active')
    })
    // 按钮显示
    $('.menu-button').click(function () {
        $('.container').toggle();
    })
    // 开关设置
    $('.check').click(function () {
        //点击隐藏显示 toggle
        $('.arrow').toggle()
        $('.container').toggle()
    })
    // 点击显示大黑云
    $('#cover').click(function () {
        $('.blackcloud').show(2000, function () {
            // alert('这是大黑云音乐盒')
        })
    })
    // 点击关闭大黑云
    $('#close').click(function () {
        $('.blackcloud').hide(2000, function () {
            // alert('欢迎再次打开大黑云')
        })
    })
    // 点击tab栏切换中间内容组件
    // 1、先获取tab栏不同div的下标
    // var index = $('.musiccon .wrap').index()

    $('.wrap ul>li').click(function () {
        var index = $(this).index();
        console.log(index);
        // 2、更改中间的内容
        $('.musicmid>div').eq(index).show().siblings().hide()
        $(this).addClass('tabactive').siblings().removeClass('tabactive')
        // $('.musiccon .item').addClass('tabactive').siblings().removeClass('tabactive')

    })
    $('.wrap ul>li').eq(0).click()

    // 主页轮播图
    // 轮播图图片传输
    // https://autumnfish.cn/banner
    axios({
        url: 'https://autumnfish.cn/banner',
        method: 'get'
    }).then(res => {
        console.log(res);
        $('#photoslider').html(template('photolist', res))
    })
    // 向右点击
    var idx = 0;
    $('#right').click(function () {
        // console.log( $('#slider li:eq(0)'));
        // console.log($('#slider li').length-1);
        idx == $('#slider li').length - 1 ? idx = 0 : idx++
        $('#slider li').eq(idx).fadeIn(500).siblings().fadeOut(500)
    })
    // 向左点击
    $('#left').click(function () {
        idx == 0 ? idx = $('#slider li').length - 1 : idx--
        $('#slider li').eq(idx).fadeIn(500).siblings().fadeOut(500)
    })

    setInterval(function () {
        $('#right').click()
    }, 3500)


    // 封装一个异步传输函数
    function fn(keyword) {
        axios({
            url: "https://autumnfish.cn/search",
            method: "get",
            params: {
                keywords: keyword,
            },
        }).then(res => {
            console.log(res);
            // var htmlStr = template('ul',res)
            $('#ul').html(template('songlist', res))
        })
    }

    // 获取关键词播放音乐
    $('#search').click(function () {
        var keyword = $('#content').val()
        console.log(keyword);
        // 传参
        fn(keyword)
    })



    // 获取头上的input里面的value 陈奕迅
    $('#btneason').click(function () {
        let keyword = $('#btneason').val()
        fn(keyword)
    })
    // 获取头上的input里面的value  周杰伦
    $('#btnjay').click(function () {
        let keyword = $('#btnjay').val()
        fn(keyword)
    })
    // 获取头上的input里面的value  超甜
    $('#btnsweet').click(function () {
        let keyword = $('#btnsweet').val()
        fn(keyword)
    })
    // 获取头上的input里面的value  粤语
    $('#btncon').click(function () {
        let keyword = $('#btncon').val()
        fn(keyword)
    })
    // 获取头上的input里面的value 英文
    $('#btnEn').click(function () {
        let keyword = $('#btnEn').val()
        fn(keyword)
    })
    // 获取头上的input里面的value  天天好心情
    $('#btngoodmood').click(function () {
        let keyword = $('#btngoodmood').val()
        fn(keyword)
    })

    // 播放音乐
    // 获取id并使用该id,获取音频url进行播放
    $('#ul').on('click', '.play', function () {
        var id = $(this).attr('data-id')
        console.log(id);
        axios({
            url: "https://autumnfish.cn/song/url",
            method: 'get',
            params: {
                id: id,
            }
        }).then(res => {
            console.log(res);
            var songurl = res.data.data[0].url
            console.log(songurl);
            $('.myaudio').attr('src', songurl)
        })
    })




    // 音乐播放
    // media controllers
    const playPause = document.querySelector("#play-stop");
    const backward = document.querySelector("#backward");
    const forward = document.querySelector("#forward");

    // record player animation
    const circleBig = document.querySelector("#cover");
    const circleSm = document.querySelector("#circle-sm");

    // playing song
    const songName = document.querySelector("#song-name");
    const audio = document.querySelector("#audio");
    const coverArt = document.querySelector("#cover");
    const musicbox = document.querySelector("#musicbox");

    // control button images
    let playImg = "./images/play.svg";
    let pauseImg = "./images/pause.svg";

    // default controls
    playPause.src = playImg;
    let isPlaying = true;

    const songList = [
        {
            name: "兄妹-方大同/薛凯琪",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E5%85%84%E5%A6%B9%20-%20%E6%96%B9%E5%A4%A7%E5%90%8C%E3%80%81%E8%96%9B%E5%87%AF%E7%90%AA.mp3?sign=b3d0b548449f7e56ea69053ab3febe9c&t=1621685687",
            cover: "./photo/1.jpg"
        },
        {
            name: "好像爱这个世界",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E5%A5%BD%E6%83%B3%E7%88%B1%E8%BF%99%E4%B8%AA%E4%B8%96%E7%95%8C%E5%95%8A(Live)%20-%20%E5%8D%8E%E6%99%A8%E5%AE%87%E3%80%81%E9%83%8E%E6%9C%97.mp3?sign=4832e181ab443726a29d9c4345cb2ad2&t=1621685737",
            cover: "./photo/2.jpg"
        },
        {
            name: "16号爱人-容祖儿",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/16%E5%8F%B7%E7%88%B1%E4%BA%BA%20-%20%E5%AE%B9%E7%A5%96%E5%84%BF.mp3?sign=f5dcaa4b946c457149a545bc4adb6da4&t=1621685621",
            cover: "./photo/3.jpg"
        },
        {
            name: "一路向北-吉他版",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97%20ballad%20-%20-%E6%9D%A8%E6%A5%9A%E9%AA%81.mp3?sign=49fe195f03b0b6f61d7e5790ad7db148&t=1621685552",
            cover: "./photo/4.jpg"
        },
        {
            name: "今天只做一件事-陈奕迅",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E4%BB%8A%E5%A4%A9%E5%8F%AA%E5%81%9A%E4%B8%80%E4%BB%B6%E4%BA%8B%20-%20%E9%99%88%E5%A5%95%E8%BF%85.mp3?sign=a6f6ea023962fa4a008c6b4f452cf1b3&t=1621685671",
            cover: "./photo/5.jpg"
        },
        {
            name: "可惜我是水瓶座-杨千嬅",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E5%8F%AF%E6%83%9C%E6%88%91%E6%98%AF%E6%B0%B4%E7%93%B6%E5%BA%A7%20-%20%E6%9D%A8%E5%8D%83%E5%AC%85.mp3?sign=4bb5bd225079ae2b1036e91597d39ab0&t=1621685704",
            cover: "./photo/6.jpg"
        },
        {
            name: "美丽之最-侧田",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E7%BE%8E%E4%B8%BD%E4%B9%8B%E6%9C%80%20-%20%E4%BE%A7%E7%94%B0.mp3?sign=060e80805a8ca8269749690369f20049&t=1621685760",
            cover: "./photo/7.jpg"
        },
        {
            name: "葡萄成熟时-陈奕迅",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E8%91%A1%E8%90%84%E6%88%90%E7%86%9F%E6%97%B6%20-%20%E9%99%88%E5%A5%95%E8%BF%85.mp3?sign=24de2597ae404bc157ea03a96d1acc2b&t=1621685776",
            cover: "./images/8.jpg"
        },
        {
            name: "如果的事-王梓钰、陈文辉",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E5%A6%82%E6%9E%9C%E7%9A%84%E4%BA%8B%20-%20%E7%8E%8B%E6%A2%93%E9%92%B0%E3%80%81%E9%99%88%E6%96%87%E8%BE%89.mp3?sign=5277aa9c07749775d6fb6c754a3e052d&t=1621685868",
            cover: "./images/9.jpg"
        },
        {
            name: "四季予你-程响",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E5%9B%9B%E5%AD%A3%E4%BA%88%E4%BD%A0%20-%20%E7%A8%8B%E5%93%8D.mp3?sign=95f968ee4e82fdfc5ff33f5a99bc405c&t=1621685721",
            cover: "./images/10.jpg"
        },
        {
            name: "阳光宅男-周杰伦",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E9%98%B3%E5%85%89%E5%AE%85%E7%94%B7%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3?sign=6317c0e5f815be4ba83717417aa9f65f&t=1621685838",
            cover: "./images/1.jpg"
        },
        {
            name: "遇到-方雅贤",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/%E9%81%87%E5%88%B0%20-%20%E6%96%B9%E9%9B%85%E8%B4%A4.mp3?sign=d7ace3bf4db07b82425d7c00cb143f11&t=1621685816",
            cover: "./images/2.jpg"
        },
        {
            name: "OnaLonelyNight-ARocketToTheMoon",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/On%20a%20Lonely%20Night%20-%20A%20Rocket%20To%20The%20Moon.mp3?sign=a99db20791a215108cc58fb46a86e39f&t=1621685634",
            cover: "./images/3.jpg"
        },
        {
            name: "Treat You Better-ShawnMendes",
            source: "https://7072-prod-2v1o0-1303040177.tcb.qcloud.la/Treat%20You%20Better%20-%20Shawn%20Mendes.mp3?sign=a96593af2c5e643f021754e5a126e23e&t=1621685654",
            cover: "./images/4.jpg"
        }
    ];
    // helper function
    function createEle(ele) {
        return document.createElement(ele);
    }
    // function append(parent, child) {
    //     return parent.append(child);
    // }
    // creating track list
    // const ul = createEle('ul')
    // function createPlayList() {
    //     songList.forEach((song) => {
    //         let h3 = createEle('h3');
    //         let li = createEle('li');

    //         li.classList.add("track-item");
    //         h3.innerText = song.name;
    //         append(li,h3);
    //         append(ul,li)
    //     })
    //     append(musicbox, ul);
    // }

    let songIndex = 0;
    // preloaded song
    loadMusic(songList[songIndex]);


    function loadMusic() {
        // coverArt.src = songList[songIndex].cover;
        // songName.innerText = songList[songIndex].name;
        // audio.src = songList[songIndex].source;
    }

    function playSong() {
        playPause.src = pauseImg;
        circleBig.classList.add("animate");
        circleSm.classList.add("animate");

        audio.play();
    }

    function pauseSong() {
        playPause.src = playImg;
        circleBig.classList.remove("animate");
        circleSm.classList.remove("animate");

        audio.pause();
    }

    function nextPlay() {
        songIndex++;
        if (songIndex > songList.length - 1) {
            songIndex = 0;
        }
        loadMusic(songList[songIndex]);
        playSong()
    }

    function backPlay() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songList.length - 1;
        }
        loadMusic(songList[songIndex]);
        playSong()
    }
    function playHandler() {
        isPlaying = !isPlaying;
        //console.log("Change: ",isPlaying)
        isPlaying ? pauseSong() : playSong();
    }


    // player event 
    playPause.addEventListener("click", playHandler);
    backward.addEventListener("click", backPlay);
    forward.addEventListener("click", nextPlay);

    // createPlayList()



})
// 背景切换
window.onload = function () {

    // 图片的数组
    const images = [
        'url("./images/1.jpg")',
        'url("./images/2.jpg")',
        'url("./images/3.jpg")',
        'url("./images/4.jpg")',
        'url("./images/5.jpg")',
        'url("./images/6.jpg")',
        'url("./images/7.jpg")',
        'url("./images/8.jpg")',
        'url("./images/9.jpg")',
        'url("./images/10.jpg")',
        // 'url("./images/7.jpg")',
    ]

    // function changeBg() {
    //     const body = document.body
    //     const bg = images[Math.floor(Math.random() * images.length)];
    //     body.style.backgroundImage = bg
    // }


    // 获取li的下标用来改变背景
    let index = 3;
    // $('#tab>li').click(function(){
    //     index = $(this).index() 
    // })   
    // $('#tab>li').eq(0).click() 
    // console.log(index);


    var body = document.body
    var i = 0;

    var ar = document.querySelector('.arrow-right');
    var al = document.querySelector('.arrow-left');

    // 点击向右箭头
    ar.onclick = function () {
        // alert("这是第二中点击方式");
        i == images.length - 1 ? i = 0 : i++;
        const bg = images[i];
        body.style.backgroundImage = bg
    }

    // 点击向左箭头
    al.addEventListener('click', function () {
        i == 0 ? i = images.length - 1 : i--
        const bg = images[i];
        body.style.backgroundImage = bg

    })

    setInterval(function () {
        ar.onclick()
    }, 5000)



    // setInterval(function () {
    //     changeBg()
    // }, 3000)

}

