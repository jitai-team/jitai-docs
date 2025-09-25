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
    };
  };
  server: {
    docker: {
      title: string;
      description: string;
      command: string;
      copyText: string;
      copySuccess: string;
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
      intelDownloadText: 'Intel Chip Version',
      appleDownloadUrl: 'https://apk.jit.pro/latest/darwin/arm/jit.dmg',
      appleDownloadText: 'Apple Chip Version'
    }
  },
  
  server: {
    docker: {
      title: 'Docker Image',
      description: 'Supports Linux\\Ubuntu\\CentOS etc., suitable for deployment on servers as test or production environment',
      command: 'docker run -itd --name jit -p 80:80 -p 3306:3306 --init --privileged -v /your/local/path:/data/JitNode jitaiplatform/jit',
      copyText: '📋 Copy',
      copySuccess: '✅ Copied'
    }
  }
};

export default CONTENT;