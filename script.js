let data = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("civil_fil_ext.json")
    .then(response => response.json())
    .then(json => {
      data = json;
      currentIndex = Math.floor(Math.random() * data.length);
      showJapanese();
      setButtonLabel("解答表示");
    })
    .catch(error => {
      console.error("JSON読み込み失敗:", error);
    });

  const displayButton = document.getElementById("displayButton");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const firstButton = document.getElementById("firstButton");
  const lastButton = document.getElementById("lastButton");

  displayButton.addEventListener("click", () => {
    const output = document.getElementById("output");
    if (displayButton.innerText === "解答表示") {
      const en = document.createElement("div");
      en.className = "english";
      en.textContent = data[currentIndex]["解答"];
      output.appendChild(en);
      setButtonLabel("問題表示");
    } else {
      // ランダムな別の問題に切り替える
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * data.length);
      } while (newIndex === currentIndex && data.length > 1);
      currentIndex = newIndex;
      showJapanese();
      setButtonLabel("解答表示");
    }
  });

  prevButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    showJapanese();
    setButtonLabel("解答表示");
  });

  nextButton.addEventListener("click", () => {
    currentIndex = Math.min(data.length - 1, currentIndex + 1);
    showJapanese();
    setButtonLabel("解答表示");
  });

  firstButton.addEventListener("click", () => {
    currentIndex = 0;
    showJapanese();
    setButtonLabel("解答表示");
  });

  lastButton.addEventListener("click", () => {
    currentIndex = data.length - 1;
    showJapanese();
    setButtonLabel("解答表示");
  });

  function showJapanese() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (!data.length) {
      output.textContent = "データが読み込まれていません。";
      return;
    }

    const jp = document.createElement("div");
    jp.className = "japanese";
    jp.textContent = data[currentIndex]["問題"];
    output.appendChild(jp);
  }

  function setButtonLabel(text) {
    displayButton.innerText = text;
  }
});
