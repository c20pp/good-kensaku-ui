const ENDPOINT = "http://127.0.0.1:8080/api/filters";

const elements = document.getElementsByClassName("yuRUbf");

async function Do() {
  const urls = [];
  for (const element of elements) {
    const url = element.querySelector("a").getAttribute("href");
    urls.push(url);
  }

  const response = await fetch(ENDPOINT, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify({ urls: urls }) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  });
  const results = await response.json();

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const e = element.getElementsByClassName("LC20lb DKV0Md")[0];
    if (!e?.children[0]) {
      continue;
    }
    const badge = parseInt(results[i]) > 0.3 ? "👍" : "👎";
    e.children[0].innerHTML = e.innerHTML + " " + badge;
  }
}

Do();
