export const handleHex = (colourHex: string) => {

    colourHex = (colourHex ?? '').replaceAll('#', '');

    if (colourHex.length > 6) {
        colourHex = colourHex.substring(0, 6);
    }

    let newColour = '';
    for (let colourIndex = 0; colourIndex < colourHex.length; colourIndex++) {
        const colourChar = colourHex[colourIndex];
        let re = new RegExp('[0-9a-fA-F]');
        if (re.test(colourChar)) {
            newColour += colourChar;
        }
    }

    return `#${newColour}`;
}