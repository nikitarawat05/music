console.log("Welcome to Spotify");

//intialize the variables
let songIndex=0;
let audioElement=new Audio('song1.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let mastersongname=document.getElementById('mastersongname');
let songitem=Array.from(document.getElementsByClassName('songitem'));

let songs=[
    {songname:"shinchan",filepath: "soong1.mp3",coverpath:"cover.jpg"},
    {songname:"subhanallah",filepath: "song2.mp3",coverpath:"coverpage2.jpg"},
    {songname:"lutt putt gaya",filepath: "song3.mp3",coverpath:"coverpage3.jpg"},
    {songname:"doreamon",filepath: "song4.mp3",coverpath:"cover4.jpg"},
    {songname:"ram ayenge",filepath: "song5.mp3",coverpath:"cover5.jpg"},
]

//for coverpage and songname at web page 
songitem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songname;
});

//audioElement.play();

//handle play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    }
    else{
    audioElement.pause();
    masterplay.classList.remove('fa-circle-pause');
    masterplay.classList.add('fa-circle-play');
    gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    // update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value *audioElement.duration/100;
})

const makeallplays=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`song${songIndex}.mp3`;
        mastersongname.innerText=songs[songIndex-1].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=0;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`song${songIndex}.mp3`;
    mastersongname.innerText=songs[songIndex-1].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=1){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`song${songIndex}.mp3`;
    mastersongname.innerText=songs[songIndex-1].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})