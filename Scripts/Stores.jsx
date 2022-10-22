class Stores extends React.Component {
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

            request.open("GET", "/Store/Index", false);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    const obj = JSON.parse(request.responseText);
                    this.setState({ serviceList: obj });
                }
            }.bind(this);
            request.send();
        }
    }
   
    render() {
        let serviceList = this.state.serviceList;
        let tableData = null;

        if (serviceList != "") {
            tableData = serviceList.map(service =>
                <Table.Row key={service.ID}>
                    <Table.Cell>{service.Name}</Table.Cell>
                    <Table.Cell>{service.Address}</Table.Cell>
                    <Table.Cell><EditModalButton pageType="Store" name={service.Name} address={service.Address} recId={service.ID} /></Table.Cell>
                    <Table.Cell><DeleteModalButton pageType="Store" recId={service.ID} /></Table.Cell>
                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                <ModalButton pageType="Store" />
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