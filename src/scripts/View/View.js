import { formatDate, createRating } from "../Utility.js";

/**
 *
 * @constructor
 *
 */

export function View() {
    /**
     * Create store list.
     *
     * @param {Object[]} storeList data.
     *
     * @public
     */
    this.createStoreList = storeList => {
        // If Store List Empty
        if (storeList.length !== 0) {
            this.getStoreListEmpty().classList.add("hide");
            this.getStoreListLength().classList.remove("hide");
            this.getStoreListLength().innerHTML = storeList.length;
        } else {
            this.getStoreListEmpty().classList.remove("hide");
            this.getStoreListLength().classList.add("hide");
        }

        // Create Store
        storeList.forEach((store, i) => {
            let li = document.createElement("li");
            let div = document.createElement("div");

            // Create Store Item
            this.getStoreList().appendChild(li);
            li.classList.add("list-item");
            li.appendChild(div);
            li.setAttribute("id", store.id);
            li.dataset.storeNumber = i;

            // Name and Area
            div.innerHTML = `<p class="store-name" 
                                title="${store.Name}">
                                ${store.Name}
                            </p>
                            <p class="store-distance">
                                ${store.FloorArea}
                            </p>`;

            // sq.m.
            let storeSQ = document.createElement("p");
            li.appendChild(storeSQ);
            storeSQ.classList.add("store-sq");
            storeSQ.innerHTML = "sq.m.";

            // Address
            let storeAddress = document.createElement("p");
            li.appendChild(storeAddress);
            storeAddress.classList.add("store-address");
            storeAddress.setAttribute("title", store.Address);
            storeAddress.innerHTML = `${store.Address}`;
        });

        // Select Store After Searching
        if (this.getStoreList().dataset.storeId) {
            // Selected Store
            let storeID = this.getStoreList().dataset.storeId;
            // Select Store
            if (document.getElementById(`${storeID}`)) {
                document
                    .getElementById(`${storeID}`)
                    .classList.add("list-checked");
            }
        }
    };

    /**
     * Create product list.
     *
     * @param {Object[]} productsList data.
     *
     * @public
     */
    this.createProductList = productsList => {
        this.getEmptyProductList().classList.add("hide");

        //  Empty Product List
        if (productsList.length === 0) {
            this.getEmptyProductList().classList.remove("hide");
        }

        // Create Product List
        productsList.forEach((item, i) => {
            let tr = document.createElement("tr");
            // Create Rating
            let stars = createRating(item.Rating);
            // Product Row Data
            let rowData = [
                `<span>${item.Name}</span>
                    ${item.id}`,
                //
                `<span>${item.Price}</span> USD`,
                //
                `<p class="product--text">
                    ${item.Specs}
                </p>`,
                //
                `<p class="product--text">
                    ${item.SupplierInfo}
                </p>`,
                //
                `<p class="product--text">
                    ${item.MadeIn}
                </p>`,
                //
                `<p class="product--text">
                    ${item.ProductionCompanyName}
                </p>`,
                //
                `${stars}`,
                //
                `<img class="product--pencil" src='./assets/img/pencil.svg' alt='pencil'>
                <img class="product--delete" src='./assets/img/delete.svg' alt='delete'>`
            ];

            // Create Product
            this.getProductList().appendChild(tr);
            tr.classList.add("product");
            tr.dataset.productId = item.id;
            // Create Columns
            for (let i = 0; i <= this.getProductColumnLength(); i++) {
                let td = document.createElement("td");
                td.classList.add(this.getProductColumnClasses()[i]);
                td.innerHTML = `${rowData[i]}`;
                td.setAttribute(
                    "title",
                    item[this.getProductSearchAttribute()[i]]
                );
                // Add Titles for Text
                tr.appendChild(td);
            }
        });
    };

    /**
     * Change Contact List.
     *
     * @param {Object[]} storeList the array of contacts.
     *
     * @public
     */
    this.createContactList = function(storeList) {
        let store = storeList[this.getStoreListCheck().dataset.storeNumber];

        // Transform Date
        let establishedDate = formatDate(store.Established);
        // Change Contact List
        this.getStoreContactsEmail().innerHTML = `${store.Email}`;
        this.getStoreContactsDate().innerHTML = `${establishedDate}`;
        this.getStoreContactsPhone().innerHTML = `${store.PhoneNumber}`;
        this.getStoreContactsArea().innerHTML = `${store.FloorArea}`;
        this.getStoreContactsAddress().innerHTML = `${store.Address}`;
    };

    const CONFIRMATION_FORM_ID = "delete-confirmation";
    const CONFIRMATION_NAME_ID = "confirmation-name";
    const CONFIRMATION_OK_BUTTON_ID = "delete-ok";
    const CONFIRMATION_CANCEL_BUTTON_ID = "delete-cancel";
    const SIDE_PANEL_WRAPPER_ID = "side-panel-wrapper";
    const SIDE_PANEL_BUTTON_ID = "side-control";
    const PRELOADER = "store-list-preloader";
    const STORE_LIST_LENGTH_ID = "number-stores";
    const STORE_LIST_CHECK = "#store-list-wrapper .list-checked";
    const STORE_LIST_EMPTY_ID = "empty-store-list";
    const STORE_LIST_ITEMS = "#store-list-wrapper li";
    const STORE_LIST_WRAPPER_ID = "store-list-wrapper";
    const STORE_SEARCH_INPUT_ID = "search-store";
    const STORE_SEARCH_DELETE_BUTTON_ID = "store-search-delete-button";
    const STORE_SEARCH_RELOAD_BUTTON_ID = "store-search-reload-button";
    const STORE_LIST_PIN_BUTTON_ID = "store-list-pin-button";
    const STORE_DELETE_BUTTON_ID = "delete-store-button";
    const STORE_LIST_CREATE_BUTTON_ID = "create-store-button";
    const STORE_CREATION_FORM_ID = "create-store-form";
    const STORE_CREATION_FORM_CREATE_ID = "store-form-create";
    const STORE_CREATION_FORM_CANCEL_ID = "store-form-cancel";
    const FORMS_WRAPPER_ID = "form-wrapper";
    const STORE_FORM_CREATION_NAME_ID = "store-form-name";
    const STORE_FORM_CREATION_EMAIL_ID = "store-form-email";
    const STORE_FORM_CREATION_PHONE_ID = "store-form-phone";
    const STORE_FORM_CREATION_ADDRESS_ID = "store-form-address";
    const STORE_FORM_CREATION_DATE_ID = "store-form-date";
    const STORE_FORM_CREATION_FLOOR_ID = "store-form-floor";
    const STORE_FORM_CREATION_NAME_ERROR_ID = "store-form-name-error";
    const STORE_FORM_CREATION_EMAIL_ERROR_ID = "store-form-email-error";
    const STORE_FORM_CREATION_PHONE_ERROR_ID = "store-form-phone-error";
    const STORE_FORM_CREATION_ADDRESS_ERROR_ID = "store-form-address-error";
    const STORE_FORM_CREATION_DATE_ERROR_ID = "store-form-date-error";
    const STORE_FORM_CREATION_FLOOR_ERROR_ID = "store-form-floor-error";
    const STORE_WRAPPER_ID = "store-details";
    const EMPTY_STORE_WRAPPER_ID = "empty-store";
    const PRODUCT_LIST_PIN_BUTTON_ID = "product-list-pin-button";
    const STORE_CONTACTS_EMAIL_ID = "store-email";
    const STORE_CONTACTS_DATE_ID = "store-date";
    const STORE_CONTACTS_PHONE_ID = "store-phone";
    const STORE_CONTACTS_AREA_ID = "store-area";
    const STORE_CONTACTS_ADDRESS_ID = "store-address";
    const EMPTY_PRODUCT_LIST_ID = "empty-product-list";
    const PRODUCTS_WRAPPER_ID = "products";
    const PRODUCTS_TABLE_HEADER_ID = "product-head";
    const PRODUCTS_TABLE_HEADER_SELECT_ID =
        "#product-head .product-head-select";
    const PRODUCTS_TABLE_HEADER_COLUMNS = "#product-head td";
    const PRODUCT_SEARCH_INPUT_ID = "search-product";
    const PRODUCT_SEARCH_DELETE_BUTTON = "product-search-delete-button";
    const PRODUCT_LIST_CREATE_BUTTON_ID = "create-product-button";
    const PRODUCT_CREATION_FORM_ID = "create-product-form";
    const PRODUCT_CREATION_FORM_CREATE_ID = "product-form-create";
    const PRODUCT_CREATION_FORM_CHANGE_ID = "product-form-change";
    const PRODUCT_CREATION_FORM_CANCEL_ID = "product-form-cancel";
    const PRODUCT_CREATION_FORM_NAME_ID = "product-form-name";
    const PRODUCT_CREATION_FORM_TITLE = "product-form-title";
    const PRODUCT_CREATION_FORM_PRICE_ID = "product-form-price";
    const PRODUCT_CREATION_FORM_SPECS_ID = "product-form-specs";
    const PRODUCT_CREATION_FORM_RATING_ID = "product-form-rating";
    const PRODUCT_CREATION_FORM_SUPPLIER_ID = "product-form-supplier";
    const PRODUCT_CREATION_FORM_MADE_ID = "product-form-made";
    const PRODUCT_CREATION_FORM_COMPANY_ID = "product-form-company";
    const PRODUCT_CREATION_FORM_STATUS_ID = "product-form-status";
    const PRODUCT_CREATION_FORM_NAME_ERROR_ID = "product-form-name-error";
    const PRODUCT_CREATION_FORM_PRICE_ERROR_ID = "product-form-price-error";
    const PRODUCT_CREATION_FORM_SPECS_ERROR_ID = "product-form-specs-error";
    const PRODUCT_CREATION_FORM_RATING_ERROR_ID = "product-form-rating-error";
    const PRODUCT_CREATION_FORM_SUPPLIER_ERROR_ID =
        "product-form-supplier-error";
    const PRODUCT_CREATION_FORM_MADE_ERROR_ID = "product-form-made-error";
    const PRODUCT_CREATION_FORM_COMPANY_ERROR_ID = "product-form-company-error";
    const PRODUCT_CREATION_FORM_STATUS_ERROR_ID = "product-form-status-error";
    const FILTER_PANEL_ID = "filter-panel";
    const FILTER_CHECK = "#filter-panel .filter-check";
    const FILTER_PANEL_ITEMS = "#filter-panel li";
    const FILTER_ALL_ID = "all";
    const FILTER_OK_ID = "ok";
    const FILTER_STORAGE_ID = "storage";
    const FILTER_OUT_ID = "out";
    const SORT_PANEL = "product-head";
    const CREATE_PRODUCT_PANEL = "create-product-panel";
    const SEARCH_DELAY = 300;
    const PRODUCT_COLUMN_NUMBER = 7;
    const PRODUCT_CLASSES = [
        "product--name",
        "product--price",
        "product--specs",
        "product--supplier",
        "product--country",
        "product--company",
        "rating",
        "product--create"
    ];
    const PRODUCT_SEARCH_ATTRIBUTE = [
        "Name",
        "Price",
        "Specs",
        "SupplierInfo",
        "MadeIn",
        "ProductionCompanyName",
        "Rating",
        "id"
    ];
    const REGEX_NAME = /^[a-zA-Z ]+$/;
    const REGEX_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const REGEX_PHONE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,8}$/im;
    const REGEX_FLOOR = /^[0-9]{1,8}$/im;
    const REGEX_RATING = /^[1-5]{1}$/im;

    /**
     * Returns the search delay.
     *
     * @returns {string} delay.
     *
     * @public
     */
    this.getSearchDelay = function() {
        return SEARCH_DELAY;
    };

    /**
     * Returns the confirmation form.
     *
     * @returns {string} the form.
     *
     * @public
     */
    this.getConfirmationForm = function() {
        return document.querySelector("#" + CONFIRMATION_FORM_ID);
    };

    /**
     * Returns the item name.
     *
     * @returns {string} the item name.
     *
     * @public
     */
    this.getConfirmationName = function() {
        return document.querySelector("#" + CONFIRMATION_NAME_ID);
    };

    /**
     * Returns the button OK.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getConfirmationOK = function() {
        return document.querySelector("#" + CONFIRMATION_OK_BUTTON_ID);
    };

    /**
     * Returns the button Cancel.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getConfirmationCANCEL = function() {
        return document.querySelector("#" + CONFIRMATION_CANCEL_BUTTON_ID);
    };

    /**
     * Returns the Side Panel.
     *
     * @returns {string} the Side Panel.
     *
     * @public
     */
    // Side Panel
    this.getSidePanel = function() {
        return document.querySelector("#" + SIDE_PANEL_WRAPPER_ID);
    };

    /**
     * Returns the side panel arrow.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getSidePanelButton = function() {
        return document.querySelector("#" + SIDE_PANEL_BUTTON_ID);
    };

    /**
     * Returns the preloader.
     *
     * @returns {string} the preloader element.
     *
     * @public
     */
    this.getPreloader = function() {
        return document.querySelector("#" + PRELOADER);
    };

    /**
     * Returns the store list length.
     *
     * @returns {number} the number.
     *
     * @public
     */
    this.getStoreListLength = function() {
        return document.querySelector("#" + STORE_LIST_LENGTH_ID);
    };

    /**
     * Returns the checked element.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreListCheck = function() {
        return document.querySelector(STORE_LIST_CHECK);
    };

    /**
     * Returns the Store List.
     *
     * @returns {string} with elements wrapper.
     *
     * @public
     */
    this.getStoreList = function() {
        return document.querySelector("#" + STORE_LIST_WRAPPER_ID);
    };

    /**
     * Returns the Store List Items.
     *
     * @returns {string} the store element.
     *
     * @public
     */
    this.getStoreListItems = function() {
        return document.querySelectorAll(STORE_LIST_ITEMS);
    };

    /**
     * Returns the Empty Store List.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreListEmpty = function() {
        return document.querySelector("#" + STORE_LIST_EMPTY_ID);
    };

    /**
     * Returns the Store Search Input.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreSearchInput = function() {
        return document.querySelector("#" + STORE_SEARCH_INPUT_ID);
    };

    /**
     * Returns the Store Search Delete Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreSearchDeleteButton = function() {
        return document.querySelector("#" + STORE_SEARCH_DELETE_BUTTON_ID);
    };

    /**
     * Returns the Store Search Reload Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreSearchReloadButton = function() {
        return document.querySelector("#" + STORE_SEARCH_RELOAD_BUTTON_ID);
    };

    /**
     * Returns the Store List Pin Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreListPinButton = function() {
        return document.querySelector("#" + STORE_LIST_PIN_BUTTON_ID);
    };

    /**
     * Returns the Store Delete Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreDeleteButton = function() {
        return document.querySelector("#" + STORE_DELETE_BUTTON_ID);
    };

    /**
     * Returns the Store List Create Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreListCreateButton = function() {
        return document.querySelector("#" + STORE_LIST_CREATE_BUTTON_ID);
    };

    /**
     * Returns the Forms Wrapper.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getFormsWrapper = function() {
        return document.querySelector("#" + FORMS_WRAPPER_ID);
    };

    /**
     * Returns the Store Creation Form.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreCreationForm = function() {
        return document.querySelector("#" + STORE_CREATION_FORM_ID);
    };

    /**
     * Returns the Creation Store Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreCreationFormCreate = function() {
        return document.querySelector("#" + STORE_CREATION_FORM_CREATE_ID);
    };

    /**
     * Returns the Creation Store Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getStoreCreationFormCancel = function() {
        return document.querySelector("#" + STORE_CREATION_FORM_CANCEL_ID);
    };

    /**
     * Returns the Name input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationName = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_NAME_ID);
    };

    /**
     * Returns the Email input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationEmail = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_EMAIL_ID);
    };

    /**
     * Returns the Phone input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationPhone = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_PHONE_ID);
    };

    /**
     * Returns the Address input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationAddress = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_ADDRESS_ID);
    };

    /**
     * Returns the Date input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationDate = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_DATE_ID);
    };

    /**
     * Returns the Floor input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationFloor = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_FLOOR_ID);
    };

    /**
     * Returns the Name input field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationNameError = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_NAME_ERROR_ID);
    };

    /**
     * Returns the Email input error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationEmailError = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_EMAIL_ERROR_ID);
    };

    /**
     * Returns the Phone input error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationPhoneError = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_PHONE_ERROR_ID);
    };

    /**
     * Returns the Address input error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationAddressError = function() {
        return document.querySelector(
            "#" + STORE_FORM_CREATION_ADDRESS_ERROR_ID
        );
    };

    /**
     * Returns the Date input error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationDateError = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_DATE_ERROR_ID);
    };

    /**
     * Returns the Floor input error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreFormCreationFloorError = function() {
        return document.querySelector("#" + STORE_FORM_CREATION_FLOOR_ERROR_ID);
    };

    /**
     * Returns the Store.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStore = function() {
        return document.querySelector("#" + STORE_WRAPPER_ID);
    };

    /**
     * Returns the Empty Store.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getEmptyStore = function() {
        return document.querySelector("#" + EMPTY_STORE_WRAPPER_ID);
    };

    /**
     * Returns the Pin Button.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductListPinButton = function() {
        return document.querySelector("#" + PRODUCT_LIST_PIN_BUTTON_ID);
    };

    /**
     * Returns the contact Email.
     *
     * @returns {string} with element.
     *
     * @public
     */
    // Contacts
    this.getStoreContactsEmail = function() {
        return document.querySelector("#" + STORE_CONTACTS_EMAIL_ID);
    };

    /**
     * Returns the contact Date.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreContactsDate = function() {
        return document.querySelector("#" + STORE_CONTACTS_DATE_ID);
    };

    /**
     * Returns the contact Phone.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreContactsPhone = function() {
        return document.querySelector("#" + STORE_CONTACTS_PHONE_ID);
    };

    /**
     * Returns the contact Area.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreContactsArea = function() {
        return document.querySelector("#" + STORE_CONTACTS_AREA_ID);
    };

    /**
     * Returns the contact Address.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getStoreContactsAddress = function() {
        return document.querySelector("#" + STORE_CONTACTS_ADDRESS_ID);
    };

    /**
     * Returns the Empty Product List.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getEmptyProductList = function() {
        return document.querySelector("#" + EMPTY_PRODUCT_LIST_ID);
    };

    /**
     * Returns the Product List.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductList = function() {
        return document.querySelector("#" + PRODUCTS_WRAPPER_ID);
    };

    /**
     * Returns the Table Header.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getTableHeader = function() {
        return document.querySelector("#" + PRODUCTS_TABLE_HEADER_ID);
    };

    /**
     * Returns the Table Header.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getTableHeaderSelect = function() {
        return document.querySelector(PRODUCTS_TABLE_HEADER_SELECT_ID);
    };

    /**
     * Returns the Header Columns.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getTableHeaderColumns = function() {
        return document.querySelectorAll(PRODUCTS_TABLE_HEADER_COLUMNS);
    };

    /**
     * Returns the Column Length.
     *
     * @returns {number} with element.
     *
     * @public
     */
    this.getProductColumnLength = function() {
        return PRODUCT_COLUMN_NUMBER;
    };

    /**
     * Returns the Product Column Classes.
     *
     * @returns {array} with element.
     *
     * @public
     */
    this.getProductColumnClasses = function() {
        return PRODUCT_CLASSES;
    };

    /**
     * Returns the Search Attribute.
     *
     * @returns {array} with element.
     *
     * @public
     */
    // Search
    this.getProductSearchAttribute = function() {
        return PRODUCT_SEARCH_ATTRIBUTE;
    };

    /**
     * Returns the Search Input.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductSearchInput = function() {
        return document.querySelector("#" + PRODUCT_SEARCH_INPUT_ID);
    };

    /**
     * Returns the Delete Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getProductSearchDeleteButton = function() {
        return document.querySelector("#" + PRODUCT_SEARCH_DELETE_BUTTON);
    };

    /**
     * Returns the Create Button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    // Crate Product
    this.getProductListCreateButton = function() {
        return document.querySelector("#" + PRODUCT_LIST_CREATE_BUTTON_ID);
    };

    /**
     * Returns the button to create a Form .
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getProductCreationForm = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_ID);
    };

    /**
     * Returns the button to create a Form .
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getProductCreationFormTitle = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_TITLE);
    };

    /**
     * Returns the button to Change product.
     *
     * @returns {string} the creation Form.
     *
     * @public
     */
    this.getProductCreationFormChange = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_CHANGE_ID);
    };

    /**
     * Returns the button to Create product.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getProductCreationFormCreate = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_CREATE_ID);
    };

    /**
     * Returns the button to cancel product creation.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getProductCreationFormCancel = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_CANCEL_ID);
    };

    /**
     * Returns the Name creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationName = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_NAME_ID);
    };

    /**
     * Returns the Price creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationPrice = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_PRICE_ID);
    };

    /**
     * Returns the Specs creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationSpecs = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_SPECS_ID);
    };

    /**
     * Returns the Rating creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationRating = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_RATING_ID);
    };

    /**
     * Returns the Supplier creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationSupplier = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_SUPPLIER_ID);
    };

    /**
     * Returns the Made creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationMade = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_MADE_ID);
    };

    /**
     * Returns the Company creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationCompany = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_COMPANY_ID);
    };

    /**
     * Returns the Name error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationStatus = function() {
        return document.querySelector("#" + PRODUCT_CREATION_FORM_STATUS_ID);
    };

    /**
     * Returns the name creation field.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationNameError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_NAME_ERROR_ID
        );
    };

    /**
     * Returns the Price error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationPriceError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_PRICE_ERROR_ID
        );
    };

    /**
     * Returns the Specs error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationSpecsError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_SPECS_ERROR_ID
        );
    };

    /**
     * Returns the Rating error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationRatingError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_RATING_ERROR_ID
        );
    };

    /**
     * Returns the Supplier error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationSupplierError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_SUPPLIER_ERROR_ID
        );
    };

    /**
     * Returns the Made error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationMadeError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_MADE_ERROR_ID
        );
    };

    /**
     * Returns the Company Name error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationCompanyError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_COMPANY_ERROR_ID
        );
    };

    /**
     * Returns the Status error.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getProductFormCreationStatusError = function() {
        return document.querySelector(
            "#" + PRODUCT_CREATION_FORM_STATUS_ERROR_ID
        );
    };

    /**
     * Returns the Filter Panel.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getFilterPanel = function() {
        return document.querySelector("#" + FILTER_PANEL_ID);
    };

    /**
     * Returns the Checked Filter.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getFilterCheck = function() {
        return document.querySelector(FILTER_CHECK);
    };

    /**
     * Returns the Filter Panel Items.
     *
     * @returns {array} with element.
     *
     * @public
     */
    this.getFilterPanelItems = function() {
        return document.querySelectorAll(FILTER_PANEL_ITEMS);
    };

    /**
     * Returns the "ALL" button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getFilterALL = function() {
        return document.querySelector("#" + FILTER_ALL_ID);
    };

    /**
     * Returns the "OK" button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getFilterOK = function() {
        return document.querySelector("#" + FILTER_OK_ID);
    };

    /**
     * Returns the "STORAGE" button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getFilterSTORAGE = function() {
        return document.querySelector("#" + FILTER_STORAGE_ID);
    };

    /**
     * Returns the "OUT" button.
     *
     * @returns {string} the button element.
     *
     * @public
     */
    this.getFilterOUT = function() {
        return document.querySelector("#" + FILTER_OUT_ID);
    };

    /**
     * Returns the Sort Panel.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getSortPanel = function() {
        return document.querySelector("#" + SORT_PANEL);
    };

    /**
     * Returns the Product Panel.
     *
     * @returns {string} with element.
     *
     * @public
     */
    this.getCreateProductPanel = function() {
        return document.querySelector("#" + CREATE_PRODUCT_PANEL);
    };

    /**
     * Returns the RegExp for Name.
     *
     * @returns {RegExp} string.
     *
     * @public
     */
    this.getRegexName = function() {
        return REGEX_NAME;
    };

    /**
     * Returns the RegExp for Email.
     *
     * @returns {RegExp} string.
     *
     * @public
     */
    this.getRegexEmail = function() {
        return REGEX_EMAIL;
    };

    /**
     * Returns the RegExp for Phone.
     *
     * @returns {RegExp} string.
     *
     * @public
     */
    this.getRegexPhone = function() {
        return REGEX_PHONE;
    };

    /**
     * Returns the RegExp for Floor.
     *
     * @returns {RegExp} string.
     *
     * @public
     */
    this.getRegexFloor = function() {
        return REGEX_FLOOR;
    };

    /**
     * Returns the RegExp for Rating.
     *
     * @returns {RegExp} string.
     *
     * @public
     */
    this.getRegexRating = function() {
        return REGEX_RATING;
    };

    this.productFormValues = [
        this.getProductFormCreationName(),
        this.getProductFormCreationPrice(),
        this.getProductFormCreationSpecs(),
        this.getProductFormCreationRating(),
        this.getProductFormCreationSupplier(),
        this.getProductFormCreationMade(),
        this.getProductFormCreationCompany()
    ];
    this.productFormErrors = [
        this.getProductFormCreationNameError(),
        this.getProductFormCreationPriceError(),
        this.getProductFormCreationSpecsError(),
        this.getProductFormCreationRatingError(),
        this.getProductFormCreationSupplierError(),
        this.getProductFormCreationMadeError(),
        this.getProductFormCreationCompanyError()
    ];

    this.storeFormValues = [
        this.getStoreFormCreationName(),
        this.getStoreFormCreationEmail(),
        this.getStoreFormCreationPhone(),
        this.getStoreFormCreationAddress(),
        this.getStoreFormCreationDate(),
        this.getStoreFormCreationFloor()
    ];
    this.storeFormErrors = [
        this.getStoreFormCreationNameError(),
        this.getStoreFormCreationEmailError(),
        this.getStoreFormCreationPhoneError(),
        this.getStoreFormCreationAddressError(),
        this.getStoreFormCreationDateError(),
        this.getStoreFormCreationFloorError()
    ];

    /**
     * Delete confirmation.
     *
     * @public
     */
    this.toggleConfirmation = () => {
        this.getConfirmationForm().classList.toggle("hide");
    };

    /**
     * Show Product Form.
     *
     * @param {string} title the array of options.
     *
     * @public
     */
    this.showProductForm = title => {
        if (this) {
            this.getProductCreationFormCreate().classList.remove("hide");
        }
        this.getProductCreationFormTitle().innerHTML = title;
        this.getFormsWrapper().classList.toggle("hide");
        this.getProductCreationForm().classList.toggle("hide");
    };

    /**
     * Hide Product Form.
     *
     * @public
     */
    this.hideProductForm = () => {
        this.getFormsWrapper().classList.toggle("hide");
        this.getProductCreationForm().classList.toggle("hide");
        this.productFormValues.forEach(item => {
            item.value = "";
            item.classList.remove("invalid");
        });
        this.productFormErrors.forEach(item => {
            item.classList.add("hidden");
        });

        this.getProductCreationFormCreate().classList.add("hide");
        this.getProductCreationFormChange().classList.add("hide");
    };

    /**
     * Show Store Form.
     *
     * @public
     */
    this.showStoreForm = function() {
        this.getFormsWrapper().classList.toggle("hide");
        this.getStoreCreationForm().classList.toggle("hide");
    };

    /**
     * Hide Store Form.
     *
     * @public
     */
    this.hideStoreForm = async () => {
        this.getFormsWrapper().classList.toggle("hide");
        this.getStoreCreationForm().classList.toggle("hide");
        this.storeFormValues.forEach(item => {
            item.value = "";
            item.classList.remove("invalid");
        });
        this.storeFormErrors.forEach(item => {
            item.classList.add("hidden");
        });
    };

    /**
     * Show deletion confirmation.
     *
     * @public
     */
    this.deleteStore = () => {
        // Confirmation
        if (this.getStoreListCheck()) {
            this.getConfirmationName().innerHTML = "store";
            this.getConfirmationForm().classList.toggle("hide");
        }
    };

    /**
     * Get store form data.
     *
     * @returns {Object} store form data.
     *
     * @public
     */
    this.getStoreFormData = async () => {
        let data = {
            Name: this.getStoreFormCreationName().value,
            Email: this.getStoreFormCreationEmail().value,
            PhoneNumber: this.getStoreFormCreationPhone().value,
            Address: this.getStoreFormCreationAddress().value,
            Established: this.getStoreFormCreationDate().value,
            FloorArea: this.getStoreFormCreationFloor().value
        };
        return data;
    };

    /**
     * Get product form data.
     *
     * @returns {Object} product form data.
     *
     * @public
     */
    this.getProductFormData = async () => {
        let data = {
            Name: this.getProductFormCreationName().value,
            Price: this.getProductFormCreationPrice().value,
            Specs: this.getProductFormCreationSpecs().value,
            Rating: this.getProductFormCreationRating().value,
            SupplierInfo: this.getProductFormCreationSupplier().value,
            MadeIn: this.getProductFormCreationMade().value,
            ProductionCompanyName: this.getProductFormCreationCompany().value,
            Status: this.getProductFormCreationStatus().value
        };
        return data;
    };

    /**
     * Generating parameters after clearing the search.
     *
     * @async
     *
     * @returns {Array} search parameters.
     *
     * @public
     */
    this.clearProductSearch = async () => {
        let sortOptions = null;
        let sortDirection = null;
        let filterOptions = this.getFilterCheck().dataset.filter;
        let searchWord = "";

        // If Sort Selected
        if (this.getTableHeaderSelect()) {
            sortOptions = this.getTableHeaderSelect().dataset.sort;
            sortDirection = this.getTableHeaderSelect().dataset.sortDirection;
        }

        // Clear Search Input
        this.getProductSearchInput().value = "";
        this.getProductSearchDeleteButton().classList.add("hide");

        return [filterOptions, sortOptions, sortDirection, searchWord];
    };

    /**
     * Store list background toggle.
     *
     * @param {Event} elemTarget the DOM event object.
     *
     * @public
     */
    this.toggleStorList = elemTarget => {
        let storeListItems = this.getStoreListItems();
        storeListItems.forEach(li => {
            li.classList.remove("list-checked");
        });
        elemTarget.closest("li").classList.add("list-checked");
    };

    /**
     * Delete Product .
     *
     * @param {Event} e the DOM event object.
     *
     * @public
     */
    this.deleteProduct = () => {
        this.getConfirmationName().innerHTML = "product";
        this.getConfirmationForm().classList.toggle("hide");
    };

    /**
     * Scroll Page.
     *
     * @param {Event} e the DOM event object.
     *
     * @public
     */
    this.changeControlsDisplay = function(e) {
        const mainControlPanel = document.querySelector(`
                                .${e.target.classList.value} .navbar-control`);

        if (mainControlPanel.offsetTop > 135) {
            mainControlPanel.classList.add("transition-controls");
        } else {
            mainControlPanel.classList.remove("transition-controls");
        }
    };

    /**
     * Pin Store List Panel.
     *
     * @public
     */
    this.pinStoreListPanel = function() {
        this.getSidePanel().classList.toggle("store-list-pin");
    };

    /**
     * Pin Store Panel.
     *
     * @public
     */
    this.pinProductListPanel = function() {
        this.getStore().classList.toggle("product-list-pin");
    };

    /**
     * Side panel toggle.
     *
     * @public
     */
    this.onSideButtonClick = function() {
        // Clicked
        if (this.getSidePanel().classList.contains("hide")) {
            this.getSidePanel().classList.remove("hide");
            this.getCreateProductPanel().classList.remove("full-size");
            // Button
            this.getSidePanelButton().classList.remove("side-control-hide");
            // Shadow
            if (document.documentElement.clientWidth < 993) {
                this.getEmptyStore().classList.add("navbar-shadow");
                this.getStore().classList.add("navbar-shadow");
            }
        } else {
            this.getSidePanel().classList.add("hide");
            this.getCreateProductPanel().classList.add("full-size");
            this.getSidePanelButton().classList.add("side-control-hide");
            // Shadow
            this.getEmptyStore().classList.remove("navbar-shadow");
            this.getStore().classList.remove("navbar-shadow");
        }
    };

    /**
     * Sidebar toggle.
     *
     * @public
     */
    this.displaySidebar = function() {
        if (document.documentElement.clientWidth > 992) {
            this.getSidePanel().classList.remove("hide");
            this.getSidePanelButton().classList.remove("side-control-hide");
            this.getEmptyStore().classList.remove("navbar-shadow");
            this.getStore().classList.remove("navbar-shadow");
            this.getCreateProductPanel().classList.remove("full-size");
        } else {
            this.getStore().classList.remove("navbar-shadow");
            this.getSidePanel().classList.add("hide");
            this.getSidePanelButton().classList.add("side-control-hide");
            this.getCreateProductPanel().classList.add("full-size");
        }
    };

    /**
     * Get sort options.
     *
     * @param {Event} e the DOM event object.
     *
     * @return {Array} the array of options.
     *
     * @public
     */
    this.sortTable = async e => {
        let sortOptions = e.target.closest("td").dataset.sort;
        let sortDirection = null;
        let filterOptions = this.getFilterCheck().dataset.filter;
        let searchWord = this.getProductSearchInput().value.trim();

        // Select Sorting Options (Header)
        if (
            !e.target.closest("td").classList.contains("product-head-select") &&
            !e.target.closest("td").classList.contains("sort-arrow-rotate")
        ) {
            // DESC
            this.removeHeaderSelection();
            e.target.closest("td").classList.add("product-head-select");
            e.target.closest("td").dataset.sortDirection = "DESC";
            sortDirection = "DESC";
        } else if (
            e.target.closest("td").classList.contains("product-head-select") &&
            !e.target.closest("td").classList.contains("sort-arrow-rotate")
        ) {
            // ASC
            e.target.closest("td").classList.add("sort-arrow-rotate");
            e.target.closest("td").dataset.sortDirection = "ASC";
            sortDirection = "ASC";
        } else {
            // None Direction
            e.target.closest("td").classList.remove("product-head-select");
            e.target.closest("td").classList.remove("sort-arrow-rotate");
            e.target.closest("td").dataset.sortDirection = "none-direction";
            sortDirection = null;
        }

        return [filterOptions, sortOptions, sortDirection, searchWord];
    };

    /**
     * Generates search parameters.
     *
     * @async
     *
     * @param {Event} e the DOM event object.
     *
     * @returns {Array} search parameters.
     *
     * @public
     */
    this.searchProduct = async e => {
        let searchWord = e.target.value.trim();
        let sortOptions = null;
        let sortDirection = null;
        let filterOptions = this.getFilterCheck().dataset.filter;

        // If Sort Selected
        if (this.getTableHeaderSelect()) {
            sortOptions = this.getTableHeaderSelect().dataset.sort;
            sortDirection = this.getTableHeaderSelect().dataset.sortDirection;
        }

        return [filterOptions, sortOptions, sortDirection, searchWord];
    };

    /**
     * Change Filter Panel Data.
     *
     * @param {Array} data the array of options.
     *
     *
     * @public
     */
    this.createFilterData = function(data) {
        this.getFilterALL().innerHTML = data[0];
        this.getFilterOK().innerHTML = data[1];
        this.getFilterSTORAGE().innerHTML = data[2];
        this.getFilterOUT().innerHTML = data[3];
    };

    /**
     * Display Store Search Buttons.
     *
     * @public
     */
    this.displayStoreSearchButton = function() {
        if (this.getStoreSearchInput().value.trim() !== "") {
            this.getStoreSearchDeleteButton().classList.remove("hide");
            this.getStoreSearchReloadButton().classList.add("hide");
        } else {
            this.getStoreSearchDeleteButton().classList.add("hide");
            this.getStoreSearchReloadButton().classList.remove("hide");
        }
    };

    /**
     * Clear Store Search.
     *
     * @public
     */
    this.clearStoreSearch = async function() {
        // Clear Search Input
        this.getStoreSearchInput().value = "";
        this.getStoreSearchDeleteButton().classList.add("hide");
        this.getStoreSearchReloadButton().classList.remove("hide");
    };

    /**
     * Reload Store Search.
     *
     * @public
     */
    this.reloadStoreList = async function() {
        // Hide Selected Store
        this.getStore().classList.add("hide");
        this.getEmptyStore().classList.remove("hide");
    };

    /**
     * Show Select Store.
     *
     * @param {string} storeID store id.
     *
     * @public
     */
    this.showStore = storeID => {
        // Show Store
        this.getEmptyStore().classList.add("hide");
        this.getStore().classList.remove("hide");
        this.getStoreList().dataset.storeId = storeID;
        // Clear Search Input
        this.getProductSearchInput().value = "";

        // Remove Table Header Selection
        this.removeHeaderSelection();

        // Clear Filter Toggle
        this.getFilterPanelItems().forEach(function(item) {
            item.classList.remove("filter-check");
        });
        // Select "ALL" Button
        this.getFilterPanelItems()[0].classList.add("filter-check");
    };

    /**
     * Filter toggle.
     *
     * @param {Event} e the DOM event object.
     *
     * @returns {String} filter attribute
     *
     * @public
     */
    this.toggleFilter = async e => {
        let targetFilter = e.target.closest("li");
        let targetFilterAttribute = targetFilter.dataset.filter;

        // Select Filter
        this.getFilterPanelItems().forEach(function(item) {
            item.classList.remove("filter-check");
        });
        targetFilter.classList.add("filter-check");

        // Remove Table Header Selection
        this.removeHeaderSelection();

        // Remove Table Header Selection
        this.getProductSearchInput().value = "";

        return targetFilterAttribute;
    };

    /**
     * Remove Table Header Selection.
     *
     * @public
     */
    this.removeHeaderSelection = function() {
        this.getTableHeaderColumns().forEach((element, i) => {
            this.getTableHeaderColumns()[i].classList.remove(
                "product-head-select"
            );
            this.getTableHeaderColumns()[i].classList.remove(
                "sort-arrow-rotate"
            );
        });
    };

    /**
     * Display product search button.
     *
     * @public
     */
    this.displayProductSearchButton = function() {
        if (this.getProductSearchInput().value.trim() !== "") {
            this.getProductSearchDeleteButton().classList.remove("hide");
        } else {
            this.getProductSearchDeleteButton().classList.add("hide");
        }
    };

    /**
     * Check  the form to create a store.
     *
     * @public
     */
    this.checkStoreForm = () => {
        this.getStoreCreationForm().dataset.storeFormValid = "valid";
        this.storeFormValues.forEach(item => {
            item.classList.remove("invalid");
        });
        this.storeFormErrors.forEach(item => {
            item.classList.add("hidden");
        });

        // Name
        if (
            !this.getRegexName().test(
                String(this.getStoreFormCreationName().value).toLowerCase()
            )
        ) {
            this.getStoreCreationForm().dataset.storeFormValid = "invalid";
            this.getStoreFormCreationName().classList.add("invalid");
            this.getStoreFormCreationNameError().classList.remove("hidden");
        }
        // Email
        if (
            !this.getRegexEmail().test(
                String(this.getStoreFormCreationEmail().value).toLowerCase()
            )
        ) {
            this.getStoreCreationForm().dataset.storeFormValid = "invalid";
            this.getStoreFormCreationEmail().classList.add("invalid");
            this.getStoreFormCreationEmailError().classList.remove("hidden");
        }
        // Phone (phone.length = 10...14 + only number)
        if (
            !this.getRegexPhone().test(
                String(this.getStoreFormCreationPhone().value)
            )
        ) {
            this.getStoreCreationForm().dataset.storeFormValid = "invalid";
            this.getStoreFormCreationPhone().classList.add("invalid");
            this.getStoreFormCreationPhoneError().classList.remove("hidden");
        }
        // Address
        if (this.getStoreFormCreationAddress().value === "") {
            this.getStoreCreationForm().dataset.storeFormValid = "invalid";
            this.getStoreFormCreationAddress().classList.add("invalid");
            this.getStoreFormCreationAddressError().classList.remove("hidden");
        }
        // Date
        if (this.getStoreFormCreationDate().value === "") {
            this.getStoreCreationForm().dataset.storeFormValid = "invalid";
            this.getStoreFormCreationDate().classList.add("invalid");
            this.getStoreFormCreationDateError().classList.remove("hidden");
        }
        // Floor Area
        if (
            !this.getRegexFloor().test(
                String(this.getStoreFormCreationFloor().value)
            )
        ) {
            this.getStoreCreationForm().dataset.storeFormValid = "invalid";
            this.getStoreFormCreationFloor().classList.add("invalid");
            this.getStoreFormCreationFloorError().classList.remove("hidden");
        }
    };

    /**
     * Check  the form to create a product.
     *
     * @public
     */
    this.checkProductForm = () => {
        this.getProductCreationForm().dataset.storeFormValid = "valid";
        this.productFormValues.forEach(item => {
            item.classList.remove("invalid");
        });
        this.productFormErrors.forEach(item => {
            item.classList.add("hidden");
        });

        // Name
        if (
            !this.getRegexName().test(
                String(this.getProductFormCreationName().value).toLowerCase()
            )
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationName().classList.add("invalid");
            this.getProductFormCreationNameError().classList.remove("hidden");
        }
        // Price
        if (
            !this.getRegexFloor().test(
                String(this.getProductFormCreationPrice().value).toLowerCase()
            )
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationPrice().classList.add("invalid");
            this.getProductFormCreationPriceError().classList.remove("hidden");
        }
        // Specs
        if (
            this.getProductFormCreationSpecs().value === "" ||
            this.getProductFormCreationSpecs().value.length > 255
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationSpecs().classList.add("invalid");
            this.getProductFormCreationSpecsError().classList.remove("hidden");
        }
        // Rating
        if (
            !this.getRegexRating().test(
                String(this.getProductFormCreationRating().value).toLowerCase()
            )
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationRating().classList.add("invalid");
            this.getProductFormCreationRatingError().classList.remove("hidden");
        }
        // Supplier
        if (
            this.getProductFormCreationSupplier().value === "" ||
            this.getProductFormCreationSupplier().value.length > 255
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationSupplier().classList.add("invalid");
            this.getProductFormCreationSupplierError().classList.remove(
                "hidden"
            );
        }
        // Made In
        if (
            !this.getRegexName().test(
                String(this.getProductFormCreationMade().value)
            ) ||
            this.getProductFormCreationMade().value.length > 30
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationMade().classList.add("invalid");
            this.getProductFormCreationMadeError().classList.remove("hidden");
        }
        // Company
        if (
            !this.getRegexName().test(
                String(this.getProductFormCreationCompany().value)
            ) ||
            this.getProductFormCreationCompany().value.length > 30
        ) {
            this.getProductCreationForm().dataset.storeFormValid = "invalid";
            this.getProductFormCreationCompany().classList.add("invalid");
            this.getProductFormCreationCompanyError().classList.remove(
                "hidden"
            );
        }
    };
}
