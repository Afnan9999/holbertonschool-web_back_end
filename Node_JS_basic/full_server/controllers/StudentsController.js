import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(req, res) {
    const databasePath = process.argv[2] || './database.csv';

    readDatabase(databasePath)
      .then((data) => {
        let responseText = 'This is the list of our students\n';

        const fields = Object.keys(data).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        for (const field of fields) {
          const students = data[field];
          responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }

        res.status(200).send(responseText.trim());
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    const databasePath = process.argv[2] || './database.csv';

    readDatabase(databasePath)
      .then((data) => {
        const students = data[major] || [];
        res.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}
