<script setup>
import { ref, computed, onMounted } from "vue";
import Output from "./Output.vue";
import Button from "./Button.vue";
import Select from "./Select.vue";
import Input from "./Input.vue";
import TextArea from "./TextArea.vue";

const showOutput = ref(false);
const date = ref("");
const invoice = ref("");
const selectedSupplier = ref("");
const selectedTransaction = ref("");
const note = ref("");

const supplier = ref([
  { label: "Supplier 1", value: "supplier1" },
  { label: "Supplier 2", value: "supplier2" },
  { label: "Supplier 3", value: "supplier3" },
]);

const transaction = ref([
  { label: "Cash", value: "Cash" },
  { label: "Credit", value: "Credit" },
  { label: "Online Payment", value: "Online Payment" },
]);

const products = ref([
  { label: "Product 1", value: "Product 1" },
  { label: "Product 2", value: "Product 2" },
  { label: "Product 3", value: "Product 3" },
]);

const types = ref([
  { label: "Type A", value: "Type A" },
  { label: "Type B", value: "Type B" },
  { label: "Type C", value: "Type C" },
]);

const accordionItems = ref([
  {
    id: Date.now(),
    title: "Product-Stock E-0, P-0",
    productRows: [
      {
        id: Date.now(),
        selectType: "",
        selectProducts: "",
        quantity: 0,
        receiveQty: 0,
        rate: 0,
        total: 0,
      },
    ],
  },
]);

const addNewAccordion = () => {
  accordionItems.value.push({
    id: Date.now(),
    title: "Product-Stock E-0, P-0 " + accordionItems.value.length + 1,
    productRows: [
      {
        id: Date.now(),
        selectType: "",
        selectProducts: "",
        quantity: 0,
        receiveQty: 0,
        rate: 0,
        total: 0,
      },
    ],
  });
};

const addNewProduct = (accordionIndex) => {
  accordionItems.value[accordionIndex].productRows.push({
    id: Date.now(),
    selectType: "",
    selectProducts: "",
    quantity: 0,
    receiveQty: 0,
    rate: 0,
    total: 0,
  });
};

const removeProduct = (accordionIndex, productIndex) => {
  accordionItems.value[accordionIndex].productRows.splice(productIndex, 1);
};

const removeAccordion = (index) => {
  accordionItems.value.splice(index, 1);
};

const saveDataToLocalStorage = () => {
  const formData = {
    date: date.value,
    invoice: invoice.value,
    selectedSupplier: selectedSupplier.value,
    selectedTransaction: selectedTransaction.value,
    note: note.value,
    accordionItems: accordionItems.value,
  };
  localStorage.setItem("formData", JSON.stringify(formData));

  showOutput.value = true;
};

const loadDataFromLocalStorage = () => {
  const savedData = JSON.parse(localStorage.getItem("formData"));
  if (savedData) {
    date.value = savedData.date;
    invoice.value = savedData.invoice;
    selectedSupplier.value = savedData.selectedSupplier;
    selectedTransaction.value = savedData.selectedTransaction;
    note.value = savedData.note;
    accordionItems.value = savedData.accordionItems;
  }
};

onMounted(() => {
  loadDataFromLocalStorage();
});

const updateGrandTotal = () => {
  let totalQuantity = 0;
  let totalReceiveQty = 0;
  let totalAmount = 0;

  accordionItems.value.forEach((accordion) => {
    accordion.productRows.forEach((row) => {
      row.total = row.quantity * row.rate;
      totalQuantity += row.quantity;
      totalReceiveQty += row.receiveQty;
      totalAmount += row.total;
    });
  });

  return {
    totalQuantity,
    totalReceiveQty,
    totalAmount,
  };
};

const totals = computed(() => {
  const { totalQuantity, totalReceiveQty, totalAmount } = updateGrandTotal();

  return {
    totalQuantity,
    totalReceiveQty,
    grandTotal: totalAmount,
  };
});
</script>

