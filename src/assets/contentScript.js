const ENDPOINT = "http://127.0.0.1:8080/api/filters";

const elements = document.getElementsByClassName("yuRUbf");

async function postFilters(urls) {
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
  return response.json();
}

function addBadge(element, badge) {
  const e = element.getElementsByClassName("LC20lb DKV0Md")[0];
  if (!e?.children[0]) {
    return;
  }
  e.children[0].innerHTML = badge + e.innerHTML;
}

function deleteBadge(element) {
  const e = element.getElementsByClassName("LC20lb DKV0Md")[0];
  if (!e?.children[0]) {
    return;
  }
  e.children[0].innerHTML = e.innerHTML.slice(8); // <span>🤔
}

Promise.all(
  Array.prototype.map.call(elements, async element => {
    addBadge(element, "🤔");
    const url = element.querySelector("a").getAttribute("href");
    const res = await postFilters([url]);

    const badge = parseInt(res[0]) > 0.3 ? "✅" : "❌";
    deleteBadge(element);
    addBadge(element, badge);
  })
);
