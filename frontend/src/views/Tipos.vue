<template>
  <b-container>
    <h1 class="text-center">Tipos</h1>

    <b-table striped hover :items="tipos" :fields="fields">
      <template #cell(acciones)="row">
        <b-button
          class="btn-sm"
          variant="outline-primary"
          @click="activarEdicion(row.item._id)"
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
  },
};
</script>

<style>
</style>