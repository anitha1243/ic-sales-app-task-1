class Products extends React.Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        let serviceList = this.props.products;
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
); */