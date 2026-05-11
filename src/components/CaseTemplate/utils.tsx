export type IconProps = {
    size?: number;
    className?: string;
};

export const IconWrapper = ({
    size = 24,
    className,
    children,
}: IconProps & { children?: any }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    );
};

const AquacultureIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1024"
        height="1024"
        viewBox="0 0 1024 1024"
    >
        <rect
            x="0"
            y="0"
            width="1024"
            height="1024"
            rx="256"
            ry="256"
            fill="#3C64FC"
        />
        <path
            d="M0 256C0 114.6 114.6 0 256 0H400L0 400V256Z"
            fill="#6C8AFD"
            opacity="0.6"
        />

        <g transform="translate(153.6, 153.6) scale(0.7)">
            <g
                stroke="#FFFFFF"
                stroke-width="32"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
            >
                <path d="M128 512C128 335.3 271.3 192 448 192S768 335.3 768 512c0 176.7-143.3 320-320 320S128 688.7 128 512z" />
                <path d="M768 512l128-128v256L768 512z" />
                <path d="M448 192c-48-48-80-112-80-112M448 832c-48 48-80 112-80 112" />

                <path d="M448 416c0 0-64 96 0 192 0 0 64-96 0-192zM448 608V416" />

                <path d="M960 512c0-247.4-200.6-448-448-448S64 264.6 64 512s200.6 448 448 448 448-200.6 448-448z" />
                <path d="M896 512l64-64 64 64" />
                <path d="M128 512l-64 64-64-64" />
            </g>
        </g>
    </svg>
);

const BankIcon = (props: IconProps) => (
    <IconWrapper {...props}>
        <path d="M3 22h18" />
        <path d="M6 18V10" />
        <path d="M10 18V10" />
        <path d="M14 18V10" />
        <path d="M18 18V10" />
        <path d="M4 10h16" />
        <path d="M12 2 2 7h20L12 2Z" />
    </IconWrapper>
);

const CompetitionIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
    >
        <rect
            x="0"
            y="0"
            width="512"
            height="512"
            rx="128"
            ry="128"
            fill="#3C64FC"
        />

        <g
            fill="none"
            stroke="#FFFFFF"
            stroke-width="24"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="translate(64, 64)"
        >
            <path d="M 120,360 H 336 A 24,24 0 0 0 360,336 V 74 A 24,24 0 0 0 336,50 H 48 A 24,24 0 0 0 24,74 V 200" />
            <path d="M 144,50 V 30 H 240 V 50" />
            <line x1="200" y1="150" x2="300" y2="150" />
            <line x1="200" y1="250" x2="300" y2="250" />

            <polyline points="230,200 270,240 330,160" />

            <g transform="translate(0, 200)">
                <path d="M 10,0 H 130 V 60 C 130,130 10,130 10,60 V 0 Z" />
                <line x1="70" y1="130" x2="70" y2="170" />
                <line x1="30" y1="170" x2="110" y2="170" />
            </g>
        </g>
    </svg>
);

const ForeignTradeIcon = () => (
    <svg
        width="512"
        height="512"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="0" y="0" width="100" height="100" rx="22" fill="#3C64FC" />

        <g
            fill="none"
            stroke="#FFFFFF"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M 24 62 A 28 28 0 1 1 76 62" />
            <path d="M 50 17 L 50 44" />
            <path d="M 50 17 Q 35 38 35 62" />
            <path d="M 50 17 Q 65 38 65 62" />
            <path d="M 27 32 Q 50 38 73 32" />
            <path d="M 23 48 Q 31 50 39 50" />
            <path d="M 61 50 Q 69 50 77 48" />

            <path d="M 16 62 L 24 78 L 76 78 L 84 62 L 16 62 Z" />

            <rect x="28" y="50" width="12" height="12" />
            <rect x="44" y="44" width="12" height="18" />
            <line x1="44" y1="53" x2="56" y2="53" />
            <rect x="60" y="50" width="12" height="12" />
        </g>
    </svg>
);

const ForensicIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
    >
        <rect
            x="0"
            y="0"
            width="200"
            height="200"
            rx="40"
            ry="40"
            fill="#3C64FC"
        />

        <g
            transform="translate(30, 30)"
            fill="none"
            stroke="#FFFFFF"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M30 20 C 30 14.477, 34.477 10, 40 10 L 100 10 C 105.523 10, 110 14.477, 110 20 L 110 120 C 110 125.523, 105.523 130, 100 130 L 40 130 C 34.477 130, 30 125.523, 30 120 L 30 20 Z" />
            <line x1="45" y1="40" x2="95" y2="40" />
            <line x1="45" y1="65" x2="95" y2="65" />
            <line x1="45" y1="90" x2="75" y2="90" />

            <path d="M80 95 L 100 115 L 140 75" />
        </g>
    </svg>
);

const WholesaleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1024"
        height="1024"
        viewBox="0 0 1024 1024"
    >
        <rect
            x="0"
            y="0"
            width="1024"
            height="1024"
            rx="256"
            ry="256"
            fill="#3C64FC"
        />
        <path
            d="M0 256C0 114.6 114.6 0 256 0H360L0 360V256Z"
            fill="#6C8AFD"
            opacity="0.8"
        />

        <g transform="translate(153.6, 153.6) scale(0.7)">
            <g
                stroke="#FFFFFF"
                stroke-width="32"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
            >
                <rect x="256" y="384" width="512" height="256" rx="32" />
                <rect x="256" y="128" width="512" height="256" rx="32" />
                <rect x="128" y="640" width="384" height="256" rx="32" />
                <rect x="512" y="640" width="384" height="256" rx="32" />

                <line x1="512" y1="128" x2="512" y2="384" />
                <line x1="320" y1="640" x2="320" y2="896" />
                <line x1="704" y1="640" x2="704" y2="896" />

                <path d="M768 128V64H576V128" />
                <path d="M832 64v192c0 0-16 16-32 0s-32 16-32 0-32 16-32 0V64h96z" />
                <line x1="736" y1="128" x2="800" y2="128" />
                <line x1="736" y1="192" x2="800" y2="192" />

                <path d="M128 384H64v192h64M64 480h192M256 432l48 48-48 48M896 384h64v192h-64M960 480H768M768 432l-48 48 48 48" />
                <path d="M384 896v64h256v-64" />
                <path d="M512 960v-64M464 848l48-48 48 48" />
            </g>
        </g>
    </svg>
);

