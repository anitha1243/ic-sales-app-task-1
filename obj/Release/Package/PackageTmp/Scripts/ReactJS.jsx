const { Tab } = semanticUIReact
class ReactAJAX extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            recChange: "",
            customers: [],
            stores: [],
            products: [],
            panes: [
                {
                    menuItem: 'React',
                    render: () => <Tab.Pane attached={false}><Customers customers={this.state.customers} updateRec={this.updateRec} /></Tab.Pane>,
                },
                {
                    menuItem: 'Customers',
                    render: () => <Tab.Pane attached={false}><Customers customers={this.state.customers} updateRec={this.updateRec} /></Tab.Pane>,
                },
                {
                    menuItem: 'Products',
                    render: () => <Tab.Pane attached={false}><Products products={this.state.products} /></Tab.Pane>,
                },
                {
                    menuItem: 'Stores',
                    render: () => <Tab.Pane attached={false}><Stores stores={this.state.stores} /></Tab.Pane>,
                },
                {
                    menuItem: 'Sales',
                    render: () => <Tab.Pane attached={false}><Sales customers={this.state.customers} products={this.state.products} stores={this.state.stores} /></Tab.Pane>,
                }
            ]
        };

        this.loadCustomerData = this.loadCustomerData.bind(this);
        this.loadProductData = this.loadProductData.bind(this);
        this.loadStoreData = this.loadStoreData.bind(this);
        this.updateRec = this.updateRec.bind(this);
    }

    componentDidMount() {
        this.loadCustomerData();
        this.loadProductData();
        this.loadStoreData();
    }

    updateRec(rec) {
        this.setState({ recChange: rec });
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
                    console.log(obj);
                    this.setState({ stores: obj });
                    console.log(this.state.stores);
                }
            }.bind(this);
            request.send();
        }
    }     
   
    render() {

        return (
            <React.Fragment>
                <Tab
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