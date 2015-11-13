/* global iwApp */
iwApp.service('menuService', function() {
  var itemList = [];
  var selectedItem = "Item 1";
  var visible = false;
  var activeTab = 'item1';

  var addItem = function(newObj) {
      itemList.push(newObj);
  };

  var getItens = function(){
      return itemList;
  };
  
  var setSelectedItem = function(item) {
      selectedItem = item;
  };
  
  var getSelectedItem = function() {
      return selectedItem;
  };
  
  var isVisible = function() {
      return visible;
  };
  
  var setVisible = function(val) {
      visible = val;
  };
    
    var getActiveTab = function() {
      return activeTab;
    };
    
    var setActiveTab = function(val) {
      activeTab = val;
    };

  return {
    addItem: addItem,
    getItens: getItens,
    setSelectedItem: setSelectedItem,
    getSelectedItem: getSelectedItem,
    isVisible: isVisible,
    setVisible: setVisible,
    getActiveTab: getActiveTab,
    setActiveTab: setActiveTab
  };

});