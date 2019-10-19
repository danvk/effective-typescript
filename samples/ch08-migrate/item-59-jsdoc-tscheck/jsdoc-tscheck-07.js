// checkJs
// tsConfig: {"strictNullChecks":false,"allowJs":true,"noEmit":true}

// @ts-check
/**
 * Gets the size (in pixels) of an element.
 * @param {Node} el The element
 * @return {{w: number, h: number}} The size
 */
function getSize(el) {
  const bounds = el.getBoundingClientRect();
                 // ~~~~~~~~~~~~~~~~~~~~~ Property 'getBoundingClientRect'
                 //                       does not exist on type 'Node'
  return {width: bounds.width, height: bounds.height};
       // ~~~~~~~~~~~~~~~~~~~ Type '{ width: any; height: any; }' is not
       //                     assignable to type '{ w: number; h: number; }'
}
