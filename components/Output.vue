<script setup>
import { ref, onMounted } from "vue";
import { generateInvoicePDF } from "~/utils/pdfGenerator";
import Button from "./Button.vue";

const props = defineProps({
  accordionItems: Array,
});

const formData = ref({});

onMounted(() => {
  formData.value = JSON.parse(localStorage.getItem("formData"));
});

const downloadInvoice = () => {
  if (formData.value) {
    generateInvoicePDF(formData.value);

    localStorage.removeItem("formData");
    location.reload();
  }
};
</script>

<template>
  <h1>Invoice</h1>
  <div class="row mb-4">
    <div class="col-md-6 col-xl-2 ms-auto">
      <table class="table table-borderless">
        <tbody>
          <tr>
            <th>Invoice #</th>
            <td class="text-end">
              {{ formData.invoice }}
            </td>
          </tr>
          <tr>
            <th>Date</th>
            <td class="text-end">
              {{ formData.date }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th class="col">Product</th>
          <th class="col">Type</th>
          <th class="col">Quantity</th>
          <th class="col">Received Quantity</th>
          <th class="col">Rate</th>
          <th class="col">Total</th>
        </tr>
      </thead>
      <tbody v-for="accordion in formData.accordionItems" :key="accordion.id">
        <tr v-for="row in accordion.productRows" :key="row.id">
          <td class="col">
            {{ row.selectProducts }}
          </td>
          <td class="col">
            {{ row.selectType }}
          </td>
          <td class="col">
            {{ row.quantity }}
          </td>
          <td class="col">{{ row.receiveQty }}</td>
          <td class="col">{{ row.rate }}</td>
          <td class="col">{{ row.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text-center mt-3">
    <Button title="Download Invoice" @click="downloadInvoice" />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font: bold 100% sans-serif;
  letter-spacing: 0.5em;
  text-align: center;
  text-transform: uppercase;
  background: #000;
  border-radius: 0.25em;
  color: #fff;
  margin: 1em 0;
  padding: 0.5em 0;
}
</style>
