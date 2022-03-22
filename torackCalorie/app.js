// Storage Controller


// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items: [{
        id: 0,
        name: 'Steak Dinner',
        calories: 1200
      },
      {
        id: 1,
        name: 'Cookie',
        calories: 400
      },
      {
        id: 2,
        name: 'Eggs',
        calories: 300
      }
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function () {
      return data.items
    },
    addItem: function (name, calories) {
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0
      }

      calories = parseInt(calories)

      newItem = new Item(ID, name, calories)
      data.items.push(newItem)

      return newItem
    },
    getItemById: function(id){
      let found = null;
      data.items.forEach(function(item){
          if(item.id === id){
            found = item
          }
      })
      // console.log(found)
      return found
    },
    setCurrentItem:function(item){
      data.currentItem = item
    },
    getCurrentItem:function(){
     return data.currentItem 
    },
    getTotalCalories: function () {
      let total = 0;

      data.items.forEach(function (item) {
        total += item.calories
      })
      // set total calories
      data.totalCalories = total;
      return data.totalCalories;
    },
    logData: function () {
      return data;
    }
  }
})();



// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  // Public methods
  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
      })

      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: function () {
      return UISelectors
    },
    addListItem: function (item) {
      document.querySelector(UISelectors.itemList).style.display = 'block'
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
    <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i>
    </a>`
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    addItemToForm:function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
      UICtrl.showEditState()
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
    }
  }
})();



// App Controller
const App = (function (ItemCtrl, UICtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit)
  }


  const itemAddSubmit = function (e) {

    const input = UICtrl.getItemInput();

    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories)
      //Add item to UI list
      UICtrl.addListItem(newItem)
      //Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories()
      UICtrl.showTotalCalories(totalCalories)
      //Clear fields
      UICtrl.clearInput()
    }
    e.preventDefault();


  }
  const itemUpdateSubmit = function(e){
    if(e.target.classList.contains('edit-item')){
      //Get list item id
      const listId = e.target.parentNode.parentNode.id;
      const listIdArr = listId.split('-');

      // Get the actual ID
      const id = parseInt(listIdArr[1]);
      //Get item
      const itemToEdit = ItemCtrl.getItemById(id)
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add item to form
      UICtrl.addItemToForm()

    }
  e.preventDefault();
  }

  // Public methods
  return {
    init: function () {
      //clear edit state
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems()

      //check if any items
      if (items.length === 0) {
        UICtrl.hideList()
      } else {
        UICtrl.populateItemList(items)
      }
      //Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories()
      UICtrl.showTotalCalories(totalCalories)

      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App
App.init();