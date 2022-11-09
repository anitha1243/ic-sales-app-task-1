class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products.slice(0, 5),
            begin: 0,
            end: 5,
            activePage: 1,
            pageCount: Math.ceil(this.props.products.length / 5),
            activeIndexProd: sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : this.props.activeIndexProd
        }

        this.btnClick = this.btnClick.bind(this);
    }

    componentDidMount() {
        this.didMount = true;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products.slice(this.state.begin, this.state.end),
            begin: 0,
            end: 5,
            activePage: 1,
            pageCount: Math.ceil(nextProps.products.length / 5),
            activeIndexProd: nextProps.activeIndexProd
        })
        this.didReceiveProps = true;
    }

    componentDidUpdate() {
        if (this.didMount && !this.didReceiveProps) {
            this.setState({
                products: this.props.products.slice(0, 5),
                begin: 0,
                end: 5,
                activePage: 1,
                pageCount: Math.ceil(this.props.products.length / 5),
                activeIndexProd: this.props.activeIndexProd
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
            products: this.props.products.slice(this.state.begin, this.state.end),
        });
    }
   
    render() {
        let serviceList = this.state.products;
        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <Table.Row key={service.ID}>
                    <Table.Cell>{service.Name}</Table.Cell>
                    <Table.Cell>{service.Price}</Table.Cell>
                    <Table.Cell><EditModalButton pageType="Product" name={service.Name} price={service.Price} recId={service.ID} loadProds={this.props.loadProds} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Product" recId={service.ID} loadProds={this.props.loadProds} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Product" loadProds={this.props.loadProds} activePageIndex={this.state.activeIndexProd} />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
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