import styles from "./Menu.module.css";
import MenuLink from "../MenuLink";
import logo from "../../assets/images/compass-logo.png";
import { AiFillHome } from "react-icons/ai";
import { PiTelevisionFill } from "react-icons/pi";
import { PiFilmReelBold } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Button from "../Button";
import FormSearch from "../FormSearch";
import { useState } from "react";

export default function Menu() {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <MenuLink to="/">
          <img src={logo} alt="logo" />
        </MenuLink>
        <MenuLink to="/">
          <AiFillHome className={styles.icon} />
          Inicio
        </MenuLink>
        <MenuLink to="/tvshows">
          <PiTelevisionFill className={styles.icon} /> Séries
        </MenuLink>
        <MenuLink to="/movies">
          <PiFilmReelBold className={styles.icon} /> Filmes
        </MenuLink>
        <MenuLink to="/actors">
          <AiFillStar className={styles.icon} /> Celebridades
        </MenuLink>
      </nav>

      <nav className={styles.navbar}>
        {!isFormVisible && (
          <>
            <MenuLink>
              <Button onClick={toggleFormVisibility}>
                <BiSearch className={styles.icon} /> Buscar
              </Button>
            </MenuLink>
            <MenuLink to="/mylist">
              <FaPlus className={styles.icon} /> Minha Lista
            </MenuLink>
          </>
        )}
        {isFormVisible && <FormSearch onClose={toggleFormVisibility} />}
      </nav>
    </header>
  );
}
