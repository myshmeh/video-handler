# VideoHandler.js :tv:
VideoHandler.js lets you create a video player with table of contents easily.

# Installation Guide :beer:
## CSS Dependency
please paste the following tag to include Bootstrap4 for a better visualization.
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
```
## JS Dependency
please include ```videoHandler.js``` on this repository like below.
```html
<script src="PATH/TO/videoHandler.js"></script>
```

# Create video player :sunglasses:
There is a sample html file on this repository (```index.html```), so refer it where necessary.
## Step1. create a div tag with id attribute
id name is totally up to you (but must be unique).<br>
using ```container``` or ```col-*``` class is strongly recommended (this defines the size of the player).<br>
video player will be generated inside the div tag.
```html
<div id="video-wrapper" class="container"></div>
```
or
```html
<div id="video-wrapper" class="col-6"></div> <!-- col-(between 1-12) -->
```

## Step2. create a table of contents (or playlist)
inside ```script``` tag, create an array of playlist objects as follows.
```javascript
const playlist_name = [
    {
        videoPath: 'PATH/TO/video.mp4', //file path to the video
        startTime: 20, //time(sec.) of the video to play
        index: '1', //index of the content
        title: 'Introduction' //title of the content
    },
];
```

## Step3. instantiate VideoHandler class
pass the id name of the div tag in Step2 and the playlist in Step3 as parameters of VideoHandler constructor.
```javascript
let video = new VideoHandler('video-wrapper', playlist_name);
```
now you should see the video player with TOC on your page :beers: