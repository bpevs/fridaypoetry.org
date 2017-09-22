declare global  {
    interface Window {
        __FRIDAY_POETRY__: any;
    }
}
import { Component } from "preact";
export default class App extends Component<{}, {}> {
    private currentUrl;
    constructor();
    render(): JSX.Element;
    private handleRoute(args);
}
