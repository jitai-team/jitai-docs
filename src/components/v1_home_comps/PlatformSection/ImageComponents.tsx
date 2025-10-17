import React from 'react';
import globalStyles from '../../pages/v1_index.module.css';
import imageStyles from './image.module.css';

interface ImageComponentProps {
  imageKey: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageKey }) => {
  switch (imageKey) {
    case 'microkernel':
      return (
        <div className={`${imageStyles.image} ${imageStyles.microkernel}`}></div>
      );
    case 'interpreter':
      return (
        <div className={`${imageStyles.image} ${imageStyles.interpreter}`}>
          <div className={imageStyles.extraLine}></div>
        </div>
      );
    case 'containerMgmt':
      return (
        <div className={`${imageStyles.image} ${imageStyles.containerMgmt}`}></div>
      );
    case 'virtualization':
      return (
        <div className={`${imageStyles.image} ${imageStyles.virtualization}`}>
          <div className={imageStyles.vmLine}></div>
        </div>
      );
    case 'privatization':
      return (
        <div className={`${imageStyles.image} ${imageStyles.privatization}`}>
          <div className={imageStyles.lockBody}></div>
        </div>
      );
    case 'crossPlatform':
      return (
        <div className={`${imageStyles.image} ${imageStyles.crossPlatform}`}></div>
      );
    case 'fullstack':
      return (
        <div className={`${imageStyles.image} ${imageStyles.fullstack}`}>
          <div className={`${imageStyles.cornerDots} ${imageStyles.cornerDotsDot1}`}></div>
          <div className={`${imageStyles.cornerDots} ${imageStyles.cornerDotsDot2}`}></div>
          <div className={`${imageStyles.cornerDots} ${imageStyles.cornerDotsDot3}`}></div>
          <div className={`${imageStyles.cornerDots} ${imageStyles.cornerDotsDot4}`}></div>
        </div>
      );
    case 'distributed':
      return (
        <div className={`${imageStyles.image} ${imageStyles.distributed}`}>
          <div className={imageStyles.extraDot}></div>
          <div className={imageStyles.connectionLine1}></div>
          <div className={imageStyles.connectionLine2}></div>
          <div className={imageStyles.connectionLine3}></div>
        </div>
      );
    default:
      return <div className={`${imageStyles.image} 111`} />;
  }
};


export default ImageComponent;