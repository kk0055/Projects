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

  return {
    logData: function() {
      return data;
    }
  }
})();

//UI Controller
const UICtrl = (function(){
  
})();
//App Controller
const App = (function(ItemCtrl, UICtrl){
  
})(ItemCtrl, UICtrl);