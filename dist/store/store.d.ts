declare global  {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
declare function storeCreator(initialState?: {}, options?: {
    history: null;
}): any;
declare function getStoreRef(): any;
export { getStoreRef, storeCreator as createStore };
export {};
