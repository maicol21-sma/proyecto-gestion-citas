function Informacion() {
  return (
    <div className="container mt-4">
      
      {/* Título del módulo */}
      <div className="mb-4">
        <h2>Centro de Información</h2>
        <p className="text-muted">
          Información general sobre el sistema SISMEDIC
        </p>
      </div>

      {/* Información sobre SISMEDIC */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Acerca de SISMEDIC</h4>

          <p>
            <strong>SISMEDIC</strong> es un Sistema de Gestión de Citas
            Médicas desarrollado para facilitar la administración de
            pacientes, médicos, consultorios y citas médicas.
          </p>

          <p>
            El sistema permite organizar la información y facilitar el
            proceso de gestión de citas dentro de una institución de salud.
          </p>
        </div>
      </div>

      {/* Ayuda */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Ayuda y Manual de Usuario</h4>

          <p>
            Para utilizar SISMEDIC, el usuario puede consultar el manual
            de usuario, donde encontrará información sobre el ingreso al
            sistema, navegación y utilización de los diferentes módulos.
          </p>

          <p>
            Los principales módulos disponibles son:
          </p>

          <ul>
            <li>Pacientes</li>
            <li>Médicos</li>
            <li>Consultorios</li>
            <li>Citas</li>
          </ul>
        </div>
      </div>

      {/* Soporte */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Soporte Técnico</h4>

          <p>
            En caso de presentar dificultades durante el uso del sistema,
            se recomienda verificar la conexión a Internet y los datos
            ingresados.
          </p>

          <p>
            Si el problema continúa, se debe informar al responsable
            del soporte técnico del sistema.
          </p>
        </div>
      </div>

      {/* Información del sistema */}
      <div className="card">
        <div className="card-body">
          <h4>Información del Sistema</h4>

          <p>
            <strong>Nombre:</strong> SISMEDIC
          </p>

          <p>
            <strong>Versión:</strong> 1.0
          </p>

          <p>
            <strong>Tipo de aplicación:</strong> Aplicación web
          </p>

          <p>
            <strong>Programa:</strong> Análisis y Desarrollo de Software
            (ADSO)
          </p>

          <p>
            <strong>Entidad:</strong> SENA
          </p>
        </div>
      </div>

    </div>
  );
}

export default Informacion;