<template>
  <div class="card">
    <div class="row mb-3 g-3">
      <div class="col-12 col-md-6 col-lg-2 mb-3">
        <Input name="Date" type="date" v-model="date" />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mb-3">
        <Input name="Invoice #" type="number" v-model="invoice" />
      </div>
      <div class="col-12 col-md-6 col-lg-3 mb-3">
        <Select
          name="Supplier"
          v-model="selectedSupplier"
          :options="supplier"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-3 mb-3">
        <Select
          name="Tnx. By"
          v-model="selectedTransaction"
          :options="transaction"
        />
      </div>
      <div class="col-12 col-lg-2 mb-3 text-center">
        <Button title="Add/View Note" />
      </div>
      <div class="col-12">
        <TextArea placeholder="Type your purchase note" v-model="note" />
      </div>
    </div>

    <div class="accordion" id="accordionExample">
      <div
        v-for="(accordion, accordionIndex) in accordionItems"
        :key="accordion.id"
        class="accordion-item"
      >
        <h2 class="accordion-header" :id="'heading-' + accordion.id">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse-' + accordion.id"
            aria-expanded="true"
            :aria-controls="'collapse-' + accordion.id"
          >
            <div class="d-flex justify-content-between w-100">
              <span class="my-auto title">{{ accordion.title }}</span>
              <button
                class="btn close_btn my-auto me-4"
                @click="removeAccordion(accordionIndex)"
              >
                <span>×</span>
              </button>
            </div>
          </button>
        </h2>
        <div
          :id="'collapse-' + accordion.id"
          class="accordion-collapse collapse show"
          :aria-labelledby="'heading-' + accordion.id"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div
              class="row mb-2"
              v-for="(row, productIndex) in accordion.productRows"
              :key="row.id"
            >
              <div class="col-md-3 mb-3">
                <Select
                  name="Product"
                  :options="products"
                  v-model="row.selectProducts"
                />
              </div>
              <div class="col-md-9">
                <div class="row justify-content-xl-evenly">
                  <div class="col-6 col-md-4 mb-3 col-xl-2">
                    <Select
                      name="Type"
                      :options="types"
                      v-model="row.selectType"
                    />
                  </div>
                  <div class="col-6 col-md-4 mb-3 col-xl-2">
                    <Input
                      type="number"
                      name="Quantity"
                      v-model="row.quantity"
                    />
                  </div>
                  <div class="col-6 col-md-4 mb-3 col-xl-2">
                    <Input
                      type="number"
                      name="Receive Qty"
                      v-model="row.receiveQty"
                    />
                  </div>
                  <div class="col-6 col-md-4 mb-3 col-xl-2">
                    <Input type="number" name="Rate" v-model="row.rate" />
                  </div>
                  <div class="col-6 col-md-4 mb-3 mb-md-0 col-xl-2">
                    <div class="input-group">
                      <span class="input-group-text">Total</span>
                      <input
                        type="number"
                        name="Total"
                        class="form-control"
                        :value="row.total"
                        readonly="readonly"
                      />
                    </div>
                  </div>
                  <div
                    class="col-6 col-md-2 text-center d-flex justify-content-center gap-2"
                  >
                    <button
                      class="btn add_btn"
                      @click="addNewProduct(accordionIndex)"
                    >
                      <span>+</span>
                    </button>
                    <button
                      v-if="accordion.productRows.length > 1"
                      class="btn close_btn"
                      @click="removeProduct(accordionIndex, productIndex)"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grand-total">
      <p><span>Grand Total:</span> Qty {{ totals.totalQuantity }}</p>
      <p>
        Receive Qty <span>{{ totals.totalReceiveQty }}</span>
      </p>
      <p>
        Price <span>{{ totals.grandTotal }} BDT</span>
      </p>
    </div>

    <Button
      title="Add New Accordion"
      maxWidth="200px"
      class="mx-auto mt-3"
      @click="addNewAccordion"
    />
    <Button
      title="Submit"
      class="mx-auto mt-3"
      @click="saveDataToLocalStorage"
    />

    <Output v-if="showOutput" :accordionItems="accordionItems" />
  </div>
</template>

<style lang="scss" scoped>
.add_btn {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #296e51;
  border-radius: 100%;

  span {
    font-size: 25px;
    line-height: 1;
    margin-top: -6px;
    color: #296e51;
  }
}

.close_btn {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  border-radius: 100%;

  span {
    font-size: 25px;
    line-height: 1;
    margin-top: -8px;
    color: red;
  }
}

.accordion-item {
  border-radius: 0 !important;
}

.accordion-header {
  border-radius: 0 !important;
  background: #f8f7fc;
}

.accordion-body {
  padding: 10px;
}

.accordion-button {
  background: #e9eaff;
  padding: 10px;
  border-radius: 0 !important;
  box-shadow: none;
}

.title {
  font-weight: 500;
  color: #7a83ba;
  font-size: 18px;
}

.grand-total {
  display: flex;
  justify-content: end;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  background: #e9eafc;
  padding: 10px;

  p {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0;

    span {
      color: #8b93ba;
    }
  }
}
</style>