const VehicleIcon = () => (
    <svg
        width="256"
        height="256"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="256" height="256" rx="64" fill="#3C64FC" />
        <g clip-path="url(#clip0_123_456)" transform="translate(24 24)">
            <path
                d="M164.571 100.571H43.4286C38.0651 100.571 33.4286 105.208 33.4286 110.571V159.429H43.4286C43.4286 164.952 47.9051 169.429 53.4286 169.429C58.9521 169.429 63.4286 164.952 63.4286 159.429H144.571C144.571 164.952 149.048 169.429 154.571 169.429C160.095 169.429 164.571 164.952 164.571 159.429H174.571V123.429L164.571 100.571Z"
                stroke="white"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M53.4286 169.429C47.9051 169.429 43.4286 164.952 43.4286 159.429C43.4286 153.905 47.9051 149.429 53.4286 149.429C58.9521 149.429 63.4286 153.905 63.4286 159.429C63.4286 164.952 58.9521 169.429 53.4286 169.429Z"
                stroke="white"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M154.571 169.429C149.048 169.429 144.571 164.952 144.571 159.429C144.571 153.905 149.048 149.429 154.571 149.429C160.095 149.429 164.571 153.905 164.571 159.429C164.571 164.952 160.095 169.429 154.571 169.429Z"
                stroke="white"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <rect
                x="53.4286"
                y="38.5714"
                width="101.143"
                height="52"
                rx="4"
                stroke="white"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M63.4286 74.5714L83.4286 54.5714L103.429 69.5714L123.429 49.5714L143.429 64.5714"
                stroke="white"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_123_456">
                <rect width="208" height="208" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const EquipmentIcon = () => (
    <svg
        width="1024"
        height="1024"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0"
            y="0"
            width="1024"
            height="1024"
            rx="220"
            ry="220"
            fill="#3C64FC"
        />
        <g
            transform="translate(153.6, 153.6)"
            fill="none"
            stroke="#FFFFFF"
            stroke-width="50"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <rect x="50" y="150" width="616.8" height="516.8" rx="50" ry="50" />
            <path d="M 180,150 V 50" />
            <path d="M 536.8,150 V 50" />
            <line x1="50" y1="280" x2="666.8" y2="280" />
            <line x1="180" y1="420" x2="300" y2="420" />
            <line x1="180" y1="520" x2="420" y2="520" />
        </g>
    </svg>
);

const WaterPowerIcon = () => (
    <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0"
            y="0"
            width="512"
            height="512"
            rx="102.4"
            ry="102.4"
            fill="#3C64FC"
        />
        <g
            fill="none"
            stroke="#FFFFFF"
            stroke-width="24"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M256 120 C 256 120, 144 248, 144 336 C 144 397.85, 194.15 448, 256 448 C 317.85 448, 368 397.85, 368 336 C 368 248, 256 120, 256 120 Z" />
            <path d="M272 200 L 208 296 L 264 296 L 232 392" />
        </g>
    </svg>
);

const ProjectHRIcon = () => (
    <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0"
            y="0"
            width="512"
            height="512"
            rx="110"
            ry="110"
            fill="#3C64FC"
        />

        <g
            stroke="#FFFFFF"
            stroke-width="32"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="165" cy="190" r="60" />
            <path d="M 80 360 C 80 250, 250 250, 250 360" />

            <g fill="#3C64FC">
                <circle cx="310" cy="220" r="70" stroke="none" />
                <path d="M 200 400 C 200 280, 420 280, 420 400" stroke="none" />
            </g>
            <circle cx="310" cy="220" r="70" />
            <path d="M 200 400 C 200 280, 420 280, 420 400" />
        </g>
    </svg>
);

const ProjectTaskIcon = () => (
    <svg
        width="512"
        height="512"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="0" y="0" width="100" height="100" rx="22" fill="#3C64FC" />

        <g
            stroke="#FFFFFF"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
        >
            <circle cx="50" cy="50" r="28" />

            <polyline points="36 50 47 61 66 39" />
        </g>
    </svg>
);

export const caseLogoMap = {
    "aquaculture-prepared-food-end-to-end": <AquacultureIcon />,
    "bank-customer-lifecycle-management": <BankIcon />,
    "competition-registration-event-management": <CompetitionIcon />,
    "foreign-trade-end-to-end-ops-standard": <ForeignTradeIcon />,
    "forensic-material-lifecycle-compliance": <ForensicIcon />,
    "wholesale-erp-membership-transport-recon": <WholesaleIcon />,
    "vehicle-media-operations-monitoring": <VehicleIcon />,
    "equipment-rental-operations-management": <EquipmentIcon />,
    "water-power-project-lifecycle-management": <WaterPowerIcon />,
    "project-based-hr-end-to-end-settlement": <ProjectHRIcon />,
    "project-task-timesheet-collaboration": <ProjectTaskIcon />,
};
