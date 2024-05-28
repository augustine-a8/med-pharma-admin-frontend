import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./patient.style.css";
import { GET_ALL_CONSULTATIONS_FOR_PATIENT } from "../../api/consultations.resolvers";
import { AddConsultation, Error, Loading } from "../../components";
import { useEffect, useState } from "react";

export type Consultation = {
  id: string;
  consultationDate: string;
  consultationType: string;
  healthCareProviders: string[];
  medicalConditions: string[];
};

export default function ViewPatient() {
  const { patientId } = useParams();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAddConsultation, setShowAddConsultation] =
    useState<boolean>(false);
  const [AllConsultations, setAllConsultations] = useState<Consultation[]>([]);
  const { data, loading, error } = useQuery(GET_ALL_CONSULTATIONS_FOR_PATIENT, {
    variables: { patientId },
  });

  useEffect(() => {
    if (data) {
      setAllConsultations(
        data.getAllConsultationsForPatient.map((c: any, idx: any) => ({
          ...c,
          serialNumber: idx + 1,
        }))
      );
    }
  }, [data]);

  const addConsultation = (consultation: Consultation) => {
    setAllConsultations((prev) => [
      ...prev,
      { ...consultation, serialNumber: AllConsultations.length + 1 },
    ]);
  };

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  //   const AllConsultations = data.getAllConsultationsForPatient.map(
  //     (c: any, idx: any) => ({
  //       ...c,
  //       serialNumber: idx + 1,
  //     })
  //   );

  const itemsPerPage = 13;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = AllConsultations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(AllConsultations.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToPage = (number: number) => {
    setCurrentPage(number);
  };

  const toggleAddConsultation = () => {
    setShowAddConsultation((prev) => !prev);
  };

  return (
    <>
      <div className="patient-details-page">
        <div className="patient-details-header">
          <div className="patient-profile-img-box">
            <img
              src="/profile-picture2.jpg"
              alt={`${state.name}'s profile picture`}
            />
          </div>
          <div className="patient-details-box">
            <p>{state.id}</p>
            <p>{state.name}</p>
            <p>{state.email}</p>
          </div>
        </div>
        <div className="patient-consultations">
          <div className="patient-consultations-header">
            <div>
              <h3>All Consultations</h3>
              <p>{new Date().toDateString()}</p>
            </div>
            <a
              href="#"
              className="add-consultation-btn"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                toggleAddConsultation();
              }}
            >
              <p>Add Consultation</p>
            </a>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>ID</th>
              <th>consultation date</th>
              <th>consultation type</th>
              <th>health care providers</th>
              <th>medical conditions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((consultation: any) => (
              <tr key={consultation.id}>
                <td data-cell="s/n">{consultation.serialNumber}</td>
                <td data-cell="ID">{consultation.id}</td>
                <td data-cell="consultation data">
                  {new Date(
                    parseInt(consultation.consultationDate, 10)
                  ).toDateString()}
                </td>
                <td data-cell="consultation type">
                  {consultation.consultationType}
                </td>
                <td data-cell="health care providers">
                  {consultation.healthCareProviders.join(", ")}
                </td>
                <td data-cell="health care providers">
                  {consultation.medicalConditions.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-box">
          <div className="pagination">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                prevPage();
              }}
              aria-disabled={currentPage === 1}
              role="button"
              className="prev-btn"
            >
              Prev
            </a>
            {Array.from({ length: totalPages }).map((_, index) => (
              <a
                href="#"
                key={index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(index + 1);
                }}
                aria-disabled={currentPage === index + 1}
                role="button"
                className={`page-btn ${
                  currentPage === index + 1 ? "active" : undefined
                }`}
              >
                {index + 1}
              </a>
            ))}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
              aria-disabled={currentPage === totalPages}
              role="button"
              className="next-btn"
            >
              Next
            </a>
          </div>
        </div>
      </div>
      {showAddConsultation && (
        <AddConsultation
          toggleAddConsultation={toggleAddConsultation}
          patientId={state.id}
          addConsultation={addConsultation}
        />
      )}
    </>
  );
}
