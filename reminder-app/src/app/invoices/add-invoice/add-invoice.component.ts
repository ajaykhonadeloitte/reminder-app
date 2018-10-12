import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"]
})
export class AddInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  suggestions: Array<any> = [];
  clientId: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      invoiceId: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]
      ],
      client: ["", []],
      invoiceDate: ["2018-10-10", Validators.required],
      amount: [0, [Validators.required, Validators.pattern(/^[.\d]+$/)]],
      creditPeriod: [
        30,
        [Validators.maxLength(3), Validators.pattern("^[0-9]{1,3}")]
      ]
    });
  }

  selectSuggestion(suggestion) {
    console.log(suggestion);
    if (!suggestion) {
      if (this.suggestions.length > 0) {
        this.clientId = this.suggestions[0].id;
        this.setClient(this.suggestions[0].client);
        this.suggestions = [];
      }
    } else {
      let { id, client: name } = suggestion;
      this.clientId = id;
      this.suggestions = [];
      console.log(name);
      this.setClient(name);
    }
  }

  clearSuggestions() {
    setTimeout(() => {
      console.log("Blurring..");
      // this.suggestions.splice(0, this.suggestions.length);
      this.suggestions = [];
      console.log(this.suggestions);
    }, 400);
  }
  setClient(str) {
    console.log(str);
    this.invoiceForm.controls["client"].setValue(str);
  }
  private timeout;
  clientSearch() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let clientData = [
        { id: 1, client: "yellow" },
        { id: 2, client: "green" },
        { id: 3, client: "blue" },
        { id: 4, client: "apply" }
      ];

      this.suggestions = clientData.filter(client => {
        if (client.client.indexOf(this.client.value) !== -1) {
          return true;
        }
      });
    }, 500);
  }
  get invoiceId() {
    return this.invoiceForm.get("invoiceId");
  }
  get invoiceDate() {
    return this.invoiceForm.get("invoiceDate");
  }
  get amount() {
    return this.invoiceForm.get("amount");
  }
  get creditPeriod() {
    return this.invoiceForm.get("creditPeriod");
  }

  get client() {
    return this.invoiceForm.get("client");
  }
}
