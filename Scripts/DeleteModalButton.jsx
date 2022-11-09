function DeleteModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [recDeleted, setRecDeleted] = React.useState(false);

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

            request.open("POST", "/" + props.pageType + "/Delete" + props.pageType, false);
            var params = "{ID: " + props.recId + "}";
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    console.log(response);
                    setRecDeleted(true);
                }
            }.bind(this);
            request.send(params);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('activeIndex') == "1") {
            props.loadCusts();
        }
        else if (sessionStorage.getItem('activeIndex') == "2") {
            props.loadProds();
        }
        else if (sessionStorage.getItem('activeIndex') == "3") {
            props.loadStores();
        }
        else if (sessionStorage.getItem('activeIndex') == "4") {
            props.loadSales();
        }

        setRecDeleted(false);
    }, [recDeleted]);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='red'>Delete {props.pageType}</Button>}
        >
            <Modal.Header>Delete {props.pageType}</Modal.Header>
            <Modal.Content image>
                
                <Modal.Description>
                    Are you sure you want to delete this {props.pageType } ?                 
                    
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
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
