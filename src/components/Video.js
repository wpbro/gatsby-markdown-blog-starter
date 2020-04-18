import React from "react";

const Video = ({ videoSrcURL, videoTitle }) =>
  videoSrcURL && (
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      width="760"
      height="428"
    />
  );
export default Video;
