import { gql } from "@apollo/client";

export const GET_ALL_CONSULTATIONS = gql`
  query GetAllConsultations {
    getAllConsultations {
      id
      patient {
        name
        email
      }
      consultationType
      healthCareProviders
      medicalConditions
      consultationDate
    }
  }
`;

export const GET_ALL_CONSULTATIONS_FOR_PATIENT = gql`
  query GetAllConsultationsForPatient($patientId: ID) {
    getAllConsultationsForPatient(patientId: $patientId) {
      id
      consultationDate
      consultationType
      healthCareProviders
      medicalConditions
    }
  }
`;

export const BOOK_CONSULTATION = gql`
  mutation BookConsultation($bookConsultationInput: BookConsultationInput!) {
    bookConsultation(bookConsultationInput: $bookConsultationInput)
  }
`;

export const DELETE_CONSULTATION = gql`
  mutation DeleteConsultation($consultationId: ID!) {
    deleteConsultation(consultationId: $consultationId)
  }
`;
