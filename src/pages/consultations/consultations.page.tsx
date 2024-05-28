import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";

import "./consultations.style.css";
import { Loading, Error, DeleteConsultation, Header } from "../../components";
import { GET_ALL_CONSULTATIONS } from "../../api/consultations.resolvers";

type Consultation = {
  id: string;
  healthCareProviders: string[];
  medicalConditions: string[];
  consultationType: string;
  consultationDate: string;
  patient: {
    name: string;
    email: string;
  };
};

export default function Consultations() {
  const { data, loading, error } = useQuery(GET_ALL_CONSULTATIONS);

  const [AllConsultations, setAllConsultations] = useState<Consultation[]>([]);
  const [showDeleteConsultation, setShowDeleteConsultation] =
    useState<boolean>(false);
  const [consultationToDeleteId, setConsultationToDeleteId] =
    useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const [filters, setFilters] = useState({
    patientName: "",
    consultationDate: "",
    consultationType: "",
    healthCareProvider: "",
    medicalCondition: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setAllConsultations(data.getAllConsultations);
    }
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  console.log(data);
  const filteredConsultations = AllConsultations.filter((consultation) => {
    return (
      (filters.patientName === "" ||
        consultation.patient.name
          .toLowerCase()
          .includes(filters.patientName.toLowerCase())) &&
      (filters.consultationDate === "" ||
        consultation.consultationDate === filters.consultationDate) &&
      (filters.consultationType === "" ||
        consultation.consultationType
          .toLowerCase()
          .includes(filters.consultationType.toLowerCase())) &&
      (filters.healthCareProvider === "" ||
        consultation.healthCareProviders.some((provider) =>
          provider
            .toLowerCase()
            .includes(filters.healthCareProvider.toLowerCase())
        )) &&
      (filters.medicalCondition === "" ||
        consultation.medicalConditions.some((condition) =>
          condition
            .toLowerCase()
            .includes(filters.medicalCondition.toLowerCase())
        ))
    );
  });

  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConsultations.slice(
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

  const toggleDeleteConsultation = () => {
    setShowDeleteConsultation((prev) => !prev);
  };

  const removeConsultation = (consultationId: string) => {
    setAllConsultations((prev) =>
      prev.filter((it) => it.id !== consultationId)
    );
  };

  return (
    <>
      <Header
        placeholder="Search patient name"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <div className="page">
        <div className="consultation-header-box">
          <h2>All Consultations</h2>
        </div>
        <table className="consultations-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>patient</th>
              <th>consultation type</th>
              <th>health care providers</th>
              <th>medical conditions</th>
              <th>consultation date</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((consultation) => {
              return (
                <tr key={consultation.id}>
                  <td data-cell="s/n">{consultation.id}</td>
                  <td className="patient-td" data-cell="patient">
                    <div className="patient-img-box">
                      <img
                        src="/profile-picture1.jpg"
                        alt={`${consultation.patient.name}'s profile picture`}
                      />
                    </div>
                    <p>{consultation.patient.name}</p>
                  </td>
                  <td data-cell="consultation-type">
                    {consultation.consultationType}
                  </td>
                  <td data-cell="health-care providers">
                    {consultation.healthCareProviders.join(", ")}
                  </td>
                  <td data-cell="medical conditions">
                    {consultation.medicalConditions.join(", ")}
                  </td>
                  <td data-cell="date">
                    {new Date(
                      parseInt(consultation.consultationDate, 10)
                    ).toDateString()}
                  </td>
                  <td data-cell="actions">
                    <div className="actions-td">
                      <FontAwesomeIcon icon={faEdit} color="#0b2cac" />
                      <FontAwesomeIcon
                        icon={faTrash}
                        color="#a11d33"
                        onClick={(e) => {
                          e.preventDefault();
                          setConsultationToDeleteId(consultation.id);
                          toggleDeleteConsultation();
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
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
      {showDeleteConsultation && consultationToDeleteId !== "" && (
        <DeleteConsultation
          consultationId={consultationToDeleteId}
          toggleDeleteConsultation={toggleDeleteConsultation}
          removeConsultation={removeConsultation}
        />
      )}
    </>
  );
}
