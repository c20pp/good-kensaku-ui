const el = document.querySelector("#rso");

for (const child of el.children) {
  const e = child.getElementsByClassName("LC20lb DKV0Md")[0];
  if (!e?.children[0]) {
    continue;
  }
  const badge = Math.random() > 0.3 ? "👍" : "👎";
  e.children[0].innerHTML = e.innerHTML + " " + badge;
}
