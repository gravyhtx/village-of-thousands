import BlockiesIdenticon from "./BlockiesIdenticon";

const Blockie = ( email, wallet, colors ) => {
    const color0 = colors[0];
    const color1 = colors[1];
    const color2 = colors[2];
    return (
        <BlockiesIdenticon
            className="blockie-nav"
            opts={{
                seed: email?wallet:"Claire Richard",
                color: color0,
                bgcolor: color1,
                size: 9,
                scale: 7,
                spotcolor: color2
        }}/>
    )
}

export default Blockie;