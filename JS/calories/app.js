//Storage Controller
const StorageCtrl = (function(){
  
  //Pubic method
  return {
    storeItem: function(item){
      let items;
      //Check if any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        //push new item
        items.push(item);
        //set ls
        localStorage.setItem('items', JSON.stringify(items));
      }else {
        //LSにすでにあるものを取り出す。
        items = JSON.parse(localStorage.getItem('items'));
        //push new item
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    }
  }
})();

//Item Controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
      this.id = id;
      this.name = name;
      this.calories = calories
    }

    const data  = {
      // items: [
      //   // {id:0, name: 'Steak dinner', calories:1200},
      //   // {id:1, name: 'Sushi', calories:500},
      //   // {id:2, name: 'Gyoza', calories:600}
      // ],
      items: StorageCtrl.getItemsFromStorage(),
      currentItem: null,
      totalCalories: 0
    }

  //Publicメソッド
    return {
      getItems: function() {
        return data.items;
      },
      addItem: function(name, calories) {
        
        let ID;
        //Create ID
        if(data.items.length > 0){
          ID = data.items[data.items.length - 1].id + 1;  
        } else {
          ID = 0;
        }

        //Calories to number
        calories = parseInt(calories);

        //Crate new item
        newItem = new Item(ID, name, calories);

        // Add to items array
        data.items.push(newItem);

        return newItem;
      },
      getItemById:function(id){
        let found = null;
        data.items.forEach(function(item){
          if(item.id === id){
            found = item;
          }
        });
        return found;    
      },
      updateItem: function(name, calories){
        //Calories to number
        calories = parseInt(calories);

        let found = null;

        data.items.forEach(function(item){
          if(item.id === data.currentItem.id){
            item.name = name;
            item.calories = calories;
            found = item;
          }
        });
        return found;

      },
      deleteItem: function(id){
        //Get ids
       const ids = data.items.map(function(item){
          return item.id;
        });
        //Get index
        const index = ids.indexOf(id);
        //remove item
        data.items.splice(index, 1);
      },
      clearAllItems: function(){
       data.items = [];
      },
      setCurrentItem: function(item){
        data.currentItem = item;
      },
      getCurrentItem:function(){
        return data.currentItem;
      },
      //get Total Calories
      getTotalCalories: function(){
        let total = 0;

        //foreachでitemsをまわしてcalories追加
        data.items.forEach(function(item){
          total += item.calories;
          
        });

        //set total calories in data structure
        data.totalCalories = total;

        return data.totalCalories;
      },
      logData: function() {
        return data;
      }
    }
})();



//UI Controller
const UICtrl = (function(){

  const UISelectors = {
    itemList: '#item-list',
    listItems:'#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput:'#item-calories',
    totalCalories:'.total-calories',
  }
  //Publicメソッド
  return {
    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function(){
     return {
       name: document.querySelector(UISelectors.itemNameInput).value,
       calories:document.querySelector(UISelectors.itemCaloriesInput).value
     }
    },
    addListItem: function(item){
      
      //SHow the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      //insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
    },
    updateListItem:function(item){
     let listItems = document.querySelectorAll(UISelectors.listItems);

     // Turn Node list into array
     listItems = Array.from(listItems);
     listItems.forEach(function(listItem){
       const itemID = listItem.getAttribute('id');

       if(itemID === `item-${item.id}`){
         document.querySelector(`#${itemID}`).innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
         <a href="#" class="secondary-content">
           <i class="edit-item fa fa-pencil"></i>
         </a>`;
       }
     });
    },
    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function(){
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm:function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function(){
     let listItems = document.querySelectorAll(UISelectors.listItems);
     //Turn Node list into array
     listItems = Array.from(listItems);

     listItems.forEach(function(item){
       item.remove();
     });

    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories ;
    },
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();


//App Controller
const App = (function(ItemCtrl,StorageCtrl, UICtrl){
 //Load event listners
 const loadEventListeners  = function(){
  const UISelectors = UICtrl.getSelectors();
 
  //Add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

  //Disable submit on enter
  document.addEventListener('keypress', function(e){
    if(e.keyCode ===13 || e.which === 13){
     e.preventDefault();
     return false;
    }
  });
   //Edit item click event
   document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);
   //Update item event
   document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

  //Delete item event
  document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);
  //Clear Items event
  document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick);

  //Back Btn event
  document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);
 }

 //Add item submit
 const itemAddSubmit = function(e){
   //Get form input from UI controller
   const input = UICtrl.getItemInput();
   
   //inputがブランクで無い場合
   if(input.name !== '' && input.calories !== ''){

     //Add Item
       const newItem =  ItemCtrl.addItem(input.name, input.calories);
       //Add Items to UI
       UICtrl.addListItem(newItem);

      //Get total calories
      const  totalCalories = ItemCtrl.getTotalCalories();
      //Add totalt calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Store in localStorage
      StorageCtrl.storeItem(newItem);
      //clearInput input forms
      UICtrl.clearInput();
   }

  e.preventDefault();
  
 }

 //cliick edit item
const itemEditClick = function(e){
if(e.target.classList.contains('edit-item')){
 //Get list item id 
 const listId = e.target.parentNode.parentNode.id;

 //Break into an array
 const listIdArr = listId.split('-');

 //Get the actual ID
 const id = parseInt(listIdArr[1]);

 //Get Item
const itemToEdit = ItemCtrl.getItemById(id);

ItemCtrl.setCurrentItem(itemToEdit);

//Add item to form
UICtrl.addItemToForm();
}
  e.preventDefault();
}


//Update item submit
const itemUpdateSubmit = function(e){

  //Get the item input
  const input = UICtrl.getItemInput();
  //update item
  const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
  //Update UI
  UICtrl.updateListItem(updatedItem);

  //Get total calories
  const  totalCalories = ItemCtrl.getTotalCalories();
  //Add totalt calories to UI
  UICtrl.showTotalCalories(totalCalories);
  UICtrl.clearEditState();
  e.preventDefault();
}
//Delete button event
const itemDeleteSubmit = function(e){
  //Get current item
  const currentItem = ItemCtrl.getCurrentItem();
  ItemCtrl.deleteItem(currentItem.id);

  //Delete from UI
  UICtrl.deleteListItem(currentItem.id);
  //Get total calories
  const  totalCalories = ItemCtrl.getTotalCalories();
  //Add totalt calories to UI
  UICtrl.showTotalCalories(totalCalories);
  UICtrl.clearEditState();
  e.preventDefault();
}

//clear items event
const clearAllItemsClick = function(){
   // Dlete all items from data structure
    ItemCtrl.clearAllItems();

    //Get total calories
    const  totalCalories = ItemCtrl.getTotalCalories();
    //Add totalt calories to UI
    UICtrl.showTotalCalories(totalCalories);
   //Remove from UI
    UICtrl.removeItems();

    //Hide UL
    UICtrl.hideList();
}


   //Publicメソッド
  return {
    init:function(){
      //Clear edit state
      UICtrl.clearEditState();
      //Itemsのfetch
      const items = ItemCtrl.getItems();
      
      //check if any items
      if(items.length === 0){
       
        UICtrl.hideList();
      }else {
        //populate list with items
      UICtrl.populateItemList(items);

      }
        //Get total calories
        const  totalCalories = ItemCtrl.getTotalCalories();
        //Add totalt calories to UI
        UICtrl.showTotalCalories(totalCalories);

      
      //Load event listners
      loadEventListeners ()
    }
  }
  
})(ItemCtrl, StorageCtrl, UICtrl);


App.init()

