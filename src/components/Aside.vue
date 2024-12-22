<script setup lang="ts">
import Checkbox from "./Checkbox.vue";
import Button from "./Button.vue";
import CheckboxList from "./CheckboxList.vue";

const subAreas = [
  "Product Manager",
  "Product Growth",
  "Product Operations",
  "Product Marketing Manager",
  "Social Media",
];

const availability = [
  "5h/semanais",
  "10h/semanais",
  "15h/semanais",
  "+15h/semanais",
];

const period = ["Manhã", "Tarde", "Noite"];
</script>

<template>
  <aside>
    <div class="roles">
      <label for="Junior">
        <input type="radio" name="role" value="Mentor" />Junior
      </label>

      <label for="Mentor">
        <input type="radio" name="role" value="Mentor" />Mentor
      </label>

      <label for="Head">
        <input type="radio" name="role" value="Head" />Head
      </label>
    </div>

    <div class="checkboxes">
      <div class="workArea">
        <CheckboxList />
    </div>

      <div class="subArea">
        <h2>Sub-área</h2>
        <Checkbox v-for="(sA, index) in subAreas" :key="index" :label="sA" />
      </div>

      <div class="availability">
        <h2>Disponibilidade</h2>
        <Checkbox v-for="(a, index) in availability" :key="index" :label="a" />
      </div>

      <div class="availableShift">
        <h2>Período de disponibilidade</h2>
        <Checkbox v-for="(p, index) in period" :key="index" :label="p" />
      </div>
    </div>

    <Button placeholder="Pesquisar"/>
  </aside>
</template>

<style scoped>
aside {
  padding-left: 27px;
  margin-right: 131px;
  width: 100%;
  max-width: max-content;
  width: 100%;


  .roles {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 40px 141px 40px 0px;

    input {
      margin-right: 8px;
    }
  }

  .checkboxes {

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      h2 {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1rem;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
