<template>
  <b-container>
    <h1 class="text-center">Tipos</h1>

    <b-form @keydown.enter.prevent>
      <b-form-group>
        <b-input
          type="text"
          v-model="tipo.nombre"
          placeholder="Nombre"
        ></b-input>
      </b-form-group>
      <b-form-group>
        <b-input
          type="text"
          v-model="tipo.descripcion"
          placeholder="Descripcion"
        ></b-input>
      </b-form-group>
      <b-button
        v-if="!isEditable"
        @click.prevent="registrar"
        type="submit"
        class="mb-2"
        >Registrar</b-button
      >
      <b-button
        variant="success"
        v-show="isEditable"
        @click.prevent="editar"
        type="submit"
        class="mb-2"
        >Editar</b-button
      >
      <b-button
        variant="danger"
        v-show="isEditable"
        @click.prevent="cancelar"
        class="ml-2 mb-2"
        >Cancelar</b-button
      >
    </b-form>

    <b-table striped hover :items="tipos" :fields="fields">
      <template #cell(acciones)="row">
        <b-button
          class="btn-sm"
          variant="outline-primary"
          @click="buscar(row.item._id)"
          >Editar</b-button
        >
        <b-button
          class="ml-2 btn-sm"
          variant="outline-danger"
          @click="eliminarTipo(row.item._id)"
          >Eliminar</b-button
        >
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: "Tipos",
  data() {
    return {
      isEditable: false,
      fields: [
        {
          key: "_id",
          sortable: false,
        },
        {
          key: "nombre",
          sortable: true,
        },
        {
          key: "descripcion",
          sortable: true,
        },
        {
          key: "acciones",
          label: "Acciones",
        },
      ],
      tipo: {
        _id: "",
        nombre: "",
        descripcion: "",
      },
      tipos: [],
    };
  },
  created() {
    this.getTipos();
  },
  methods: {
    getTipos() {
      this.axios
        .get("/tipos")
        .then((res) => {
          this.tipos = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registrar() {
      delete this.tipo._id;
      this.axios
        .post("/tipos", this.tipo)
        .then((res) => {
          this.tipos.push(res.data);
          this.tipo = {};
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    buscar(id) {
      this.axios
        .get(`/tipos/${id}`)
        .then((res) => {
          this.tipo = res.data;
          this.isEditable = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editar() {
      this.axios
        .put(`/tipos/${this.tipo._id}`, this.tipo)
        .then((res) => {
          const index = this.tipos.findIndex(
            (tipo) => tipo._id === res.data._id
          );
          this.tipos[index].nombre = res.data.nombre;
          this.tipos[index].descripcion = res.data.descripcion;
          this.tipo = {};
          this.isEditable = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    eliminarTipo(id) {
      this.axios
        .delete(`/tipos/${id}`)
        .then((res) => {
          const index = this.tipos.findIndex(
            (tipo) => tipo._id === res.data._id
          );
          this.tipos.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    cancelar() {
      this.isEditable = false;
      this.tipo = {};
    },
  },
};
</script>

<style>
</style>