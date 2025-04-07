let recipe = [] //массив с инградиентами
document.querySelector(".add_btn").addEventListener("click", function() {
    let name = document.querySelector(".item_name")
    let count = document.querySelector(".item_count")
    let type = document.querySelector(".item_type")
    if(!name.value) {
      alert("Введите название инградиента")
      return false
    }
    recipe.push({
       "name": name.value,
       "count": +count.value,
       "type": type.value
    })
    let result
    if(+count.value===0) {
        result=`${name.value} - по вкусу`
    } else {
        result=`${name.value} - ${count.value}  ${type.value}`
    }
    let div = document.createElement("div")
    div.innerHTML =`
    <div class="d-flex space_between">
    <div>${result}</div>
    <button class="remove_btn" data-name="${name.value}">&times;</button>
    </div>
    `
    document.querySelector(".recipe").append(div)
    name.value=''
    count.value=''
}) 
//Кнопка вычислить
document.querySelector(".result_btn").addEventListener("click", function() {
  console.log("попали")
  document.querySelector(".result_new_recipe").innerHTML="";
  let ratio_type = +document.querySelector(".item_ratio_type").value
  let ratio = +document.querySelector(".item_ratio").value
  if(!ratio) {
    alert("Введите число кроме 0")
    return false
  }
  let new_recipe = []
  if(ratio_type===1){
    for(let i=0; i<recipe.length; i++) {
      new_recipe.push({
        "name": recipe[i].name,
        "count": (+recipe[i].count/ratio).toFixed(3),
        "type": recipe[i].type
      })
      }
    } else if(ratio.type===2) {
      for(let i=0; i<recipe.length; i++) {
        new_recipe.push({
          "name": recipe[i].name,
          "count": +recipe[i].count*ratio,
          "type": recipe[i].type
    })}
  }
  for(let i=0; i<new_recipe.length; i++) {
    let result;
    if(+new_recipe[i].count==0){
      result=`по вкусу`
    } else {
      result=`${new_recipe[i]["count"]} ${new_recipe[i]["type"]}`
    }
    // alert(result)
    let div = document.createElement("div")
    div.innerHTML =`
    <div class="d-flex>
    5678
      <div>${new_recipe[i]["name"]} - ${result}</div>
    </div>
    `
    alert(div.innerHTML)
    document.querySelector(".result_new_recipe").append(div)
  }
}) 

//Изменить название рецепта
document.querySelector(".recipe_name").addEventListener("click", function() {
    let name = prompt("Ведите название рецепта")
    if(name) {
      document.querySelector(".recipe_name").textContent = name
    }
})
//Кнопка копирования в буфер обмена
document.getElementById('copy_btn').addEventListener('click', function() {
  // Получаем текст из блока div.text
  const textToCopy = document.querySelector('.copy').textContent;
  
  // Используем Clipboard API для копирования текста
  navigator.clipboard.writeText(textToCopy)
      .then(() => {
          // Успешное копирование
          alert('Рецепт скопирован в буфер обмена!');
      })
      .catch(err => {
          // Ошибка
          console.error('Не удалось скопировать текст: ', err);
          alert('Ошибка при копировании текста!');
      });
});

// Кнопка увеличить или уменьшить шрифтКнопка удалить конкретный инградиент
document.querySelector(".recipe").addEventListener("click", function(e) {
  if(!e.target.dataset.name) {
    return false
  }
  e.target.closest(".d-flex").remove()
  for(let i=0; i<recipe.length; i++) {
    if(recipe[i]["name"]==e.target.dataset.name) {
      recipe.splice(i,1)
    }
  }
})
// Минимальный и максимальный размер шрифта
const minFontSize = 8;
const maxFontSize = 22;
// Функция для изменения размера шрифта
function changeFontSize(step) {
    // Получаем текущий размер шрифта body
    let currentSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    // Вычисляем новый размер шрифта
    let newSize = currentSize + step;
    // Проверяем, чтобы размер шрифта не выходил за пределы min и max
    if (newSize < minFontSize) newSize = minFontSize;
    if (newSize > maxFontSize) newSize = maxFontSize;
    // Применяем новый размер шрифта ко всему документу
    document.body.style.fontSize = newSize + 'px';
}
// Назначаем обработчики событий на кнопки
document.getElementById('decreaseFont').addEventListener('click', function () {
    changeFontSize(-1); // Уменьшаем шрифт на 1px
});
document.getElementById('increaseFont').addEventListener('click', function () {
    changeFontSize(1); // Увеличиваем шрифт на 1px
});

