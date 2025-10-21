// Download page English constants configuration
export interface DownloadContent {
  title: string;
  subtitle: string;
  helpText: string;
  helpUrl: string;
  desktop: {
    windows: {
      title: string;
      description: string;
      downloadUrl: string;
      downloadText: string;
    };
    mac: {
      title: string;
      description: string;
      intelDownloadUrl: string;
      intelDownloadText: string;
      appleDownloadUrl: string;
      appleDownloadText: string;
      securityModal: {
        title: string;
        content: string;
        imageUrl: string;
        confirmText: string;
      };
    };
  };
  server: {
    docker: {
      title: string;
      description: string;
      globalCommand: string;
      chinaCommand: string;
      copyText: string;
      copySuccess: string;
      globalSegment: string;
      chinaSegment: string;
    };
  };
}

const CONTENT: DownloadContent = {
  title: 'Download',
  subtitle: 'Choose the installer that suits your system and get started quickly',
  helpText: 'Having installation issues? Click to learn more',
  helpUrl: '/docs/tutorial/download-installation',
  
  desktop: {
    windows: {
      title: 'Windows Installer',
      description: 'Supports Win10+, suitable for local development and debugging',
      downloadUrl: 'https://apk.jit.pro/latest/windows/jit.exe',
      downloadText: 'Download Now'
    },
    
    mac: {
      title: 'macOS Installer',
      description: 'Supports macOS 12.6.7+， suitable for local development and debugging',
      intelDownloadUrl: 'https://apk.jit.pro/latest/darwin/x64/jit.dmg',
      intelDownloadText: 'for Intel processor',
      appleDownloadUrl: 'https://apk.jit.pro/latest/darwin/arm/jit.dmg',
      appleDownloadText: 'for Apple silicon',
      securityModal: {
        title: 'macOS Security Notice',
        content: 'If macOS displays a security warning, click "Done", then navigate to System Settings → Privacy & Security → Security, set "Allow apps downloaded from" to "App Store and identified developers", and click "Open Anyway".',
        imageUrl: '/img/openanyway_en.gif',
        confirmText: 'Got it'
      }
    }
  },
  
  server: {
    docker: {
      title: 'Docker Image',
      description: 'Supports Linux\\Ubuntu\\CentOS etc., suitable for deployment on servers as test or production environment',
      globalCommand: 'docker run -itd --name jit -p 80:80 -p 3306:3306 --init --privileged -v /your/local/path:/data/JitNode jitaiplatform/jit',
      chinaCommand: 'docker run -itd --name jit -p 80:80 -p 3306:3306 --init --privileged -v /your/local/path:/data/JitNode registry.cn-hangzhou.aliyuncs.com/jitpro/jit',
      copyText: '📋 Copy',
      copySuccess: '✅ Copied',
      globalSegment: 'Global Mirror',
      chinaSegment: 'China Mirror'
    }
  }
};

export default CONTENT;