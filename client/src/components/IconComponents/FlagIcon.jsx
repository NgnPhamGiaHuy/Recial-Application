const FlagIcon = ({ width = 24, height = 24, fill = "currentColor", stroke = "none", strokeWidth = 1.5 }) => {
    return (
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" stroke={stroke}
                 strokeWidth={strokeWidth} width={width} height={height}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
            </svg>
        </i>
    );
};

export default FlagIcon;