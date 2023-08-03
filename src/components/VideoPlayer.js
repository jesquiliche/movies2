'use client'
import React, { useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoKey }) => {

  const opts = {
    height: '80%',
    width: '100%',
    playerVars: {
        modestbranding: 1,
      },

  };

  return (
    
      <YouTube videoId={videoKey} opts={opts} />
    
  );
};

export default VideoPlayer;
