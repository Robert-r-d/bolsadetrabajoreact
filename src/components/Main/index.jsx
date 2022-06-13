import React, { useState } from "react";
import styles from "./styles.module.css";
import { useQuery, gql } from "@apollo/client";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ALL_JOBS = gql`
  query {
    jobs {
      _id
      title
      companyName
      place
      emailCompany
      phoneCompany
      body
      createdAt
    }
  }
`;

const eliminarVacante = (e) => {
  const id = e.currentTarget.getAttribute("data-id");
  alert(id);
};
const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const { data, error, loading } = useQuery(ALL_JOBS);

  const [searchTeam, setSearchTeam] = useState("");

  if (error) return <span style="color: red">{error}</span>;

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Bolsa de Trabajo</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABhElEQVRIie3WPU8UURTG8R92gnTyJg0sJFD5GegJvcAnEOjkw6wWxBIV5SXwAYgFgWAjiVpBAVQaA3SCuBT3rosE2Nm5w9rwJDeZlzPnf8/MvWce7tUktTQQ24MJjOApHqOCfexhDcs4KGpy3XiN0wi6bZzhFZ6kQvvwMyY9xRs8i9cfog1DGMc8fsXYE4ylgr9jKR7XUwkLEX6OmRR4Hr3A7whPqjwvvIJjYWE2Ve8j/GXWBzrxCeuJ4AFhwZ2hNwt0R5jpZiIY3sZcU1mhO/E8VZMx3+pNAR34HIO+Co2jCA3FnN9uCthWvzNdNz7WAberNZW/epCjgquqpCa4+qqL2nvDMeeX24L+y+K6Dr5VALi6nZ5nCe4UFttGInRQAw2kSH0Qqi03EzoboUeK6wmZoNXf4mieBH34gUX0Z4gfVHu955jOA62CL1ufd4LhK6EVj4R9OhnvVX3ZkZyVXlYX5tT8VD2zV5bhmzZib7v9a2878Eewt7uCvV3BYQM573X3ugAdCYMlpws5GwAAAABJRU5ErkJggg==" />
        </button>
      </nav>
      <br></br>

      <br></br>
      <div className="container mt-3 d-grid gap-5">
        <Button
          className="btn-success rounded-pill"
          data-bs-target="#modalAñadir"
          data-bs-toggle="modal"
          variant="primary"
        >
          Agregar Nueva Vacante
        </Button>
      </div>
      <div className="container mt-5 table-responsive">
        <div className="form-outline mb-4">
          <input
            type="search"
            className="form-control"
            id="datatable-search-input"
            placeholder="Buscar..."
            onChange={(event) => {
              setSearchTeam(event.target.value);
            }}
          />
        </div>

        <table className="table table-hover">
          <caption>Lista De Vacan</caption>
          <thead>
            <tr>
              <th>_id</th>
              <th>title</th>
              <th>companyName</th>
              <th>place</th>
              <th>emailCompany</th>
              <th>phoneCompany</th>
              <th>body</th>
              <th>createdAt</th>
              <th>Aciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <p>Loading....</p>
            ) : (
              <>
                {data &&
                  data.jobs
                    .filter((job) => {
                      if (searchTeam == "") {
                        return job;
                      } else if (
                        job.title
                          .toLowerCase()
                          .includes(searchTeam.toLowerCase())
                      ) {
                        return job;
                      }
                    })
                    .map((job) => (
                      <tr key={job._id}>
                        <td>{job._id}</td>
                        <td>{job.title}</td>
                        <td>{job.companyName}</td>
                        <td>{job.place}</td>
                        <td>{job.emailCompany}</td>
                        <td>{job.phoneCompany}</td>
                        <td>{job.body}</td>
                        <td>{job.createdAt}</td>
                        <td>
                          <button
                            type="button"
                            data-bs-whatever={job._id}
                            data-bs-target="#modalEliminarVacante"
                            data-bs-toggle="modal"
                            class="btn btn-danger"
                          >
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAtElEQVRIie2VQQ6CQAxFX8R7uPM4xsPgCTmFSzW6niUGBTezMnawLTIQecks+1+bzgD8G4Wjdg9sgeNAvXzNHah/Fb6L4Z3y1LFWTWWQSaf6JFhZulLSjeCYOQH/foMUntrx2d87p1xiMWOS4ssAYjFjkhNnE4s3UoEpowAa7G+4AdZSeGriJ3CzdBy5Ag+LGHx7TtYu4nc8H5FkbbaJ+9gALfqn1MZaFwd0/+YAlF7pwvx5Abo6e/T2cOSLAAAAAElFTkSuQmCC" />
                            Eliminar
                          </button>{" "}
                          <button
                            type="button"
                            data-bs-whatever={job._id}
                            data-title={job.title}
                            data-company={job.companyName}
                            data-place={job.place}
                            data-email={job.emailCompany}
                            data-phone={job.phoneCompany}
                            data-body={job.body}
                            data-bs-target="#modalEditar"
                            data-bs-toggle="modal"
                            class="btn btn-primary border"
                          >
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAtklEQVRIie3VMQ6CMBTG8X+c3FyNV2B14BC6yElI3GH0MOjsPZw9goQb1IE0NE1aGPpKSN6XvKWQ/niPpAXNxlMDPfABzrnQFjBODUDpv7TL8CEH4E2mzv2uDePYRaB2Bv9JoHbzGF5LoTHcX0uO2nqkhJaiYvgS1ACNoooqalMArxk06Ynk5hJBk3fq5rgGanMCrkxjFxnvHrgHnhVSKECF8O0SSsf0H0Odi+QLPIEb49g1288fFcGTp8Rx7bMAAAAASUVORK5CYII=" />
                            Actualizar
                          </button>
                        </td>
                      </tr>
                    ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
