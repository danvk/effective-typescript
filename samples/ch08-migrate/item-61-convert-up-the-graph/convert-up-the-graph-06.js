// checkJs
// tsConfig: {"noImplicitAny":false,"strictNullChecks":false,"allowJs":true,"noEmit":true}

// @ts-check
/**
 * @param {number} num
 */
function double(num) {
  return 2 * num;
}

double('trouble');
    // ~~~~~~~~~ Argument of type '"trouble"' is not assignable to
    //           parameter of type 'number'
