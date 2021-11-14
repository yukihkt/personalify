// // const Choreographer = require('choreographer-js')
// var script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = '/npm/node_modules/choreographer-js/dist/choreographer.min.js';
//     document.body.appendChild(script);

var h = window.innerHeight
var fin = h * 3
var choreographer = new Choreographer({
    animations: [
      // {
      //   range: [-1, h * 2],
      //   selector: '#box',
      //   type: 'scale',
      //   style: 'opacity',
      //   from: 0,
      //   to: 1
      // },
      
      // These are the animations to rotate the letters:
      { 
        range: [h, h * 2], 
        selector: ['.p','.e','.r','.s','.o','.n','.a','.l','.i','.f','.y'], 
        type: 'change', 
        style: 'color', 
        to: '#56BD66' 
      },
      { 
        range: [-1, h], 
        selectors: ['.p', '.r', '.o', '.a', '.i', '.f'], 
        type: 'scale', 
        style: 'transform:rotateX', 
        from: 180, 
        to: 90, 
        unit: 'deg' 
      },
      { 
        range: [h, h * 2], 
        selectors: ['.p', '.r', '.o', '.a', '.i', '.f'], 
        type: 'scale', 
        style: 'transform:rotateX', 
        from: 90, 
        to: 0, 
        unit: 'deg' 
      },
      { 
        range: [-1, h], 
        selectors: ['.e', '.s', '.n', '.l', '.y'], 
        type: 'scale', 
        style: 'transform:rotateZ', 
        from: -180, 
        to: -90, 
        unit: 'deg' 
      },
      { 
        range: [h, h * 2], 
        selectors: ['.e', '.s', '.n', '.l', '.y'], 
        type: 'scale', 
        style: 'transform:rotateZ', 
        from: -90, 
        to: 0, 
        unit: 'deg' 
      },

      // Hide the "scroll down" letters after users scroll down
      { 
        range: [h/4, h * 3], 
        selector: '.scroll-down', 
        type: 'change', 
        style: 'visibility',
        to: 'hidden'
      },

      // Make link appear at the end of the page
      // NOT DONE: to add some smooth animation here in future
      { 
        range: [h * 2, h * 3], 
        selector: 'a', 
        type: 'change', 
        style: 'visibility',
        to: 'visible'
      },

      // Make logo glow at the end of the page
      { 
        range: [h * 2, h * 3], 
        selector: 'logo', 
        type: 'change', 
        style: 'text-shadow',
        to: 'text-shadow: 0 0 20px darkgreen'
      }

    ]
})



window.addEventListener('scroll', function() {
    choreographer.runAnimationsAt(window.pageYOffset)
})