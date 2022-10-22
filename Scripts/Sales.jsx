class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: []
        };

        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
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

            request.open("GET", "/Sale/Index", false);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                console.log(request);
                if (request.readyState == 4 && request.status == 200) {
                    const obj = JSON.parse(request.responseText);
                    console.log(obj);
                    this.setState({ serviceList: obj });
                }
            }.bind(this);
            request.send();
        }
    }
   
    render() {
        let serviceList = this.state.serviceList;
        let tableData = null;
        /*let stores = null;
        let customers = null;
        let products = null;
        serviceList.map(s => {

        })*/

        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <Table.Row key={service.ID}>
                    <Table.Cell>{service.Customer.Name}</Table.Cell>
                    <Table.Cell>{service.Store.Name}</Table.Cell>
                    <Table.Cell>{service.Product.Name}</Table.Cell>
                    <Table.Cell>{service.DateSold}</Table.Cell>
                    <Table.Cell><EditModalButton pageType="Sale" CustomerID={service.CustomerID} StoreID={service.StoreID} ProductID={service.ProductID} DateSold={service.DateSold} recId={service.ID} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Sale" recId={service.ID} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Sale" />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>CustomerID</Table.HeaderCell>
                            <Table.HeaderCell>StoreID</Table.HeaderCell>
                            <Table.HeaderCell>ProductID</Table.HeaderCell>
                            <Table.HeaderCell>DateSold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tableData}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </React.Fragment>

        );
    }
}

/*ReactDOM.render(
    <ReactAJAX />,
    document.getElementById('dvMessage')
);*/ 