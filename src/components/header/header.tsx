import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.style.css";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../avatar/avatar";

type HeaderProps = {
  placeholder?: string;
  searchValue?: string;
  onSearchChange?: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters?: {
    patientName: string;
    consultationDate: string;
    consultationType: string;
    healthCareProvider: string;
    medicalCondition: string;
  };
};

export default function Header({
  placeholder = "Search",
  handleFilterChange,
  filters,
}: HeaderProps) {
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const toggleShowFilterOptions = () => {
    setShowFilterOptions((prev) => !prev);
  };
  return (
    <>
      <div className="header">
        <div className="header-row">
          <div className="input-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder={placeholder}
              value={filters?.patientName}
              onChange={handleFilterChange}
              name="patientName"
            />
          </div>
          <div className="filter-box">
            <FontAwesomeIcon
              icon={faFilter}
              onClick={() => {
                toggleShowFilterOptions();
              }}
            />
          </div>
        </div>
        <Avatar />
        {showFilterOptions && (
          <form action="#" className="filter-options">
            <h3>Filter Options</h3>
            <div className="form-control">
              <label htmlFor="">consultation type</label>
              <input
                type="text"
                placeholder="Enter consultation type"
                name="consultationType"
                value={filters?.consultationType}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="">consultation date</label>
              <input
                type="text"
                placeholder="Select consultation Date"
                name="consultationDate"
                value={filters?.consultationDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="">health care provider</label>
              <input
                type="text"
                placeholder="Enter health care provider"
                name="healthCareProvider"
                value={filters?.healthCareProvider}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="">medical condition</label>
              <input
                type="text"
                placeholder="Enter medical condition"
                name="medicalCondition"
                value={filters?.medicalCondition}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-btn-box">
              <a
                href="#"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleShowFilterOptions();
                }}
              >
                <p>close</p>
              </a>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
