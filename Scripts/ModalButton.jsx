const { Button, Header, Image, Modal, Label, Input } = semanticUIReact
const { useEffect } = React
function ModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [dateSold, setDateSold] = React.useState(props.DateSold);
    const [custName, setCustName] = React.useState(props.CustomerName);
    const [storeName, setStoreName] = React.useState(props.StoreName);
    const [prodName, setProdName] = React.useState(props.ProductName);
    const [recAdded, setRecAdded] = React.useState(false);
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
    const [errMsg, setErrMsg] = React.useState("");

    useEffect(() => {
        console.log(props.activePageIndex);
        if (props.activePageIndex == 1 || props.activePageIndex == 0) {
            props.loadCusts();
            console.log('load custs');
            console.log(props.activePageIndex);
        }
        else if (props.activePageIndex == 2) {
            props.loadProds();
        }
        else if (props.activePageIndex == 3) {
            props.loadStores();
        }
        else if (props.activePageIndex == 4) {
            props.loadSales();
        }
        else if (props.activePageIndex === undefined
            || props.activePageIndex === null) {
            props.loadCusts();
            console.log(props.activePageIndex);
        }
        
        setRecAdded(false);
    }, [recAdded]);

    function saveRecord() {
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
            if (props.pageType === 'Sale') {
                salesParams = {
                    customerID: customersList[customersList.findIndex(function (o) {
                        return o.value === custName
                    })].key,
                    storeID: storesList[storesList.findIndex(function (o) {
                        return o.value === storeName
                    })].key,
                    productID: productsList[productsList.findIndex(function (o) {
                        return o.value === prodName
                    })].key,
                    DateSold: dateSold
                };
            }
            
            var params = props.pageType === 'Customer' ? "{name: '" + name + "', address: '" + address + "'}" :
                props.pageType === 'Product' ? "{name: '" + name + "', price: '" + price + "'}" :
                    props.pageType === 'Store' ? "{name: '" + name + "', address: '" + address + "'}" : 
                        props.pageType === 'Sale' ? JSON.stringify(salesParams) : "";
            console.log(params);
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                var req_resp = request.response;
                if (req_resp.includes("Validation failed for one or more entities.")){
                    setErrMsg("Invalid Inputs. Unable to add record!");
                }
                else if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    console.log("Record added");
                    setOpen(false);
                    setRecAdded(true);
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
            trigger={<Button color='blue'>New {props.pageType}</Button>}
        >
            <Modal.Header>Create {props.pageType}</Modal.Header>
            <Modal.Content >
                {errMsg}
                <Modal.Description>
                    {props.pageType != 'Sale' && <div>
                        <Label>NAME</Label>
                        <Input onChange={event => setName(event.target.value)} />
                    </div>}
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
                    {props.pageType == 'Sale' &&
                        <>
                            <div>
                                <Label>DATE SOLD</Label>
                                <DateInput
                                    value={dateSold}
                                    onChange={(event, data) => setDateSold(data.value)}
                                    dateFormat='DD/MM/YYYY'
                                />
                            </div>
                            <div>
                                <Label>STORE ID</Label>
                                <Select value={storeName} onChange={(event, data) => setStoreName(data.value)} options={storesList} />
                            </div>
                            <div>
                                <Label>CUSTOMER ID</Label>
                                <Select value={custName} onChange={(event, data) => setCustName(data.value)} options={customersList} />
                            </div>
                            <div>
                                <Label>PRODUCT ID</Label>
                                <Select value={prodName} onChange={(event, data) => setProdName(data.value)} options={productsList} />
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
