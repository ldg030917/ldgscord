import React from "react";
import { HiWrenchScrewdriver } from "react-icons/hi2";

function WIP({ size = 12 }) {
    const style = {
        color: 'purple',
        fontSize: `${size}px`
    };

    return (
        <HiWrenchScrewdriver style={style}/>
    )
};

export default WIP;