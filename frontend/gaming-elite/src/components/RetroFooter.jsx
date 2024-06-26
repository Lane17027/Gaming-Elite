import React from 'react'
import styles from "../style/Retro.module.css"
import baseUrl from "../api/api";

export default function Footer () {
    return (
    <footer className={styles.retroFooter}>
      <div className={styles.projectGithub}>
        <h4>Project Github:</h4>
        <h4><a href="https://github.com/connorreidy1/Gaming-Elite">Github</a></h4>
      </div>
      <hr className={styles.divider} />
      <div className={styles.teamContainer}>
        <div>
          <h3>Team Members</h3>
        </div>
        <div className={styles.teamMembersContainer}>
          <div className={styles.teamMember}>
            <h4>Scott Larson</h4>
            <h4><a href="https://github.com/larsonscott89">Github</a></h4>
          </div>
          <div className={styles.teamMember}>
            <h4>Lane Nichols</h4>
            <h4><a href="https://github.com/Lane17027">Github</a></h4>
          </div>
          <div className={styles.teamMember}>
            <h4>Kevin Wang</h4>
            <h4><a href="https://github.com/kevinwang2882">Github</a></h4>
          </div>
          <div className={styles.teamMember}>
            <h4>Connor Reidy</h4>
            <h4><a href="https://github.com/connorreidy1">Github</a></h4>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.copyright}>
        <p>&copy; Gaming Elite</p>
      </div>

    </footer>


     )
    }
