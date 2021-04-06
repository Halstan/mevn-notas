<template>
  <b-container>
    <h1>Login</h1>
    <b-form @submit.prevent="login">
      <b-form-group>
        <b-input
          placeholder="Email"
          type="email"
          v-model="user.email"
        ></b-input>
      </b-form-group>
      <b-form-group>
        <b-input
          placeholder="Contraseña"
          type="password"
          v-model="user.password"
        ></b-input>
        <b-alert :show="mensaje != ''">
          <p>{{ mensaje }}</p>
        </b-alert>
      </b-form-group>
      <b-button type="submit">Ingresar</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      mensaje: "",
    };
  },
  methods: {
    ...mapActions(["saveUser"]),
    login() {
      this.axios
        .post("/login", this.user)
        .then((res) => {
          const token = res.data.token;
          this.saveUser(token);
        })
        .catch((err) => {
          this.mensaje = err.response.data.mensaje;
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>