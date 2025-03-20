<script setup>
import Button from "./Button.vue";
</script>

<template>
  <div class="card">
    <div class="row">
      <div class="col-12 col-xl-5 mb-4 mb-xl-0 text-xl-start text-center">
        <h1>Create Cylinder Purchase</h1>
        <h6>Home/ Purchase</h6>
      </div>
      <div class="col-12 col-xl-7">
        <div class="row">
          <div class="col-12 col-lg-8 mb-4 mb-lg-0">
            <div class="table-responsive">
              <table class="table mb-0 table-bordered text-center">
                <thead>
                  <tr>
                    <th colspan="2"><span class="red">Previous</span></th>
                    <th colspan="2"><span class="green">Current</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Amount Due - 0.00</td>
                    <td>Amount Due - 0.00</td>
                    <td>Amount Due - 0.00</td>
                    <td>Amount Due - 0.00</td>
                  </tr>
                  <tr>
                    <td>Amount Due - 0.00</td>
                    <td>Amount Due - 0.00</td>
                    <td>Amount Due - 0.00</td>
                    <td>Amount Due - 0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 col-md-4 col-xl-2 mb-4 mb-md-0">
            <div class="d-flex h-100 flex-column justify-content-evenly">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Send Email
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Send Email
                </label>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 col-xl-2">
            <div class="d-flex h-100 flex-column justify-content-evenly gap-2">
              <Button title="Save" color="#767FFE" />
              <Button title="Cancel" color="#D12815" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  h1 {
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #7478b7;
  }

  h6 {
    margin-bottom: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }
}
</style>
