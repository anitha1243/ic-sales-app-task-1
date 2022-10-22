function EditModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.name);
    const [address, setAddress] = React.useState(props.address);
    const [price, setPrice] = React.useState(props.price);

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

            request.open("POST", "/" + props.pageType + "/Edit" + props.pageType, false);
            var params = props.pageType === 'Customer' ? "{ID: " + props.recId + ", Name: '" + name + "', Address: '" + address + "'}" :
                props.pageType === 'Product' ? "{ID: " + props.recId + ", Name: '" + name + "', Price: '" + price + "'}" :
                    props.pageType === 'Store' ? "{ID: " + props.recId + ", Name: '" + name + "', Address: '" + address + "'}" : "";
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    if (response === 200) {
                        console.log("Successfully edited record");
                    }  
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
            trigger={<Button>Edit {props.pageType}</Button>}
        >
            <Modal.Header>Edit {props.pageType}</Modal.Header>
            <Modal.Content image>
                
                <Modal.Description>
                    <div>
                        <Label>NAME</Label>
                        <Input onChange={event => setName(event.target.value)} value={name}  />
                    </div>
                    {(props.pageType == 'Customer' || props.pageType == 'Store') && <div>
                        <Label>ADDRESS</Label>
                        <Input value={address} onChange={event => setAddress(event.target.value)} />
                    </div>}
                    {props.pageType == 'Product' && <div>
                        <Label>PRICE</Label>
                        <Input value={price} onChange={event => setPrice(event.target.value)} />
                    </div>}
                    
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={saveRecord}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

//export default EditModalButton
