class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products.slice(0, 5),
            begin: 0,
            end: 5,
            activePage: 1,
            pageCount: Math.ceil(this.props.products.length / 5)
        }

        this.btnClick = this.btnClick.bind(this);
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
                    <Table.Cell><EditModalButton pageType="Product" name={service.Name} price={service.Price} recId={service.ID} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Product" recId={service.ID} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Product" />
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