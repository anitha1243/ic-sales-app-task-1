const { Tab } = semanticUIReact
class ReactAJAX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panes: [
                {
                    menuItem: 'React',
                    render: () => <Tab.Pane attached={false}><Customers /></Tab.Pane>,
                },
                {
                    menuItem: 'Customers',
                    render: () => <Tab.Pane attached={false}><Customers /></Tab.Pane>,
                },
                {
                    menuItem: 'Products',
                    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
                },
                {
                    menuItem: 'Stores',
                    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
                },
                {
                    menuItem: 'Sales',
                    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
                }
            ]
        };
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