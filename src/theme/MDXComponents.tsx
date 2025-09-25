import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import LazyImage from '@site/src/components/LazyImage';
import MDXLazyImage from '@site/src/components/MDXLazyImage';

export default {
  ...MDXComponents,
  img: (props: any) => <MDXLazyImage {...props} />,
  LazyImage,
  MDXLazyImage,
};
