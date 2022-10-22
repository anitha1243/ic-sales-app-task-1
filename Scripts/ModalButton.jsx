const { Button, Header, Image, Modal, Label, Input } = semanticUIReact
function ModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [price, setPrice] = React.useState("");

    function saveRecord() {
        setOpen(false)
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

            request.open("POST", "/" + props.pageType + "/Create" + props.pageType, false);
            var params = props.pageType === 'Customer' ? "{name: '" + name + "', address: '" + address + "'}" :
                props.pageType === 'Product' ? "{name: '" + name + "', price: '" + price + "'}" :
                    props.pageType === 'Store' ? "{name: '" + name + "', address: '" + address + "'}" : "";
            console.log(params);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    console.log("Record added result: " + response);                   
                }
            }.bind(this);
            request.send(params);
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>New {props.pageType}</Button>}
        >
            <Modal.Header>Create {props.pageType}</Modal.Header>
            <Modal.Content image>
                
                <Modal.Description>
                    <div>
                        <Label>NAME</Label>
                        <Input onChange={event => setName(event.target.value)} />
                    </div>
                    {props.pageType === 'Customer' && <div>
                        <Label>ADDRESS</Label>
                        <Input onChange={event => setAddress(event.target.value)} />
                    </div>}  
                    {props.pageType === 'Product' && <div>
                        <Label>PRICE</Label>
                        <Input onChange={event => setPrice(event.target.value)} />
                    </div>}
                    {props.pageType === 'Store' && <div>
                        <Label>ADDRESS</Label>
                        <Input onChange={event => setAddress(event.target.value)} />
                    </div>} 
                    
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={saveRecord}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}
