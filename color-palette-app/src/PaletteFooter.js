import React from 'react'

function PaletteFooter(props) {
    const {paletteName, emoji} = props;
    return (
        <footer className="Palette-footer" >
            {paletteName}
            <span>{emoji}</span>
        </footer>
    )
}

export default PaletteFooter;