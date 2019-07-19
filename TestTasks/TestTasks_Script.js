function checkNum() {
    let elem = document.getElementById("input-task-one").value;
    if (elem > 7) {
        alert("Привет");
    }
    document.getElementById("input-task-one").value = "";
}
function checkName() {
    let name = "Вячеслав";
    let elem = document.getElementById("input-task-two").value;
    if (elem == name) {
        alert("Привет, Вячеслав");
    } else {
        alert("Нет такого имени");
    }
    document.getElementById("input-task-two").value = "";
}
function getArray() {
    let resultMass =[];
    let elem = document.getElementById("input-task-three").value;
    let mass = elem.split(" ");
    for (let i=0; i < mass.length; i++) {
        let toInt = parseInt(mass[i])
        if(toInt % 3 != 1 && toInt % 3 != 2){
           resultMass.push(toInt);
        }
    }
    alert('Элементы массива кратные цифре "3": ' + "\n" + resultMass);
    document.getElementById("input-task-three").value = "";
}