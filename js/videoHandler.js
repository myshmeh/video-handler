const bgColor = '#fee';
const trName = 'tr-main';
const videoSectionDOM = "<div class=\"row\"> <video width=\"\" height=\"\" index=\"-1\" controls> <source src=\"\" type=\"video/mp4\"> </video> </div><div class=\"row\"> <button class=\"col-6 btn btn-warning\" onclick=\"video.playPrevious()\">previous</button> <button class=\"col-6 btn btn-info\" onclick=\"video.playNext()\">next</button> </div><table class=\"table table-hover\"> <thead> <tr> <th scope=\"col\">#</th> <th scope=\"col\">Table of Contents</th> </tr></thead> <tbody></tbody> </table>";
class VideoHandler{
    constructor(videoWrapperId, playlist){
        this.videoWrapperId = videoWrapperId;
        this.playlist = playlist;
        this.trClassName = '';

        // init video section dom
        document.getElementById(this.videoWrapperId).innerHTML = videoSectionDOM;

        // init video object
        this.video = document.getElementById(this.videoWrapperId).getElementsByTagName("video")[0];
        this.changeTo(0, false);
        this.video.setAttribute("width", this.video.parentElement.offsetWidth);
        this.video.setAttribute("height", (this.video.parentElement.offsetWidth/16)*9);
        let vhandler = this;
        this.video.onended = function(){
            vhandler.playNext();
        }

        // init playlist object 
        this.tocBody = document.getElementById(this.videoWrapperId).getElementsByTagName("tbody")[0];
        this.tocBody.innerHTML = this.generateToc(this.playlist);
        this.applyOnclickToToc(this.tocBody.children);

        let tocBodyTmp = this.tocBody;
        // track the current chapter to hover bg-color
        this.video.ontimeupdate = function(){
            // find the current chapter
            let onSpotIndex = -1;
            for(let i=playlist.length-1; i>=0; i--){
                if(this.children[0].getAttribute("src") == playlist[i].videoPath){
                    let onSpot = this.currentTime >= playlist[i].startTime;
                    if(onSpot){
                        onSpotIndex = i;
                        break;
                    }
                }
            }

            // init toc bg-color
            let tocTrs = tocBodyTmp.getElementsByClassName(trName);
            for(let i=0; i<tocTrs.length; i++){
                tocTrs[i].setAttribute("style", "");
            }
            // hightlight the current chapter
            if(onSpotIndex != -1){
                tocBodyTmp.getElementsByClassName(trName)[onSpotIndex].setAttribute("style", "background-color: "+bgColor+";");
                this.setAttribute("index", onSpotIndex);
            }
        }
    }

    generateToc(playlist_){
        let result = "";
        for(let i=0; i<playlist_.length; i++){
            result += 
                    "<tr class=\""+trName+"\" >"+
                        "<th scope=\"row\">"+playlist_[i].index+"</th>"+
                    "<td>"+playlist_[i].title+"</td></tr>";
        }

        return result;
    }

    applyOnclickToToc(toc){
        let changeToTmp = this.changeToUsingParametersAF;
        let video = this.video;
        let playlist_ = this.playlist;
        for(let i=0; i<toc.length; i++){
            toc[i].onclick = function(){changeToTmp(i, video, playlist_);};
            console.log(toc[i]);
        }
    }
    
    playNext(){
        let v = this.video;
        let index = this.playlist.findIndex(function(e, i){
            let c = v.children[0];
            let playlistIndex = v.getAttribute("index");
            return (e.videoPath == c.getAttribute("src")) && (i == playlistIndex);
        });

        //exception handling
        if(index < 0) return false;
        
        index = (index == this.playlist.length-1) ? -1 : index+1;
        if(index > 0){
            this.changeTo(index);
        }
    }

    playPrevious(){
        let v = this.video;
        let playlistIndex = v.getAttribute("index");
        let index = this.playlist.findIndex(function(e, i){
            let c = v.children[0];
            return (e.videoPath == c.getAttribute("src")) && (i == playlistIndex);
        });

        //exception handling
        if(index < 0) return false;
        
        index = (index == 0) ? -1 : index-1;
        if(index >= 0){
            this.changeTo(index);
        }
    }

    changeTo(playlistIndex, autoplay=true){
        this.video.setAttribute("index", playlistIndex);
        this.video.children[0].src = this.playlist[playlistIndex].videoPath;
        this.video.load();
        this.video.currentTime = this.playlist[playlistIndex].startTime;

        if(!autoplay) return;
        this.video.oncanplay = function () {
            this.play();
        };
    }

    changeToUsingParametersAF(playlistIndex, video, playlist_, autoplay=true){
        video.setAttribute("index", playlistIndex);
        video.children[0].src = playlist_[playlistIndex].videoPath;
        video.load();
        video.currentTime = playlist_[playlistIndex].startTime;

        if(!autoplay) return;
        video.oncanplay = function () {
            this.play();
        };
    }
}