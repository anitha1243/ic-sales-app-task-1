function EditModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.name);
    const [address, setAddress] = React.useState(props.address);

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
            var params = "{ID: " + props.custId + ", Name: '" + name + "', Address: '" + address + "'}";
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
            trigger={<Button>Edit Customer</Button>}
        >
            <Modal.Header>Edit Customer</Modal.Header>
            <Modal.Content image>
                
                <Modal.Description>
                    <div>
                        <Label>NAME</Label>
                        <Input onChange={event => setName(event.target.value)} value={name}  />
                    </div>
                    {props.pageType == 'Customer' && <div>
                        <Label>ADDRESS</Label>
                        <Input value={address} onChange={event => setAddress(event.target.value)} />
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
