# SnapGel
Open-source rapid gel imaging in the browser, developed with support from Prof. Anderson at UC Berkeley. Optimized for GelGreen® nucleic acid dye.

# Getting Started

1. Put a blue filter over your phone flashlight for best results. The specifics don't matter, but ideally transparent enough for significant blue light to pass through. The better quality the filter, the better your images will turn out.

This was taken with blue plastic cut out of a $2.00 subject divider:

![picture of gel](https://i.imgur.com/HJXt4B3.png)

2. Go to https://jakebildy.github.io/SnapGel/ on your phone. Works best on Google Chrome using Android - for iOS use Safari, and make sure you've enabled 'Camera Permissions' in Settings. Some iOS versions don't work with 'getUserMedia'.

3. Put your phone over the gel and take a screenshot when the camera focuses.

4. That's it! 

# How it Works

SnapGel works by getting an image stream from a mobile device, and manipulating the pixels in such a way that the gel bands are rendered visible.

The algorithm works something like this:

1. Iterating through every pixel, convert the RGB values into HSL (Hue, Saturation, Lightness)
2. Scale the saturation by a factor of four
3. Reconvert into RGB
4. Set the B value to 0 (removing the illumination from the flashlight)
5. Remove flashlight glare
6. Multiply the G value by 0.5 to reduce the general blue-green let in by the filter (GelGreen emits
    enough yellow not to be affected)
7. Convert to black and white


# Future Optimization

• Select a better filter than a cut-out from a subject divider.

• Improve image optimization by reducing the contrast at the end result.

