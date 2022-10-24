const { Select } = semanticUIReact
function EditModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.name);
    const [address, setAddress] = React.useState(props.address);
    const [price, setPrice] = React.useState(props.price);
    const [dateSold, setDateSold] = React.useState(props.DateSold);
    const [custId, setCustId] = React.useState(props.CustomerID);
    const [storeId, setStoreId] = React.useState(props.StoreID);
    const [prodId, setProdId] = React.useState(props.ProductID);
    const [custName, setCustName] = React.useState(props.CustomerName);
    const [storeName, setStoreName] = React.useState(props.StoreName);
    const [prodName, setProdName] = React.useState(props.ProductName);
    let customersList = props.customers && props.customers.map(cust => {
        return {
            key: cust.ID,
            value: cust.Name,
            text: cust.Name
        }
    });
    let productsList = props.products && props.products.map(prod => {
        return {
            key: prod.ID,
            value: prod.Name,
            text: prod.Name
        }
    });
    let storesList = props.stores && props.stores.map(store => {
        return {
            key: store.ID,
            value: store.Name,
            text: store.Name
        }
    });

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
                    props.pageType === 'Store' ? "{ID: " + props.recId + ", Name: '" + name + "', Address: '" + address + "'}" : 
                        props.pageType === 'Sale' ? "{ID: " + props.recId + ", Name: '" + name + "', Address: '" + address + "'}" : "";
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
                    {props.pageType != 'Sale' &&
                        <div>
                            <Label>NAME</Label>
                            <Input onChange={event => setName(event.target.value)} value={name} />
                        </div>}
                    {(props.pageType == 'Customer' || props.pageType == 'Store') && <div>
                        <Label>ADDRESS</Label>
                        <Input value={address} onChange={event => setAddress(event.target.value)} />
                    </div>}
                    {props.pageType == 'Product' && <div>
                        <Label>PRICE</Label>
                        <Input value={price} onChange={event => setPrice(event.target.value)} />
                    </div>}
                    {props.pageType == 'Sale' && 
                        <>
                        <div>
                            <Label>DATE SOLD</Label>
                            <Input value={dateSold} onChange={event => setDateSold(event.target.value)} />
                        </div>
                        <div>
                            <Label>STORE ID</Label>
                            <Select value={storeName} onChange={event => setStoreName(event.target.value)} options={storesList} />
                        </div>
                        <div>
                            <Label>CUSTOMER ID</Label>
                            <Select value={custName} onChange={event => setCustName(event.target.value)} options={customersList} />
                        </div>
                        <div>
                            <Label>PRODUCT ID</Label>
                            <Select value={prodName} onChange={event => setProdName(event.target.value)} options={productsList} />
                        </div>
                        </>
                     }
                    
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
