// A simple JSON driven youtube player that can play videos via channel or custom data. 
// Author: Santhosh -- https://github.com/Gigacore/

(function (player, $, undefined) {
    'use strict';

    $.log = function (message) {
        if (player.config.debug && (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') && console.debug) {
            console.debug(message);
        }
    };

    //Configurations
    player.videos = null; /* initial value */
    player.numberOfVideos = 5; //Define the number of latest videos to fetch from channel.
    player.videoWidth = 560;
    player.videoHeight = 315;

    player.init = function () {
        this.fetchVideos();
    }

    player.fetchVideos = function () {
        /* Note: IE requires a callback for jsonc*/
        $.getJSON('http://gdata.youtube.com/feeds/api/users/TheVerge/uploads?&v=2&max-results=' + player.numberOfVideos + '&alt=jsonc&callback=?', function (feed) {
            player.videos = feed.data;
            player.populateVideos();
        });
    };

    player.populateVideos = function () {
        var video = player.videos;
        for (var i = 0; i < video.items.length; ++i) {
            //console.log(video.items[i].id);
            $('ul#videos').append('<li class="video" data-id="' + video.items[i].id + '"><img src="' + video.items[i].thumbnail.sqDefault + '" alt=""/></li>')
        }
        player.playVideos();
        $('li.video:first-child').trigger('click');
    };

    player.playVideos = function () {
        $('li.video').click(function () {
            $('#player_wrap').empty().append('<iframe width="' + player.videoWidth + '" height="' + player.videoHeight + '" src="//www.youtube.com/embed/' + $(this).attr('data-id') + '" frameborder="0" allowfullscreen></iframe>')
        });
    };

    $(document).ready(function () {
        player.init();
    })

})(window.player = window.player || {}, jQuery);