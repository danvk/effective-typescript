class Diary {
  private secret = 'cheated on my English test';
}

const diary = new Diary();
diary.secret
   // ~~~~~~ Property 'secret' is private and only
   //        accessible within class 'Diary'
