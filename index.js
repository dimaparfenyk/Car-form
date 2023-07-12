const refs = {
    inputField: document.querySelector('input.car-search-input'),
    carBrandList: document.querySelector('.car-model-list'),
    loadMore: document.querySelector('.load-more'),
    yearsList:document.querySelector('.year-list'),
    yearSelect:document.querySelector('.year-select'),
};

const models = Array.from(document.querySelectorAll('.checkbox-text')).map(label => label.textContent); 
const popularModels = getCarModelValues();

refs.inputField.addEventListener('input', handleSearchInput);
refs.loadMore.addEventListener('click', onLoadMoreBtnClick);
refs.yearsList.addEventListener('click', handleYearsListClick);
  refs.yearSelect.addEventListener('click', handleYearSelectClick);

function handleSearchInput(e) {
  const carBrandName = e.target.value.trim().toLowerCase();
  const filteredModels = filterModels(carBrandName);

  renderCarModels(filteredModels);

  if(refs.carBrandList.children.length>21){
  refs.loadMore.classList.remove('is-hidden');
  }else{
  refs.loadMore.classList.add('is-hidden');
  }
  
  if(carBrandName===''){
    isFirstLoadMoreClick = false;
  }
}

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

function onLoadMoreBtnClick() {
  const carModelItems = document.querySelectorAll('.car-model-item');
  carModelItems.forEach(function(item) {
        item.style.display = 'flex';
      });
  toggleLoadMoreVisibility();
}

function toggleLoadMoreVisibility() {
    refs.loadMore.classList.contains('is-hidden') 
    ? refs.loadMore.classList.remove('is-hidden') 
    : refs.loadMore.classList.add('is-hidden');
  }

refs.carBrandList.addEventListener('change', handleCheckboxChange);

function handleCheckboxChange(e) {
  const checkbox = e.target;
  if (checkbox.classList.contains('checkbox-input') && checkbox.checked) {
    refs.inputField.value = checkbox.labels[0].innerText;
  }
}
  
  const years=[...refs.yearsList.children];
  
  // refs.yearsList.addEventListener('click', (e)=>{
  //     if(e.target.nodeName==='LABEL'){
  //        refs.yearSelect.value="";
  //     }
  // });
  
  // refs.yearSelect.addEventListener('click', (e)=>{
  //     if(!e.target.value) return;
      
  //       years.map(year=>{
  //         if(year.children[0].checked){
  //             year.children[0].checked=false;
  //             return;
  //         }
  //        });  
  // });

  function handleYearsListClick(e) {
    if (e.target.nodeName === 'LABEL') {
      refs.yearSelect.value = '';
    }
  }
  
  function handleYearSelectClick(e) {
    if (!e.target.value) return;
  
    years.forEach(year => {
      if (year.children[0].checked) {
        year.children[0].checked = false;
      }
    });
  }
  
  
  