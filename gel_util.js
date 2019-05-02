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
function scale(r_val, i, scalar) {

    data[i] = data[i] * scalar;
    data[i+1] = data[i+1] * scalar;
    data[i+3] = data[i+2] * scalar

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
