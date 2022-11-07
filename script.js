const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

let output = document.getElementById("output");

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

// capture screenshot

let scaleFactor = 0.25;
let snapshots = [];

/**
 * Captures a image frame from the provided video element.
 *
 * @param {Video} video HTML5 video element from where the image frame will be captured.
 * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
 *
 * @return {Canvas}
 */
function capture(video, scaleFactor) {
  if (scaleFactor == null) {
    scaleFactor = 1;
  }
  let w = video.videoWidth * scaleFactor;
  let h = video.videoHeight * scaleFactor;

  let canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, w, h);
  return canvas;
}

function shoot() {
  let canvas = capture(video, scaleFactor);
  canvas.onclick = function () {
    window.open(this.toDataURL(image / jpg));
  };
  snapshots.unshift(canvas);
  output.innerHTML = "";
  for (let i = 0; i < 1000; i++) {
    output.appendChild(snapshots[i]);
  }
}

function picturesaved() {
  let captureit = document.getElementById("cit");
  captureit.click();
}

setInterval(function () {
  if (!video.paused) {
    shoot();
    picturesaved();
  }
}, 5000);
