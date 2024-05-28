import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import "./patient.style.css";
import { GET_ALL_PATIENTS } from "../../api";
import { Loading, Error } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/avatar/avatar";

export default function Patients() {
  const { data, loading, error } = useQuery(GET_ALL_PATIENTS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  console.log(data);
  const AllPatients = data.getAllPatients.map((p: any, idx: any) => ({
    ...p,
    serialNumber: idx + 1,
  }));

  const filteredPatients = AllPatients.filter(
    (patient: any) =>
      search === "" || patient.name.toLowerCase().includes(search.toLowerCase())
  );
  const itemsPerPage = 13;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToPage = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <>
      <>
        <div className="header">
          <div className="header-row">
            <div className="input-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search patient name"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                name="patientName"
              />
            </div>
          </div>
          <Avatar />
        </div>
      </>
      <div style={{ padding: "1em" }}>
        <table className="patients-table">
          <thead>
            <tr>
              <th>s/n</th>
              <th>ID</th>
              <th>patient</th>
              <th>patient email</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((patient: any) => {
              return (
                <tr
                  key={patient.id}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`${patient.id}`, {
                      state: {
                        id: patient.id,
                        name: patient.name,
                        email: patient.email,
                      },
                    });
                  }}
                >
                  <td data-cell="s/n">{patient.serialNumber}</td>
                  <td data-cell="id">{patient.id}</td>

                  <td className="patient-td" data-cell="patient">
                    <div className="patient-img-box">
                      <img
                        src="/profile-picture2.jpg"
                        alt={`${patient.name}'s profile picture`}
                      />
                    </div>
                    <p>{patient.name}</p>
                  </td>
                  <td data-cell="email">{patient.email}</td>
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
    </>
  );
}
