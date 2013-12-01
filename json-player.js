// A simple JSON driven youtube player that can play videos via channel or custom data. 
// Author: Santhosh -- https://github.com/Gigacore/

(function (player, $, undefined) {
    'use strict';

    // Basic Configurations 
    player.config = {
        "channel"           : "TheVerge",
        "numberOfVideos"    : 6, //Define the number of latest videos to fetch from channel.
        "videoWidth"        : 560, //px.
        "videoHeight"       : 315, //px.
        "playerElement"     : "#player_wrap",
        "videoListElement"  : "ul#videos"
    };

    // Default config (Do not change unless you are sure)
    player.defaults = {
        "videos": null // Initial value (do not change);
    }

    // Declaring config and defaults to easy to use variables.
    var config = player.config,
        defaults = player.defaults,
        video = null;

    // Intitializing the player    
    player.init = function () {
        this.fetchVideos();
    }

    // Fetching videos from Youtube Channel in form of JSONC. Note: IE requires a callback for jsonc
    player.fetchVideos = function () {
        $.getJSON('http://gdata.youtube.com/feeds/api/users/' + config.channel + '/uploads?&v=2&max-results=' + config.numberOfVideos + '&alt=jsonc&callback=?', function (feed) {
            defaults.videos = feed.data;
            video = defaults.videos;
            player.populateVideos();
        });
    };

    // List all latest videos fetched from the channel to the videoListElement and display first video on page load.
    player.populateVideos = function () {
        for (var i = 0; i < video.items.length; ++i) {
            $(config.videoListElement).append('<li class="video" data-id="' + video.items[i].id + '" data-index="' + i + '"><img src="' + video.items[i].thumbnail.sqDefault + '" alt="' + video.items[i].title.toLowerCase().replace(/[ ]/g, '_').replace(/[!@#$%^&*-+:.,?-©]/g, '') + '"/><h3 class="video_title">' + video.items[i].title + '</h3></li>')
        }
        player.playVideos();
        $('li.video:first-child').trigger('click');
    };

    // Plays video upon clicking each li by sending required data to the playerElement.
    player.playVideos = function () {
        $('li.video').click(function () {
            $('.video').removeClass('active');
            $(this).addClass('active');
        
            $(config.playerElement).empty().append('<iframe width="' + config.videoWidth + '" height="' + config.videoHeight + '" src="//www.youtube.com/embed/' + $(this).attr('data-id') + '" frameborder="0" allowfullscreen></iframe>')
            
            var currentIndex = $(this).attr('data-index');    
            $('#meta #title h2').empty().html(video.items[currentIndex].title);
            $('#meta #desc').empty().html(video.items[currentIndex].description.replace('\n', '<p>'));
        });
    };

    $(document).ready(function () {
        player.init();
    })

})(window.player = window.player || {}, jQuery);
