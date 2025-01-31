import { useState } from "react";
import "./App.css";
import Header from "./component/Header";

function App() {
  const [patients, setPatients] = useState([]);

  // Priority Levels
  const priorityLevels = ["Mild", "Moderate", "Severe", "Critical"];

  // Function to Add a Patient
  const addPatient = () => {
    const randomPriority = priorityLevels[Math.floor(Math.random() * 4)]; // Random priority
    const newPatient = {
      id: Date.now(),
      name: `Patient ${patients.length + 1}`,
      priority: randomPriority,
    };

    setPatients([...patients, newPatient]);
  };

  // Function to Start Treating Patients
  const treatPatient = () => {
    if (patients.length === 0) return;

    // Sort patients based on priority
    const sortedPatients = [...patients].sort((a, b) => {
      return priorityLevels.indexOf(b.priority) - priorityLevels.indexOf(a.priority);
    });

    const patientToTreat = sortedPatients[0];
    const treatmentTime = getTreatmentTime(patientToTreat.priority);

    console.log(`Treating ${patientToTreat.name} with priority ${patientToTreat.priority}`);

    setTimeout(() => {
      setPatients((prevPatients) => prevPatients.filter((p) => p.id !== patientToTreat.id));
      console.log(`${patientToTreat.name} treated!`);
    }, treatmentTime);
  };

  // Function to Determine Treatment Time Based on Priority
  const getTreatmentTime = (priority) => {
    switch (priority) {
      case "Mild":
        return 3000; // 3 seconds
      case "Moderate":
        return 5000; // 5 seconds
      case "Severe":
        return 7000; // 7 seconds
      case "Critical":
        return 10000; // 10 seconds
      default:
        return 4000;
    }
  };

  return (
    <>
    <Header/>
    <div className="w-screen h-screen bg-slate-400 flex">
      {/* Left Side: Add Patients */}
      <div className="h-screen w-1/2 bg-orange-300 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Hospital Management System</h1>
        <button
          onClick={addPatient}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-2"
        >
          Add Patient
        </button>
        <button
          onClick={treatPatient}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Treat Next Patient
        </button>
      </div>

      {/* Right Side: Patient List */}
      <div className="h-screen w-1/2 bg-white p-4 overflow-y-auto flex items-center">
        <ul className="list-disc pl-5">
        <h2 className="text-xl font-bold">Patient List</h2>
          {patients.map((patient) => (
            <li key={patient.id} className="text-lg">
              {patient.name} - <span className="font-bold">{patient.priority}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;
