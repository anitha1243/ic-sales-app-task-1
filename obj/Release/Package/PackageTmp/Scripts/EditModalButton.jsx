const { Select } = semanticUIReact
const { DateInput } = SemanticUiCalendarReact;

function EditModalButton(props) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(props.name);
    const [address, setAddress] = React.useState(props.address);
    const [price, setPrice] = React.useState(props.price);
    const [dateSold, setDateSold] = React.useState(moment(props.DateSold).format('DD/MM/YYYY'));
    const [custName, setCustName] = React.useState(props.CustomerName);
    const [storeName, setStoreName] = React.useState(props.StoreName);
    const [prodName, setProdName] = React.useState(props.ProductName);
    const [recEdited, setRecEdited] = React.useState(false);
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

            request.open("POST", "/" + props.pageType + "/Edit" + props.pageType, false);
            if (props.pageType === 'Sale') {
                salesParams = {
                    ID: props.recId,
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
            
            var params = props.pageType === 'Customer' ? "{ID: " + props.recId + ", Name: '" + name + "', Address: '" + address + "'}" :
                props.pageType === 'Product' ? "{ID: " + props.recId + ", Name: '" + name + "', Price: '" + price + "'}" :
                    props.pageType === 'Store' ? "{ID: " + props.recId + ", Name: '" + name + "', Address: '" + address + "'}" :
                        props.pageType === 'Sale' ? JSON.stringify(salesParams) : "";
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function () {
                var req_resp = request.response;
                if (req_resp.includes("Validation failed for one or more entities.")) {
                    setErrMsg("Invalid Inputs. Unable to add record!");
                }
                else if (request.readyState == 4 && request.status == 200) {
                    var response = JSON.parse(request.responseText);
                    if (response === 200) {
                        console.log("Successfully edited record");
                        setOpen(false);
                        setRecEdited(true);
                    }  
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

        setRecEdited(false);
    }, [recEdited]);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='yellow'>Edit {props.pageType}</Button>}
        >
            <Modal.Header>Edit {props.pageType}</Modal.Header>
            <Modal.Content >
                {errMsg}
                
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
