json-youtube-player
===================

A simple JSON driven youtube player that can play videos via channel or custom data.

![ScreenShot](http://i.imgur.com/WRgg7Fd.jpg?1)

Setup
===================

######1. Include jQuery.
######2. Include ```json-player.js```
######3. Use the sample HTML snippet: 

```HTML
<div id="left_column">
	<div id="player_wrap"></div>
		<div id="meta">
			<div id="title">
					<h2></h2>
			</div>
			<div id="desc"></div>
		</div>
	</div>
	<aside>
		<ul id="videos"></ul>
	</aside>
</div>
```
###### 4. Style according to your needs or use ```style.css```
###### 5. Edit ```json-player.js``` to config the player. Such as ```channel``` and ```numberOfVideos``` etc.

```JS
player.config = {
        "channel"           : "your_channel_name",
        "numberOfVideos"    : 6, 
        "videoWidth"        : 560,
        "videoHeight"       : 315,
        "playerElement"     : "#player_wrap",
        "videoListElement"  : "ul#videos"
};
```

This is a work in progress
===================

New features are in pipeline. You are most welcome to add any.


License
===================
JSON Youtube Player is Licensed under MIT.

Author
===================
Santhosh S
