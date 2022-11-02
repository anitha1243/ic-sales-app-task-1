class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            begin: 0,
            end: 5,
            activePage: 1            
        };

        this.loadData = this.loadData.bind(this);
        this.btnClick = this.btnClick.bind(this);
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
                    this.setState({ serviceList: obj });
                }
            }.bind(this);
            request.send();
        }
    }

    async btnClick(
        event,
        data
    ) {
        await this.setState({ activePage: data.activePage });
        await this.setState({ begin: this.state.activePage * 5 - 5 });
        await this.setState({ end: this.state.activePage * 5 });
        await this.setState({
            serviceList: this.props.serviceList.slice(this.state.begin, this.state.end),
        });
    }
   
    render() {
        let serviceList = this.state.serviceList.slice(0, 5);
        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <Table.Row key={service.ID}>
                    <Table.Cell>{service.Customer.Name}</Table.Cell>
                    <Table.Cell>{service.Store.Name}</Table.Cell>
                    <Table.Cell>{service.Product.Name}</Table.Cell>
                    <Table.Cell>{moment(service.DateSold).format('DD/MM/YYYY')}</Table.Cell>
                    <Table.Cell><EditModalButton pageType="Sale" CustomerID={service.CustomerID} StoreID={service.StoreID} ProductID={service.ProductID} DateSold={service.DateSold} recId={service.ID} DateSold={service.DateSold}
                        customers={this.props.customers} products={this.props.products} stores={this.props.stores} CustomerName={service.Customer.Name} StoreName={service.Store.Name} ProductName={service.Product.Name} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Sale" recId={service.ID} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Sale" customers={this.props.customers} products={this.props.products} stores={this.props.stores} />
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

                    <Pagination
                        defaultActivePage={1}
                        totalPages={Math.ceil(this.state.serviceList.length / 5)}
                        onPageChange={this.btnClick}
                    />
                </Table>
            </React.Fragment>

        );
    }
}
