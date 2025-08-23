import React from 'react';

const BASE_URL = 'https://jit-www.oss-cn-beijing.aliyuncs.com';

interface VideoPlayerProps {
  relatePath?: string;
  url?: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
  className?: string;
  type?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  relatePath,
  url,
  width = '100%',
  height = 'auto',
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  poster,
  className = '',
  type = 'video/mp4',
}) => {
  const videoUrl = relatePath ? `${BASE_URL}${relatePath}` : url;
  return (
    <div className={`video-player ${className}`} style={{ width, height }}>
      <video
        src={videoUrl}
        type={type}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        poster={poster}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          maxWidth: '100%',
        }}
      >
        您的浏览器不支持 video 标签。
      </video>
    </div>
  );
};

export default VideoPlayer;