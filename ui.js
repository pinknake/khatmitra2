function toggleDark(){
  document.body.classList.toggle("dark");
  app.dark = !app.dark;
  save(app);
}

function setLang(l){
  app.lang = l;
  save(app);
  alert("Language changed");
}
