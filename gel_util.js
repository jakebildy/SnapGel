/**
 * @author Jake Bildy
 *
 * gel_util.js contains the helper functions for gel imaging.
 */


/**
 * @param data
 * @returns data with inverted colors
 */
function invert(data) {
    for (var i = 0, l = data.length; i < l; i += 4) {

        data[i] = 255 - data[i];        // r
        data[i+1] = 255 - data[i + 1];  // g
        data[i + 2] = 255- data[i + 2]; // b
    }
    return data;
}



/**
 * @param dataOld
 * @param dataNew
 *
 * This function returns the normalized linear correlation of two sets of RGB data.
 *
 * By treating the RGB value as a vector, you can ignore the effect of brightness - think of the brightness as scaling
 * a vector along its span.
 */
function corr(dataOld, dataNew) {

    var corr = [];
    var maxVal = 0;

    for (var i = 0, l = dataNew.length; i < l; i += 4) {

        var corrVal = (dataOld[i] - dataNew[i])**2 + (dataOld[i+1] - dataNew[i+1])**2 +(dataOld[i+2] - dataNew[i+2])**2;

        if (maxVal < corrVal) {
            maxVal = corrVal;
        }

        corr.push(corrVal);
    }

    for (var i = 0; i < corr.length; i++) {
        corr[i] = corr[i]/maxVal;
    }

    return corr;
}

/**
 * This function scales an RGB value by a scalar (the effect changes brightness). Pass in the R value of the RGB
 */
function scale(data, i, scalar) {

    data[i] = Math.floor(data[i] * scalar);
    data[i+1] = Math.floor(data[i+1] * scalar);
    data[i+2] = Math.floor(data[i+2] * scalar);

    if (data[i] > 255) {
        data[i] = 255;
    }
    if (data[i+1] > 255) {
        data[i+1] = 255;
    }
    if (data[i+2] > 255) {
        data[i+2] = 255;
    }

    return data;
}

/**
 * Returns a value as the brightness
 */
function brightness(data, i) {
    return (data[i] + data[i+1] + data[i+2])/3;
}


/**
 * This function converts the regular camera view to an intensity view
 */
function renderIntensity(data) {

}

function RGBtoHSV(r, g, b) {

}

RGBtoHSV= function(r, g, b) {
    var h,s,v;

    min = Math.min( r, g, b );
    max = Math.max( r, g, b );


    v = max;
    delta = max - min;
    if( max != 0 )
        s = delta / max;        // s
    else {
        // r = g = b = 0        // s = 0, v is undefined
        s = 0;
        h = -1;
        return [h, s, undefined];
    }
    if( r === max )
        h = ( g - b ) / delta;      // between yellow & magenta
    else if( g === max )
        h = 2 + ( b - r ) / delta;  // between cyan & yellow
    else
        h = 4 + ( r - g ) / delta;  // between magenta & cyan
    h *= 60;                // degrees
    if( h < 0 )
        h += 360;
    if ( isNaN(h) )
        h = 0;
    return [h,s,v];
};

HSVtoRGB= function(color) {
    var i;
    var h,s,v,r,g,b;
    h= color[0];
    s= color[1];
    v= color[2];
    if(s === 0 ) {
        // achromatic (grey)
        r = g = b = v;
        return [r,g,b];
    }
    h /= 60;            // sector 0 to 5
    i = Math.floor( h );
    f = h - i;          // factorial part of h
    p = v * ( 1 - s );
    q = v * ( 1 - s * f );
    t = v * ( 1 - s * ( 1 - f ) );
    switch( i ) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r,g,b];
};
