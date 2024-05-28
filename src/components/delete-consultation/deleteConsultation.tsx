import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./deleteConsultation.style.css";
import { faCancel, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DELETE_CONSULTATION } from "../../api/consultations.resolvers";
import { useMutation } from "@apollo/client";
import Loading from "../loading/loading";
import Error from "../error/error";

type DeleteConsultationProps = {
  consultationId: string;
  toggleDeleteConsultation?: () => void;
  removeConsultation?: (consultationId: string) => void;
};

export default function DeleteConsultation({
  consultationId,
  toggleDeleteConsultation,
  removeConsultation,
}: DeleteConsultationProps) {
  const [deleteConsultation, { loading, error }] =
    useMutation(DELETE_CONSULTATION);
  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          toggleDeleteConsultation && toggleDeleteConsultation();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h3>Delete Consultation</h3>
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => {
              toggleDeleteConsultation && toggleDeleteConsultation();
            }}
          />
        </div>
        <div className="delete-consultation">
          {loading ? (
            <Loading isLoading={loading} />
          ) : error ? (
            <Error errorMessage={error.message} />
          ) : (
            <>
              <p>
                Confirm deletion of consultation with id:{" "}
                <p className="to-delete-id">{consultationId}</p>
              </p>
              <div className="btn-row">
                <a
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteConsultation({ variables: { consultationId } }).then(
                      (res) => {
                        removeConsultation &&
                          removeConsultation(consultationId);
                        toggleDeleteConsultation && toggleDeleteConsultation();
                      }
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <p>Delete</p>
                </a>
                <a
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDeleteConsultation && toggleDeleteConsultation();
                  }}
                >
                  <FontAwesomeIcon icon={faCancel} />
                  <p>Cancel</p>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
