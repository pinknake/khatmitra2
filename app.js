let app = load();

function render(){

  // CUSTOMER LIST
  let cHTML = "";
  let select = "";

  app.customers.forEach(c=>{
    cHTML += `
    <div class="item">
      ${c.name} (${c.type})
      <br>📍 ${c.city}
      <b>₹${c.balance}</b>
    </div>`;
    select += `<option value="${c.id}">${c.name}</option>`;
  });

  document.getElementById("customerList").innerHTML = cHTML;
  document.getElementById("t_customer").innerHTML = select;

  // HISTORY
  let h = "";

  app.transactions.slice().reverse().forEach(t=>{
    let c = app.customers.find(x=>x.id==t.customerId);

    h += `
    <div class="item">
      ${c.name} - ${t.type} ₹${t.amount}
      <br>${t.item} | ${t.date}
      <span class="delete" onclick="del('${t.id}')">❌</span>
    </div>`;
  });

  document.getElementById("history").innerHTML = h;

  save(app);
  drawChart();
}

function addCustomer(){
  app.customers.push({
    id: Date.now(),
    name: c_name.value,
    phone: c_phone.value,
    gst: c_gst.value,
    type: c_type.value,
    city: c_city.value,
    state: c_state.value,
    pin: c_pin.value,
    address: c_address.value,
    balance: 0
  });
  render();
}

function addTransaction(){

  let id = t_customer.value;
  let amt = parseFloat(t_amount.value);
  let type = t_type.value;

  let c = app.customers.find(x=>x.id==id);

  if(type=="udhar") c.balance += amt;
  else c.balance -= amt;

  app.transactions.push({
    id: Date.now(),
    customerId: id,
    amount: amt,
    type,
    item: t_item.value,
    date: t_date.value
  });

  render();
}

function del(id){
  let t = app.transactions.find(x=>x.id==id);
  let c = app.customers.find(x=>x.id==t.customerId);

  if(t.type=="udhar") c.balance -= t.amount;
  else c.balance += t.amount;

  app.transactions = app.transactions.filter(x=>x.id!=id);
  render();
}

function drawChart(){
  let ctx = document.getElementById("chart");

  let udhar=0, jama=0;

  app.transactions.forEach(t=>{
    if(t.type=="udhar") udhar+=t.amount;
    else jama+=t.amount;
  });

  new Chart(ctx,{
    type:'bar',
    data:{
      labels:['Udhar','Jama'],
      datasets:[{data:[udhar,jama]}]
    }
  });
}

render();
