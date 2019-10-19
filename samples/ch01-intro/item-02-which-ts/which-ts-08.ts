// tsConfig: {"noImplicitAny":true,"strictNullChecks":true}

   const el = document.getElementById('status');
   el.textContent = 'Ready';
// ~~ Object is possibly 'null'

   if (el) {
     el.textContent = 'Ready';  // OK, null has been excluded
   }
   el!.textContent = 'Ready';  // OK, we've asserted that el is non-null
