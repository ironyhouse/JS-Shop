import { Model } from "../Model/Model.js";
import { View } from "../View/View.js";
import {
    removeChildNodes,
    debounce,
    showSuccessfulAction
} from "../Utility.js";

/**
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */

function Controller(view, model) {
    /**
     * Initialize controller.
     *
     * @public
     */
    this.init = function() {
        const searchDelay = view.getSearchDelay();
        const confirmationCANCEL = view.getConfirmationCANCEL();
        const sidePanel = view.getSidePanel();
        const sidePanelButton = view.getSidePanelButton();
        const storeList = view.getStoreList();
        const storeSearchInput = view.getStoreSearchInput();
        const storeSearchDeleteButton = view.getStoreSearchDeleteButton();
        const storeSearchReloadButton = view.getStoreSearchReloadButton();
        const storeListPinButton = view.getStoreListPinButton();
        const storeDeleteButton = view.getStoreDeleteButton();
        const storeListCreateButton = view.getStoreListCreateButton();
        const storeCreationFormCreate = view.getStoreCreationFormCreate();
        const storeCreationFormCancel = view.getStoreCreationFormCancel();
        const selectStore = view.getStore();
        const productList = view.getProductList();
        const filterPanel = view.getFilterPanel();
        const sortPanel = view.getSortPanel();
        const productSearchInput = view.getProductSearchInput();
        const productSearchDeleteButton = view.getProductSearchDeleteButton();
        const productListPinButton = view.getProductListPinButton();
        const productListCreateButton = view.getProductListCreateButton();
        const productCreationFormCreate = view.getProductCreationForm();
        const productCreationFormCancel = view.getProductCreationFormCancel();
        // Creation Product Form
        productListCreateButton.addEventListener(
            "click",
            this._showProductForm
        );
        // Hide Product Form
        productCreationFormCancel.addEventListener(
            "click",
            this._hideProductForm
        );
        // Create Product
        productCreationFormCreate.addEventListener(
            "click",
            this._createProduct,
            true
        );
        // Show Store Form
        storeListCreateButton.addEventListener("click", this._showStoreForm);
        // Hide Store Form
        storeCreationFormCreate.addEventListener("click", this._createStore);
        // Create Store
        storeCreationFormCancel.addEventListener("click", this._hideStoreForm);
        // Click Store List Items
        sidePanel.addEventListener("click", this._clickStore);
        // Aside Control Button
        sidePanelButton.addEventListener("click", this._onSideButtonClick);
        // Confirmation
        confirmationCANCEL.addEventListener(
            "click",
            this._clickConfirmationCANCEL
        );
        // Scroll Page
        sidePanel.addEventListener("scroll", this._changeControlsDisplay);
        selectStore.addEventListener("scroll", this._changeControlsDisplay);
        // Pin Store List Panel
        storeListPinButton.addEventListener("click", this._pinStoreListPanel);
        // Pin Store Panel
        productListPinButton.addEventListener(
            "click",
            this._pinProductListPanel
        );
        // Store List
        storeList.addEventListener("click", this._selectStore);
        // Delete Store
        storeDeleteButton.addEventListener("click", this._deleteStore);
        // Search
        storeSearchInput.addEventListener(
            "input",
            debounce(this._searchStore, searchDelay)
        );
        storeSearchDeleteButton.addEventListener(
            "click",
            this._clearStoreSearch
        );
        storeSearchReloadButton.addEventListener(
            "click",
            this._reloadStoreList
        );
        // Delete Product
        productList.addEventListener("click", this._selectProduct);
        // Filter
        filterPanel.addEventListener("click", this._toggleFilter);
        // Sort
        sortPanel.addEventListener("click", this._sortTable);
        // Search
        productSearchInput.addEventListener(
            "input",
            debounce(this._searchProduct, searchDelay)
        );
        productSearchDeleteButton.addEventListener(
            "click",
            this._clearProductSearch
        );

        /////////////////// Page Load //////////////////
        // Preloader
        window.addEventListener("load", function() {
            view.getPreloader().classList.add("hide");
            view.getStoreList().classList.remove("hide");
        });
        // Create Store List
        model
            .fetchStoreList()
            .then(function(data) {
                model.Stores = data;
                view.createStoreList(data);
            })
            .catch(function(e) {
                console.error(e);
            });
        this._displaySidebar();
        window.addEventListener("resize", this._displaySidebar);
    };

    /**
     * Show product form event handler.
     *
     * @listens click
     *
     * @private
     */
    this._showProductForm = function() {
        view.showProductForm("Create new");
    };

    /**
     * Hide form event handler.
     *
     * @listens click
     *
     * @private
     */
    this._hideProductForm = function() {
        view.hideProductForm();
    };

    /**
     *  Create Product event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._createProduct = function(e) {
        e.preventDefault();
        let storeID = view.getStoreList().dataset.storeId;

        view.getProductCreationFormCreate().addEventListener("click", () => {
            e.preventDefault();
            view.checkProductForm();
            if (view.getProductCreationForm().dataset.storeFormValid === "valid") {
                view.getProductFormData()
                    .then(function(data) {
                        model.createProduct(storeID, data);
                    })
                    .then(function() {
                        view.hideProductForm();
                        view.getProductCreationForm().dataset.storeFormValid =
                            "invalid";
                        removeChildNodes("products");
                        showSuccessfulAction("product", "created");
                    })
                    .then(function() {
                        return model.fetchProducts(storeID);
                    })
                    // Create Products
                    .then(function(products) {
                        removeChildNodes("products");
                        model.Products = products;
                        view.createProductList(products);
                    })
                    .catch(function(e) {
                        console.error(e);
                    });
            }
        });
    };

    /**
     * Show store form event handler.
     *
     * @listens click
     *
     * @private
     */
    this._showStoreForm = function() {
        view.showStoreForm();
    };

    /**
     * Hide store form event handler.
     *
     * @listens click
     *
     * @private
     */
    this._hideStoreForm = function() {
        view.hideStoreForm();
    };

    /**
     * Create Store event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._createStore = function(e) {
        e.preventDefault();

        view.checkStoreForm();

        if (view.getStoreCreationForm().dataset.storeFormValid === "valid") {
            view.getStoreFormData()
                .then(function(data) {
                    model.createStore(data);
                })
                .then(function() {
                    return model.fetchStoreList();
                })
                .then(function(data) {
                    removeChildNodes("store-list-wrapper");
                    model.Stores = data;
                    view.createStoreList(data);
                })
                .then(function() {
                    view.getStoreCreationForm().dataset.storeFormValid =
                        "invalid";
                    view.hideStoreForm();
                    showSuccessfulAction("store", "created");
                })
                .catch(function(e) {
                    console.error(e);
                });
        }
    };

    /**
     * Show Confirmation event handler.
     *
     * @listens click
     *
     * @private
     */
    this._clickConfirmationCANCEL = function() {
        view.toggleConfirmation();
    };

    /**
     * Scroll Page event handler.
     *
     * @listens scroll
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._changeControlsDisplay = function(e) {
        view.changeControlsDisplay(e);
    };

    /**
     * Pin Store List event handler.
     *
     * @listens click
     *
     * @private
     */
    this._pinStoreListPanel = function() {
        view.pinStoreListPanel();
    };

    /**
     * Pin Product List event handler.
     *
     * @listens click
     *
     * @private
     */
    this._pinProductListPanel = function() {
        view.pinProductListPanel();
    };

    /**
     * Toggle Sidebar event handler.
     *
     * @listens click

     * @private
     */
    this._displaySidebar = function() {
        view.displaySidebar();
    };

    /**
     * Hide Shadow event handler.
     *
     * @listens click
     *
     * @private
     */
    this._clickStore = function() {
        if (document.documentElement.clientWidth < 993) {
            view.displaySidebar();
        }
    };

    /**
     * Toggle sidebar event handler.
     *
     * @listens click
     *
     * @private
     */
    this._onSideButtonClick = function() {
        view.onSideButtonClick();
    };

    /**
     * Delete Store event handler.
     *
     * @listens click
     *
     * @private
     */
    this._deleteStore = function() {
        let storeID = view.getStoreListCheck().id;

        model
            .deleteStore(storeID)
            .then(function() {
                // Hide Open Store
                view.reloadStoreList();
                // Delete Successfully
                showSuccessfulAction("store", "deleted");
            })
            .then(function() {
                return model.fetchStoreList();
            })
            .then(function(data) {
                removeChildNodes("store-list-wrapper");
                view.createStoreList(data);
                model.Stores = data;
            });
    };

    /**
     * Product event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     *
     * @return {*}.
     */
    this._selectProduct = e => {
        // If Product Selected (DELETE)
        if (e.target.classList.contains("product--delete")) {
            this._deleteProduct(e);
            return;
        }

        // If Product Selected (CHANGE)
        if (e.target.classList.contains("product--pencil")) {
            this._changeProduct(e);
        }
    };

    /**
     * Delete Product event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._deleteProduct = function(e) {
        let storeID = view.getStoreList().dataset.storeId;
        let selectProduct = e.target.closest("tr");
        let productID = selectProduct.dataset.productId;
        let filterOptions = view.getFilterCheck().dataset.filter;

        model
            .deleteProduct(storeID, productID)
            .then(() => {
                // Delete Successfully
                showSuccessfulAction("product", "deleted");
            })
            .then(function() {
                return model.fetchProducts(storeID);
            })
            // Create Store Filters
            .then(function(products) {
                model.Products = products;
                return model.calculateFilters();
            })
            .then(function(data) {
                view.createFilterData(data);
            })
            .then(function() {
                return model.fetchProducts(storeID, filterOptions);
            })
            // Create Products
            .then(function(products) {
                removeChildNodes("products");
                model.Products = products;
                view.createProductList(products);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Change Product event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._changeProduct = function(e) {
        let selectProduct = e.target.closest("tr");
        let productID = selectProduct.dataset.productId;
        let storeID = view.getStoreList().dataset.storeId;
        view.showProductForm("Change");
        view.getProductCreationFormChange().classList.remove("hide");
        view.getProductCreationFormCreate().classList.add("hide");

        view.getProductCreationFormChange().addEventListener("click", () => {
            // check form
            view.checkProductForm();
            // change product
            if (view.getProductCreationForm().dataset.storeFormValid === "valid") {
                let filterOptions = view.getFilterCheck().dataset.filter;

                view.getProductFormData()
                    .then(function(data) {
                        model.changeProduct(storeID, productID, data);
                    })
                    .then(function() {
                        view.hideProductForm();
                        removeChildNodes("products");
                        showSuccessfulAction("product", "changed");
                    })
                    .then(function() {
                        return model.fetchProducts(storeID);
                    })
                    // Create Store Filters
                    .then(function(products) {
                        model.Products = products;
                        return model.calculateFilters();
                    })
                    .then(function(data) {
                        view.createFilterData(data);
                    })
                    .then(function() {
                        return model.fetchProducts(storeID, filterOptions);
                    })
                    // Create Products
                    .then(function(products) {
                        removeChildNodes("products");
                        model.Products = products;
                        view.createProductList(products);
                    })
                    .catch(function(e) {
                        console.error(e);
                    });
            }
        });
    };

    /**
     * Search Store event handler.
     *
     * @listens input
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._searchStore = function(e) {
        view.displayStoreSearchButton();

        // Clear Product List
        removeChildNodes("store-list-wrapper");

        model
            .searchStore(e)
            .then(function(searchWord) {
                return model.fetchStoreList(searchWord);
            })
            .then(function(stores) {
                view.createStoreList(stores);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Clear Store Search event handler.
     *
     * @listens click
     *
     * @private
     */
    this._clearStoreSearch = function() {
        removeChildNodes("store-list-wrapper");

        view.clearStoreSearch()
            .then(function() {
                return model.fetchStoreList();
            })
            .then(function(stores) {
                view.createStoreList(stores);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Reload Store Search event handler.
     *
     * @listens click
     *
     * @private
     */
    this._reloadStoreList = function() {
        removeChildNodes("store-list-wrapper");

        view.reloadStoreList()
            .then(function() {
                return model.fetchStoreList();
            })
            .then(function(stores) {
                view.createStoreList(stores);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Reload Store Search event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._toggleFilter = function(e) {
        let storeID = view.getStoreList().dataset.storeId;

        if (e.target.closest("li")) {
            // Clear Product List
            removeChildNodes("products");

            // Create Product List
            view.toggleFilter(e)
                .then(function(targetFilterAttribute) {
                    return model.fetchProducts(storeID, targetFilterAttribute);
                })
                .then(function(products) {
                    view.createProductList(products);
                })
                .catch(function(e) {
                    console.error(e);
                });
        }
    };

    /**
     * Sort Table event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._sortTable = function(e) {
        let storeID = view.getStoreList().dataset.storeId;

        // Clear Product List
        removeChildNodes("products");

        view.sortTable(e)
            .then(function(data) {
                data.unshift(storeID);
                return data;
            })
            .then(function(reqParameters) {
                return model.generateProductURL(...reqParameters);
            })
            .then(function(url) {
                return model.fetchSelectProducts(url);
            })
            .then(function(products) {
                view.createProductList(products);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Search Product event handler.
     *
     * @listens input
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._searchProduct = function(e) {
        let storeID = view.getStoreList().dataset.storeId;

        // Display Product Search Button
        view.displayProductSearchButton();

        // Clear Product List
        removeChildNodes("products");

        view.searchProduct(e)
            .then(function(data) {
                data.unshift(storeID);
                return data;
            })
            .then(function(reqParameters) {
                return model.generateProductURL(...reqParameters);
            })
            .then(function(url) {
                return model.fetchSelectProducts(url);
            })
            .then(function(products) {
                view.createProductList(products);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Clear Product Search event handler.
     *
     * @listens click
     *
     * @private
     */
    this._clearProductSearch = function() {
        let storeID = view.getStoreList().dataset.storeId;

        // Clear Product List
        removeChildNodes("products");

        view.clearProductSearch()
            .then(function(data) {
                data.unshift(storeID);
                return data;
            })
            .then(function(reqParameters) {
                return model.generateProductURL(...reqParameters);
            })
            .then(function(url) {
                return model.fetchSelectProducts(url);
            })
            .then(function(products) {
                view.createProductList(products);
            })
            .catch(function(e) {
                console.error(e);
            });
    };

    /**
     * Select Store event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._selectStore = function(e) {
        let storeID = e.target.closest("li").id;

        // Clear Product List
        removeChildNodes("products");

        // Toggle Store List bgColor
        view.toggleStorList(e.target);

        // Create Store Contacts
        view.createContactList(model.Stores);

        // Create Product List
        model
            .fetchProducts(storeID)
            .then(function(products) {
                model.Products = products;
                view.createProductList(products);
            })
            // Create Store Filters
            .then(function() {
                return model.calculateFilters();
            })
            .then(function(data) {
                view.createFilterData(data);
            })
            .catch(function(e) {
                console.error(e);
            });

        // Show Select Store
        view.showStore(storeID);
    };
}

new Controller(new View(), new Model()).init();
