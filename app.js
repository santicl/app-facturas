document.getElementById("form").addEventListener("submit", create);

function create(e) {
    let dataTime = document.getElementById("data-time-invoice").value;
    let nameEnterprise = document.getElementById("name-the-enterprise").value;
    let nitEnterprise = document.getElementById("nit-enterprise").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;

    let invoice = {
        dataTime,
        nameEnterprise,
        nitEnterprise,
        description,
        price
    }
    if (localStorage.getItem("Invoices") === null) {
        let invoices = [];
        invoices.push(invoice);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    } else {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        invoices.push(invoice);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    }
    read();
    document.getElementById("form").reset();
    e.preventDefault();
    console.log("Se guardo correctamente");
}

function read() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    document.getElementById("tbody").innerHTML = "";
    let total = [];
    let t = 0;
    let j = 0;

    for (let i = 0; i < invoices.length; i++) {
        let dataTime = invoices[i].dataTime;
        let nameEnterprise = invoices[i].nameEnterprise;
        let nitEnterprise = invoices[i].nitEnterprise;
        let description = invoices[i].description;
        let price = invoices[i].price;
        total.push(price);
        let p = new Intl.NumberFormat('es-CO').format(price);
        document.getElementById("tbody").innerHTML += `<tr>
        <td>${dataTime}</td>
        <td>${nameEnterprise}</td>
        <td>${nitEnterprise}</td>
        <td>${description}</td>
        <td>${p}</td>
        <td><button type="button" onclick="edit('${nitEnterprise}')" class="btn btn-success my-2">Edit</button></td>
        <td><button type="button" onclick="dele('${nameEnterprise}')" class="btn btn-danger my-2">Delete</button></td>
        </tr>`
    }
    for (let i = 0; i < total.length; i++) {
        let j = parseInt(total[i]);
        t += j;
    }
    let i = new Intl.NumberFormat('es-CO').format(t);
    console.log(i);
}

function edit(nitEnterprise) {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].nitEnterprise === nitEnterprise) {
            document.getElementById("body").innerHTML = `<div class="card">
                <h2>Editar Factura de ${invoices[i].nameEnterprise}</h2>
                <form >
                    <div class="container-invoices">
                        <input type="date" autofocus class="form-control my-2" id="new-data-time-invoice" placeholder="${invoices[i].dataTime}" required>
                    </div>
                    <div class="container-invoice">
                        <input type="text" class="form-control my-2" id="new-name-the-enterprise" placeholder="${invoices[i].nameEnterprise}" required>
                    </div>
                    <div class="container-invoice">
                        <input type="number" id="new-nit-enterprise"class="form-control my-2" placeholder="${invoices[i].nitEnterprise}" required>
                    </div>
                    <div class="container-invoice">
                        <textarea class="form-control my-2" id="new-description" placeholder="${invoices[i].description}" required></textarea>
                    </div>
                    <div class="container-invoice">
                        <input type="current" class="form-control my-2" id="new-price" placeholder="${invoices[i].price}" required>
                    </div>
                    <div class="container-invoice">
                        <button id="button" class="btn btn-block btn-success my-2" onclick="update('${i}')">Update</button>
                        <button class="btn btn-block btn-danger my-2" onclick="cancel()">Cancel</button>
                    </div>
                </form>
            </div>`
        }

    }
}

function cancel() {
    document.getElementById("new-data-time-invoice").removeAttribute('required');
    document.getElementById("new-name-the-enterprise").removeAttribute('required');
    document.getElementById("new-nit-enterprise").removeAttribute('required');
    document.getElementById("new-description").removeAttribute('required');
    document.getElementById("new-price").removeAttribute('required');
    console.log("Se cancelo el formulario");
    return false;
}

function update(i) {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let date = document.getElementById("new-data-time-invoice").value;
    let name = document.getElementById("new-name-the-enterprise").value;
    let nit = document.getElementById("new-nit-enterprise").value;
    let des = document.getElementById("new-description").value;
    let p = document.getElementById("new-price").value;

    if ((date === "" || name === "" || nit === "" || des === "" || p === "")) {
        console.log("No se han ingresado los datos");
    } else {
        invoices[i].dataTime = date;
        invoices[i].nameEnterprise = name;
        invoices[i].nitEnterprise = nit;
        invoices[i].description = des;
        invoices[i].price = p;
        document.getElementById("form").reset();
    }
    localStorage.setItem("Invoices", JSON.stringify(invoices));
    read();
}

function dele(nameEnterprise) {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));

    for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].nameEnterprise === nameEnterprise) {
            invoices.splice(i, 1);
        }
    }
    localStorage.setItem("Invoices", JSON.stringify(invoices));
    read();
}
read();
