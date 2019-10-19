// tsConfig: {"noImplicitAny":false,"strictNullChecks":false,"allowJs":true,"noEmit":true}

function double(num: number) {
  return 2 * num;
}

double('trouble');
    // ~~~~~~~~~ Argument of type '"trouble"' is not assignable to
    //           parameter of type 'number'
