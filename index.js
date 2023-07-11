const refs = {
    inputField: document.querySelector('input.car-search-input'),
    carBrandList: document.querySelector('.car-model-list'),
    loadMore: document.querySelector('.load-more'),
    yearsList:document.querySelector('.year-list'),
    yearSelect:document.querySelector('.year-select'),
};

let isFirstLoadMoreClick = true;
// получаем массив всех моделей машин
const models = Array.from(document.querySelectorAll('.checkbox-text')).map(label => label.textContent); 
// массив популярных машин
const popularModels = getCarModelValues();

refs.inputField.addEventListener('input', handleSearchInput);

// функция обработки события на инпуте 
function handleSearchInput(e) {
  const carBrandName = e.target.value.trim().toLowerCase();
  const filteredModels = filterModels(carBrandName);
  renderCarModels(filteredModels);
  if(carBrandName===''){
    isFirstLoadMoreClick = false;
  }
}
// функция которая создает массив из первых 21 брендов автомобилей которые
// function getCarModelValues() {
//     const carModelItems = document.querySelectorAll('.car-model-item');
//     const carModelValues = [];
  
//     for (let i = 0; i < carModelItems.length; i++) {
//       if (i === 21) {
//         break;
//       }
//       const carModelValue = carModelItems[i].querySelector('.checkbox-text').textContent;
//       carModelValues.push(carModelValue);
//     }
  
//     return carModelValues;
//   }

  function getCarModelValues() {
    const carModelItems = document.querySelectorAll('.car-model-item');
    const carModelValues = [];
  
    carModelItems.forEach(function(item) {
      if (item.style.display !== 'none') {
        const carModelValue = item.querySelector('.checkbox-text').textContent;
        carModelValues.push(carModelValue);
      }
    });
  
    return carModelValues;
  }

// функция производит поиск в массиве по ключевому слову(которое мы вводим в инпуте, т.е input.value)
function filterModels(carBrandName) {
    return carBrandName === '' ? popularModels : [...models].filter(model => model.toLowerCase().includes(carBrandName));
  }

function renderCarModels(models) {
  refs.carBrandList.innerHTML = models.map(model => `
    <li class="car-model-item">
      <input type="radio" class="checkbox-input" name="car" id="${model}" value="${model}">
      <label class="checkbox-text" for="${model}">${model}</label>
    </li>
  `).join('');
}

refs.loadMore.addEventListener('click', function() {
  
    const carModelItems = document.querySelectorAll('.car-model-item');
    carModelItems.forEach(function(item) {
          item.style.display = 'flex';
        });
  });

// Добавляем обработчик события для очистки значения input при выборе checkbox
refs.carBrandList.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange(e) {
  const checkbox = e.target;
  if (checkbox.classList.contains('checkbox-input') && checkbox.checked) {
    refs.inputField.value = checkbox.labels[0].innerText;
  }
}

//   Обработка группы с годами
  
  const years=[...refs.yearsList.children];
  
  refs.yearsList.addEventListener('click', (e)=>{
      if(e.target.nodeName==='LABEL'){
         refs.yearSelect.value="";
      }
  });
  
  refs.yearSelect.addEventListener('click', (e)=>{
      if(!e.target.value) return;
      
        years.map(year=>{
          if(year.children[0].checked){
              year.children[0].checked=false;
              return;
          }
         });  
  });