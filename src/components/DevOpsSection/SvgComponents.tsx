import React from 'react';

export const MultiEnvSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
      </linearGradient>
      <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.4 }} />
      </linearGradient>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.7 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.5 }} />
      </linearGradient>
      <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.6 }} />
      </linearGradient>
      <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="currentColor"/>
      </marker>
    </defs>
    <rect width="500" height="350" fill="#f7fafc" rx="12" stroke="#e2e8f0" strokeWidth="1"/>
    <g transform="translate(95, 90)">
      <rect x="-65" y="-40" width="130" height="80" fill="url(#successGradient)" opacity="0.9" rx="8" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
      </rect>
      <text x="0" y="-15" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">开发环境</text>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontFamily="system-ui, -apple-system, sans-serif">Development</text>
      <g transform="translate(0, 20)" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-8" y="-6" width="16" height="12" rx="2"/>
        <line x1="-6" y1="-2" x2="6" y2="-2"/>
        <line x1="-6" y1="1" x2="4" y2="1"/>
        <line x1="-6" y1="4" x2="6" y2="4"/>
      </g>
    </g>
    <g transform="translate(250, 90)">
      <rect x="-65" y="-40" width="130" height="80" fill="url(#warningGradient)" opacity="0.8" rx="8" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s"/>
      </rect>
      <text x="0" y="-15" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">测试环境</text>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontFamily="system-ui, -apple-system, sans-serif">Testing</text>
      <g transform="translate(0, 20)" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="0" r="8"/>
        <path d="M-3,-1 L1,3 L5,-3"/>
      </g>
    </g>
    <g transform="translate(405, 90)">
      <rect x="-65" y="-40" width="130" height="80" fill="url(#primaryGradient)" opacity="0.7" rx="8" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" begin="1s"/>
      </rect>
      <text x="0" y="-15" textAnchor="middle" fill="white" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">生产环境</text>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontFamily="system-ui, -apple-system, sans-serif">Production</text>
      <g transform="translate(0, 20)" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-8,-4 L8,-4 L8,4 L-8,4 Z"/>
        <line x1="-4" y1="-4" x2="-4" y2="4"/>
        <line x1="4" y1="-4" x2="4" y2="4"/>
      </g>
    </g>
    <rect x="30" y="150" width="440" height="180" fill="#f1f5f9" rx="8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="250" y="175" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">版本管理</text>
    <g transform="translate(90, 210)">
      <rect x="-40" y="-20" width="80" height="40" fill="url(#secondaryGradient)" opacity="0.9" rx="6" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
      </rect>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">v1.0.0</text>
    </g>
    <g transform="translate(190, 210)">
      <rect x="-40" y="-20" width="80" height="40" fill="url(#secondaryGradient)" opacity="0.9" rx="6" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="0.5s"/>
      </rect>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">v1.1.0</text>
    </g>
    <g transform="translate(290, 210)">
      <rect x="-40" y="-20" width="80" height="40" fill="url(#secondaryGradient)" opacity="0.9" rx="6" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="1s"/>
      </rect>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">v1.2.0</text>
    </g>
    <g transform="translate(390, 210)">
      <rect x="-40" y="-20" width="80" height="40" fill="url(#secondaryGradient)" opacity="0.9" rx="6" stroke="currentColor" strokeWidth="1">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" begin="1.5s"/>
      </rect>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">v2.0.0</text>
    </g>
    <g transform="translate(90, 265)">
      <rect x="-40" y="-15" width="80" height="30" fill="currentColor" opacity="0.8" rx="4"/>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">开发</text>
    </g>
    <g transform="translate(190, 265)">
      <rect x="-40" y="-15" width="80" height="30" fill="currentColor" opacity="0.8" rx="4"/>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">测试</text>
    </g>
    <g transform="translate(290, 265)">
      <rect x="-40" y="-15" width="80" height="30" fill="currentColor" opacity="0.8" rx="4"/>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">测试</text>
    </g>
    <g transform="translate(390, 265)">
      <rect x="-40" y="-15" width="80" height="30" fill="currentColor" opacity="0.8" rx="4"/>
      <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">生产</text>
    </g>
    <g stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#flowArrow)" opacity="0.6">
      <line x1="95" y1="130" x2="90" y2="190">
        <animate attributeName="stroke-dasharray" values="0,50;25,50" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="250" y1="130" x2="190" y2="190">
        <animate attributeName="stroke-dasharray" values="0,50;25,50" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </line>
      <line x1="250" y1="130" x2="290" y2="190">
        <animate attributeName="stroke-dasharray" values="0,50;25,50" dur="2s" repeatCount="indefinite" begin="1s"/>
      </line>
      <line x1="405" y1="130" x2="390" y2="190">
        <animate attributeName="stroke-dasharray" values="0,50;25,50" dur="2s" repeatCount="indefinite" begin="1.5s"/>
      </line>
    </g>
    <text x="250" y="310" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="system-ui, -apple-system, sans-serif">环境隔离 • 版本控制 • 配置管理</text>
  </svg>
);

export const DistributionSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* ...完整SVG内容同理填入... */}
  </svg>
);

export const VirtualizationSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* ...完整SVG内容同理填入... */}
  </svg>
);

export const ClusterSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="500" height="350" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* ...完整SVG内容同理填入... */}
  </svg>
);