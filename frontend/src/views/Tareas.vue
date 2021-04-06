<template>
  <b-container>
    <h1>Tareas</h1>

    <b-form @keydown.enter.prevent>
      <b-form-group>
        <b-input v-model="tarea.nombre" placeholder="Nombre"></b-input>
      </b-form-group>
      <b-form-group>
        <b-input
          v-model="tarea.descripcion"
          placeholder="Descripcion"
        ></b-input>
      </b-form-group>
      <b-form-group>
        <b-form-select v-model="tarea.tipo._id">
          <b-form-select-option value="" disabled selected
            >-- Elige una opcion --</b-form-select-option
          >
          <b-form-select-option
            v-for="tipo in tipos"
            :key="tipo._id"
            :value="tipo._id"
          >
            {{ tipo.nombre }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
      <b-form-group v-if="isEditable">
        <b-form-checkbox v-model="tarea.isPendiente">
          ¿Pendiente?
        </b-form-checkbox>
        {{ tarea }}
      </b-form-group>
      <b-button
        v-show="!isEditable"
        type="submit"
        @click.prevent="registrar"
        class="mb-2"
        >Registrar</b-button
      >
      <b-button
        variant="success"
        v-show="isEditable"
        type="submit"
        @click.prevent="editar"
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

    <b-table striped responsive hover :items="tareas" :fields="fields">
      <template #cell(isPendiente)="data">
        {{ data.item.isPendiente ? "Incompleto" : "Completo" }}
      </template>
      <template #cell(acciones)="row">
        <b-button
          v-if="row.item.isPendiente"
          class="btn-sm"
          variant="outline-primary"
          @click="buscar(row.item._id)"
          ><b-icon icon="pencil" aria-hidden="true"></b-icon> Editar</b-button
        >
        <b-button
          class="ml-2 btn-sm"
          variant="outline-danger"
          @click="eliminarTarea(row.item._id)"
          ><b-icon icon="trash" aria-hidden="true"></b-icon> Eliminar</b-button
        >
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tareas",
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
          label: "Tipo",
          key: "tipo.nombre",
          sortable: true,
        },
        {
          key: "isPendiente",
          label: "Pendiente",
        },
        {
          key: "acciones",
          label: "Acciones",
        },
      ],
      tareas: [],
      tipos: [],
      tarea: {
        _id: "",
        nombre: "",
        descripcion: "",
        isPendiente: true,
        tipo: {
          _id: "",
        },
      },
    };
  },
  created() {
    this.getTareas();
    this.getTipos();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    getTareas() {
      const config = {
        headers: {
          token: this.token,
        },
      };

      this.axios
        .get("/tareas", config)
        .then((res) => {
          this.tareas = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTipos() {
      this.axios
        .get("/tipos")
        .then((res) => {
          this.tipos = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    registrar() {
      const config = {
        headers: {
          token: this.token,
        },
      };
      delete this.tarea._id;
      delete this.tarea.isPendiente;
      this.axios
        .post("/tareas", this.tarea, config)
        .then((res) => {
          this.tareas.push(res.data);
          this.tarea.descripcion = "";
          this.tarea.nombre = "";
          this.tarea.tipo = {
            _id: "",
          };
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
    buscar(id) {
      this.axios
        .get(`/tareas/${id}`)
        .then((res) => {
          this.tarea._id = res.data._id;
          this.tarea.nombre = res.data.nombre;
          this.tarea.descripcion = res.data.descripcion;
          this.tarea.tipo._id = res.data.tipo._id;
          this.tarea.isPendiente = res.data.isPendiente;
          this.isEditable = true;
        })
        .catch((err) => {
          console.error(err.response);
        });
    },
    editar() {
      this.axios
        .put(`/tareas/${this.tarea._id}`, this.tarea)
        .then((res) => {
          const index = this.tareas.findIndex(
            (tarea) => tarea._id === res.data._id
          );
          this.tareas[index].nombre = res.data.nombre;
          this.tareas[index].descripcion = res.data.descripcion;
          this.tareas[index].tipo = res.data.tipo;
          this.tareas[index].isPendiente = res.data.isPendiente;
          this.cancelar();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    cancelar() {
      this.isEditable = false;
      delete this.tarea._id;
      this.tarea.descripcion = "";
      this.tarea.nombre = "";
      this.tarea.tipo = {
        _id: "",
      };
    },
    eliminarTarea(id) {
      this.axios
        .delete(`/tareas/${id}`)
        .then((res) => {
          const index = this.tareas.findIndex(
            (tarea) => tarea._id === res.data._id
          );
          this.tareas.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
