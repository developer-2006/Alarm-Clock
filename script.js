const selectmenu = document.querySelectorAll("select");
const timebox = document.querySelector(".time");
const setAlarmBtn = document.querySelector(".set-alarm");
const content = document.querySelector(".content");

let alarmtime,
  alarmState = "noset";
const ringtone = new Audio("/ringtone.mp3");
for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectmenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectmenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timebox.innerHTML = `${h}:${m}:${s}`;
  if (alarmtime == `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
  alarmtime = `${selectmenu[0].value}:${selectmenu[1].value}`;
  if (alarmtime.includes("Hour") || alarmtime.includes("Minute")) {
    return alert("زمان هشدار را به درستی مشخص کنید.");
  }
  checkState(alarmState);
});

function checkState(state) {
  if (state == "noset") {
    content.classList.add("disable");
    setAlarmBtn.innerText = "clear Alarm";
    alarmState = "set";
  } else {
    content.classList.remove("disable");
    alarmtime = "";
    ringtone.pause();
    setAlarmBtn.innerText = "set alarm";
    selectmenu[0].value = "Hour";
    selectmenu[1].value = "Minute";
    alarmState = "noset";
  }
}
