/**
 * Created by GodaiYuusaku on 12/20/16.
 */
(function () {
    angular
        .module("myApp")
        .service("BasePageService", function ($localStorage) {
            this.currentList;
            this.listArray = [];
            this.dupListError = false;
            this.dupItemError = false;

            if ($localStorage.lists) {
                this.listArray = $localStorage.lists;
                this.currentList = this.listArray[0];
            }
            this.selected = null;
            this.oldName = "";

            this.addList = function (newList) {
                this.dupListError = false;
                if (newList) {
                    var inList = false;
                    for (var i = 0; i < this.listArray.length; i++) {
                        if (newList === this.listArray[i].name) {
                            inList = true;
                            this.dupListError = true;
                            break;
                        }
                    }
                    if (!inList) {
                        this.listArray.push({name: newList, items: []});
                        this.currentList = this.listArray[this.listArray.length - 1];
                    }
                }
            };

            this.getList = function (listName) {
                for (var i = 0; i < this.listArray.length; i++) {
                    if (listName === this.listArray[i].name) {
                        this.currentList = this.listArray[i];
                        break;
                    }
                }
            };

            this.clear = function () {
                this.currentList.items = [];
            };

            this.addItem = function (newItem) {
                this.dupItemError = true;
                if (newItem && (this.currentList.items.indexOf(newItem) === -1)) {
                    this.currentList.items.push(newItem);
                    this.dupItemError = false;
                }
            };

            this.removeItem = function (item) {
                this.currentList.items.splice(this.currentList.items.indexOf(item), 1);
            };

            this.clearCompleted = function (selected) {
                for (var key in selected) {
                    if (this.currentList.items.indexOf(key) != -1 && selected[key]) {
                        this.currentList.items.splice(this.currentList.items.indexOf(key), 1);
                        delete selected[key];
                    }
                }

                if (Object.keys(selected).length === 0) {
                    selected = null;
                }
                return selected;
            };

            this.setSelected = function (selected) {
                this.selected = selected;
            };

            this.deleteLists = function () {
                this.listArray = [];
                this.currentList = null;
            };

            this.saveNewItem = function (oldItem, newItem) {
                if (oldItem === newItem) {
                    return true;
                }
                if (this.currentList.items.indexOf(newItem) === -1) {
                    this.currentList.items.splice(this.currentList.items.indexOf(oldItem), 1, newItem);
                    return true;
                }
                else {
                    return false;
                }

            };

            this.saveNewName = function (newListName) {
                for (var i = 0; i < this.listArray.length; i++)
                {
                    if (this.listArray[i].name === newListName)
                    {
                        return false;
                    }
                }
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].name === this.oldName) {
                        this.listArray[i].name = newListName;
                        return true;
                    }
                }
            };

            this.editList = function (oldName) {
                this.oldName = oldName;
            };

            this.removeList = function (list) {
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].name === list) {
                        this.listArray.splice(i, 1);
                        break;
                    }
                }
            }
        });
})();