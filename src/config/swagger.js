// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Observatorio',
    version: '1.0.0',
    description:
      'API RESTful robusta para la gestión integral de Observatorio. Esta API permite la creación, actualización, eliminación y consulta de datos relacionados con el Observatorio.',
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
components: {
  schemas: {
    ProductoServicio: {
      type: 'object',
      properties: {
        id_producto: {
          type: 'integer',
          description: 'ID único del producto o servicio',
          readOnly: true,
        },
        id_empresa: {
          type: 'integer',
          description: 'ID de la empresa a la que pertenece el producto/servicio',
        },
        nombre: {
          type: 'string',
          description: 'Nombre del producto o servicio',
        },
        tipo: {
          type: 'string',
          description: 'Tipo de producto (e.g., "Software", "Hardware", "Consultoría")',
        },
        descripcion: {
          type: 'string',
          description: 'Descripción detallada del producto o servicio',
        },
        fecha_lanzamiento: {
          type: 'string',
          format: 'date',
          description: 'Fecha de lanzamiento del producto o servicio (YYYY-MM-DD)',
        },
        Empresa: {
          type: 'object',
          properties: {
            nombre_empresa: {
              type: 'string',
              description: 'Nombre de la empresa',
            },
          },
        },
      },
      required: ['id_empresa', 'nombre', 'tipo', 'fecha_lanzamiento'],
    },
    ProductoServicioInput: {
      type: 'object',
      properties: {
        id_empresa: {
          type: 'integer',
          description: 'ID de la empresa a la que pertenece el producto/servicio',
        },
        nombre: {
          type: 'string',
          description: 'Nombre del producto o servicio',
        },
        tipo: {
          type: 'string',
          description: 'Tipo de producto (e.g., "Software", "Hardware", "Consultoría")',
        },
        descripcion: {
          type: 'string',
          description: 'Descripción detallada del producto o servicio',
        },
        fecha_lanzamiento: {
          type: 'string',
          format: 'date',
          description: 'Fecha de lanzamiento del producto o servicio (YYYY-MM-DD)',
        },
      },
      required: ['id_empresa', 'nombre', 'tipo', 'fecha_lanzamiento'],
    },
    EncuestaDemanda: {
      type: 'object',
      properties: {
        id_encuesta: {
          type: 'integer',
          description: 'ID único de la encuesta de demanda',
          readOnly: true,
        },
        id_producto: {
          type: 'integer',
          description: 'ID del producto al que se refiere la encuesta',
        },
        id_pais: {
          type: 'integer',
          description: 'ID del país de la encuesta',
        },
        porcentaje_demanda: {
          type: 'number',
          format: 'float',
          description: 'Porcentaje de demanda del producto en el país',
        },
        anio: {
          type: 'integer',
          description: 'Año de la encuesta',
        },
        ProductoServicio: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del producto/servicio',
            },
            tipo: {
              type: 'string',
              description: 'Tipo del producto/servicio',
            },
          },
        },
        Pais: {
          type: 'object',
          properties: {
            nombre_pais: {
              type: 'string',
              description: 'Nombre del país',
            },
          },
        },
      },
      required: ['id_producto', 'id_pais', 'porcentaje_demanda', 'anio'],
    },
    EncuestaDemandaInput: {
      type: 'object',
      properties: {
        id_producto: {
          type: 'integer',
          description: 'ID del producto al que se refiere la encuesta',
        },
        id_pais: {
          type: 'integer',
          description: 'ID del país de la encuesta',
        },
        porcentaje_demanda: {
          type: 'number',
          format: 'float',
          description: 'Porcentaje de demanda del producto en el país',
        },
        anio: {
          type: 'integer',
          description: 'Año de la encuesta',
        },
      },
      required: ['id_producto', 'id_pais', 'porcentaje_demanda', 'anio'],
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
