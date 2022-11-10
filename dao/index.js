const { Sequelize, DataTypes } = require("sequelize");

// postgres://<USUARIO>:<PASSWORD>@<URL_HOST_BD>:<PUERTO_BD>/<NOMBRE_BD>

const CADENA_CONEXION = 
    "postgresql://evaluaciones:evaluaciones@localhost:5432/evaluacionesdb"

const sequelize = new Sequelize(CADENA_CONEXION)

const Carrera = sequelize.define("carrera", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(200),
        allowNull : false
    } 
}, {
    timestamps : false,
    freezeTableName : true
})

const Curso = sequelize.define("curso", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : false
    },
    carrera_id : {
        type : DataTypes.UUID,
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Evaluacion = sequelize.define("evaluacion", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    fecha_registro : {
        type : DataTypes.DATE,
        allowNull : true
    },
    curso_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    ciclo_id : {
        type : DataTypes.UUID,
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Ciclo = sequelize.define("ciclo", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    nombre : {
        type : DataTypes.STRING(200),
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Estudiante = sequelize.define("estudiante", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    username : {
        type : DataTypes.STRING(20),
        allowNull : false
    },
    password : {
        type : DataTypes.STRING(100),
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Resolucion = sequelize.define("resolucion", {
    id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    estudiante_id : {
        type : DataTypes.UUID,
        allowNull : false        
    },
    evaluacion_id : {
        type : DataTypes.UUID,
        allowNull : false
    },
    fecha_envio : {
        type : DataTypes.DATE,
        allowNull : false
    },
    upvote : {
        type : DataTypes.INTEGER
    },
    url : {
        type : DataTypes.STRING(2048)
    }
}, {
    timestamps : false,
    freezeTableName : true
})


// Relaciones
// Curso * <----> 1 Carrera
Curso.belongsTo(Carrera, {
    foreignKey : "carrera_id"
})
Carrera.hasMany(Curso, {
    foreignKey : "id"
})

// Evaluacion * <----> 1 Curso
Evaluacion.belongsTo(Curso, {
    foreignKey : "curso_id"
})
Curso.hasMany(Evaluacion, {
    foreignKey : "id"
})

// Evaluacion * <----> 1 Ciclo
Evaluacion.belongsTo(Ciclo, {
    foreignKey : "ciclo_id"
})
Ciclo.hasMany(Evaluacion, {
    foreignKey : "id"
})

// Resolucion * <----> 1 Estudiante
Resolucion.belongsTo(Estudiante, {
    foreignKey : "estudiante_id"
})
Estudiante.hasMany(Resolucion, {
    foreignKey : "id"
})

// Resolucion * <----> 1 Evaluacion
Resolucion.belongsTo(Evaluacion, {
    foreignKey : "evaluacion_id"
})
Evaluacion.hasMany(Resolucion, {
    foreignKey : "id"
})


module.exports = {
    Carrera, Curso, Ciclo, Evaluacion, Estudiante, Resolucion
}