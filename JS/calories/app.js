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
      {id:0, name: 'Steak dinner', calories:1200},
      {id:1, name: 'Sushi', calories:500},
      {id:2, name: 'Gyoza', calories:600}
    ],
    currentItem: null,
    totalCalories: 0
  }

 //Publicメソッド
  return {
    getItems: function() {
      return data.items;
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
        html += `<li class="collection-item" id="items-${item.id}">
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
       name: '',
       calories:''
     }
    },
    getSelectors: function(){
      return UISelectors;
    }
  }
})();


//App Controller
const App = (function(ItemCtrl, UICtrl){
 //Load event listners
 const loadEventListners = function(){
  const UISelectors = UICtrl.getSelectors();
 
  //Add item event
  document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);
 }

 //Add item submit
 const itemAddSubmit = function(e){
   //Get for input from UI controller
   const input = UICtrl.getItemInput
  e.preventDefault();
  
 }

   //Publicメソッド
  return {
    init:function(){

      //Itemsのfetch
      const items = ItemCtrl.getItems();

      //populate list with items
      UICtrl.populateItemList(items);

      //Load event listners
      loadEventListners()
    }
  }
  
})(ItemCtrl, UICtrl);


App.init()

