// macOS Security Modal Component English Constants Configuration
export interface MacSecurityContent {
  title: string;
  content: string;
  imageUrl: string;
}

const CONTENT: MacSecurityContent = {
  title: 'macOS Security Notice',
  content: 'If macOS displays a security warning, click "Done", then navigate to System Settings → Privacy & Security → Security, set "Allow apps downloaded from" to "App Store and identified developers", and click "Open Anyway".',
  imageUrl: '/img/openanyway_en.gif'
};

export default CONTENT;
