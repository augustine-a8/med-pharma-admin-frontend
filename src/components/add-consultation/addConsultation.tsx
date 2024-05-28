import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./addConsultation.style.css";
import { useMutation } from "@apollo/client";
import { BOOK_CONSULTATION } from "../../api/consultations.resolvers";
import { Consultation } from "../../pages/patients/viewPatient.page";
import Loading from "../loading/loading";
import Error from "../error/error";

type AddConsultationProps = {
  toggleAddConsultation?: () => void;
  patientId?: string;
  addConsultation?: (consultation: Consultation) => void;
};

export default function AddConsultation({
  toggleAddConsultation,
  patientId,
  addConsultation,
}: AddConsultationProps) {
  const [consultationType, setConsultationType] = useState<string>("");
  const [consultationDate, setConsultationDate] = useState<string>("");
  const [healthCareProviders, setHealthCareProviders] = useState<string[]>([
    "",
  ]);
  const [medicalConditions, setMedicalConditions] = useState<string[]>([""]);

  const [bookConsultation, { loading, error }] = useMutation(BOOK_CONSULTATION);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          toggleAddConsultation && toggleAddConsultation();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h3>Add Consultation</h3>
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => {
              toggleAddConsultation && toggleAddConsultation();
            }}
          />
        </div>
        {loading ? (
          <Loading isLoading={loading} />
        ) : error ? (
          <Error errorMessage={error?.message!} />
        ) : (
          <form action="#">
            <div className="form-control">
              <label htmlFor="consultationType">consultation type</label>
              <input
                type="text"
                placeholder="Enter consultation type"
                value={consultationType}
                onChange={(e) => {
                  setConsultationType(e.target.value);
                }}
                id="consultationType"
              />
            </div>
            <div className="form-control">
              <label htmlFor="date">consultation date</label>
              <input
                type="date"
                id="date"
                value={consultationDate}
                onChange={(e) => {
                  setConsultationDate(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="">health care provider(s)</label>
              {healthCareProviders.map((healthCareProvider, idx) => {
                return (
                  <input
                    key={idx}
                    type="text"
                    placeholder="Enter health care provider"
                    value={healthCareProvider}
                    onChange={(e) => {
                      const healthCareProvidersValues = [
                        ...healthCareProviders,
                      ];
                      healthCareProvidersValues[idx] = e.target.value;
                      setHealthCareProviders(healthCareProvidersValues);
                    }}
                    className="input-mb"
                  />
                );
              })}
              <div className="add-btn-box">
                <a
                  href="#"
                  role="button"
                  className="add-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setHealthCareProviders((prev) => [...prev, ""]);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p>add</p>
                </a>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="">medical condition(s)</label>
              {medicalConditions.map((medicalCondition, idx) => {
                return (
                  <input
                    key={idx}
                    type="text"
                    placeholder="Enter medical condition"
                    value={medicalCondition}
                    onChange={(e) => {
                      const medicalConditionsValues = [...medicalConditions];
                      medicalConditionsValues[idx] = e.target.value;
                      setMedicalConditions(medicalConditionsValues);
                    }}
                    className="input-mb"
                  />
                );
              })}
              <div className="add-btn-box">
                <a
                  href="#"
                  role="button"
                  className="add-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setMedicalConditions((prev) => [...prev, ""]);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p>add</p>
                </a>
              </div>
            </div>
            <div className="submit-btn-box">
              <a
                href="#"
                role="button"
                className="submit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  bookConsultation({
                    variables: {
                      bookConsultationInput: {
                        patientId,
                        consultationDate,
                        consultationType,
                        medicalConditions,
                        healthCareProviders,
                      },
                    },
                  }).then((res) => {
                    addConsultation &&
                      addConsultation({
                        consultationDate,
                        consultationType,
                        medicalConditions,
                        healthCareProviders,
                        id: res.data.bookConsultation,
                      });
                    toggleAddConsultation && toggleAddConsultation();
                  });
                }}
              >
                <p>submit</p>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
