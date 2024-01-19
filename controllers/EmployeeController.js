// import Model Employee
const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  // buat fungsi
  //Menampilkan all data employees
  async index(req, res) {
    const employee = await Employee.all();

    //check apakah data null or not
    if (employee.length === 0) {
      const data = {
        message: "Data is empety",
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Get All Resource",
        data: employee
      };

      res.status(200).json(data);
    }

  }

  //membuat fungsi untuk menambah data


  async store(req, res) {
    /**
     * TODO 2: memanggil method create.
     * Method create mengembalikan data yang baru diinsert.
     * Mengembalikan response dalam bentuk json.
     */
    const requiredFields = ['name', 'gender', 'phone'];

    // requiredFields.forEach(field => {
    //   if (!req.body[field]) {
    //     return res.status(422).json({
    //       message: `Field '${field}' is required`
    //     });
    //   }
    // });

    

    try {
      const employee = await Employee.create(req.body);

      const data = {
        message: "Resource added successfully",
        data: employee,
      };
      res.status(201).json(data);
    }
    catch {
      res.status(422).json({
        message: "All fields must be filled correctly"
      });
    }



    // if (!employee) {
    //   const data = {
    //     message: "Resource added successfully",
    //     data: employee,
    //   };
    //   res.status(201).json(data);
    // } else {
    //   const data = {
    //     message: "Resource added successfully",
    //     data: employee,
    //   };
    //   res.status(201).json(data);
    // }




  }

  async show(req, res) {
    /**
     * cari id
     * jika ada, kirim datanya
     * jika tidak, kirim data tidak ada
     */
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
      const data = {
        message: "Get Detail Resource",
        data: employee,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }

  }

  async update(req, res) {
    /**
     * check id students
     * jika ada, lakukan update
     * jika tidak, kirim data tidak ada
     */
    const { id } = req.params;

    const employee = await Employee.find(id);

    if (employee) {
      // update data
      const employeeUpdated = await Employee.update(id, req.body);
      const data = {
        message: "Resource is update successfully",
        data: employeeUpdated,
      };

      res.status(200).json(data);
    }
    else {
      // kirim data tidak ada
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }



  }

  async destroy(req, res) {
    const { id } = req.params;

    /**
     * cari id
     * jika ada, hapus data
     * jika tidak, kirim data tidak ada
     */

    const employee = await Employee.find(id);

    if (employee) {
      // hapus data
      await Employee.delete(id);
      const data = {
        message: "Resource is delete successfully",
      };

      res.status(200).json(data);
    }
    else {
      // data tidak ada
      const data = {
        message: "Rsource not found",
      };

      res.status(404).json(data);
    }
  }

  async search(req, res){
    const { name } = req.params;

    const employee = await Employee.search(name);

    if (employee) {
      const data = {
        message: "Get Detail Resource",
        data: employee,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }
  }

  async active(req, res){

    const employee = await Employee.active();

    if (employee) {
      const data = {
        message: "Get active Resource",
        total : employee.length,
        data: employee,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }
  }

  async inactive(req, res){

    const employee = await Employee.inactive();

    if (employee) {
      const data = {
        message: "Get active Resource",
        total : employee.length,
        data: employee,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }
  }

  async terminated(req, res){

    const employee = await Employee.terminated();

    if (employee) {
      const data = {
        message: "Get terminated Resource",
        total : employee.length,
        data: employee,
      };

      res.status(200).json(data);
    }
    else {
      const data = {
        message: "Resource not found",
      };

      res.status(404).json(data);
    }
  }
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
