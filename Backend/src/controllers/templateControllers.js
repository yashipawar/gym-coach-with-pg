const pool = require('../config/pool');

exports.createTemplate = async (req, res) => {
    const { name, day, muscle, exercises } = req.body; // Extracting the correct fields from the request body.

    try {
        // Inserting into the table using the provided field names.
        const result = await pool.query(
            'INSERT INTO templates (name, day, muscle, exercises) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, day, muscle, JSON.stringify(exercises)] // Storing exercises array as JSON.
        );
        // Respond with the newly created template record.
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error executing query:", error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
};
  
exports.getAllTemplates = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM templates');
        console.log(result.rows); // Log the raw data
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching templates:", error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
};

  exports.deleteTemplate = async (req, res) => {
    const { templateId } = req.params; // Assuming templateId is passed as a URL parameter
    try {
      const deleteAssignmentResult = await pool.query(
        'DELETE FROM assignments WHERE templateId = $1',
        [templateId]
      );
      const deleteTemplateResult = await pool.query(
        'DELETE FROM templates WHERE id = $1',
        [templateId]
      );
      if (deleteTemplateResult.rowCount > 0) {
        res.json({ message: 'Template deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Template not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.assignTemplateToUser = async (req, res) => {
  const { userId, templateId } = req.body;
  try {
    await pool.query(
      'INSERT INTO assignments (userId, templateId) VALUES ($1, $2)',
      [userId, templateId]
    );
    res.json({ message: 'Template assigned successfully.' });
  } catch (error) {
    console.error("Error during template assignment:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAssignedTemplatesForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Joining assignments with templates to fetch the full template details for each assigned template
    const result = await pool.query(
      `SELECT t.* FROM assignments a
      JOIN templates t ON a.templateId = t.id
      WHERE a.userId = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching user's assigned templates:", error);
    res.status(500).json({ error: error.message });
  }
};

// exports.assignTemplateToUser = async (req, res) => {
//   const { userId, templateId } = req.body;
//   try {
//     await pool.query(
//       `INSERT INTO assignments (userId, templateId) VALUES ($1, $2)
//       ON CONFLICT (userId, templateId) DO UPDATE
//       SET templateId = EXCLUDED.templateId`,
//       [userId, templateId]
//     );
//     res.json({ message: 'Template assigned successfully.' });
//   } catch (error) {
//     console.error("Error during template assignment:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

