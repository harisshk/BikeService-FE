import React from "react";
import { Toolbar } from 'primereact/toolbar';

export default function ToolbarTab(props) {
    const { leftContents, rightContents } = props

    return (
        <div>
            <Toolbar left={leftContents} right={rightContents} />
        </div>
    );
}