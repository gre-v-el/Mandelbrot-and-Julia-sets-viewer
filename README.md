# Mandelbrot and Julia Sets split-view explorer

Try it [here](https://gre-v-el.github.io/Mandelbrot-and-Julia-sets-viewer/).

## Features
* Controls:  

    |              Action              |            Description             |
    | :------------------------------: | :--------------------------------: |
    |             LMB drag             |             pan around             |
    | RMB click/drag on Mandelbrot set | choose the `c` value for Julia set |
    |              scroll              |                zoom                |

* Properties inspector:
  
    |          Value          |                                         Description                                          |
    | :---------------------: | :------------------------------------------------------------------------------------------: |
    |       Iterations        |     Changes the number of max iterations in rendering and hence the quality of the image     |
    | Julia Set Interpolation |      Interpolates the `c` value of Julia set between the chosen one and the pixel value      |
    |          Power          | Changes the original z<sup>2</sup>+c into z<sup>x</sup>+c (x can be fractional and negative) |

* Pickover stalk rendering.
* Rendering a high definition image to a file.


## Todo
* color picker in inspector
* double-single precision
* animation
* anti-aliasing


## Technologies
* html + js + css
* three.js
* glsl