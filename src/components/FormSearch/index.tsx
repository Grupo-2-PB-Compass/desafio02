import styles from "./FormSearch.module.css";

import Button from "../Button";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormSearchProps {
  onClose: () => void;
}

const FormSearch = ({ onClose }: FormSearchProps) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section className={styles.formSearch}>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchContainer}>
          <input
            className={styles.inputText}
            type="text"
            value={search}
            placeholder="Filme, série ou celebridade"
            required={true}
            onChange={handleChange}
          />
          <Button type="submit">
            <BiSearch className={styles.icon} />
          </Button>
          <Button onClick={handleCancel}>
            <AiOutlineClose className={styles.icon} />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default FormSearch;
