const solve = document.querySelector(".avgSpeed__button");
const result = document.querySelector(".avgSpeed__result");
const fields = document.querySelectorAll(".input__field");
const form = document.querySelector(".input__wrapper");

function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

let v1, v2, d1, d2;

function parseStringToNomDem(x) {
  let nominator = parseInt(x.substr(0, x.indexOf("/")));
  let denominator = parseInt(x.substr(x.indexOf("/") + 1));
  return [nominator, denominator];
}

function countT() {
  let nominator = parseStringToNomDem(d1)[1] * v1 * v2;
  let denominator =
    parseStringToNomDem(d1)[0] * v2 +
    (parseStringToNomDem(d1)[1] - parseStringToNomDem(d1)[0]) * v1;
  return [nominator, denominator];
}

function NWD(a, b) {
  console.log(a, b);
  while (b) {
    c = a % b;
    a = b;
    b = c;
  }
  console.log("nwd" + a);
  return a;
}

function simplify(fraction) {
  // console.log("licznik:" + fraction[0] + " || " + "mianownik:" + fraction[1]);
  // console.log("wynik:" + (((fraction[0] / fraction[1]) * 10) % 10));
  let a = Math.round(fraction[0] * 1000);
  let b = Math.round(fraction[1] * 1000);
  let nwd = NWD(a, b);
  if (((a / b) * 10) % 10 == 0)
    return `<div class="result__solution">${a / b}
            <span class="result__unit">km/h</span>
          </div>
  `;
  else
    return `
    <div class="result__fraction">
            <div class="result__nominator">${a / nwd}</div>
            <div class="result__denominator">${b / nwd}</div>
          </div>
          <div class="result__solution">&nbsp;=&nbsp;${
            Math.round((a / b) * 1000) / 1000
          }
            <span class="result__unit">km/h</span>
          </div>
`;
}

solve.onclick = () => {
  if (fields[0].value == "" || fields[1].value == "" || fields[2].value == "") {
    result.textContent = "Wypełnij wszystkie pola";
    return;
  } else {
    v1 = parseFloat(document.querySelector("#speed1").value);
    v2 = parseFloat(document.querySelector("#speed2").value);
    d1 = document.querySelector("#distance").value;
    result.innerHTML = simplify(countT());
  }
};
