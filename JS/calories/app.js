//Storage Controller

//Item Controller
const ItemCtrl = (function(){
  //Item Constructor
  const Item = function(id, name, calories){
     this.id = id;
     this.name = name;
     this.calories = calories
  }

  const data  = {
    items: [
      // {id:0, name: 'Steak dinner', calories:1200},
      // {id:1, name: 'Sushi', calories:500},
      // {id:2, name: 'Gyoza', calories:600}
    ],
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
    logData: function() {
      return data;
    }
  }
})();



//UI Controller
const UICtrl = (function(){

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput:'#item-calories'
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
    clearInput: function(){
        document.querySelector(UISelectors.itemNameInput).value = '';
        document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();


//App Controller
const App = (function(ItemCtrl, UICtrl){
 //Load event listners
 const loadEventListeners  = function(){
  const UISelectors = UICtrl.getSelectors();
 
  //Add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);
 }

 //Add item submit
 const itemAddSubmit = function(e){
   //Get form input from UI controller
   const input = UICtrl.getItemInput();
   
   //inputがブランクで無い場合
   if(input.name !== '' && input.calories !== ''){
     //Add Item
       const newItem =  ItemCtrl.addItem(input.name, input.calories);
       
       UICtrl.addListItem(newItem);

      //clearInput input forms
      UICtrl.clearInput();
   }

  e.preventDefault();
  
 }

   //Publicメソッド
  return {
    init:function(){

      //Itemsのfetch
      const items = ItemCtrl.getItems();
      
      //check if any items
      if(items.length === 0){
       
        UICtrl.hideList();
      }else {
        //populate list with items
      UICtrl.populateItemList(items);

      }

      
      //Load event listners
      loadEventListeners ()
    }
  }
  
})(ItemCtrl, UICtrl);


App.init()

