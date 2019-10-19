const jackson5 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members = ['Janet', 'Michael'].map(
  who => jackson5.find(n => n === who)
);  // Type is (string | undefined)[]
