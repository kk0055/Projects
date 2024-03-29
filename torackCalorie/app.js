// Storage Controller
const StrageCtrl = (function () {
  //public
  return {
    storeItem: function (item) {
      let items;
   
      if (localStorage.getItem('items') === null) {
        items = []
        items.push(item);
        //set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'))

        //Push new item
        items.push(item);
        //Re set 
        localStorage.setItem('items', JSON.stringify(items));

      }
    },
    getItemsFromStorage: function() {
      let items;
      if(localStorage.getItem('items') === null){
         items =  [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem)
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(id === item.id) {
          items.splice(index, 1)
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items')
    }
  }
})();


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
    
    // items: [{
    //     id: 0,
    //     name: 'Steak Dinner',
    //     calories: 1200
    //   },
    //   {
    //     id: 1,
    //     name: 'Cookie',
    //     calories: 400
    //   },
    //   {
    //     id: 2,
    //     name: 'Eggs',
    //     calories: 300
    //   }
    // ],
    items: StrageCtrl.getItemsFromStorage(),
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
    getItemById: function (id) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item
        }
      })
      // console.log(found)
      return found
    },
    updateItem: function (name, calories) {
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      })
      return found
    },
    deleteItem: function (id) {
      const ids = data.items.map(function (item) {
        return item.id
      })
      //Get index
      const index = ids.indexOf(id)
      data.items.splice(index, 1)
      console.log(data.items)
    },
    clearAllItems: function () {
      data.items = []
    },
    setCurrentItem: function (item) {
      data.currentItem = item
    },
    getCurrentItem: function () {
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
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    clearBtn: '.clear-btn',
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
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems)

      //turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id')
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`
        }
      })
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`
      document.querySelector(itemID).remove()
    },
    removeAllItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems)
      //turn Node list into array
      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        listItem.remove()
      })
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    addItemToForm: function () {
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
const App = (function (ItemCtrl, StrageCtrl, UICtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    //Disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })
    //Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)
    //Update item
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
    //Backbutton
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState)
    //Delete item
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)
    //Clear all items
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
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

      StrageCtrl.storeItem(newItem)
      //Clear fields
      UICtrl.clearInput()
    }
    e.preventDefault();


  }
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
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

  const itemUpdateSubmit = function (e) {

    const input = UICtrl.getItemInput()
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories)

    UICtrl.updateListItem(updatedItem);
    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories()
    UICtrl.showTotalCalories(totalCalories)

    //UpdateLocal Storage
    StrageCtrl.updateItemStorage(updatedItem)

    UICtrl.clearEditState()
    e.preventDefault()
  }

  //delete item
  const itemDeleteSubmit = function (e) {
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id)
    UICtrl.deleteListItem(currentItem.id)
    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories()
    UICtrl.showTotalCalories(totalCalories)

    //delete item from local storage
    StrageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState()
    e.preventDefault()
  }

  const clearAllItemsClick = function () {
    //Delete all items from data structre
    ItemCtrl.clearAllItems()
    //Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories()
    UICtrl.showTotalCalories(totalCalories)
    UICtrl.removeAllItems()

    //Clear from ls
    StrageCtrl.clearItemsFromStorage();
    UICtrl.hideList()

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

})(ItemCtrl, StrageCtrl, UICtrl);

// Initialize App
App.init();