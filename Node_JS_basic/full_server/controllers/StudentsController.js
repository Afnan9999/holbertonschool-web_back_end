import readDatabase from '../utils';

export default class StudentsController {
  static getAllStudents(req, res) {
    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((data) => {
        let response = 'This is the list of our students\n';

        const fields = Object.keys(data).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        for (const field of fields) {
          const list = data[field];
          response += `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`;
        }

        res.status(200).send(response.trim());
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

    const databasePath = process.argv[2];

    readDatabase(databasePath)
      .then((data) => {
        const list = data[major] || [];
        res.status(200).send(`List: ${list.join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}
