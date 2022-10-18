import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import API from "../../api";


const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const GetAllEmpleados = () => {
  //const [empleados, setEmpleados] = useState([]);

  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    idEmpleado: 0,
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    password: "",
    especialidad: "",
    avatar: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(empleadoSeleccionado);
  };

  const peticionGet = async () => {
    await API.get("Empleados/GetAll").then((response) => {
      setData(response.data);
    });
  };

   const peticionPost = async () => {
    try{
    console.log("El empleado enviado es " + empleadoSeleccionado)
    await API.post("Empleados", empleadoSeleccionado).then((response) => {
      setData(data.concat(response.data));
      console.log(response.data)
      abrirCerrarModalInsertar();
    });
  }catch(e){
      console.log("El error es " + e);
  }}; 


  const peticionPut = async () => {
    await API
      .put("Empleados/" + empleadoSeleccionado.idEmpleado, empleadoSeleccionado)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((empleado) => {
          if (empleadoSeleccionado.idEmpleado === empleado.idEmpleado) {
            empleado.nombre = empleadoSeleccionado.nombre;
            empleado.apellido = empleadoSeleccionado.apellido;
            empleado.dni = empleadoSeleccionado.dni;
            empleado.telefono = empleadoSeleccionado.telefono;
            empleado.email = empleadoSeleccionado.email;
            empleado.password = empleadoSeleccionado.password;
            empleado.especialidad = empleadoSeleccionado.especialidad;
            empleado.avatar = empleadoSeleccionado.avatar;
          }
          else {
            return false;
          }
          return false;
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      });
      
  };

  const peticionDelete = async () => {
    await API.delete("Empleados/" + empleadoSeleccionado.id).then(
      (response) => {
        setData(
          data.filter((empleado) => empleado.id !== empleadoSeleccionado.id)
        );
        abrirCerrarModalEliminar();
      }
    );
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarEmpleado = (empleado, caso) => {
    setEmpleadoSeleccionado(empleado);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Empleado</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="apellido"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="dni"
        className={styles.inputMaterial}
        label="DNI"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="telefono"
        className={styles.inputMaterial}
        label="Telefono"
        onChange={handleChange}
      />
      <TextField
        name="email"
        className={styles.inputMaterial}
        label="Email"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="password"
        type='password' 
        className={styles.inputMaterial}
        label="Password"
        onChange={handleChange}
      />
      <TextField
        name="especialidad"
        className={styles.inputMaterial}
        label="Especialidad"
        onChange={handleChange}
      />
      <TextField
        name="avatar"
        className={styles.inputMaterial}
        label="Avatar"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Empleado</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.nombre}
      />
      <br />
      <TextField
        name="apellido"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.apellido}
      />
      <br />
      <TextField
        name="dni"
        className={styles.inputMaterial}
        label="DNI"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.dni}
      />
      <br />
      <TextField
        name="telefono"
        className={styles.inputMaterial}
        label="Telefono"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.telefono}
      />
      <br />
      <TextField
        name="email"
        className={styles.inputMaterial}
        label="Email"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.email}
      />
      <br />
      <TextField
        name="password"
        className={styles.inputMaterial}
        label="Password"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.password}
      />
      <br />
      <TextField
        name="especialidad"
        className={styles.inputMaterial}
        label="Especialidad"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.especialidad}
      />
      <br />
      <TextField
        name="avatar"
        className={styles.inputMaterial}
        label="Avatar"
        onChange={handleChange}
        value={empleadoSeleccionado && empleadoSeleccionado.avatar}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar al empleado{" "}
        <b>
          {empleadoSeleccionado && empleadoSeleccionado.nombre}{" "}
          {empleadoSeleccionado && empleadoSeleccionado.apellido}{" "}
        </b>{" "}
        ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell >Password</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((empleado) => (
              <TableRow key={empleado.idEmpleado}>
                <TableCell>{empleado.idEmpleado}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellido}</TableCell>
                <TableCell>{empleado.dni}</TableCell>
                <TableCell>{empleado.telefono}</TableCell>
                <TableCell >{empleado.email}</TableCell>
                <TableCell >{empleado.password}</TableCell>
                <TableCell>{empleado.especialidad}</TableCell>
                <TableCell>{empleado.avatar}</TableCell>
                <TableCell>
                  <Edit
                    className={styles.iconos}
                    onClick={() => seleccionarEmpleado(empleado, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Delete
                    className={styles.iconos}
                    onClick={() => seleccionarEmpleado(empleado, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};

export { GetAllEmpleados };
