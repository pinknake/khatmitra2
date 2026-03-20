let app = loadData();

function render() {
  // Customers
  let cHTML = "";
  let selectHTML = "";

  app.customers.forEach(c => {
    cHTML += `
      <div class="customer">
        ${c.name} (${c.phone}) 
        <b>₹${c.balance}</b>
      </div>
    `;
    selectHTML += `<option value="${c.id}">${c.name}</option>`;
  });

  document.getElementById("customers").innerHTML = cHTML;
  document.getElementById("customerSelect").innerHTML = selectHTML;

  // Transactions
  let tHTML = "";

  app.transactions.slice().reverse().forEach(t => {
    const c = app.customers.find(x => x.id == t.customerId);

    tHTML += `
      <div class="customer">
        ${c.name} - ${t.type} ₹${t.amount}
        <span class="delete" onclick="deleteTransaction('${t.id}')">❌</span>
      </div>
    `;
  });

  document.getElementById("transactions").innerHTML = tHTML;

  saveData(app);
}

function addCustomer() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const gst = document.getElementById("gst").value;

  app.customers.push({
    id: Date.now(),
    name,
    phone,
    gst,
    balance: 0
  });

  render();
}

function addTransaction() {
  const id = document.getElementById("customerSelect").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  const customer = app.customers.find(c => c.id == id);

  if (type === "udhar") {
    customer.balance += amount;
  } else {
    customer.balance -= amount;
  }

  app.transactions.push({
    id: Date.now(),
    customerId: id,
    amount,
    type,
    date: formatDate()
  });

  render();
}

function deleteTransaction(id) {
  const t = app.transactions.find(x => x.id == id);
  const customer = app.customers.find(c => c.id == t.customerId);

  if (t.type === "udhar") {
    customer.balance -= t.amount;
  } else {
    customer.balance += t.amount;
  }

  app.transactions = app.transactions.filter(x => x.id != id);
  render();
}

render();
