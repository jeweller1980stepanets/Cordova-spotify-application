/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        var options={
            scope:[]

        };
        document.getElementById('log').addEventListener('click',function(){Spotify.login(options);});
        document.getElementById('play').addEventListener('click',function(){Spotify.play("spotify:track:3qRNQHagYiiDLdWMSOkPGG");});
        document.getElementById('pause').addEventListener('click',function(){Spotify.pause();});
        document.getElementById('resume').addEventListener('click',function(){Spotify.resume();});

        document.getElementById('next').addEventListener('click',function(){Spotify.next();});
        document.getElementById('prev').addEventListener('click',function(){Spotify.prev();});
        document.getElementById('album').addEventListener('click',function(){Spotify.playAlbum("spotify:album:75Sgdm3seM5KXkEd46vaDb");});
        document.getElementById('playlist').addEventListener('click',function(){Spotify.playPlayList("spotify:user:spotify:playlist:2yLXxKhhziG2xzy7eyD4TD");});
        document.getElementById('logout').addEventListener('click',function(){Spotify.logout();});


        document.getElementById('slider_seek').addEventListener('click',function(e){
                        var valX = (e.offsetX)*100/220;
                                               Spotify.seek(valX)});
        //slider_volume
        document.getElementById('slider_volume').addEventListener('click',function(e){
                        var valX = (e.offsetX)*100/220;
                                               Spotify.setVolume(valX)});
        Spotify.Events.kSpPlaybackNotifyMetadataChanged = function(args){
            document.getElementById('cur_track').innerHTML = args[0];
            document.getElementById('artist').innerHTML = args[1];
            document.getElementById('_album').innerHTML = args[2];
            document.getElementById('duration').innerHTML = args[3];

        };
        Spotify.Events.kSpPlaybackNotifyPrev = function(arg){document.getElementById('action').innerHTML = arg[0];};
        Spotify.Events.kSpPlaybackNotifyNext = function(arg){document.getElementById('action').innerHTML = arg[0];};
        Spotify.Events.kSpPlaybackNotifyPause = function(arg){document.getElementById('action').innerHTML = arg[0];};
        Spotify.Events.kSpPlaybackNotifyPlay = function(arg){document.getElementById('action').innerHTML = arg[0];};
        Spotify.Events.kSpPlaybackEventAudioFlush = function(arg){document.getElementById('seek').innerHTML = arg[0];};
        Spotify.Events.kSpPlaybackNotifyTrackChanged = function(arg){document.getElementById('action').innerHTML = arg[0];};

    }
};

app.initialize();