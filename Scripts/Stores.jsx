class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: this.props.stores.slice(0, 5),
            begin: 0,
            end: 5,
            activePage: 1,
            pageCount: Math.ceil(this.props.stores.length / 5),
            activeIndexStore: sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : this.props.activeIndexStore
        }

        this.btnClick = this.btnClick.bind(this);
    }  

    componentDidMount() {
        this.didMount = true;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stores: nextProps.stores.slice(this.state.begin, this.state.end),
            begin: 0,
            end: 5,
            activePage: 1,
            pageCount: Math.ceil(nextProps.stores.length / 5),
            activeIndexStore: nextProps.activeIndexStore
        })
    }

    componentDidUpdate() {
        if (this.didMount && !this.didReceiveProps) {
            this.setState({
                stores: this.props.stores.slice(0, 5),
                begin: 0,
                end: 5,
                activePage: 1,
                pageCount: Math.ceil(this.props.stores.length / 5),
                activeIndexStore: this.props.activeIndexStore
            });
        }

        this.didMount = false
    }

    async btnClick(
        event,
        data
    ) {
        await this.setState({ activePage: data.activePage });
        await this.setState({ begin: this.state.activePage * 5 - 5 });
        await this.setState({ end: this.state.activePage * 5 });
        await this.setState({
            stores: this.props.stores.slice(this.state.begin, this.state.end),
        });
    }
   
    render() {
        let serviceList = this.state.stores;
        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <Table.Row key={service.ID}>
                    <Table.Cell>{service.Name}</Table.Cell>
                    <Table.Cell>{service.Address}</Table.Cell>
                    <Table.Cell><EditModalButton pageType="Store" name={service.Name} address={service.Address} recId={service.ID} loadStores={this.props.loadStores} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Store" recId={service.ID} loadStores={this.props.loadStores} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Store" loadStores={this.props.loadStores} activePageIndex={this.state.activeIndexStore} />
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

/*ReactDOM.render(
    <ReactAJAX />,
    document.getElementById('dvMessage')
); */