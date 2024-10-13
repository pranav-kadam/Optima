import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

const SalesDashboard = () => {
  const [view, setView] = useState("main");
  const [clients, setClients] = useState([
    { id: 1, name: "Acme Corp" },
    { id: 2, name: "TechSolutions Inc" },
  ]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [saleDetails, setSaleDetails] = useState({
    quantity: "",
    date: "",
    totalAmount: "",
    amountPaid: "",
    amountRemaining: "",
  });
  const [newClient, setNewClient] = useState({
    name: "",
    address: "",
    paymentDetails: "",
    contact: "",
    email: "",
  });

  const handleSelectClient = (clientId) => {
    setSelectedClient(clients.find((client) => client.id === clientId));
    setView("existingClientSale");
  };

  const handleSaleDetailsChange = (e) => {
    setSaleDetails({ ...saleDetails, [e.target.name]: e.target.value });
  };

  const handleNewClientChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleLogSale = () => {
    // Logic to log the sale
    console.log("Sale logged:", { client: selectedClient, ...saleDetails });
    setView("main");
  };

  const handleAddNewClient = () => {
    // Logic to add new client
    const newClientId = clients.length + 1;
    setClients([...clients, { id: newClientId, ...newClient }]);
    setSelectedClient({ id: newClientId, ...newClient });
    setView("existingClientSale");
  };

  const renderMainView = () => (
    <Card>
      <CardHeader>Sales Dashboard</CardHeader>
      <CardContent>
        <Button onClick={() => setView("selectClient")}>
          Select Existing Client
        </Button>
        <Button onClick={() => setView("newClient")}>New Client</Button>
      </CardContent>
    </Card>
  );

  const renderSelectClientView = () => (
    <Card>
      <CardHeader>Select Existing Client</CardHeader>
      <CardContent>
        <Select onChange={(e) => handleSelectClient(Number(e.target.value))}>
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </Select>
        <Button onClick={() => setView("main")}>Back</Button>
      </CardContent>
    </Card>
  );

  const renderSaleDetailsView = () => (
    <Card>
      <CardHeader>Log Sale for {selectedClient.name}</CardHeader>
      <CardContent>
        <Input
          name="quantity"
          placeholder="Quantity"
          onChange={handleSaleDetailsChange}
        />
        <Input
          name="date"
          type="date"
          placeholder="Date"
          onChange={handleSaleDetailsChange}
        />
        <Input
          name="totalAmount"
          placeholder="Total Amount"
          onChange={handleSaleDetailsChange}
        />
        <Input
          name="amountPaid"
          placeholder="Amount Paid"
          onChange={handleSaleDetailsChange}
        />
        <Input
          name="amountRemaining"
          placeholder="Amount Remaining"
          onChange={handleSaleDetailsChange}
        />
        <Button onClick={handleLogSale}>Log Sale</Button>
        <Button onClick={() => setView("main")}>Cancel</Button>
      </CardContent>
    </Card>
  );

  const renderNewClientView = () => (
    <Card>
      <CardHeader>Add New Client</CardHeader>
      <CardContent>
        <Input
          name="name"
          placeholder="Client Name"
          onChange={handleNewClientChange}
        />
        <Input
          name="address"
          placeholder="Address"
          onChange={handleNewClientChange}
        />
        <Input
          name="paymentDetails"
          placeholder="Payment Details"
          onChange={handleNewClientChange}
        />
        <Input
          name="contact"
          placeholder="Contact"
          onChange={handleNewClientChange}
        />
        <Input
          name="email"
          placeholder="Email"
          onChange={handleNewClientChange}
        />
        <Button onClick={handleAddNewClient}>Add Client</Button>
        <Button onClick={() => setView("main")}>Cancel</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4">
      {view === "main" && renderMainView()}
      {view === "selectClient" && renderSelectClientView()}
      {view === "existingClientSale" && renderSaleDetailsView()}
      {view === "newClient" && renderNewClientView()}
    </div>
  );
};

export default SalesDashboard;
1;
