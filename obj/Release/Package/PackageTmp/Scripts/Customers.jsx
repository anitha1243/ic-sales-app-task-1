const { Icon, Menu, Table, Pagination } = semanticUIReact
class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: this.props.customers.slice(0, 5),
            begin: 0,
            end: 5,
            activePage: 1,
            pageCount: Math.ceil(this.props.customers.length / 5),
            custUp: ""
        }

        this.btnClick = this.btnClick.bind(this);
        this.updateCust = this.updateCust.bind(this);
    }

    componentDidMount() {
        this.props.pageType(sessionStorage.getItem('activeIndex'));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            customers: nextProps.customers.slice(this.state.begin, this.state.end)
        })
    }

    updateCust(custUpdate) {
        this.setState({
            custUp: custUpdate
        })
    }

    async btnClick(
        event,
        data
    ) {
        await this.setState({ activePage: data.activePage });
        await this.setState({ begin: this.state.activePage * 5 - 5 });
        await this.setState({ end: this.state.activePage * 5 });
        await this.setState({
            customers: this.props.customers.slice(this.state.begin, this.state.end),
        });
    }
    
    render() {
        let serviceList = this.state.customers;
        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <Table.Row key={service.ID}>
                    <Table.Cell>{service.Name}</Table.Cell>
                    <Table.Cell>{service.Address}</Table.Cell>
                    <Table.Cell><EditModalButton pageType="Customer" name={service.Name} address={service.Address} recId={service.ID} loadCusts={this.props.loadCusts} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Customer" recId={service.ID} loadCusts={this.props.loadCusts} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Customer" loadCusts={this.props.loadCusts} />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tableData}
                    </Table.Body>

                    <Pagination
                        defaultActivePage={1}
                        totalPages={this.state.pageCount}
                        onPageChange={this.btnClick}
                    />
                </Table>
            </React.Fragment>

        );
    }
}
