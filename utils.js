function saveData(data) {
  localStorage.setItem("khata", JSON.stringify(data));
}

function loadData() {
  return JSON.parse(localStorage.getItem("khata")) || {
    customers: [],
    transactions: []
  };
}

function formatDate() {
  return new Date().toLocaleDateString();
}
