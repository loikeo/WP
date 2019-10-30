$(function () {
    var playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        playNextTrackButton = $('#ydnext');

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                i.attr('class', 'iconfont icon-music');
                audio.play();
            } else {
                i.attr('class', 'iconfont icon-bofang');
                audio.pause();
            }
        }, 300);
    }

    function selectTrack2(flag) {
        /*
        * 歌单详细见
        * https://api.uomg.com/doc-rand.music.html
        */
        $.getJSON('https://api.uomg.com/api/rand.music?', {
            mid: '2850086850'
            ,format: 'json'
        }, function(json, textStatus) {
            if (json.code == 1) {
                if (flag == 0)
                    i.attr('class', 'iconfont icon-bofang');
                else {
                    i.attr('class', 'iconfont icon-music');
                }

                audio.src = json.data.url;

                if (flag != 0) {
                    audio.play();
                }
            }
        });
    }
    function initPlayer() {
        audio = new Audio();

        selectTrack2(1);

        audio.loop = false;
        
        audio.onended = function() {
            selectTrack2(1);
        };

        playPauseButton.on('click', playPause);

        playNextTrackButton.on('click', function () {
            selectTrack2(1);
        });
    }

    initPlayer();
});
