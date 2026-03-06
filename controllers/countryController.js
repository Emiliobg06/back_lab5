const pool = require('../db');
// Obtener todos los países
exports.getAllCountries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Empleado ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los empleados:', error);
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
};
// Obtener un país por ID
exports.getCountryById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Empleado WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        res.status(500).json({ error: 'Error al obtener el empleado' });
    }
};
// Crear un nuevo país
exports.createCountry = async (req, res) => {
    const { eid,name, department, city,country,empresa } = req.body;
    // Validación básica
    if (!name) {
        return res.status(400).json({ error: 'El nombre del empleado es obligatorio' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO country (Eid,name, department, city,country,empresa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [eid,name, department, city,country,empresa]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el empleado:', error);
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
};

// Actualizar un país existente
exports.updateCountry = async (req, res) => {
    const { eid,name, department, city,country,empresa } = req.body;
    const empleadoId = req.params.id;
    // Validación básica
    if (!name) {
        return res.status(400).json({ error: 'El nombre del empleado es obligatorio' });
    }
    try {
        // Verificar si el empleado existe
        const checkResult = await pool.query('SELECT * FROM Empleado WHERE id = $1', [countryId]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        // Actualizar el país
        const updateResult = await pool.query(
            'UPDATE Empleado SET Eid = $1, name = $2, department = $3, city = $4, country = $5, empresa = $6 WHERE id = $7 RETURNING *',
            [eid,name, department, city,country,empresa, empleadoId]
        );
        res.json(updateResult.rows[0]);
    } catch (error) {
        console.error('Error al actualizar el Empleado:', error);
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
};
// Eliminar un país
exports.deleteCountry = async (req, res) => {
    const empleadoId = req.params.id;
    try {
        // Verificar si el empleado existe
        const checkResult = await pool.query('SELECT * FROM Empleado WHERE id = $1', [empleadoId]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        // Eliminar el empleado
        await pool.query('DELETE FROM Empleado WHERE id = $1', [empleadoId]);
        res.json({ message: 'Empleado eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
};