import { Link } from "react-router-dom"
import styles from "../style/Retro.module.css"
import baseUrl from "../api/api";

export default function Nav (){
    return(
      <nav>
        <ul className={styles.navItems}>

          {/* <Link to="/"> Home </Link> */}

          <Link to="/consoles">  Consoles  </Link>
          <hr className={styles.navDivider} />
          <Link to="/games">  Games  </Link>
          <hr className={styles.navDivider} />
          <Link to="/accessories">  Accessories  </Link>
          <hr className={styles.navDivider} />
          <Link className={styles.retroNav} to="/retro">  Retro  </Link>

        </ul>
      </nav>
    )
}
