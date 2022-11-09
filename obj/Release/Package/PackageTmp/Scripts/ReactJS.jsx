const { Tab } = semanticUIReact;

class ReactAJAX extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            activeIndex: document.currentScript.getAttribute('pageType'),
            customers: [],
            stores: [],
            products: [],
            panes: [
                {
                    menuItem: 'React',
                    render: () => <Tab.Pane attached={false} ><Customers customers={this.state.customers} pageType={this.updateActiveIndex} loadCusts={this.loadCustomerData} /></Tab.Pane>,
                },
                {
                    menuItem: 'Customers',
                    render: () => <Tab.Pane attached={false} ><Customers customers={this.state.customers} pageType={this.updateActiveIndex} loadCusts={this.loadCustomerData} /></Tab.Pane>,
                },
                {
                    menuItem: 'Products',
                    render: () => <Tab.Pane attached={false} ><Products products={this.state.products} pageType={this.updateActiveIndex} loadProds={this.loadProductData} /></Tab.Pane>,
                },
                {
                    menuItem: 'Stores',
                    render: () => <Tab.Pane attached={false} ><Stores stores={this.state.stores} pageType={this.updateActiveIndex} loadStores={this.loadStoreData} /></Tab.Pane>,
                },
                {
                    menuItem: 'Sales',
                    render: () => <Tab.Pane attached={false} ><Sales customers={this.state.customers} products={this.state.products} stores={this.state.stores} pageType={this.updateActiveIndex} /></Tab.Pane>,
                }
            ]
        };

        this.loadCustomerData = this.loadCustomerData.bind(this);
        this.loadProductData = this.loadProductData.bind(this);
        this.loadStoreData = this.loadStoreData.bind(this);
        this.updateActiveIndex = this.updateActiveIndex.bind(this); 
    }

    componentDidMount() {
        this.loadCustomerData();
        this.loadProductData();
        this.loadStoreData();
    }

    updateActiveIndex(index) {
        this.setState({
            activeIndex: index
        })
    }

    loadCustomerData() {
        var request;
        if (window.XMLHttpRequest) {
            //New browsers.
            request = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            //Old IE Browsers.
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (request != null) {

            request.open("GET", "/Customer/Index", false);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    const obj = JSON.parse(request.responseText);
                    this.setState({ customers: obj });
                }
            }.bind(this);
            request.send();
        }
    }

    loadProductData() {
        var request;
        if (window.XMLHttpRequest) {
            //New browsers.
            request = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            //Old IE Browsers.
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (request != null) {

            request.open("GET", "/Product/Index", false);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    const obj = JSON.parse(request.responseText);
                    this.setState({ products: obj });
                }
            }.bind(this);
            request.send();
        }
    }

    loadStoreData() {
        var request;
        if (window.XMLHttpRequest) {
            //New browsers.
            request = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            //Old IE Browsers.
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        if (request != null) {

            request.open("GET", "/Store/Index", false);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    const obj = JSON.parse(request.responseText);
                    this.setState({ stores: obj });
                    return obj;
                }
            }.bind(this);
            request.send();
        }
    }     
   
    render() {

        return (
            <React.Fragment>
                <Tab
                    activeIndex={this.state.activeIndex ? this.state.activeIndex : 0}
                    onTabChange={(e, { activeIndex }) => {
                        this.setState({
                            activeIndex,
                        });
                        sessionStorage.setItem('activeIndex', activeIndex);
                    }
                    }
                    menu={{ color:'grey', inverted: true, attached: false, tabular: false }}
                    panes={this.state.panes}
                />
            </React.Fragment>

        );
    }
}

ReactDOM.render(
    <ReactAJAX />,
    document.getElementById('dvMessage')
); 