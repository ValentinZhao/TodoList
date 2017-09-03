var reverseVowels = function(s) {
  if (!s) return null;
  let alpha = 'aeiou';
  let o_arr = s.split('');
  let temp = [];
  let res_arr = o_arr.map((v) => {
     if (alpha.indexOf(v) !== -1) {
       temp.push(v);
       return -1;
     } 
  });
  temp = temp.reverse();
  let fin_res_arr = res_arr.map((v, i) => {
    if (v === -1) {
      
    }
  });
};