/**
 *
 * @constructor
 */
export function Model() {
    /**
     * Api prefix for server requests.
     * @type {string}
     *
     * @private
     */
    this._apiPrefix = "http://localhost:3000/api/";

    /**
     * Object with filters for searching in rest API.
     * @type {Object}
     *
     * @example {key, "value"};
     *
     * @private
     */
    this._apiValue = {
        Filter: "filter[where][Status]=",
        Name: "filter[where][or][1][Name][regexp]=",
        Price: "&filter[where][or][2][Price][like]=",
        Specs: "&filter[where][or][3][Specs][regexp]=",
        SupplierInfo: "&filter[where][or][4][SupplierInfo][regexp]=",
        MadeIn: "&filter[where][or][5][MadeIn][regexp]=",
        ProductionCompanyName:
            "&filter[where][or][6][ProductionCompanyName][regexp]=",
        Rating: "&filter[where][or][7][Rating][like]=",
        StoreId: "&filter[where][or][8][id][like]="
    };

    /**
     * Store data object.
     * @type {Object}
     *
     * @example {key, "value"};
     *
     * @private
     */
    this.Stores = null;

    /**
     * Product data object.
     * @type {Object}
     *
     * @example {key, "value"};
     *
     * @private
     */
    this.Products = null;

    /**
     * Makes a request to the server and get the list of stores.
     *
     * @async
     *
     * @param {string} searchWord string.
     *
     * @returns {Object} store data object.
     *
     * @public
     */
    this.fetchStoreList = async function(searchWord = null) {
        if (searchWord) {
            const data = await fetch(
                `${this._apiPrefix}Stores?filter[where][or][0][Name][regexp]=${searchWord}` +
                    `&filter[where][or][1][Address][regexp]=${searchWord}` +
                    `&filter[where][or][2][FloorArea][like]=${searchWord}`
            );
            return data.json();
        } else {
            const data = await fetch(`${this._apiPrefix}Stores`);
            return data.json();
        }
    };

    /**
     * Get a search word and transforms it.
     *
     * @async
     *
     * @param {Event} word the DOM event object.
     *
     * @returns {string} store data object.
     *
     * @public
     */
    this.searchStore = async function(word) {
        // Input Value
        let searchWord = word.target.value.trim();
        // If Number
        if (!+searchWord && searchWord !== "") {
            searchWord = new RegExp(word.target.value, "gi");
        }
        // Value Validation
        if (searchWord !== "") {
            return searchWord;
        } else {
            return null;
        }
    };

    /**
     * Makes a request to delete the store.
     *
     * @async
     *
     * @param {Object} data from store.
     *
     * @public
     */
    this.createStore = async data => {
        fetch(`${this._apiPrefix}Stores/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            this.fetchStoreList();
        });
    };

    /**
     * Makes a request to delete a store.
     *
     * @async
     *
     * @param {string} storeID string.
     *
     * @public
     */
    this.deleteStore = async storeID => {
        fetch(`${this._apiPrefix}Stores/${storeID}/`, {
            method: "DELETE"
        });
    };

    /**
     * Fetch list of products.
     *
     * @async
     *
     * @param {string} storeID string.
     * @param {string} filterOptions string.
     *
     * @returns {Promise} the promise object will be resolved after the products are loaded.
     *
     * @public
     */
    this.fetchProducts = async function(storeID, filterOptions = null) {
        if (!filterOptions || filterOptions === "ALL") {
            const data = await fetch(
                `${this._apiPrefix}Stores/${storeID}/rel_Products`
            );
            return data.json();
        } else {
            const data = await fetch(
                `${this._apiPrefix}Stores/${storeID}/rel_Products?filter[where]
                [Status]=${filterOptions}`
            );
            return data.json();
        }
    };

    /**
     * Fetch list of products with selected parameters.
     *
     * @async
     *
     * @param {string} productsURL string (generated url).
     *
     * @public
     */
    this.fetchSelectProducts = async function(productsURL) {
        const data = await fetch(`${productsURL}`);
        return data.json();
    };

    /**
     * Fetch store list.
     *
     * @async
     *
     * @param {string} storeID string.
     * @param {string} data form.
     *
     * @public
     */
    this.createProduct = async (storeID, data) => {
        fetch(`${this._apiPrefix}/Stores/${storeID}/rel_Products`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            this.fetchProducts(storeID);
        });
    };

    /**
     * Makes a product change request.
     *
     * @async
     *
     * @param {string} storeID string.
     * @param {string} productID string.
     * @param {Object} data form.
     *
     * @public
     */
    this.changeProduct = async (storeID, productID, data) => {
        fetch(
            `${this._apiPrefix}/Stores/${storeID}/rel_Products/${productID}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(() => {
            this.fetchProducts(storeID);
        });
    };

    /**
     * Makes a request to delete a product.
     *
     * @async
     *
     * @param {string} storeID string.
     * @param {string} productID string.
     *
     * @public
     */
    this.deleteProduct = async (storeID, productID) => {
        return fetch(`${this._apiPrefix}Stores/${storeID}/rel_Products/${productID}`, {
            method: "DELETE"
        });
    };

    /**
     * Calculates filter parameters.
     *
     * @returns {Array} filter parameters.
     *
     * @public
     */
    this.calculateFilters = function() {
        let all = this.Products.length,
            ok = 0,
            storage = 0,
            out = 0;

        this.Products.forEach(function(item) {
            if (item.Status === "OK") {
                ok++;
            }
            if (item.Status === "STORAGE") {
                storage++;
            }
            if (item.Status === "OUT_OF_STOCK") {
                out++;
            }
        });

        return [all, ok, storage, out];
    };

    /**
     * Generates URL for search.
     *
     * @param {string} storeID store ID.
     * @param {string} filterOptions filter options.
     * @param {string} sortOptions sort options.
     * @param {string} sortDirection sort direction.
     * @param {string} searchWord search word.
     *
     * @returns {string} product URL.
     *
     * @public
     */
    this.generateProductURL = function(
        storeID,
        filterOptions,
        sortOptions,
        sortDirection,
        searchWord
    ) {
        let productsURL = null;
        // if Value not Number
        if (!+searchWord && searchWord !== "") {
            searchWord = new RegExp(searchWord, "gi");
        }
        if (filterOptions === "ALL" && searchWord && sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?filter[order]` +
                `[0]=${sortOptions}%20${sortDirection}` +
                `&${this._apiValue.Name}${searchWord}` +
                `${this._apiValue.Price}${searchWord}` +
                `${this._apiValue.Specs}${searchWord}` +
                `${this._apiValue.SupplierInfo}${searchWord}` +
                `${this._apiValue.MadeIn}${searchWord}` +
                `${this._apiValue.ProductionCompanyName}${searchWord}` +
                `${this._apiValue.Rating}${searchWord}` +
                `${this._apiValue.StoreId}${searchWord}`;
        }
        if (filterOptions === "ALL" && searchWord && !sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?filter[order]` +
                `&${this._apiValue.Name}${searchWord}` +
                `${this._apiValue.Price}${searchWord}` +
                `${this._apiValue.Specs}${searchWord}` +
                `${this._apiValue.SupplierInfo}${searchWord}` +
                `${this._apiValue.MadeIn}${searchWord}` +
                `${this._apiValue.ProductionCompanyName}${searchWord}` +
                `${this._apiValue.Rating}${searchWord}` +
                `${this._apiValue.StoreId}${searchWord}`;
        }
        if (filterOptions === "ALL" && !searchWord && sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?` +
                "filter[order]" +
                `[0]=${sortOptions}%20${sortDirection}`;
        }
        if (filterOptions === "ALL" && !searchWord && !sortDirection) {
            productsURL = `${this._apiPrefix}Stores/${storeID}/rel_Products`;
        }

        if (filterOptions !== "ALL" && searchWord && sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?` +
                `${this._apiValue.Filter}${filterOptions}&filter[order]` +
                `[0]=${sortOptions}%20${sortDirection}` +
                `&${this._apiValue.Name}${searchWord}` +
                `${this._apiValue.Price}${searchWord}` +
                `${this._apiValue.Specs}${searchWord}` +
                `${this._apiValue.SupplierInfo}${searchWord}` +
                `${this._apiValue.MadeIn}${searchWord}` +
                `${this._apiValue.ProductionCompanyName}${searchWord}` +
                `${this._apiValue.Rating}${searchWord}` +
                `${this._apiValue.StoreId}${searchWord}`;
        }
        if (filterOptions !== "ALL" && searchWord && !sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?` +
                `${this._apiValue.Filter}${filterOptions}` +
                `&${this._apiValue.Name}${searchWord}` +
                `${this._apiValue.Price}${searchWord}` +
                `${this._apiValue.Specs}${searchWord}` +
                `${this._apiValue.SupplierInfo}${searchWord}` +
                `${this._apiValue.MadeIn}${searchWord}` +
                `${this._apiValue.ProductionCompanyName}${searchWord}` +
                `${this._apiValue.Rating}${searchWord}` +
                `${this._apiValue.StoreId}${searchWord}`;
        }
        if (filterOptions !== "ALL" && !searchWord && sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?` +
                `${this._apiValue.Filter}${filterOptions}&filter[order]` +
                `[0]=${sortOptions}%20${sortDirection}`;
        }
        if (filterOptions !== "ALL" && !searchWord && !sortDirection) {
            productsURL =
                `${this._apiPrefix}Stores/${storeID}/rel_Products?` +
                `${this._apiValue.Filter}${filterOptions}`;
        }

        return productsURL;
    };
}
