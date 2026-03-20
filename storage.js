function save(data){
  localStorage.setItem("khata", JSON.stringify(data));
}

function load(){
  return JSON.parse(localStorage.getItem("khata")) || {
    customers: [],
    transactions: [],
    lang: 'hi',
    dark: false
  };
}
